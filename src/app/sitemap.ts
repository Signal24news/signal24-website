import type { MetadataRoute } from 'next';
import { getAllArticles } from '@/lib/articles';
import { AUTHORS, CATEGORIES, SITE } from '@/lib/constants';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = await getAllArticles();
  const now = new Date();

  const staticUrls: MetadataRoute.Sitemap = [
    { url: SITE.url, lastModified: now, changeFrequency: 'hourly', priority: 1 },
    { url: `${SITE.url}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${SITE.url}/contact`, lastModified: now, changeFrequency: 'monthly', priority: 0.4 },
    { url: `${SITE.url}/editorial-policy`, lastModified: now, changeFrequency: 'monthly', priority: 0.4 },
    { url: `${SITE.url}/corrections`, lastModified: now, changeFrequency: 'monthly', priority: 0.3 },
    { url: `${SITE.url}/privacy-policy`, lastModified: now, changeFrequency: 'yearly', priority: 0.2 },
    { url: `${SITE.url}/terms`, lastModified: now, changeFrequency: 'yearly', priority: 0.2 },
    ...AUTHORS.map((a) => ({
      url: `${SITE.url}/author/${a.slug}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.5,
    })),
  ];

  const categoryUrls: MetadataRoute.Sitemap = CATEGORIES.map((c) => ({
    url: `${SITE.url}/category/${c.slug}`,
    lastModified: now,
    changeFrequency: 'hourly',
    priority: 0.8,
  }));

  const articleUrls: MetadataRoute.Sitemap = articles.map((a) => ({
    url: `${SITE.url}/article/${a.slug}`,
    lastModified: new Date(a.date),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  return [...staticUrls, ...categoryUrls, ...articleUrls];
}
