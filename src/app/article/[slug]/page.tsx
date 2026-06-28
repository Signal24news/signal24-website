import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import {
  getArticleBySlug,
  getArticleSlugs,
  getRelatedArticles,
} from '@/lib/articles';
import { formatDateTime } from '@/lib/format';
import { ArticleCard } from '@/components/ArticleCard';
import { ShareButtons } from '@/components/ShareButtons';
import { CATEGORIES, SITE } from '@/lib/constants';

export const dynamicParams = false;

export async function generateStaticParams() {
  return getArticleSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata(
  { params }: { params: { slug: string } },
): Promise<Metadata> {
  const article = await getArticleBySlug(params.slug);
  if (!article) return {};
  const url = `${SITE.url}/article/${article.slug}`;
  return {
    title: article.title,
    description: article.excerpt,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      url,
      title: article.title,
      description: article.excerpt,
      publishedTime: article.date,
      authors: [article.author],
      images: [{ url: article.image, width: 1200, height: 630, alt: article.imageAlt ?? article.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt,
      images: [article.image],
    },
  };
}

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const article = await getArticleBySlug(params.slug);
  if (!article) notFound();

  const related = await getRelatedArticles(article);
  const catName = CATEGORIES.find((c) => c.slug === article.category)?.name ?? article.category;
  const url = `${SITE.url}/article/${article.slug}`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: article.title,
    image: [article.image],
    datePublished: article.date,
    dateModified: article.date,
    author: [{ '@type': 'Person', name: article.author }],
    publisher: {
      '@type': 'Organization',
      name: SITE.name,
      logo: { '@type': 'ImageObject', url: `${SITE.url}/icon.png` },
    },
    mainEntityOfPage: url,
    description: article.excerpt,
    articleSection: catName,
  };

  return (
    <article className="pb-16">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className="mx-auto max-w-3xl px-4 pt-8 md:pt-12">
        <nav aria-label="Breadcrumb" className="mb-4 text-xs text-neutral-500">
          <Link href="/" className="hover:text-brand">
            Home
          </Link>{' '}
          <span aria-hidden>›</span>{' '}
          <Link href={`/category/${article.category}`} className="hover:text-brand">
            {catName}
          </Link>
        </nav>

        <div className="flex flex-wrap items-center gap-2 text-xs">
          <Link
            href={`/category/${article.category}`}
            className="rounded bg-brand px-2 py-1 text-[11px] font-bold uppercase tracking-wider text-white"
          >
            {catName}
          </Link>
          {article.breaking && (
            <span className="rounded bg-breaking px-2 py-1 text-[11px] font-bold uppercase tracking-wider text-white">
              Breaking
            </span>
          )}
        </div>

        <h1 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight md:text-5xl">
          {article.title}
        </h1>

        <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-300">{article.excerpt}</p>

        <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 border-y border-neutral-200 py-4 text-sm dark:border-neutral-800">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-brand/10 text-sm font-bold text-brand">
              {article.author
                .split(' ')
                .map((n) => n[0])
                .join('')
                .slice(0, 2)
                .toUpperCase()}
            </span>
            <div>
              <p className="font-semibold leading-tight">{article.author}</p>
              <p className="text-xs text-neutral-500">
                <time dateTime={article.date}>{formatDateTime(article.date)}</time>
                <span aria-hidden> · </span>
                {article.readingTime}
              </p>
            </div>
          </div>
          <div className="ml-auto">
            <ShareButtons url={url} title={article.title} />
          </div>
        </div>
      </header>

      <figure className="mx-auto mt-8 max-w-5xl px-4">
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl bg-neutral-100 dark:bg-neutral-900">
          <Image
            src={article.image}
            alt={article.imageAlt ?? article.title}
            fill
            sizes="(min-width: 1024px) 1024px, 100vw"
            className="object-cover"
            priority
          />
        </div>
        {article.imageAlt && (
          <figcaption className="mt-2 text-center text-xs text-neutral-500">
            {article.imageAlt}
          </figcaption>
        )}
      </figure>

      <div className="mx-auto mt-10 max-w-3xl px-4">
        <div
          className="prose-article"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: article.body }}
        />

        {article.tags && article.tags.length > 0 && (
          <div className="mt-10 flex flex-wrap gap-2">
            {article.tags.map((t) => (
              <span
                key={t}
                className="rounded-full bg-neutral-100 px-3 py-1 text-xs text-neutral-700 dark:bg-neutral-800 dark:text-neutral-200"
              >
                #{t}
              </span>
            ))}
          </div>
        )}

        <div className="mt-10 rounded-xl border border-neutral-200 bg-neutral-50 p-5 dark:border-neutral-800 dark:bg-neutral-900">
          <p className="text-xs font-bold uppercase tracking-wider text-neutral-500">Share this story</p>
          <div className="mt-3">
            <ShareButtons url={url} title={article.title} />
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section aria-labelledby="related" className="mx-auto mt-16 max-w-7xl px-4">
          <h2 id="related" className="mb-6 text-xl font-extrabold tracking-tight md:text-2xl">
            Related stories
          </h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((a) => (
              <ArticleCard key={a.slug} article={a} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
