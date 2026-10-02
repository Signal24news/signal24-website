import Link from 'next/link';
import Image from 'next/image';
import type { Article } from '@/lib/types';
import { formatDate } from '@/lib/format';
import { CATEGORIES } from '@/lib/constants';

function categoryName(slug: string) {
  return CATEGORIES.find((c) => c.slug === slug)?.name ?? slug;
}

/**
 * Homepage top grid: one big lead story on the left, two landscape stories
 * stacked on the right. Falls back cleanly when there are fewer than 3 stories.
 */
export function HeroGrid({ stories }: { stories: Article[] }) {
  const [lead, ...side] = stories;
  if (!lead) return null;
  const hasSide = side.length > 0;

  return (
    <div className={`grid gap-3 ${hasSide ? 'lg:grid-cols-12' : ''}`}>
      <div className={hasSide ? 'h-full lg:col-span-7' : ''}>
        <Tile article={lead} size="lead" />
      </div>

      {hasSide && (
        <div className="grid gap-3 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1 lg:grid-rows-2">
          {side.map((a) => (
            <div key={a.slug} className={`h-full ${side.length === 1 ? 'sm:col-span-2 lg:row-span-2' : ''}`}>
              <Tile article={a} size="side" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function Tile({ article, size }: { article: Article; size: 'lead' | 'side' }) {
  const lead = size === 'lead';

  return (
    <article className="group relative h-full overflow-hidden rounded-xl bg-[#0E1733]">
      <Link
        href={`/article/${article.slug}`}
        className={`relative block h-full ${
          lead ? 'aspect-[4/3] sm:aspect-[16/10] lg:aspect-auto lg:min-h-[520px]' : 'aspect-[16/9] lg:aspect-auto lg:min-h-[254px]'
        }`}
      >
        <Image
          src={article.image}
          alt={article.imageAlt ?? article.title}
          fill
          sizes={lead ? '(min-width: 1024px) 58vw, 100vw' : '(min-width: 1024px) 42vw, (min-width: 640px) 50vw, 100vw'}
          className="object-cover transition duration-500 group-hover:scale-[1.03]"
          priority={lead}
        />
        {/* Navy fade so white text stays readable on any photo or graphic */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to top, #0E1733 0%, rgba(14,23,51,0.92) 30%, rgba(14,23,51,0.55) 55%, rgba(14,23,51,0) 80%)',
          }}
        />

        <div className={`absolute inset-x-0 bottom-0 ${lead ? 'p-5 md:p-8' : 'p-4 md:p-5'}`}>
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <span className="rounded bg-brand px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white md:text-[11px]">
              {categoryName(article.category)}
            </span>
            {article.breaking && (
              <span className="rounded bg-breaking px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white md:text-[11px]">
                Breaking
              </span>
            )}
          </div>

          {lead ? (
            <h1 className="text-2xl font-extrabold leading-tight tracking-tight text-white drop-shadow-sm md:text-4xl">
              <span className="bg-gradient-to-r from-white to-white bg-[length:0%_2px] bg-left-bottom bg-no-repeat transition-[background-size] duration-300 group-hover:bg-[length:100%_2px]">
                {article.title}
              </span>
            </h1>
          ) : (
            <h2 className="clamp-3 text-base font-bold leading-snug text-white drop-shadow-sm md:text-lg">
              <span className="bg-gradient-to-r from-white to-white bg-[length:0%_2px] bg-left-bottom bg-no-repeat transition-[background-size] duration-300 group-hover:bg-[length:100%_2px]">
                {article.title}
              </span>
            </h2>
          )}

          {lead && (
            <p className="clamp-2 mt-3 hidden max-w-2xl text-base text-white/85 sm:block">
              {article.excerpt}
            </p>
          )}

          <div className="mt-2.5 flex flex-wrap items-center gap-2 text-[11px] text-white/75 md:text-xs">
            {lead && (
              <>
                <span className="font-semibold text-white">{article.author}</span>
                <span aria-hidden>·</span>
              </>
            )}
            <time dateTime={article.date}>{formatDate(article.date)}</time>
            {lead && (
              <>
                <span aria-hidden>·</span>
                <span>{article.readingTime}</span>
              </>
            )}
          </div>
        </div>
      </Link>
    </article>
  );
}
