# Auto-Publish Task — WHOBUILT

Runs twice weekly: **Tuesday and Friday** via Claude Code Scheduled Tasks.

**Goal**: Fetch top tech/AI/startup news, write 3 SEO-optimized articles, publish to whobuilt.xyz.

---

## Step 1: Read Current State

1. Read `CONTENT_SPEC.md` — contains ALL formatting, SEO, and quality rules. Follow them exactly.
2. Read `data/articles.json`. Note:
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

For each of the 3 stories, write one article. Follow ALL rules from `CONTENT_SPEC.md`. Key requirements summarized below.

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

## Body Format (from CONTENT_SPEC.md — follow exactly)

### Structure: H2 Sections + Lead-With-Answer

```markdown
[Opening paragraph — 2-3 sentences. State the core fact. Primary keyword within first 50 words. Name the person/org behind the news.]

## [H2 — Keyword-Rich Heading Matching Search Queries]

[2-3 short paragraphs. Lead with the direct answer FIRST, then expand. The first 40-60 words after each H2 must work as a standalone extractable block — this is what AI search engines cite.]

## [H2 — How It Works / Technical Detail]

[2-3 paragraphs. Include specific numbers, dates, version numbers. Use **bold** for key terms on first mention. Each paragraph 3-4 sentences max.]

## [H2 — Why It Matters / What Developers Should Do]

[1-2 paragraphs. Concrete takeaway. What changes? What action should the reader take?]
```

### Critical Rules

1. **Lead every section with the answer** — AI extracts the first 40-60 words after a heading
2. **Name people** — "Andrej Karpathy published..." not "A researcher released..."
3. **Include specific stats** — numbers with sources get +40% AI citation boost
4. **Date everything** — "In March 2026" not "recently"
5. **Each claim works standalone** — if ripped from context, still makes sense
6. **3-4 H2 headers per article** — keyword-rich, match how people search
7. **3-4 sentences per paragraph max** — no walls of text
8. **No AI tells** — no "It's worth noting", "Delve into", "In conclusion", "It is important to", em-dash overuse (max 1 per article)

### Title (50-60 characters)
- Count characters before writing
- Primary keyword in first 3-4 words
- Power formats: numbers, year ("2026"), action verbs, contrast
- Good: "Karpathy's MicroGPT: 200 Lines of Pure Python" (46 chars)
- Bad: "A New Interesting AI Model Was Released" (vague, passive)

### Slug (3-5 words, no stop words)
- Primary keyword first
- Remove: a, the, is, for, in, of, to, and, or, with

### Excerpt / Meta Description (EXACTLY 145-160 characters)
- Count characters — this is the Google search snippet
- Primary keyword in first sentence
- State the key fact directly, complete sentence
- Include a number or specific claim

### Snippets (KEY POINTS)
- Exactly 5 bullet points
- Each point: one concrete fact or number, max 15 words
- Start with the most important/surprising point
- Include at least one number/statistic
- Extracted from body — not invented separately

---

## Step 6: Update articles.json

Append the 3 new article objects to the **end** of `data/articles.json`.

Verify before saving:
- [ ] IDs are sequential (max+1, max+2, max+3)
- [ ] All have `featured: false`
- [ ] All have `domain: "whobuilt.app"`
- [ ] No slug duplicates with existing articles
- [ ] Excerpts are 145-160 characters each (count!)
- [ ] Titles are 50-60 characters each (count!)
- [ ] Body word count is 600-720 words each
- [ ] Body has 3-4 H2 headers with keyword-rich titles
- [ ] Primary keyword in first 50 words of body
- [ ] Each H2 section leads with the direct answer
- [ ] At least one specific statistic/number in body
- [ ] People/orgs are named, not anonymous
- [ ] No AI writing tells
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
