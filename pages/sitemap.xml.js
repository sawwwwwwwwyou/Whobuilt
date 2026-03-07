import articles from '../data/articles.json';

const BASE_URL = 'https://www.whobuilt.xyz';

function generateSitemap() {
    const today = new Date().toISOString().split('T')[0];

    const articleUrls = articles
        .map(
            (a) => `  <url>
    <loc>${BASE_URL}/article/${a.slug}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`
        )
        .join('\n');

    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${BASE_URL}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
${articleUrls}
</urlset>`;
}

export default function Sitemap() {
    return null;
}

export async function getServerSideProps({ res }) {
    res.setHeader('Content-Type', 'text/xml');
    res.write(generateSitemap());
    res.end();
    return { props: {} };
}
