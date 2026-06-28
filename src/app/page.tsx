import { BreakingTicker } from '@/components/BreakingTicker';
import { HeroStory } from '@/components/HeroStory';
import { ArticleCard } from '@/components/ArticleCard';
import { CategoryTabs } from '@/components/CategoryTabs';
import {
  getAllArticles,
  getBreakingHeadlines,
  getFeaturedArticle,
} from '@/lib/articles';
import Link from 'next/link';
import { SITE } from '@/lib/constants';

export const revalidate = 600;

export default async function HomePage() {
  const [all, breaking, featured] = await Promise.all([
    getAllArticles(),
    getBreakingHeadlines(),
    getFeaturedArticle(),
  ]);

  const rest = featured ? all.filter((a) => a.slug !== featured.slug) : all;
  const latest = rest.slice(0, 8);
  const secondary = rest.slice(8, 14);

  if (!featured) {
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

  return (
    <>
      <BreakingTicker items={breaking} />

      <div className="mx-auto max-w-7xl px-4 py-6 md:py-10">
        <section aria-labelledby="top-story">
          <h2 id="top-story" className="sr-only">
            Top story
          </h2>
          <HeroStory article={featured} />
        </section>

        <section aria-labelledby="latest" className="mt-10">
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

        <CategoryTabs articles={all} />

        {secondary.length > 0 && (
          <section aria-labelledby="more" className="mt-12">
            <h2 id="more" className="mb-5 text-xl font-extrabold tracking-tight md:text-2xl">
              More to read
            </h2>
            <div className="grid gap-x-8 md:grid-cols-2 lg:grid-cols-3">
              {secondary.map((a) => (
                <ArticleCard key={a.slug} article={a} variant="list" />
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
