# WHOBUILT — Claude Context

whobuilt.xyz — tech news aggregator. Next.js 14 + Vercel.

## Stack
- **Framework**: Next.js 14 (pages router)
- **Deploy**: Vercel — auto-deploys on every push to `master`
- **Content**: `data/articles.json` — single source of truth for all articles

## How Articles Work
- All article data (metadata + body) lives in `data/articles.json`
- `body` field: full article in markdown (~600-700 words)
- `sitemap.xml.js` auto-generates sitemap from articles.json on each Vercel request
- **To publish**: append to `data/articles.json`, commit, push → site updates automatically

## Key Files
- `data/articles.json` — all articles (max id currently 16)
- `CONTENT_SPEC.md` — article JSON schema + quality checklist
- `PUBLISHING_SCHEDULE.md` — automated publish task instructions (runs Tue + Fri)

## Hard Rules
- `featured: false` for ALL new articles (only id:9 is featured, never change this)
- `domain: "whobuilt.app"` always
- `id`: sequential from current max, never reuse
- New articles go at the END of the array (frontend sorts by id/votes/comments)
- JSON must remain valid after edits

## Content Style
- **Story-first, not spec-first**: prioritize human stories, founder journeys, indie hacker wins, real projects people built — not just dry technical announcements
- **Product Hunt / tech news energy**: cover launches the way PH does — who built it, why, what problem it solves, early traction numbers, user reactions
- **People over products**: name the founders, developers, researchers behind things. "Andrej Karpathy published..." beats "A new model was released..."
- **Real-world angles**: how is this being used in the wild? What did someone actually build with it? What do the comments / community say?
- **Prioritize stories with**: indie/solo builders, viral HN/Reddit threads, surprising use cases, products that shipped fast, underdog projects gaining traction
- **Avoid**: pure corporate press releases, dry CVE advisories without human context, benchmark-only AI posts with no "who cares and why"
