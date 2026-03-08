#!/usr/bin/env node
/**
 * whobuilt.xyz — weekly auto-publish script
 * Fetches top HN stories, rewrites with AI, publishes 3 articles
 * Run manually or via cron every Sunday
 */

const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ANTHROPIC_TOKEN = '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';
const ARTICLES_PATH = path.join(__dirname, '../data/articles.json');
const SITEMAP_PATH = path.join(__dirname, '../public/sitemap.xml');
const ARTICLES_TO_PUBLISH = 3;

const MONTHS = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];

function get(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'whobuilt-bot/1.0' } }, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        try { resolve(JSON.parse(data)); }
        catch { resolve(data); }
      });
    }).on('error', reject);
  });
}

async function fetchHNStories() {
  console.log('📡 Fetching HN top stories via Algolia...');
  const data = await get('https://hn.algolia.com/api/v1/search?tags=front_page&hitsPerPage=30');
  return data.hits.filter(s =>
    s.url &&
    s.num_comments > 5 &&
    !s.title?.toLowerCase().includes('ask hn') &&
    !s.title?.toLowerCase().includes('hiring')
  ).map(s => ({
    title: s.title,
    url: s.url,
    score: s.points || 0,
    descendants: s.num_comments || 0
  })).slice(0, 15);
}

async function rewriteWithAI(story) {
  console.log(`🤖 Rewriting: ${story.title}`);
  const prompt = `You are an editor at whobuilt.xyz — a sharp, no-fluff tech news site. 
Rewrite this Hacker News story as a whobuilt article. Be concise, developer-focused, factual.

Original title: ${story.title}
Original URL: ${story.url}
HN score: ${story.score} points, ${story.descendants || 0} comments

Return ONLY valid JSON (no markdown):
{
  "title": "rewritten headline, max 80 chars, punchy",
  "excerpt": "2-3 sentences, what happened and why it matters. No fluff.",
  "tag": "one of: AI, DEV, SECURITY, DESIGN, INFRA, DATA, MOBILE",
  "slug": "url-friendly-slug-max-60-chars"
}`;

  return new Promise((resolve, reject) => {
    const { execFile } = require('child_process');
    const proc = execFile(
      'C:\\Users\\lskys\\.local\\bin\\claude.exe',
      ['--print', '--model', 'claude-haiku-4-5', prompt],
      { timeout: 30000 },
      (err, stdout, stderr) => {
        if (err) return reject(new Error(err.message));
        try {
          const match = stdout.match(/\{[\s\S]*\}/);
          if (match) resolve(JSON.parse(match[0]));
          else reject(new Error('No JSON: ' + stdout.slice(0, 200)));
        } catch(e) { reject(new Error(e.message + ' raw: ' + stdout.slice(0, 200))); }
      }
    );
  });
}

function slugify(text) {
  return text.toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 60);
}

function getDomain(url) {
  try { return new URL(url).hostname.replace('www.', ''); }
  catch { return 'web'; }
}

function updateSitemap(articles) {
  const urls = [
    `  <url>\n    <loc>https://www.whobuilt.xyz/</loc>\n    <changefreq>daily</changefreq>\n    <priority>1.0</priority>\n  </url>`,
    ...articles.map(a =>
      `  <url>\n    <loc>https://www.whobuilt.xyz/article/${a.slug}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>`
    )
  ];
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`;
  fs.writeFileSync(SITEMAP_PATH, sitemap);
}

async function main() {
  console.log('🚀 whobuilt auto-publish starting...\n');

  // Load existing articles
  const existing = JSON.parse(fs.readFileSync(ARTICLES_PATH, 'utf8'));
  const existingSlugs = new Set(existing.map(a => a.slug));
  const nextId = Math.max(...existing.map(a => a.id)) + 1;

  // Fetch HN stories
  const stories = await fetchHNStories();
  console.log(`Found ${stories.length} candidate stories\n`);

  const newArticles = [];
  let attempts = 0;

  for (const story of stories) {
    if (newArticles.length >= ARTICLES_TO_PUBLISH) break;
    attempts++;

    try {
      const ai = await rewriteWithAI(story);
      const slug = ai.slug || slugify(ai.title);

      if (existingSlugs.has(slug)) {
        console.log(`⏭ Duplicate slug: ${slug}`);
        continue;
      }

      const now = new Date();
      const article = {
        id: nextId + newArticles.length,
        slug,
        tag: ai.tag || 'DEV',
        date: `${MONTHS[now.getMonth()]} ${now.getDate()}`,
        title: ai.title,
        domain: getDomain(story.url),
        excerpt: ai.excerpt,
        votes: story.score,
        comments: story.descendants || 0,
        readTime: Math.ceil(ai.excerpt.split(' ').length / 50) + 2,
        featured: false,
        sourceUrl: story.url
      };

      newArticles.push(article);
      existingSlugs.add(slug);
      console.log(`✅ [${ai.tag}] ${ai.title}`);
    } catch(e) {
      console.log(`❌ Failed: ${story.title} — ${e.message}`);
    }
  }

  if (newArticles.length === 0) {
    console.log('\n⚠️ No new articles generated. Exiting.');
    process.exit(0);
  }

  // Prepend new articles (newest first)
  const updated = [...newArticles, ...existing];
  fs.writeFileSync(ARTICLES_PATH, JSON.stringify(updated, null, 2));
  console.log(`\n📝 Added ${newArticles.length} articles to articles.json`);

  // Update sitemap
  updateSitemap(updated);
  console.log('🗺 Sitemap updated');

  // Git commit + push
  const projectRoot = path.join(__dirname, '..');
  execSync('git add data/articles.json public/sitemap.xml', { cwd: projectRoot });
  execSync(`git commit -m "auto: publish ${newArticles.length} articles ${new Date().toISOString().slice(0,10)}"`, { cwd: projectRoot });
  execSync('git push', { cwd: projectRoot });
  console.log('🚀 Pushed to GitHub → Vercel deploying...');

  console.log('\n✨ Done!');
  newArticles.forEach(a => console.log(`   → https://www.whobuilt.xyz/article/${a.slug}`));
}

main().catch(e => {
  console.error('Fatal error:', e);
  process.exit(1);
});
