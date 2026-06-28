# Signal 24 — signal24.info

A professional, mobile-first news platform for Pakistan and world coverage, 24/7.
Built with **Next.js 14 (App Router)**, **Tailwind CSS**, and **Decap CMS** —
deployable on Vercel's free tier.

---

## Features

- **Homepage** — red breaking-news ticker, hero story, latest news grid, section tabs (Pakistan, World, Sports, Tech, Business), more-to-read column, subscribe popup after 5s, social footer.
- **Article pages** — title, featured image, publish date, category tag, reading-time estimate, WhatsApp / Facebook / X / copy-link share buttons, related articles, full Open Graph + JSON-LD `NewsArticle` schema.
- **About** — mission, contact (`news@signal24.info`), Facebook, Instagram, X, Threads.
- **Category pages** — Pakistan, World, Sports, Tech, Business (statically generated).
- **Search** — query-based search across title, excerpt, body, author, tags.
- **Dark/light toggle** with system default, no flash of unstyled content.
- **RSS feed** at `/rss.xml`.
- **Sitemap + robots** generated at build time.
- **Decap CMS** at `/admin` — publish articles from the browser, no code required.
- **Inter** Google Font, brand color `#4B6EF5`.
- **Mobile-first** layouts (Pakistan is ~80% mobile traffic).
- **SEO + Open Graph** meta on every page, sitemap, web manifest.

---

## Quick start

```bash
# 1. Install
npm install

# 2. Develop
npm run dev
# → http://localhost:3000

# 3. Build for production
npm run build
npm run start
```

### Optional: local CMS preview

```bash
# In a second terminal, with the dev server already running:
npx decap-server
# Then visit http://localhost:3000/admin and uncomment `local_backend: true`
# in public/admin/config.yml.
```

---

## Project structure

```
content/articles/        # Markdown articles (front-matter + body)
public/admin/            # Decap CMS UI + config
public/uploads/          # Featured images uploaded via the CMS
src/app/                 # App Router routes
  page.tsx               # Homepage
  article/[slug]/        # Article detail (statically generated)
  category/[slug]/       # Category listing (statically generated)
  about/                 # About page
  search/                # Search page
  rss.xml/route.ts       # RSS feed
  sitemap.ts             # Sitemap generator
  robots.ts              # robots.txt
  manifest.ts            # PWA manifest
src/components/          # Header, Footer, BreakingTicker, HeroStory, ArticleCard,
                         # CategoryTabs, SubscribePopup, ShareButtons, ThemeToggle, SearchBar
src/lib/
  constants.ts           # Site config, categories, social links
  articles.ts            # Markdown loader, reading-time, related-articles
```

---

## Publishing an article

### From the CMS (recommended)

1. Deploy to Vercel and enable Git Gateway (Netlify Identity, or GitHub OAuth via Decap).
2. Open `https://signal24.info/admin` and sign in.
3. Click **New Article**, fill in title, excerpt, category, image, body, and **Publish**.
4. The site rebuilds automatically and the article goes live.

### From your editor

Create a file under `content/articles/your-slug.md`:

```markdown
---
title: "Headline goes here"
excerpt: "1–2 sentence summary."
category: pakistan            # pakistan | world | sports | tech | business
date: 2026-06-28T10:00:00.000Z
author: "Reporter Name"
image: "https://example.com/path/to/image.jpg"
imageAlt: "Description of the image"
featured: false                # set true for homepage hero
breaking: false                # set true for the red ticker
tags: [topic, place]
---

Body text in Markdown. Use **bold**, `code`, > blockquotes, headings, lists, etc.
```

---

## Deploying to Vercel (free tier)

1. Push this repo to GitHub.
2. Import the repo at [vercel.com/new](https://vercel.com/new).
3. Set the domain to `signal24.info` in Project → Domains.
4. (Optional) Add `NEXT_PUBLIC_SITE_URL` if you want to override `SITE.url`.

That's it. Decap CMS, RSS, sitemap, OG tags, and dark mode all work out of the box.

---

## Brand

- **Primary blue** `#4B6EF5`
- **White** `#FFFFFF`
- **Dark background** `#0F0F0F`
- **Breaking red** `#E53935`
- **Font** Inter (variable, loaded via `next/font/google`)
- **Contact** `news@signal24.info`

---

## License

© 2026 Signal 24. All rights reserved.
