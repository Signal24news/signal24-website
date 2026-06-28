import Link from 'next/link';
import Image from 'next/image';
import type { Article } from '@/lib/types';
import { formatDate } from '@/lib/format';
import { CATEGORIES } from '@/lib/constants';

export function HeroStory({ article }: { article: Article }) {
  const cat = CATEGORIES.find((c) => c.slug === article.category)?.name ?? article.category;

  return (
    <article className="group relative overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition hover:shadow-lg dark:border-neutral-800 dark:bg-neutral-900">
      <Link href={`/article/${article.slug}`} className="grid md:grid-cols-2">
        <div className="relative aspect-[16/10] md:aspect-auto md:h-full">
          <Image
            src={article.image}
            alt={article.imageAlt ?? article.title}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover transition duration-500 group-hover:scale-[1.03]"
            priority
          />
          <div className="absolute left-4 top-4 inline-flex items-center gap-2">
            <span className="rounded bg-brand px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-white">
              {cat}
            </span>
            {article.breaking && (
              <span className="rounded bg-breaking px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-white">
                Breaking
              </span>
            )}
          </div>
        </div>
        <div className="flex flex-col justify-center gap-4 p-6 md:p-10">
          <h1 className="text-2xl font-extrabold leading-tight tracking-tight text-neutral-900 group-hover:text-brand md:text-4xl dark:text-white">
            {article.title}
          </h1>
          <p className="clamp-3 text-base text-neutral-600 md:text-lg dark:text-neutral-300">
            {article.excerpt}
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-neutral-500 dark:text-neutral-400">
            <span className="font-medium text-neutral-700 dark:text-neutral-200">{article.author}</span>
            <span aria-hidden>·</span>
            <time dateTime={article.date}>{formatDate(article.date)}</time>
            <span aria-hidden>·</span>
            <span>{article.readingTime}</span>
          </div>
        </div>
      </Link>
    </article>
  );
}
