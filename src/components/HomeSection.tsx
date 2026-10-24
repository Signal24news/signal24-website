import Link from 'next/link';
import Image from 'next/image';
import type { Article } from '@/lib/types';
import { Byline, Kicker } from './HomeHero';

type Category = { slug: string; name: string };

export function SectionHeading({
  id,
  title,
  href,
  linkLabel,
  dark = false,
}: {
  id: string;
  title: string;
  href?: string;
  linkLabel?: string;
  dark?: boolean;
}) {
  return (
    <div
      className={`mb-5 flex items-baseline justify-between gap-4 border-b-[3px] pb-2.5 ${
        dark ? 'border-white/20' : 'border-[#0E1733] dark:border-brand-300'
      }`}
    >
      <h2 id={id} className="text-2xl font-black tracking-tight md:text-[1.65rem]">
        {href ? (
          <Link href={href} className={dark ? 'hover:text-brand-200' : 'hover:text-brand-600 dark:hover:text-brand-300'}>
            {title}
          </Link>
        ) : (
          title
        )}
      </h2>
      {href && (
        <Link
          href={href}
          className={`shrink-0 text-sm font-bold hover:underline ${dark ? 'text-white' : 'text-brand-600 dark:text-brand-300'}`}
        >
          {linkLabel ?? 'More'} →
        </Link>
      )}
    </div>
  );
}

function Thumb({ article, sizes, className = '' }: { article: Article; sizes: string; className?: string }) {
  return (
    <div className={`relative overflow-hidden rounded bg-neutral-100 dark:bg-neutral-800 ${className}`}>
      <Image
        src={article.image}
        alt={article.imageAlt ?? article.title}
        fill
        sizes={sizes}
        className="object-cover transition duration-500 group-hover:scale-[1.03]"
      />
    </div>
  );
}

/** Card with picture on top, used in grid rows. */
export function StoryCard({ article, dark = false }: { article: Article; dark?: boolean }) {
  return (
    <article className="group">
      <Link href={`/article/${article.slug}`} className="block">
        <Thumb article={article} sizes="(min-width: 1024px) 300px, (min-width: 640px) 50vw, 100vw" className="aspect-[16/10]" />
        {!dark && <Kicker article={article} className="mt-3" />}
        <h3
          className={`mt-1.5 text-[17px] font-extrabold leading-snug ${
            dark
              ? 'mt-3 text-white group-hover:text-brand-200'
              : 'text-neutral-950 group-hover:text-brand-600 dark:text-white dark:group-hover:text-brand-300'
          }`}
        >
          {article.title}
        </h3>
      </Link>
      {!dark && <Byline article={article} className="mt-2" />}
    </article>
  );
}

/** Headline with a small picture on the left, used in lists. */
export function StoryRow({ article }: { article: Article }) {
  return (
    <Link
      href={`/article/${article.slug}`}
      className="group flex gap-4 border-b border-neutral-200 py-3.5 last:border-0 dark:border-neutral-800"
    >
      <Thumb article={article} sizes="112px" className="h-[68px] w-[104px] shrink-0" />
      <div className="min-w-0">
        <h3 className="clamp-3 text-[15px] font-bold leading-snug text-neutral-900 group-hover:text-brand-600 dark:text-neutral-100 dark:group-hover:text-brand-300">
          {article.title}
        </h3>
        <Byline article={article} className="mt-1 text-xs" />
      </div>
    </Link>
  );
}

/**
 * A homepage block for one section.
 * - "feature": one big story with a list of headlines beside it
 * - "grid": a row of up to four cards
 */
export function HomeSection({
  category,
  articles,
  variant,
  aside,
}: {
  category: Category;
  articles: Article[];
  variant: 'feature' | 'grid';
  aside?: React.ReactNode;
}) {
  const id = `section-${category.slug}`;
  const href = `/category/${category.slug}`;

  if (variant === 'grid') {
    return (
      <section aria-labelledby={id} className="border-b border-neutral-200 py-9 dark:border-neutral-800">
        <SectionHeading id={id} title={category.name} href={href} linkLabel={`More ${category.name}`} />
        <div
          className={`grid gap-x-6 sm:grid-cols-2 sm:gap-y-6 ${
            articles.length >= 4 ? 'lg:grid-cols-4' : articles.length === 3 ? 'lg:grid-cols-3' : ''
          }`}
        >
          {articles.slice(0, 4).map((a, i) =>
            i === 0 ? (
              <div key={a.slug} className="pb-2 sm:pb-0">
                <StoryCard article={a} />
              </div>
            ) : (
              <div key={a.slug}>
                {/* Phones: compact row, so the page does not get too long */}
                <div className="sm:hidden">
                  <StoryRow article={a} />
                </div>
                <div className="hidden sm:block">
                  <StoryCard article={a} />
                </div>
              </div>
            ),
          )}
        </div>
      </section>
    );
  }

  const [lead, ...rest] = articles;
  const list = rest.slice(0, 4);

  return (
    <section className="grid gap-9 border-b border-neutral-200 py-9 lg:grid-cols-12 dark:border-neutral-800">
      <div className={aside ? 'lg:col-span-8' : 'lg:col-span-12'} aria-labelledby={id} role="region">
        <SectionHeading id={id} title={category.name} href={href} linkLabel={`More ${category.name}`} />
        <div className={`grid gap-6 ${list.length ? 'md:grid-cols-5' : ''}`}>
          <article className={`group ${list.length ? 'md:col-span-3' : 'max-w-3xl'}`}>
            <Link href={`/article/${lead.slug}`} className="block">
              <Thumb article={lead} sizes="(min-width: 1024px) 500px, 100vw" className="aspect-[16/9]" />
              <h3 className="mt-3 text-2xl font-extrabold leading-tight tracking-tight text-neutral-950 group-hover:text-brand-600 dark:text-white dark:group-hover:text-brand-300">
                {lead.title}
              </h3>
            </Link>
            <p className="clamp-3 mt-2 text-[15px] leading-relaxed text-neutral-600 dark:text-neutral-300">{lead.excerpt}</p>
            <Byline article={lead} className="mt-2" />
          </article>
          {list.length > 0 && (
            <div className="md:col-span-2">
              {list.map((a) => (
                <StoryRow key={a.slug} article={a} />
              ))}
            </div>
          )}
        </div>
      </div>
      {aside && <div className="lg:col-span-4">{aside}</div>}
    </section>
  );
}

/** Numbered list of stories the editor wants to push (the "Featured on homepage" switch). */
export function EditorsPicks({ articles }: { articles: Article[] }) {
  return (
    <aside aria-labelledby="editors-picks">
      <h2
        id="editors-picks"
        className="border-b-[3px] border-[#0E1733] pb-2.5 text-[15px] font-black uppercase tracking-[0.06em] dark:border-brand-300"
      >
        Editor&apos;s picks
      </h2>
      <ol>
        {articles.map((a, i) => (
          <li key={a.slug} className="border-b border-neutral-200 dark:border-neutral-800">
            <Link href={`/article/${a.slug}`} className="group flex items-start gap-4 py-4">
              <span className="w-7 shrink-0 text-[2rem] font-black leading-none text-brand" aria-hidden>
                {i + 1}
              </span>
              <span className="text-[15px] font-bold leading-snug text-neutral-900 group-hover:text-brand-600 dark:text-neutral-100 dark:group-hover:text-brand-300">
                {a.title}
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </aside>
  );
}

/** Dark navy band for Explainers and Fact Check stories. */
export function ExplainBand({ articles }: { articles: Article[] }) {
  return (
    <section aria-labelledby="explained" className="mt-4 bg-[#0E1733] text-white">
      <div className="mx-auto max-w-7xl px-4 py-11">
        <p className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-brand-200">Signal Box</p>
        <SectionHeading id="explained" title="Explained and fact-checked" href="/category/explainers" linkLabel="All explainers" dark />
        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {articles.slice(0, 3).map((a) => (
            <div key={a.slug}>
              <p className="mb-2 text-[11px] font-extrabold uppercase tracking-[0.1em] text-brand-200">
                {a.category === 'fact-check' ? 'Fact check' : 'Explainer'}
              </p>
              <StoryCard article={a} dark />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
