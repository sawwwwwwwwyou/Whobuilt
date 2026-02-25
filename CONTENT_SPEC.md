# WHOBUILT — Content Specification & Quality Checklist

## Article JSON Schema (required fields)

```json
{
  "id": number,                  // sequential, never reuse
  "slug": "string",              // lowercase, hyphens, max 6 words
  "tag": "AI|DEV|OPEN SOURCE|TECH|TRAVEL|DESIGN",
  "date": "MMM DD",              // e.g. "FEB 25", "MAR 01"
  "title": "string",             // headline, title case, punchy
  "domain": "whobuilt.app",      // always whobuilt.app
  "excerpt": "string",           // 2-3 sentences, hook + key insight
  "votes": number,               // real HN score
  "comments": number,            // real HN comment count
  "readTime": number,            // minutes (estimate: ~200 words/min)
  "featured": false,             // ALWAYS false for auto-published articles
  "body": "string",              // full article in markdown (see below)
  "snippets": [                  // key points extracted from body
    {
      "lang": "english",
      "code": "KEY POINTS:\n\n- point 1\n- point 2\n..."
    }
  ]
}
```

## Body Requirements

- **Length:** 400–600 words (3–6 paragraphs)
- **Tone:** Direct, analytical, developer-focused. No fluff, no hype.
- **Voice:** Second person ("you") where it adds directness. Third person for factual reporting.
- **Structure:**
  - Para 1: Hook / what happened
  - Para 2–4: Context, implications, how it works
  - Para 5: What it means for developers / broader takeaway
- **Markdown:** Use `**bold**`, `*italic*`, `##` headers only if needed. No bullet lists in body (those go in snippets).
- **No AI tells:** No "It's worth noting", "Delve into", "In conclusion", em-dash overuse, rule of three.

## Snippets Requirements

- Header: `KEY POINTS:`
- 5–7 bullet points
- Extracted from body — not invented separately
- Each point: one concrete fact or implication, max 12 words
- No vague points ("things are changing") — must be specific

## Quality Checklist (verify before push)

- [ ] `featured: false`
- [ ] `domain: "whobuilt.app"`
- [ ] `body` present and 400–600 words
- [ ] `snippets[0].lang === "english"`
- [ ] `snippets[0].code` starts with "KEY POINTS:"
- [ ] `readTime` matches body length (~200 wpm)
- [ ] `slug` matches article topic, max 6 words
- [ ] `date` format is "MMM DD" (uppercase 3-letter month)
- [ ] `id` = previous max id + 1
- [ ] No duplicate slugs in articles.json
- [ ] sitemap.xml updated with new slug

## Render Check (after deploy)

Visit `https://www.whobuilt.xyz/article/<slug>` and confirm:
- [ ] Full body text renders (not just excerpt)
- [ ] Key points block appears below body
- [ ] Title, date, tag, readTime show correctly
- [ ] Article appears in homepage list (not hidden by featured bug)

## Featured Article Rules

- Only ONE article can have `featured: true` at a time
- Featured article is hardcoded: `id: 9` (Fallas Valencia guide)
- All new auto-published articles: `featured: false` — NO EXCEPTIONS
- `ArticleList` filters out `featured: true` — setting it on new articles hides them

## Source: Hacker News Auto-Pipeline

- Fetch: `https://hacker-news.firebaseio.com/v0/topstories.json`
- Pick: top 3 by score, developer/tech audience
- Skip: duplicate topics from previous weeks (check existing articles.json)
- Skip: non-tech stories (politics-only, sports, etc.)
- Rewrite: original perspective, not a summary — add analysis and developer context
