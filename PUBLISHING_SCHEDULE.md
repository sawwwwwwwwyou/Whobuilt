# Auto-Publish Task — WHOBUILT

Runs twice weekly: **Tuesday and Friday** via Claude Code Scheduled Tasks.

**Goal**: Fetch top tech/AI/startup news, write 3 SEO-optimized articles, publish to whobuilt.xyz.

---

## Step 1: Read Current State

Read `data/articles.json`. Note:
- The highest existing `id` (new articles = max_id + 1, +2, +3)
- Existing slugs and article topics (to avoid duplicates)
- The last 10 article titles (recency check)

---

## Step 2: Fetch Top Stories

Use WebFetch to pull stories from ALL four sources below. Collect all results before curating.

**Source A — Hacker News API**
1. Fetch `https://hacker-news.firebaseio.com/v0/topstories.json` — returns array of IDs
2. Fetch the first 20 items via `https://hacker-news.firebaseio.com/v0/item/{id}.json`
3. Filter out: "Ask HN:", "Show HN:", job posts, score < 150, non-tech topics (politics, sports)
4. Keep: tech, AI, developer tools, startups, programming, open source, apps

**Source B — Reddit r/MachineLearning**
Fetch `https://www.reddit.com/r/MachineLearning/top.json?limit=10&t=week`
Extract: title, url, score from each post's `data` field.

**Source C — Reddit r/programming**
Fetch `https://www.reddit.com/r/programming/top.json?limit=10&t=week`
Extract: title, url, score from each post's `data` field.

**Source D — Product Hunt**
Fetch `https://www.producthunt.com/`
Scrape the top 5 product launches visible on the homepage.

---

## Step 3: Curate Top 5

From all sources combined, select the **5 most interesting stories** for a tech/developer audience:
- Prioritize: high engagement score, AI/LLM news, developer tools, notable product launches, programming trends
- Skip: duplicate topics from the last 10 articles in articles.json
- Skip: non-tech business news, celebrity, politics, sports

---

## Step 4: Randomly Select 3

From the 5 curated stories, **randomly pick 3** to publish in this run. Each run should have variety — avoid 3 AI articles if possible; aim for a mix of tags.

---

## Step 5: Write 3 Articles

For each of the 3 stories, write one article. Follow ALL requirements below.

### JSON Schema

```json
{
  "id": <max_id + 1>,
  "slug": "<3-5 keyword-rich words, hyphenated, no stop words>",
  "tag": "<AI|DEV|TECH|OPEN SOURCE|DESIGN>",
  "date": "<TODAY: e.g. 'MAR 21'>",
  "title": "<50-60 chars, keyword near start>",
  "domain": "whobuilt.app",
  "excerpt": "<145-160 chars exactly — meta description>",
  "votes": <random integer 800-2500>,
  "comments": <random integer 40-200>,
  "readTime": <Math.ceil(body_word_count / 200)>,
  "featured": false,
  "body": "<full article in markdown, 600-720 words>",
  "snippets": [
    {
      "lang": "english",
      "code": "KEY POINTS:\n\n- <point 1>\n- <point 2>\n- <point 3>\n- <point 4>\n- <point 5>"
    }
  ]
}
```

### Tag Assignment
- `AI` — LLMs, machine learning, AI tools, neural networks, AI companies
- `DEV` — developer tools, programming languages, frameworks, CLIs, APIs, IDEs
- `TECH` — general tech news, hardware, company announcements, products, apps
- `OPEN SOURCE` — open source projects, releases, forks, communities
- `DESIGN` — UI/UX, design tools, design systems, accessibility

---

## SEO Requirements (CRITICAL — read carefully)

### Title (50-60 characters)
- Count characters before writing
- Primary keyword near the beginning (first 3-4 words)
- Use power formats: numbers ("3 Ways..."), year ("2026"), action ("How X Changes Y"), contrast ("Why X Beats Y")
- Compelling and specific — avoid vague titles like "AI is Getting Better"
- Good examples:
  - "Why Rust Is Replacing C in Embedded Systems" (45 chars)
  - "OpenAI Cuts API Costs 80% — What Changes for Devs" (50 chars)
  - "Karpathy's MicroGPT: 200 Lines of Pure Python" (46 chars)

### Slug (3-5 words, no stop words)
- Primary keyword first
- Remove: a, the, is, for, in, of, to, and, or, with
- Good examples: `rust-embedded-systems-2026`, `openai-api-cost-reduction`, `karpathy-microgpt-pure-python`

### Excerpt / Meta Description (EXACTLY 145-160 characters)
- Count characters carefully — this is the Google search snippet
- Include primary keyword naturally in the first sentence
- State the key fact or insight directly
- Complete sentence, no trailing ellipsis, no truncation
- Make it click-worthy: reader should know exactly what they'll learn
- Bad (too long, vague): "This article explores the recent developments in AI and what they might mean for the future of software development in general."
- Good: "OpenAI's new batch API drops inference costs by 80%. Here's what changes for developers building on GPT-4o today." (111 chars — extend to 145-160)

### Body (600-720 words)
Structure:
1. **Para 1 — Hook**: What happened. Primary keyword within first 100 words.
2. **`## <H2 Header with keyword>`** — every 2-3 paragraphs, 2-3 headers total
3. **Para 2-3 — Context**: Why it matters, how it works
4. **Para 4-5 — Implications**: What developers/builders should know
5. **Final para — Takeaway**: Concrete action or broader perspective

Rules:
- 3-4 sentences per paragraph max
- Use keyword variations and synonyms naturally — don't stuff
- `**bold**` for key terms, first mention of the product/tool
- No bullet lists in body (those go in snippets only)
- NO AI tells: "It's worth noting", "Delve into", "In conclusion", "It is important to", em-dash overuse (max 1 per article), "Certainly"
- Voice: direct, analytical, developer-focused. Second person ("you") for advice, third person for reporting.

### Snippets (KEY POINTS)
- Exactly 5 bullet points
- Each point: one concrete fact or number, max 12 words
- Extracted from body — not invented separately
- Start with: `KEY POINTS:\n\n-`

---

## Step 6: Update articles.json

Append the 3 new article objects to the **end** of `data/articles.json`.

Verify before saving:
- [ ] IDs are sequential (max+1, max+2, max+3)
- [ ] All have `featured: false`
- [ ] All have `domain: "whobuilt.app"`
- [ ] No slug duplicates with existing articles
- [ ] Excerpts are 145-160 characters each
- [ ] Titles are 50-60 characters each
- [ ] Body word count is 600-720 words each
- [ ] JSON is valid (no trailing commas, quotes are correct)

---

## Step 7: Commit and Push

```bash
git add data/articles.json
git commit -m "content: auto-publish 3 articles $(date '+%b %d' | tr '[:lower:]' '[:upper:]')"
git push origin master
```

Vercel detects the push and redeploys automatically. New articles appear on whobuilt.xyz within ~60 seconds.

---

## Deduplication Rule

Before writing any article, check: does any existing article in `articles.json` cover the same product, tool, or story? If yes, skip that story and use the next one from your curated list.
