import Link from 'next/link';
import { BreakingTicker } from '@/components/BreakingTicker';
import { HomeHero } from '@/components/HomeHero';
import { EditorsPicks, ExplainBand, HomeSection } from '@/components/HomeSection';
import { NewsletterBox } from '@/components/NewsletterBox';
import { getAllArticles, getTickerItems, getTopStories } from '@/lib/articles';
import { CATEGORIES, SITE, type CategorySlug } from '@/lib/constants';
import type { Article } from '@/lib/types';

export const revalidate = 600;

/** Homepage sections, top to bottom. A section only shows once it has a story that is not already above it. */
const SECTIONS: { slug: CategorySlug; variant: 'feature' | 'grid'; picks?: boolean }[] = [
  { slug: 'world', variant: 'grid' },
  { slug: 'middle-east', variant: 'feature', picks: true },
  { slug: 'business', variant: 'feature' },
  { slug: 'ai-tech', variant: 'grid' },
  { slug: 'sports', variant: 'grid' },
];

export default async function HomePage() {
  const [all, ticker, top] = await Promise.all([getAllArticles(), getTickerItems(), getTopStories(3)]);

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

  const [lead, ...side] = top;
  const used = new Set(top.map((a) => a.slug));
  const fresh = (list: Article[]) => list.filter((a) => !used.has(a.slug));
  const take = (list: Article[]) => {
    list.forEach((a) => used.add(a.slug));
    return list;
  };

  // "Latest" rail: newest stories that are not already in the top grid.
  const latestRail = fresh(all).slice(0, 6);

  // Editor's picks: featured stories that are not already in the top grid.
  const picks = fresh(all.filter((a) => a.featured)).slice(0, 5);

  const sections = SECTIONS.map((s) => {
    const category = CATEGORIES.find((c) => c.slug === s.slug)!;
    const max = s.variant === 'grid' ? 4 : 5;
    const stories = take(fresh(all.filter((a) => a.category === s.slug)).slice(0, max));
    return { ...s, category, stories };
  });

  const explained = take(
    fresh(all.filter((a) => a.category === 'explainers' || a.category === 'fact-check')).slice(0, 3),
  );

  return (
    <>
      <BreakingTicker items={ticker.items} isBreaking={ticker.isBreaking} />

      <div className="mx-auto max-w-7xl px-4 pt-6 md:pt-8">
        <HomeHero lead={lead} side={side} latest={latestRail} />

        {sections.map((s) =>
          s.stories.length === 0 ? null : (
            <HomeSection
              key={s.slug}
              category={s.category}
              articles={s.stories}
              variant={s.variant}
              aside={s.picks && picks.length > 0 ? <EditorsPicks articles={picks} /> : undefined}
            />
          ),
        )}
      </div>

      {explained.length > 0 && <ExplainBand articles={explained} />}

      <div className="mx-auto max-w-7xl px-4">
        <NewsletterBox />
      </div>
    </>
  );
}
