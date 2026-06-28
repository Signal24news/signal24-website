import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { ArticleCard } from '@/components/ArticleCard';
import { getArticlesByCategory } from '@/lib/articles';
import { CATEGORIES, type CategorySlug } from '@/lib/constants';

export const dynamicParams = false;

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const cat = CATEGORIES.find((c) => c.slug === params.slug);
  if (!cat) return {};
  return {
    title: `${cat.name} news`,
    description: `Latest ${cat.name} news, analysis, and live updates from Signal 24.`,
    alternates: { canonical: `/category/${cat.slug}` },
  };
}

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  const cat = CATEGORIES.find((c) => c.slug === params.slug);
  if (!cat) notFound();

  const articles = await getArticlesByCategory(cat.slug as CategorySlug);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <header className="mb-8 border-b border-neutral-200 pb-6 dark:border-neutral-800">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand">Section</p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight md:text-4xl">{cat.name}</h1>
        <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
          {articles.length} {articles.length === 1 ? 'story' : 'stories'} in {cat.name}.
        </p>
      </header>

      {articles.length === 0 ? (
        <p className="rounded-lg border border-dashed border-neutral-300 p-10 text-center text-sm text-neutral-500 dark:border-neutral-700">
          No stories in this section yet. Check back soon.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((a) => (
            <ArticleCard key={a.slug} article={a} />
          ))}
        </div>
      )}
    </div>
  );
}
