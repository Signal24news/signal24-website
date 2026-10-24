import { getAllArticles } from '@/lib/articles';
import { SITE } from '@/lib/constants';

// Built with the site. Every publish in the CMS triggers a new build, so this stays fresh.
export const dynamic = 'force-static';

/** Google News only reads stories from the last 2 days. */
const WINDOW_MS = 2 * 24 * 60 * 60 * 1000;

function esc(s: string) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export async function GET() {
  const now = Date.now();
  const articles = (await getAllArticles()).filter((a) => {
    const t = new Date(a.updated ?? a.date).getTime();
    return now - t <= WINDOW_MS && t <= now + 60 * 60 * 1000;
  });

  const items = articles
    .slice(0, 1000)
    .map(
      (a) => `  <url>
    <loc>${SITE.url}/article/${a.slug}</loc>
    <lastmod>${a.updated ?? a.date}</lastmod>
    <news:news>
      <news:publication>
        <news:name>${esc(SITE.name)}</news:name>
        <news:language>en</news:language>
      </news:publication>
      <news:publication_date>${a.date}</news:publication_date>
      <news:title>${esc(a.title)}</news:title>
    </news:news>
  </url>`,
    )
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${items}
</urlset>
`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=600',
    },
  });
}
