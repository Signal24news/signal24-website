import type { Metadata } from 'next';
import Link from 'next/link';
import { AuthorAvatar } from '@/components/AuthorAvatar';
import { getAuthors } from '@/lib/authors';
import { SITE } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Our newsroom',
  description:
    'Meet the Signal 24 newsroom: the editor and the writers who report, check and explain the stories on Signal 24.',
  alternates: { canonical: '/team' },
};

export default function TeamPage() {
  const authors = getAuthors();
  const editors = authors.filter((a) => !/intern/i.test(a.role));
  const interns = authors.filter((a) => /intern/i.test(a.role));

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'Our newsroom',
    url: `${SITE.url}/team`,
    mainEntity: {
      '@type': 'NewsMediaOrganization',
      name: SITE.name,
      url: SITE.url,
      employee: authors.map((a) => ({
        '@type': 'Person',
        name: a.name,
        jobTitle: a.role,
        url: `${SITE.url}/author/${a.slug}`,
        sameAs: a.linkedin ? [a.linkedin] : undefined,
      })),
    },
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 md:py-16">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <header className="max-w-3xl">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-600 dark:text-brand-300">
          {SITE.tagline}
        </p>
        <h1 className="mt-2 text-4xl font-extrabold tracking-tight md:text-5xl">Our newsroom</h1>
        <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-300">
          Signal 24 is written and checked by real people. Every story carries the name of the person
          who wrote it, and every story is edited before it is published. Read how we work in our{' '}
          <Link href="/editorial-policy" className="font-semibold text-brand-600 hover:underline dark:text-brand-300">
            Editorial Policy
          </Link>
          .
        </p>
      </header>

      {editors.length > 0 && (
        <section aria-labelledby="editors" className="mt-12">
          <h2 id="editors" className="border-b-[3px] border-[#0E1733] pb-2.5 text-2xl font-black tracking-tight dark:border-brand-300">
            Editor
          </h2>
          <ul className="mt-6 grid gap-6 md:grid-cols-2">
            {editors.map((a) => (
              <li key={a.slug}>
                <Link
                  href={`/author/${a.slug}`}
                  className="group flex gap-5 rounded-xl border border-neutral-200 p-5 transition hover:border-brand dark:border-neutral-800"
                >
                  <AuthorAvatar author={a} size={96} alt={a.name} className="h-24 w-24" />
                  <div className="min-w-0">
                    <p className="text-xl font-extrabold group-hover:text-brand-600 dark:group-hover:text-brand-300">{a.name}</p>
                    <p className="text-sm font-semibold text-brand-600 dark:text-brand-300">{a.role}</p>
                    <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">{a.shortBio}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {interns.length > 0 && (
        <section aria-labelledby="writers" className="mt-14">
          <h2 id="writers" className="border-b-[3px] border-[#0E1733] pb-2.5 text-2xl font-black tracking-tight dark:border-brand-300">
            Newsroom Internship, Cohort 1
          </h2>
          <p className="mt-3 max-w-3xl text-neutral-600 dark:text-neutral-300">
            Our first cohort of writers, working with the editor from November 2026 to January 2027.{' '}
            <Link href="/internship" className="font-semibold text-brand-600 hover:underline dark:text-brand-300">
              About the internship
            </Link>
          </p>
          <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {interns.map((a) => (
              <li key={a.slug}>
                <Link
                  href={`/author/${a.slug}`}
                  className="group flex h-full items-center gap-4 rounded-xl border border-neutral-200 p-4 transition hover:border-brand dark:border-neutral-800"
                >
                  <AuthorAvatar author={a} size={64} alt={a.name} className="h-16 w-16" />
                  <div className="min-w-0">
                    <p className="font-extrabold leading-snug group-hover:text-brand-600 dark:group-hover:text-brand-300">{a.name}</p>
                    {a.desk && <p className="mt-0.5 text-sm text-neutral-500 dark:text-neutral-400">{a.desk} desk</p>}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
