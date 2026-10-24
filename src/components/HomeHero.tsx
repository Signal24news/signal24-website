import Link from "next/link";
import Image from "next/image";
import type { Article } from "@/lib/types";
import { TimeAgo } from "./TimeAgo";
import { CATEGORIES } from "@/lib/constants";

export function categoryName(slug: string) {
  return CATEGORIES.find((c) => c.slug === slug)?.name ?? slug;
}

/** Small uppercase section label above a headline. */
export function Kicker({
  article,
  className = "",
}: {
  article: Article;
  className?: string;
}) {
  return (
    <span
      className={`flex flex-wrap items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.1em] ${className}`}
    >
      {article.breaking && (
        <span className="rounded-sm bg-red-700 px-1.5 py-0.5 text-white">
          Breaking
        </span>
      )}
      <span className="text-brand-600 dark:text-brand-300">
        {categoryName(article.category)}
      </span>
    </span>
  );
}

export function Byline({
  article,
  className = "",
}: {
  article: Article;
  className?: string;
}) {
  return (
    <p
      className={`text-[13px] text-neutral-500 dark:text-neutral-400 ${className}`}
    >
      <span className="font-semibold text-neutral-700 dark:text-neutral-200">
        {article.author}
      </span>
      <span aria-hidden> · </span>
      <TimeAgo date={article.date} />
    </p>
  );
}

/**
 * Top of the homepage, in the style of big international news sites:
 * a large lead story, two stories stacked beside it and a "Latest" rail.
 */
export function HomeHero({
  lead,
  side,
  latest,
}: {
  lead: Article;
  side: Article[];
  latest: Article[];
}) {
  return (
    <section
      aria-labelledby="top-stories"
      className="border-b border-neutral-200 pb-8 dark:border-neutral-800"
    >
      <h2 id="top-stories" className="sr-only">
        Top stories
      </h2>
      <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-12">
        {/* Lead */}
        <article
          className={`group md:col-span-2 ${latest.length ? "lg:col-span-6" : "lg:col-span-8"}`}
        >
          <Link href={`/article/${lead.slug}`} className="block">
            <div className="relative aspect-[16/10] overflow-hidden rounded bg-neutral-100 dark:bg-neutral-800">
              <Image
                src={lead.image}
                alt={lead.imageAlt ?? lead.title}
                fill
                priority
                sizes="(min-width: 1024px) 640px, 100vw"
                className="object-cover transition duration-500 group-hover:scale-[1.02]"
              />
              <span className="absolute left-0 top-0 bg-brand-600 px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.1em] text-white">
                {categoryName(lead.category)}
              </span>
            </div>
            <h1 className="mt-4 text-[1.75rem] font-extrabold leading-[1.12] tracking-tight text-neutral-950 group-hover:text-brand-600 md:text-[2.25rem] dark:text-white dark:group-hover:text-brand-300">
              {lead.title}
            </h1>
          </Link>
          <p className="mt-3 text-[17px] leading-relaxed text-neutral-600 dark:text-neutral-300">
            {lead.excerpt}
          </p>
          {lead.signal?.whyItMatters && (
            <div className="mt-4 rounded-md bg-brand-50 px-4 py-3 dark:bg-brand-900/40">
              <p className="text-[11px] font-extrabold uppercase tracking-[0.12em] text-brand-700 dark:text-brand-300">
                Why it matters
              </p>
              <p className="mt-1 text-[15px] leading-relaxed text-neutral-900 dark:text-neutral-100">
                {lead.signal.whyItMatters}
              </p>
            </div>
          )}
          <Byline article={lead} className="mt-3" />
        </article>

        {/* Two stacked stories (picture beside the headline on phones) */}
        {side.length > 0 && (
          <div
            className={`flex flex-col gap-5 md:gap-6 ${latest.length ? "lg:col-span-3" : "md:col-span-2 md:grid md:grid-cols-2 lg:col-span-4 lg:flex"}`}
          >
            {side.map((a, i) => (
              <article
                key={a.slug}
                className={`group ${i < side.length - 1 ? "border-b border-neutral-200 pb-6 dark:border-neutral-800" : ""}`}
              >
                <Link
                  href={`/article/${a.slug}`}
                  className="flex flex-row-reverse gap-4 md:block"
                >
                  <div className="relative h-[84px] w-[120px] shrink-0 overflow-hidden rounded bg-neutral-100 md:aspect-[16/9] md:h-auto md:w-full dark:bg-neutral-800">
                    <Image
                      src={a.image}
                      alt={a.imageAlt ?? a.title}
                      fill
                      sizes="(min-width: 1024px) 300px, (min-width: 768px) 50vw, 100vw"
                      className="object-cover transition duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <Kicker article={a} className="md:mt-3" />
                    <h2 className="mt-1.5 text-base font-extrabold md:text-lg leading-snug text-neutral-950 group-hover:text-brand-600 dark:text-white dark:group-hover:text-brand-300">
                      {a.title}
                    </h2>
                  </div>
                </Link>
                <Byline article={a} className="mt-2" />
              </article>
            ))}
          </div>
        )}

        {/* Latest rail */}
        {latest.length > 0 && (
          <aside
            aria-labelledby="latest-rail"
            className={side.length > 0 ? "lg:col-span-3" : "lg:col-span-6"}
          >
            <div className="flex items-center gap-2.5 border-b-[3px] border-[#0E1733] pb-2.5 dark:border-brand-300">
              <span
                className="h-2.5 w-2.5 rounded-full bg-red-600"
                aria-hidden
              />
              <h2
                id="latest-rail"
                className="text-[15px] font-black uppercase tracking-[0.06em]"
              >
                Latest
              </h2>
            </div>
            <ol>
              {latest.map((a) => (
                <li
                  key={a.slug}
                  className="border-b border-neutral-200 dark:border-neutral-800"
                >
                  <Link
                    href={`/article/${a.slug}`}
                    className="group block py-3.5"
                  >
                    <span className="text-xs font-bold text-brand-600 dark:text-brand-300">
                      <TimeAgo date={a.date} />
                    </span>
                    <span className="mt-1 block text-[15px] font-bold leading-snug text-neutral-900 group-hover:text-brand-600 dark:text-neutral-100 dark:group-hover:text-brand-300">
                      {a.title}
                    </span>
                  </Link>
                </li>
              ))}
            </ol>
            <Link
              href="/search"
              className="mt-3 inline-block text-sm font-bold text-brand-600 hover:underline dark:text-brand-300"
            >
              All stories →
            </Link>
          </aside>
        )}
      </div>
    </section>
  );
}
