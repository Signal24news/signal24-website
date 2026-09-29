import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { AUTHORS, SITE, SOCIAL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'About Signal 24',
  description:
    'Signal 24 is an independent digital news platform that explains the biggest global stories in clear, simple language. Meet the founder and learn how we work.',
  alternates: { canonical: '/about' },
};

const founder = AUTHORS[0];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 md:py-20">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand">About us</p>
      <h1 className="mt-2 text-4xl font-extrabold tracking-tight md:text-5xl">
        Global news, explained.
      </h1>
      <p className="mt-5 text-lg text-neutral-600 dark:text-neutral-300">
        Signal 24 is an independent digital news platform. We cover the stories moving the world,
        from wars and diplomacy in the Middle East to markets, AI and sport, and we explain them in
        plain language so you can understand what is going on in a few minutes.
      </p>

      <section className="mt-12">
        <h2 className="text-xl font-extrabold tracking-tight">Why Signal 24 exists</h2>
        <div className="mt-3 space-y-4 text-neutral-700 dark:text-neutral-300">
          <p>
            There has never been more news, and it has never been harder to follow. Every big
            story comes with hundreds of alerts, clips and opinions. Most people end up knowing
            that something happened but not why it matters or what happens next.
          </p>
          <p>
            We built Signal 24 to fix that. Every story we publish tries to answer three simple
            questions: what happened, why it matters, and what to watch next. You will often see
            those answers in the Signal Box at the top of our articles.
          </p>
        </div>
      </section>

      <section className="mt-12" aria-labelledby="founder">
        <h2 id="founder" className="text-xl font-extrabold tracking-tight">
          Who runs Signal 24
        </h2>
        <div className="mt-5 flex flex-col gap-6 rounded-2xl border border-neutral-200 bg-neutral-50 p-6 sm:flex-row sm:items-start dark:border-neutral-800 dark:bg-neutral-900">
          <Image
            src={founder.image}
            alt={`${founder.name}, ${founder.role} of Signal 24`}
            width={128}
            height={128}
            className="h-28 w-28 shrink-0 rounded-full object-cover"
          />
          <div className="min-w-0">
            <p className="text-lg font-bold">{founder.name}</p>
            <p className="text-sm font-semibold text-brand">{founder.role}</p>
            <div className="mt-3 space-y-3 text-neutral-700 dark:text-neutral-300">
              {founder.bio.map((para) => (
                <p key={para.slice(0, 24)}>{para}</p>
              ))}
            </div>
            <div className="mt-4 flex flex-wrap gap-3 text-sm font-semibold">
              <Link href={`/author/${founder.slug}`} className="text-brand hover:underline">
                Read Saad&apos;s stories →
              </Link>
              {founder.linkedin && (
                <a
                  href={founder.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand hover:underline"
                >
                  LinkedIn ↗
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-extrabold tracking-tight">How we work</h2>
        <ul className="mt-4 space-y-3 text-neutral-700 dark:text-neutral-300">
          <Point title="We check before we publish.">
            Facts come from named sources, official statements and trusted wire reporting. If we
            cannot confirm something, we say so.
          </Point>
          <Point title="We fix our mistakes in the open.">
            When we get something wrong, we correct it and add a note to the story.{' '}
            <Link href="/corrections">Read our corrections policy</Link>.
          </Point>
          <Point title="We are independent.">
            No political party, government or advertiser tells us what to cover or how.
          </Point>
          <Point title="We are open about AI.">
            We use AI tools to help with research and drafting. A person edits, checks and
            approves every story before it goes live, and AI-generated images are labelled.
          </Point>
        </ul>
        <p className="mt-5 text-sm">
          <Link href="/editorial-policy" className="font-semibold text-brand hover:underline">
            Read our full editorial policy →
          </Link>
        </p>
      </section>

      <section className="mt-12 rounded-2xl border border-neutral-200 p-6 dark:border-neutral-800">
        <h2 className="text-xl font-extrabold tracking-tight">Get in touch</h2>
        <p className="mt-2 text-neutral-700 dark:text-neutral-300">
          Story tips, corrections, partnerships or feedback. We read everything.
        </p>
        <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-3">
          <Mail label="General" email={SITE.email} />
          <Mail label="News tips" email={SITE.tipsEmail} />
          <Mail label="Corrections" email={SITE.correctionsEmail} />
        </dl>
        <p className="mt-4 text-sm">
          <Link href="/contact" className="font-semibold text-brand hover:underline">
            All contact options →
          </Link>
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-extrabold tracking-tight">Follow Signal 24</h2>
        <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
          <SocialCard href={SOCIAL.linkedin} name="LinkedIn" handle="Signal 24" />
          <SocialCard href={SOCIAL.instagram} name="Instagram" handle="@signal24.info" />
          <SocialCard href={SOCIAL.facebook} name="Facebook" handle="Signal 24" />
          <SocialCard href={SOCIAL.twitter} name="X" handle="@Signal24info" />
          <SocialCard href={SOCIAL.threads} name="Threads" handle="@signal24.info" />
        </ul>
      </section>
    </div>
  );
}

function Point({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <li className="flex gap-3">
      <span className="mt-2 inline-block h-2 w-2 shrink-0 rounded-full bg-brand" />
      <span className="[&_a]:text-brand [&_a]:underline">
        <strong>{title}</strong> {children}
      </span>
    </li>
  );
}

function Mail({ label, email }: { label: string; email: string }) {
  return (
    <div>
      <dt className="text-xs font-bold uppercase tracking-wider text-neutral-500">{label}</dt>
      <dd className="mt-1 break-all">
        <a href={`mailto:${email}`} className="font-medium text-brand hover:underline">
          {email}
        </a>
      </dd>
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
