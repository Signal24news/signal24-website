import 'server-only';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkHtml from 'remark-html';
import remarkGfm from 'remark-gfm';
import readingTime from 'reading-time';
import type { CategorySlug } from './constants';
import type { Article } from './types';

export type { Article } from './types';
export { formatDate, formatDateTime } from './format';

const ARTICLES_DIR = path.join(process.cwd(), 'content', 'articles');

function ensureDir() {
  if (!fs.existsSync(ARTICLES_DIR)) {
    fs.mkdirSync(ARTICLES_DIR, { recursive: true });
  }
}

export function getArticleSlugs(): string[] {
  ensureDir();
  return fs
    .readdirSync(ARTICLES_DIR)
    .filter((f) => f.endsWith('.md'))
    .map((f) => f.replace(/\.md$/, ''));
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  ensureDir();
  const filePath = path.join(ARTICLES_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(raw);

  const processed = await remark().use(remarkGfm).use(remarkHtml).process(content);
  const html = processed.toString();
  const rt = readingTime(content);

  return {
    slug,
    title: data.title ?? 'Untitled',
    excerpt: data.excerpt ?? content.slice(0, 180).replace(/\s+/g, ' ').trim() + '…',
    category: (data.category ?? 'world') as CategorySlug,
    date: data.date ? new Date(data.date).toISOString() : new Date().toISOString(),
    author: data.author ?? 'Saad Ali',
    image: data.image ?? '/og-default.png',
    imageAlt: data.imageAlt ?? data.title,
    featured: Boolean(data.featured),
    breaking: Boolean(data.breaking),
    tags: data.tags ?? [],
    signal:
      data.signal && (data.signal.whatHappened || data.signal.whyItMatters || data.signal.whatsNext)
        ? {
            whatHappened: data.signal.whatHappened || undefined,
            whyItMatters: data.signal.whyItMatters || undefined,
            whatsNext: data.signal.whatsNext || undefined,
          }
        : undefined,
    body: html,
    readingTime: rt.text,
    readingMinutes: Math.max(1, Math.round(rt.minutes)),
  };
}

export async function getAllArticles(): Promise<Article[]> {
  const slugs = getArticleSlugs();
  const articles = await Promise.all(slugs.map((s) => getArticleBySlug(s)));
  return articles
    .filter((a): a is Article => a !== null)
    .sort((a, b) => +new Date(b.date) - +new Date(a.date));
}

export async function getArticlesByCategory(category: CategorySlug): Promise<Article[]> {
  const all = await getAllArticles();
  return all.filter((a) => a.category === category);
}

export async function getFeaturedArticle(): Promise<Article | null> {
  const all = await getAllArticles();
  return all.find((a) => a.featured) ?? all[0] ?? null;
}

/**
 * Stories for the homepage top grid. Featured stories come first (newest
 * first), then the latest stories fill any empty slots.
 */
export async function getTopStories(limit = 3): Promise<Article[]> {
  const all = await getAllArticles();
  const featured = all.filter((a) => a.featured);
  const picked = featured.slice(0, limit);
  for (const a of all) {
    if (picked.length >= limit) break;
    if (!picked.includes(a)) picked.push(a);
  }
  return picked;
}

/**
 * Headlines for the ticker. Real breaking stories get the red "Breaking"
 * label. When nothing is marked breaking, the newest stories run under a
 * neutral "Latest" label instead, so readers are never misled.
 */
export async function getTickerItems(): Promise<{ items: Article[]; isBreaking: boolean }> {
  const all = await getAllArticles();
  const breaking = all.filter((a) => a.breaking);
  return breaking.length
    ? { items: breaking, isBreaking: true }
    : { items: all.slice(0, 5), isBreaking: false };
}

export async function getBreakingHeadlines(): Promise<Article[]> {
  const all = await getAllArticles();
  const breaking = all.filter((a) => a.breaking);
  return breaking.length ? breaking : all.slice(0, 5);
}

export async function getRelatedArticles(article: Article, limit = 3): Promise<Article[]> {
  const all = await getAllArticles();
  return all
    .filter((a) => a.slug !== article.slug && a.category === article.category)
    .slice(0, limit);
}

export async function getArticlesByAuthorName(name: string): Promise<Article[]> {
  const all = await getAllArticles();
  const n = name.toLowerCase();
  return all.filter((a) => a.author.toLowerCase().startsWith(n));
}
