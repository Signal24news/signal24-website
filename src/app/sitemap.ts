import type { MetadataRoute } from 'next';
import { getAllArticles } from '@/lib/articles';
import { CATEGORIES, SITE } from '@/lib/constants';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = await getAllArticles();
  const now = new Date();

  const staticUrls: MetadataRoute.Sitemap = [
    { url: SITE.url, lastModified: now, changeFrequency: 'hourly', priority: 1 },
    { url: `${SITE.url}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${SITE.url}/search`, lastModified: now, changeFrequency: 'weekly', priority: 0.3 },
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
