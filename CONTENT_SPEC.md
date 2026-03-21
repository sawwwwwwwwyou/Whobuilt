# WHOBUILT — Content Specification & Quality Checklist

## Article JSON Schema (required fields)

```json
{
  "id": number,                  // sequential, never reuse
  "slug": "string",              // lowercase, hyphens, 3-5 words, primary keyword first
  "tag": "AI|DEV|OPEN SOURCE|TECH|TRAVEL|DESIGN",
  "date": "MMM DD",              // e.g. "FEB 25", "MAR 01"
  "title": "string",             // headline, 50-60 chars, keyword-first
  "domain": "whobuilt.app",      // always whobuilt.app
  "excerpt": "string",           // 145-160 chars, meta description (see SEO rules)
  "votes": number,               // real HN score
  "comments": number,            // real HN comment count
  "readTime": number,            // minutes (estimate: ~200 words/min)
  "featured": false,             // ALWAYS false for auto-published articles
  "body": "string",              // full article in markdown (see Body Format)
  "snippets": [                  // key points extracted from body
    {
      "lang": "english",
      "code": "KEY POINTS:\n\n- point 1\n- point 2\n..."
    }
  ]
}
```

---

## Body Format — Writing for Indexing + Readability

### Length & Structure

- **600-720 words** minimum (Google indexing threshold)
- **3-4 H2 sections** — each H2 is a keyword-rich question or phrase people search for
- **3-4 sentences per paragraph** max — walls of text kill readability and indexing
- **One idea per section** — each H2 block advances one argument or fact

### Required Body Structure

```markdown
[Opening paragraph — 2-3 sentences. State the core fact. Primary keyword within first 50 words.]

## [H2 — Keyword-Rich Section Title as Question or Phrase]

[2-3 short paragraphs. Lead with the direct answer, then expand. Include specific numbers, names, dates.]

## [H2 — Second Angle or "How It Works"]

[2-3 paragraphs. Technical detail, context, implications. Use **bold** for key terms on first mention.]

## [H2 — "Why It Matters" / Impact / What's Next]

[1-2 paragraphs. Broader takeaway. What should developers do? What changes?]
```

### AI Search Extractability (Critical for AI Overviews / Perplexity / ChatGPT citations)

These rules make content citable by AI systems — this is where most new search traffic comes from:

- **Lead every section with a direct answer** — don't bury it. AI extracts the first 40-60 words after a heading
- **Each key claim should work standalone** — if pulled out of context, it should still make sense
- **Include specific statistics with sources** — "+40% citation boost" per Princeton GEO study
- **Name people** — "Andrej Karpathy published..." not "A researcher released..."
- **Use comparison tables** for any "X vs Y" content — tables get cited 3x more than prose
- **Date everything** — "In March 2026" not "recently". AI systems weight recency heavily
- **No keyword stuffing** — actively hurts AI visibility by 10%

### Writing Style

- **Tone:** Direct, analytical, developer-focused. No fluff, no hype.
- **Voice:** Second person ("you") for directness. Third person for factual reporting.
- **Specific over vague:** "cuts deploy time from 4 hours to 15 minutes" not "saves time"
- **Active over passive:** "NVIDIA released" not "was released by NVIDIA"
- **No AI tells:** No "It's worth noting", "Delve into", "In conclusion", "It's important to", em-dash overuse, rule of three

### Markdown Formatting Rules

- `## H2` headers: 3-4 per article, keyword-rich, match search query patterns
- `**bold**` for key terms, product names, CVE numbers on first mention
- `*italic*` sparingly for emphasis
- No bullet lists in body — those go in `snippets` KEY POINTS block
- No H1 in body (the title is the H1)
- No H3 unless a section genuinely needs sub-structure

---

## Snippets — Terminal KEY POINTS Block

Rendered as a dark terminal-style block below the article body.

- Header line: `KEY POINTS:`
- **5-7 bullet points**
- Extracted from body — not invented separately
- Each point: one concrete fact, **max 15 words**
- Start with the most important/surprising point
- No vague points ("things are changing") — must be specific and citable
- Include at least one number/statistic

**Example:**
```
KEY POINTS:

- CVE-2026-33017: unauthenticated RCE in Langflow, CVSS 9.3
- Affects all versions through 1.8.1; patched in 1.9.0
- Active exploitation began within 20 hours of disclosure
- Attackers extracted API keys, cloud credentials, database passwords
- AI pipeline tools hold high-value keys to OpenAI, AWS, vector DBs
- Update immediately, rotate all credentials, restrict network access
```

---

## SEO Requirements

### Title (= `<title>` tag + og:title)

- **50-60 characters** (count before writing — Google truncates beyond this)
- Primary keyword in first 3-4 words
- Format: `{Article Title} — WHOBUILT`
- Power formats: numbers, year ("2026"), "How X", "Why X Beats Y", "[Name] Built X"
- No vague titles ("AI is Getting Better") — be specific

### Slug (= URL path)

- **3-5 words**, primary keyword first
- Remove stop words: a, the, is, for, in, of, to, and, or, with
- Examples: `langflow-rce-cve-2026-exploited`, `nvidia-nemotron-3-super-open-weight`

### Excerpt = Meta Description (= og:description)

- **EXACTLY 145-160 characters** (Google truncates beyond this)
- Primary keyword in first sentence
- Complete sentence, no trailing ellipsis
- State the key fact — make it click-worthy in search results
- Include a number or specific claim when possible

### Heading Structure (H1 → H2 hierarchy)

- **One H1 per page** — the article title (rendered by the template, not in body markdown)
- **3-4 H2s in body** — each contains a relevant keyword or search query pattern
- H2 text should match how people search: "How the Exploit Works" > "Technical Details"
- No skipped levels (H1 → H3 without H2)

### Internal Linking

- Link related articles within body text where natural
- Use descriptive anchor text: "the Langflow RCE vulnerability" not "this article"
- New articles should link to at least one existing article when topically relevant

### Schema Markup (JSON-LD)

Auto-injected by `pages/article/[slug].jsx`:

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "...",
  "description": "...",
  "url": "https://whobuilt.xyz/article/...",
  "datePublished": "2026-03-20",
  "author": {
    "@type": "Organization",
    "name": "WHOBUILT"
  },
  "publisher": {
    "@type": "Organization",
    "name": "WHOBUILT",
    "url": "https://whobuilt.xyz"
  }
}
```

Homepage includes WebSite + Organization schema.
Sitemap auto-generated from `articles.json` by `pages/sitemap.xml.js`.

---

## Quality Checklist (verify before push)

### Content
- [ ] `body` present and **600-720 words**
- [ ] **3-4 H2 headers** in body with keyword-rich titles
- [ ] Primary keyword in **first 50 words** of body
- [ ] Paragraphs are **3-4 sentences max**
- [ ] At least one **specific statistic or number** in body
- [ ] **Names people/orgs** — not just "a company released"
- [ ] Each section **leads with the direct answer**
- [ ] No AI writing tells (check for "It's worth noting", "Delve", em-dash overuse)

### SEO
- [ ] `title` is **50-60 characters**, keyword-first
- [ ] `excerpt` is **145-160 characters**, keyword in first sentence
- [ ] `slug` is **3-5 words**, primary keyword first, no stop words
- [ ] No duplicate slugs in articles.json

### Data Integrity
- [ ] `featured: false`
- [ ] `domain: "whobuilt.app"`
- [ ] `snippets[0].lang === "english"`
- [ ] `snippets[0].code` starts with `KEY POINTS:`
- [ ] `readTime` matches body length (~200 wpm)
- [ ] `date` format is `MMM DD` (uppercase 3-letter month)
- [ ] `id` = previous max id + 1

### Render Check (after deploy)

Visit `https://whobuilt.xyz/article/<slug>` and confirm:
- [ ] Full body text renders with H2 section headers
- [ ] Key points terminal block appears below body
- [ ] Title, date, tag, readTime show correctly
- [ ] Article appears in homepage feed

---

## Featured Article Rules

- Only ONE article can have `featured: true` at a time
- Featured article is hardcoded: `id: 9` (Fallas Valencia guide)
- All new auto-published articles: `featured: false` — NO EXCEPTIONS

---

## Source: Hacker News Auto-Pipeline

- Fetch: `https://hacker-news.firebaseio.com/v0/topstories.json`
- Pick: top 3 by score, developer/tech audience
- Skip: duplicate topics from previous weeks (check existing articles.json)
- Skip: non-tech stories (politics-only, sports, etc.)
- Rewrite: original perspective, not a summary — add analysis and developer context
- Follow Body Format rules above — H2 structure, extractable answers, specific data
