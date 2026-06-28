import Link from 'next/link';
import Image from 'next/image';
import type { Article } from '@/lib/types';
import { formatDate } from '@/lib/format';
import { CATEGORIES } from '@/lib/constants';

type Variant = 'default' | 'compact' | 'list';

export function ArticleCard({ article, variant = 'default' }: { article: Article; variant?: Variant }) {
  const cat = CATEGORIES.find((c) => c.slug === article.category)?.name ?? article.category;

  if (variant === 'list') {
    return (
      <Link
        href={`/article/${article.slug}`}
        className="group flex gap-3 border-b border-neutral-200 py-3 last:border-0 dark:border-neutral-800"
      >
        <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-md">
          <Image
            src={article.image}
            alt={article.imageAlt ?? article.title}
            fill
            sizes="120px"
            className="object-cover transition group-hover:scale-105"
          />
        </div>
        <div className="min-w-0 flex-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-brand">{cat}</span>
          <h3 className="clamp-2 mt-0.5 text-sm font-semibold leading-snug text-neutral-900 group-hover:text-brand dark:text-white">
            {article.title}
          </h3>
          <p className="mt-1 text-[11px] text-neutral-500">{formatDate(article.date)}</p>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/article/${article.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-100 dark:bg-neutral-800">
        <Image
          src={article.image}
          alt={article.imageAlt ?? article.title}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded bg-brand px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
          {cat}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="clamp-3 text-base font-bold leading-snug text-neutral-900 group-hover:text-brand md:text-lg dark:text-white">
          {article.title}
        </h3>
        {variant !== 'compact' && (
          <p className="clamp-2 text-sm text-neutral-600 dark:text-neutral-400">{article.excerpt}</p>
        )}
        <div className="mt-auto flex items-center gap-2 pt-2 text-[11px] text-neutral-500 dark:text-neutral-400">
          <time dateTime={article.date}>{formatDate(article.date)}</time>
          <span aria-hidden>·</span>
          <span>{article.readingTime}</span>
        </div>
      </div>
    </Link>
  );
}
