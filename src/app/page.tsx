import { BreakingTicker } from '@/components/BreakingTicker';
import { HeroGrid } from '@/components/HeroGrid';
import { ArticleCard } from '@/components/ArticleCard';
import { CategorySection } from '@/components/CategorySection';
import { getAllArticles, getBreakingHeadlines, getTopStories } from '@/lib/articles';
import Link from 'next/link';
import { MORE_CATEGORIES, PRIMARY_CATEGORIES, SITE } from '@/lib/constants';

export const revalidate = 600;

export default async function HomePage() {
  const [all, breaking, top] = await Promise.all([
    getAllArticles(),
    getBreakingHeadlines(),
    getTopStories(3),
  ]);

  if (!top.length) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center">
        <h1 className="text-3xl font-bold">Welcome to {SITE.name}</h1>
        <p className="mt-4 text-neutral-600 dark:text-neutral-400">
          No stories published yet. Open{' '}
          <Link className="text-brand underline" href="/admin">
            /admin
          </Link>{' '}
          to publish your first article.
        </p>
      </div>
    );
  }

  const topSlugs = new Set(top.map((a) => a.slug));
  const latest = all.filter((a) => !topSlugs.has(a.slug)).slice(0, 8);

  return (
    <>
      <BreakingTicker items={breaking} />

      <div className="mx-auto max-w-7xl px-4 py-6 md:py-8">
        <section aria-labelledby="top-stories">
          <h2 id="top-stories" className="sr-only">
            Top stories
          </h2>
          <HeroGrid stories={top} />
        </section>

        {latest.length > 0 && (
          <section aria-labelledby="latest" className="mt-12">
            <div className="mb-5 flex items-end justify-between">
              <h2 id="latest" className="text-xl font-extrabold tracking-tight md:text-2xl">
                Latest news
              </h2>
              <Link href="/rss.xml" className="text-xs font-semibold text-brand hover:underline">
                RSS feed →
              </Link>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {latest.map((a) => (
                <ArticleCard key={a.slug} article={a} />
              ))}
            </div>
          </section>
        )}

        {PRIMARY_CATEGORIES.map((c) => (
          <CategorySection
            key={c.slug}
            category={c}
            articles={all.filter((a) => a.category === c.slug)}
          />
        ))}

        <section aria-labelledby="more-sections" className="mt-12 rounded-xl bg-neutral-50 p-5 md:p-6 dark:bg-neutral-900">
          <h2 id="more-sections" className="text-sm font-bold uppercase tracking-wider text-neutral-500">
            More sections
          </h2>
          <ul className="mt-3 flex flex-wrap gap-2">
            {MORE_CATEGORIES.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/category/${c.slug}`}
                  className="inline-block rounded-full border border-neutral-200 bg-white px-4 py-1.5 text-sm font-semibold text-neutral-800 transition hover:border-brand hover:text-brand dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100"
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}
