import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE } from '@/lib/constants';
import { getInternshipSettings } from '@/lib/settings';

export const metadata: Metadata = {
  title: { absolute: 'Newsroom Internship 2026 (Remote) | Signal 24' },
  description:
    'Join the Signal 24 Newsroom Internship, Cohort 1. A 12-week remote program where you write real stories, work with an editor and publish under your own byline.',
  alternates: { canonical: '/internship' },
  openGraph: {
    title: 'Newsroom Internship 2026 (Remote) | Signal 24',
    description:
      'A 12-week remote program where you write real stories, work with an editor and publish under your own byline.',
    url: `${SITE.url}/internship`,
    type: 'website',
  },
};

const BENEFITS = [
  {
    title: 'Your byline on Signal 24',
    text: 'Every published story carries your name and links to your own author profile.',
  },
  {
    title: 'Editor feedback on every piece',
    text: 'Nothing goes live without an edit, and you will know why each change was made.',
  },
  {
    title: 'Live workshops',
    text: 'News writing, fact-checking, on-page SEO, media ethics and building your profile on LinkedIn.',
  },
  {
    title: 'One-on-one feedback sessions',
    text: 'With the editor, at the mid-point and at the end.',
  },
  {
    title: 'A verifiable certificate',
    text: 'With a unique ID that anyone can check at signal24.info/verify.',
    href: '/verify',
  },
  {
    title: 'A letter of recommendation',
    text: 'For top performers.',
  },
  {
    title: 'A path forward',
    text: 'Strong interns may be invited to stay on as Contributing Writers.',
  },
];

const DESKS = ['World', 'Middle East', 'Business & Economy', 'AI & Tech', 'Sports', 'Fact Check & Explainers'];

const WHO = [
  'Students or recent graduates (18+), from any field, who write well in English',
  'People who follow the news and are curious about why things happen',
  'Applicants who can commit 10 to 12 hours a week for 12 weeks',
  'Applicants with a laptop and a stable internet connection',
];

const STEPS = [
  'Online application',
  'Timed writing test: we send you the facts, you write the story',
  'Short video call',
  'Offer letter and onboarding',
];

function ApplyButton({
  open,
  formUrl,
  className = '',
}: {
  open: boolean;
  formUrl: string;
  className?: string;
}) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-bold transition';
  if (!open) {
    return (
      <span className={`${base} cursor-not-allowed bg-neutral-200 text-neutral-500 dark:bg-neutral-800 ${className}`}>
        Applications are closed
      </span>
    );
  }
  if (!formUrl) {
    return (
      <span
        className={`${base} cursor-not-allowed bg-brand/40 text-white ${className}`}
        title="The application form will be linked here shortly."
      >
        Applications open soon
      </span>
    );
  }
  return (
    <a
      href={formUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`${base} bg-brand text-white shadow-sm hover:bg-brand-600 ${className}`}
    >
      Apply now
      <span aria-hidden>→</span>
    </a>
  );
}

export default function InternshipPage() {
  const { open, formUrl, applyBy } = getInternshipSettings();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Signal 24 Newsroom Internship, Cohort 1',
    url: `${SITE.url}/internship`,
    description:
      'A 12-week remote newsroom internship. Interns write real stories, work with an editor and publish under their own byline.',
    publisher: { '@type': 'NewsMediaOrganization', name: SITE.name, url: SITE.url },
  };

  return (
    <div>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="bg-[#0E1733] text-white">
        <div className="mx-auto max-w-5xl px-4 py-14 md:py-20">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-300">
            Remote · 12 weeks · November 2026 to January 2027
          </p>
          <h1 className="mt-3 text-4xl font-extrabold leading-tight tracking-tight md:text-5xl">
            Signal 24 Newsroom Internship, Cohort 1
          </h1>
          <p className="mt-5 max-w-3xl text-lg text-white/80">
            Signal 24 explains the world&apos;s biggest stories in plain language. We are opening our
            newsroom to a small group of young writers who want to learn how real news is reported,
            edited and published.
          </p>
          <p className="mt-4 max-w-3xl text-lg text-white/80">
            This is not a certificate-for-nothing program. You will write real stories, work with an
            editor, and see your work published under your own name.
          </p>

          <dl className="mt-8 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              ['Seats', '10 to 12'],
              ['Duration', '12 weeks'],
              ['Mode', 'Remote'],
              ['Apply by', applyBy],
            ].map(([k, v]) => (
              <div key={k} className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                <dt className="text-[11px] font-bold uppercase tracking-wider text-white/60">{k}</dt>
                <dd className="mt-1 text-base font-bold">{v}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-8">
            <ApplyButton open={open} formUrl={formUrl} />
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4 py-12 md:py-16">
        {/* What you get */}
        <section aria-labelledby="what-you-get">
          <h2 id="what-you-get" className="text-2xl font-extrabold tracking-tight md:text-3xl">
            What you get
          </h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            {BENEFITS.map((b) => (
              <li
                key={b.title}
                className="rounded-xl border border-neutral-200 p-5 dark:border-neutral-800"
              >
                <p className="font-bold text-neutral-900 dark:text-white">{b.title}</p>
                <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-300">
                  {b.href ? (
                    <>
                      With a unique ID that anyone can check at{' '}
                      <Link href={b.href} className="font-semibold text-brand hover:underline">
                        signal24.info/verify
                      </Link>
                      .
                    </>
                  ) : (
                    b.text
                  )}
                </p>
              </li>
            ))}
          </ul>
        </section>

        {/* Desks */}
        <section aria-labelledby="desks" className="mt-14">
          <h2 id="desks" className="text-2xl font-extrabold tracking-tight md:text-3xl">
            Desks
          </h2>
          <ul className="mt-5 flex flex-wrap gap-2">
            {DESKS.map((d) => (
              <li
                key={d}
                className="rounded-full border border-neutral-200 bg-neutral-50 px-4 py-2 text-sm font-semibold dark:border-neutral-800 dark:bg-neutral-900"
              >
                {d}
              </li>
            ))}
          </ul>
        </section>

        <div className="mt-14 grid gap-10 md:grid-cols-2">
          {/* Who should apply */}
          <section aria-labelledby="who">
            <h2 id="who" className="text-2xl font-extrabold tracking-tight">
              Who should apply
            </h2>
            <ul className="mt-5 space-y-3">
              {WHO.map((w) => (
                <li key={w} className="flex gap-3 text-neutral-700 dark:text-neutral-300">
                  <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                  <span>{w}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* What we expect */}
          <section aria-labelledby="expect">
            <h2 id="expect" className="text-2xl font-extrabold tracking-tight">
              What we expect
            </h2>
            <ul className="mt-5 space-y-3">
              <li className="flex gap-3 text-neutral-700 dark:text-neutral-300">
                <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                <span>2 to 3 stories a week once publishing starts (from Week 3)</span>
              </li>
              <li className="flex gap-3 text-neutral-700 dark:text-neutral-300">
                <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                <span>Original writing only. AI tools may be used for research, not for writing your drafts.</span>
              </li>
              <li className="flex gap-3 text-neutral-700 dark:text-neutral-300">
                <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                <span>
                  Facts checked and sources credited, as set out in our{' '}
                  <Link href="/editorial-policy" className="font-semibold text-brand hover:underline">
                    Editorial Policy
                  </Link>
                </span>
              </li>
              <li className="flex gap-3 text-neutral-700 dark:text-neutral-300">
                <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                <span>Attendance at a weekly 30-minute editorial meeting</span>
              </li>
            </ul>
          </section>
        </div>

        {/* Selection */}
        <section aria-labelledby="selection" className="mt-14">
          <h2 id="selection" className="text-2xl font-extrabold tracking-tight md:text-3xl">
            How selection works
          </h2>
          <ol className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s, i) => (
              <li key={s} className="rounded-xl bg-neutral-50 p-5 dark:bg-neutral-900">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand text-sm font-bold text-white">
                  {i + 1}
                </span>
                <p className="mt-3 text-sm font-semibold text-neutral-800 dark:text-neutral-200">{s}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* Important */}
        <section
          aria-labelledby="important"
          className="mt-14 rounded-2xl border-l-4 border-brand bg-brand/5 p-6 md:p-8"
        >
          <h2 id="important" className="text-xl font-extrabold tracking-tight">
            Important
          </h2>
          <p className="mt-3 text-neutral-700 dark:text-neutral-300">
            This is an unpaid, remote internship. There is no application fee, ever. If anyone asks
            you for money in Signal 24&apos;s name, report it to{' '}
            <a href={`mailto:${SITE.email}`} className="font-semibold text-brand hover:underline">
              {SITE.email}
            </a>
            .
          </p>
          <p className="mt-3 text-neutral-700 dark:text-neutral-300">
            Applications close on {applyBy}. Questions? Write to{' '}
            <a href={`mailto:${SITE.email}`} className="font-semibold text-brand hover:underline">
              {SITE.email}
            </a>
            .
          </p>
        </section>

        <div className="mt-10 text-center">
          <ApplyButton open={open} formUrl={formUrl} />
        </div>
      </div>
    </div>
  );
}
