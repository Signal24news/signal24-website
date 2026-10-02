import Link from 'next/link';
import Image from 'next/image';
import type { Article } from '@/lib/types';
import { TimeAgo } from './TimeAgo';
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

  // One story: full width banner.
  if (side.length === 0) {
    return (
      <div className="lg:h-[460px]">
        <Tile article={lead} size="lead" />
      </div>
    );
  }

  // Two stories: two equal halves, so neither looks squeezed.
  if (side.length === 1) {
    return (
      <div className="grid gap-3 md:grid-cols-2 lg:h-[420px]">
        <Tile article={lead} size="half" />
        <Tile article={side[0]} size="half" />
      </div>
    );
  }

  // Three stories: lead on the left, two landscape stories stacked on the right.
  return (
    <div className="grid gap-3 lg:h-[460px] lg:grid-cols-2">
      <Tile article={lead} size="lead" />
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 lg:grid-rows-2">
        {side.slice(0, 2).map((a) => (
          <Tile key={a.slug} article={a} size="side" />
        ))}
      </div>
    </div>
  );
}

function Tile({ article, size }: { article: Article; size: 'lead' | 'half' | 'side' }) {
  const lead = size === 'lead';
  const big = size !== 'side';

  return (
    <article className="group relative h-full overflow-hidden rounded-xl bg-[#0E1733]">
      <Link
        href={`/article/${article.slug}`}
        className={`relative block h-full ${
          big ? 'aspect-[16/10] lg:aspect-auto' : 'aspect-[16/9] lg:aspect-auto'
        }`}
      >
        <Image
          src={article.image}
          alt={article.imageAlt ?? article.title}
          fill
          sizes={big ? '(min-width: 768px) 50vw, 100vw' : '(min-width: 1024px) 50vw, (min-width: 640px) 50vw, 100vw'}
          className="object-cover transition duration-500 group-hover:scale-[1.03]"
          priority={big}
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

        <div className={`absolute inset-x-0 bottom-0 ${big ? 'p-5 md:p-7' : 'p-4 md:p-5'}`}>
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

          {big ? (
            <h1 className={`clamp-3 font-extrabold leading-tight tracking-tight text-white drop-shadow-sm ${lead ? 'text-2xl md:text-[1.9rem]' : 'text-xl md:text-2xl'}`}>
              <span className="bg-gradient-to-r from-white to-white bg-[length:0%_2px] bg-left-bottom bg-no-repeat transition-[background-size] duration-300 group-hover:bg-[length:100%_2px]">
                {article.title}
              </span>
            </h1>
          ) : (
            <h2 className="clamp-2 text-base font-bold leading-snug text-white drop-shadow-sm md:text-lg">
              <span className="bg-gradient-to-r from-white to-white bg-[length:0%_2px] bg-left-bottom bg-no-repeat transition-[background-size] duration-300 group-hover:bg-[length:100%_2px]">
                {article.title}
              </span>
            </h2>
          )}

          {big && (
            <div className="hidden xl:block">
              {article.signal?.whyItMatters ? (
                <p className="clamp-2 mt-2.5 max-w-2xl text-[15px] leading-relaxed text-white/85">
                  <span className="mr-1.5 font-bold uppercase tracking-wider text-brand-300 text-[11px]">Why it matters</span>
                  {article.signal.whyItMatters}
                </p>
              ) : (
                <p className="clamp-2 mt-2.5 max-w-2xl text-[15px] leading-relaxed text-white/80">{article.excerpt}</p>
              )}
            </div>
          )}

          <div className="mt-2.5 flex flex-wrap items-center gap-2 text-[11px] text-white/75 md:text-xs">
            {big && (
              <>
                <span className="font-semibold text-white">{article.author}</span>
                <span aria-hidden>·</span>
              </>
            )}
            <TimeAgo date={article.date} />
            {big && (
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
