import type { Metadata } from 'next';
import Link from 'next/link';
import { ArticleCard } from '@/components/ArticleCard';
import { getAllArticles } from '@/lib/articles';

export const metadata: Metadata = {
  title: 'Search',
  description: 'Search Signal 24 for news, analysis, and live coverage.',
  alternates: { canonical: '/search' },
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  const q = (searchParams.q ?? '').trim();
  const all = await getAllArticles();

  const results = q
    ? all.filter((a) => {
        const hay =
          `${a.title} ${a.excerpt} ${a.author} ${a.tags?.join(' ') ?? ''} ${a.body}`.toLowerCase();
        return q
          .toLowerCase()
          .split(/\s+/)
          .every((term) => hay.includes(term));
      })
    : [];

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <header className="mb-8">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand">Search</p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight md:text-4xl">
          {q ? <>Results for “{q}”</> : 'Search Signal 24'}
        </h1>
        <form
          action="/search"
          method="get"
          className="mt-5 flex max-w-xl gap-2"
          role="search"
        >
          <input
            name="q"
            defaultValue={q}
            type="search"
            placeholder="Search news, topics, authors…"
            className="flex-1 rounded-md border border-neutral-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/30 dark:border-neutral-800 dark:bg-neutral-900"
          />
          <button
            type="submit"
            className="rounded-md bg-brand px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-600"
          >
            Search
          </button>
        </form>
      </header>

      {!q ? (
        <p className="text-sm text-neutral-500">
          Enter a query above. Tip: try a topic, a place, or an author.
        </p>
      ) : results.length === 0 ? (
        <div className="rounded-lg border border-dashed border-neutral-300 p-10 text-center text-sm text-neutral-500 dark:border-neutral-700">
          No stories matched “{q}”. Try a broader term, or{' '}
          <Link href="/" className="text-brand underline">
            browse the homepage
          </Link>
          .
        </div>
      ) : (
        <>
          <p className="mb-5 text-sm text-neutral-500">
            {results.length} {results.length === 1 ? 'result' : 'results'}.
          </p>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((a) => (
              <ArticleCard key={a.slug} article={a} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
