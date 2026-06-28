import RSS from 'rss';
import { getAllArticles } from '@/lib/articles';
import { SITE, CATEGORIES } from '@/lib/constants';

export const revalidate = 600;

export async function GET() {
  const feed = new RSS({
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
    site_url: SITE.url,
    feed_url: `${SITE.url}/rss.xml`,
    language: 'en',
    pubDate: new Date().toUTCString(),
    ttl: 60,
    image_url: `${SITE.url}/icon.png`,
    custom_namespaces: { content: 'http://purl.org/rss/1.0/modules/content/' },
  });

  const articles = await getAllArticles();

  for (const a of articles) {
    const catName = CATEGORIES.find((c) => c.slug === a.category)?.name ?? a.category;
    feed.item({
      title: a.title,
      description: a.excerpt,
      url: `${SITE.url}/article/${a.slug}`,
      guid: a.slug,
      categories: [catName],
      author: a.author,
      date: new Date(a.date),
      enclosure: a.image
        ? { url: a.image.startsWith('http') ? a.image : `${SITE.url}${a.image}` }
        : undefined,
      custom_elements: [{ 'content:encoded': { _cdata: a.body } }],
    });
  }

  return new Response(feed.xml({ indent: true }), {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=600, stale-while-revalidate=86400',
    },
  });
}
