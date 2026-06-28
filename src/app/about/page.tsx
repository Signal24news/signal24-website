import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE, SOCIAL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'About Signal 24',
  description: `About ${SITE.name} — our mission, our newsroom, and how to reach us.`,
  alternates: { canonical: '/about' },
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 md:py-20">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand">About us</p>
      <h1 className="mt-2 text-4xl font-extrabold tracking-tight md:text-5xl">
        News with signal, not noise.
      </h1>
      <p className="mt-5 text-lg text-neutral-600 dark:text-neutral-300">
        Signal 24 is a digital news platform covering Pakistan and the world, 24 hours a day.
        We cut through the noise of the news cycle to bring you accurate, fast, and
        independent reporting — built for mobile, built for the next generation of readers.
      </p>

      <section className="mt-12">
        <h2 className="text-xl font-extrabold tracking-tight">Our mission</h2>
        <p className="mt-3 text-neutral-700 dark:text-neutral-300">
          To inform Pakistani readers — at home and across the diaspora — with rigorous,
          verified journalism that respects their time and intelligence. We believe local
          stories matter globally, and global stories matter locally. We cover politics,
          business, sports, technology, and the cultural moments that shape our world.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-extrabold tracking-tight">What we stand for</h2>
        <ul className="mt-3 space-y-3 text-neutral-700 dark:text-neutral-300">
          <li className="flex gap-3">
            <span className="mt-1 inline-block h-2 w-2 shrink-0 rounded-full bg-brand" />
            <span>
              <strong>Accuracy first.</strong> We verify before we publish, and we correct
              when we get something wrong.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="mt-1 inline-block h-2 w-2 shrink-0 rounded-full bg-brand" />
            <span>
              <strong>Independent reporting.</strong> No party line. No paid placement
              disguised as news.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="mt-1 inline-block h-2 w-2 shrink-0 rounded-full bg-brand" />
            <span>
              <strong>Mobile-first.</strong> Built for the way Pakistan reads — fast on slow
              connections, readable on any phone.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="mt-1 inline-block h-2 w-2 shrink-0 rounded-full bg-brand" />
            <span>
              <strong>Always on.</strong> News doesn’t sleep, and neither does our desk.
            </span>
          </li>
        </ul>
      </section>

      <section className="mt-12 rounded-2xl border border-neutral-200 bg-neutral-50 p-6 dark:border-neutral-800 dark:bg-neutral-900">
        <h2 className="text-xl font-extrabold tracking-tight">Get in touch</h2>
        <p className="mt-2 text-neutral-700 dark:text-neutral-300">
          Tips, story ideas, corrections, partnerships — write to us.
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <a
            href={`mailto:${SITE.email}`}
            className="inline-flex items-center gap-2 rounded-md bg-brand px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-600"
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" aria-hidden>
              <path
                d="M3 7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path d="m3 7 9 7 9-7" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
            </svg>
            {SITE.email}
          </a>
          <Link
            href="/admin"
            className="inline-flex items-center gap-2 rounded-md border border-neutral-300 bg-white px-4 py-2.5 text-sm font-semibold text-neutral-800 transition hover:border-brand hover:text-brand dark:border-neutral-700 dark:bg-neutral-950 dark:text-neutral-100"
          >
            Newsroom CMS →
          </Link>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-extrabold tracking-tight">Follow Signal 24</h2>
        <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <SocialCard href={SOCIAL.facebook} name="Facebook" handle="@signal24" />
          <SocialCard href={SOCIAL.instagram} name="Instagram" handle="@signal24" />
          <SocialCard href={SOCIAL.twitter} name="X" handle="@signal24" />
          <SocialCard href={SOCIAL.threads} name="Threads" handle="@signal24" />
        </ul>
      </section>
    </div>
  );
}

function SocialCard({ href, name, handle }: { href: string; name: string; handle: string }) {
  return (
    <li>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="block rounded-xl border border-neutral-200 bg-white p-4 transition hover:border-brand hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900"
      >
        <p className="text-sm font-semibold">{name}</p>
        <p className="mt-0.5 text-xs text-neutral-500">{handle}</p>
      </a>
    </li>
  );
}
