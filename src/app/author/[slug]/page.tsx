import { notFound } from 'next/navigation';
import Image from 'next/image';
import type { Metadata } from 'next';
import { ArticleCard } from '@/components/ArticleCard';
import { getArticlesByAuthorName } from '@/lib/articles';
import { SITE } from '@/lib/constants';
import { getAuthors, getAuthorBySlug } from '@/lib/authors';

export const dynamicParams = false;

export function generateStaticParams() {
  return getAuthors().map((a) => ({ slug: a.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const author = getAuthorBySlug(params.slug);
  if (!author) return {};
  return {
    title: `${author.name}, ${author.role}`,
    description: author.shortBio,
    alternates: { canonical: `/author/${author.slug}` },
    openGraph: { type: 'profile', images: [{ url: author.image }] },
  };
}

export default async function AuthorPage({ params }: { params: { slug: string } }) {
  const author = getAuthorBySlug(params.slug);
  if (!author) notFound();

  const articles = await getArticlesByAuthorName(author.name);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    mainEntity: {
      '@type': 'Person',
      name: author.name,
      jobTitle: author.role,
      image: `${SITE.url}${author.image}`,
      url: `${SITE.url}/author/${author.slug}`,
      worksFor: { '@type': 'NewsMediaOrganization', name: SITE.name, url: SITE.url },
      sameAs: author.linkedin ? [author.linkedin] : undefined,
    },
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 md:py-14">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <header className="flex flex-col gap-6 border-b border-neutral-200 pb-10 sm:flex-row sm:items-center dark:border-neutral-800">
        <Image
          src={author.image}
          alt={author.name}
          width={144}
          height={144}
          priority
          className="h-32 w-32 shrink-0 rounded-full object-cover"
        />
        <div className="min-w-0 max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand">{author.role}</p>
          <h1 className="mt-1 text-3xl font-extrabold tracking-tight md:text-4xl">{author.name}</h1>
          <p className="mt-3 text-neutral-600 dark:text-neutral-300">{author.shortBio}</p>
          <div className="mt-4 flex flex-wrap gap-4 text-sm font-semibold">
            {author.email && (
              <a href={`mailto:${author.email}`} className="text-brand hover:underline">
                {author.email}
              </a>
            )}
            {author.linkedin && (
              <a
                href={author.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand hover:underline"
              >
                LinkedIn ↗
              </a>
            )}
          </div>
        </div>
      </header>

      <section aria-labelledby="stories" className="mt-10">
        <h2 id="stories" className="mb-6 text-xl font-extrabold tracking-tight md:text-2xl">
          Stories by {author.name}
          <span className="ml-2 text-base font-medium text-neutral-500">({articles.length})</span>
        </h2>
        {articles.length === 0 ? (
          <p className="text-sm text-neutral-500">No stories yet.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((a) => (
              <ArticleCard key={a.slug} article={a} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
