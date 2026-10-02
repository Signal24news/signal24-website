import Link from 'next/link';
import { ArticleCard } from './ArticleCard';
import type { Article } from '@/lib/types';

type Category = { slug: string; name: string; blurb: string };

/**
 * One homepage block per main section: the newest story as a large card,
 * and the next four as a compact list beside it.
 */
export function CategorySection({ category, articles }: { category: Category; articles: Article[] }) {
  const [lead, ...rest] = articles;
  const list = rest.slice(0, 4);
  const headingId = `section-${category.slug}`;

  return (
    <section aria-labelledby={headingId} className="mt-12">
      <div className="mb-5 flex items-end justify-between gap-4 border-b-2 border-neutral-200 dark:border-neutral-800">
        <div className="-mb-0.5 border-b-2 border-brand pb-2">
          <h2 id={headingId} className="text-xl font-extrabold tracking-tight md:text-2xl">
            <Link href={`/category/${category.slug}`} className="hover:text-brand">
              {category.name}
            </Link>
          </h2>
          <p className="mt-0.5 hidden text-sm text-neutral-500 sm:block dark:text-neutral-400">
            {category.blurb}
          </p>
        </div>
        <Link
          href={`/category/${category.slug}`}
          className="mb-2 shrink-0 text-xs font-semibold text-brand hover:underline"
        >
          See all →
        </Link>
      </div>

      {!lead ? (
        <p className="rounded-lg border border-dashed border-neutral-300 px-6 py-8 text-center text-sm text-neutral-500 dark:border-neutral-700">
          New {category.name} stories are on the way.
        </p>
      ) : (
        <div className={`grid gap-6 ${list.length ? 'lg:grid-cols-2' : ''}`}>
          <div className={list.length ? '' : 'max-w-xl'}>
            <ArticleCard article={lead} />
          </div>
          {list.length > 0 && (
            <div className="flex flex-col">
              {list.map((a) => (
                <ArticleCard key={a.slug} article={a} variant="list" />
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  );
}
