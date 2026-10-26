import type { MetadataRoute } from 'next';
import { getAllArticles } from '@/lib/articles';
import { CATEGORIES, SITE } from '@/lib/constants';
import { getAuthors } from '@/lib/authors';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = await getAllArticles();
  const lastOf = (a: { date: string; updated?: string }) => new Date(a.updated ?? a.date);
  // The homepage and section pages change when a story is published, so use the newest story's date.
  const newest = articles.length
    ? new Date(Math.max(...articles.map((a) => lastOf(a).getTime())))
    : undefined;
  const newestIn = (slug: string) => {
    const list = articles.filter((a) => a.category === slug);
    return list.length ? new Date(Math.max(...list.map((a) => lastOf(a).getTime()))) : undefined;
  };

  const staticUrls: MetadataRoute.Sitemap = [
    { url: SITE.url, lastModified: newest, changeFrequency: 'hourly', priority: 1 },
    { url: `${SITE.url}/about`, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${SITE.url}/team`, changeFrequency: 'weekly', priority: 0.6 },
    { url: `${SITE.url}/tip`, changeFrequency: 'yearly', priority: 0.4 },
    { url: `${SITE.url}/contact`, changeFrequency: 'monthly', priority: 0.4 },
    { url: `${SITE.url}/editorial-policy`, changeFrequency: 'monthly', priority: 0.4 },
    { url: `${SITE.url}/corrections`, changeFrequency: 'monthly', priority: 0.3 },
    { url: `${SITE.url}/privacy-policy`, changeFrequency: 'yearly', priority: 0.2 },
    { url: `${SITE.url}/terms`, changeFrequency: 'yearly', priority: 0.2 },
    { url: `${SITE.url}/internship`, changeFrequency: 'weekly', priority: 0.6 },
    ...getAuthors().map((a) => {
      const theirs = articles.filter((x) => x.author.trim().toLowerCase() === a.name.toLowerCase());
      return {
        url: `${SITE.url}/author/${a.slug}`,
        lastModified: theirs.length ? lastOf(theirs[0]) : undefined,
        changeFrequency: 'weekly' as const,
        priority: 0.5,
      };
    }),
  ];

  const categoryUrls: MetadataRoute.Sitemap = CATEGORIES.map((c) => ({
    url: `${SITE.url}/category/${c.slug}`,
    lastModified: newestIn(c.slug),
    changeFrequency: 'hourly',
    priority: 0.8,
  }));

  const articleUrls: MetadataRoute.Sitemap = articles.map((a) => ({
    url: `${SITE.url}/article/${a.slug}`,
    lastModified: lastOf(a),
    changeFrequency: 'weekly',
    priority: 0.7,
    images: [a.image.startsWith('http') ? a.image : `${SITE.url}${a.image}`],
  }));

  return [...staticUrls, ...categoryUrls, ...articleUrls];
}
