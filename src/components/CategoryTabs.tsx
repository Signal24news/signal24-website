'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ArticleCard } from './ArticleCard';
import { CATEGORIES, type CategorySlug } from '@/lib/constants';
import type { Article } from '@/lib/types';

export function CategoryTabs({ articles }: { articles: Article[] }) {
  const [active, setActive] = useState<CategorySlug | 'all'>('all');

  const filtered =
    active === 'all'
      ? articles.slice(0, 8)
      : articles.filter((a) => a.category === active).slice(0, 8);

  return (
    <section aria-labelledby="by-section" className="mt-10">
      <div className="mb-5 flex items-end justify-between gap-3">
        <h2 id="by-section" className="text-xl font-extrabold tracking-tight md:text-2xl">
          By section
        </h2>
        <div className="no-scrollbar -mx-1 flex max-w-full gap-1 overflow-x-auto px-1">
          <TabButton active={active === 'all'} onClick={() => setActive('all')}>
            All
          </TabButton>
          {CATEGORIES.map((c) => (
            <TabButton
              key={c.slug}
              active={active === c.slug}
              onClick={() => setActive(c.slug)}
            >
              {c.name}
            </TabButton>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="rounded-lg border border-dashed border-neutral-300 p-8 text-center text-sm text-neutral-500 dark:border-neutral-700">
          No articles in this section yet.
        </p>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {filtered.map((a) => (
            <ArticleCard key={a.slug} article={a} variant="compact" />
          ))}
        </div>
      )}

      {active !== 'all' && (
        <div className="mt-6 text-center">
          <Link
            href={`/category/${active}`}
            className="inline-flex items-center gap-1 text-sm font-semibold text-brand hover:underline"
          >
            See all {CATEGORIES.find((c) => c.slug === active)?.name} →
          </Link>
        </div>
      )}
    </section>
  );
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`whitespace-nowrap rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${
        active
          ? 'bg-brand text-white'
          : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700'
      }`}
    >
      {children}
    </button>
  );
}
