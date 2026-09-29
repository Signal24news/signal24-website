import type { Metadata } from 'next';
import Link from 'next/link';
import { PolicyPage } from '@/components/PolicyPage';
import { SITE, SOCIAL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Contact Signal 24',
  description: 'How to reach the Signal 24 newsroom: news tips, corrections, partnerships and general questions.',
  alternates: { canonical: '/contact' },
};

const CHANNELS = [
  {
    label: 'News tips',
    email: SITE.tipsEmail,
    text: 'Seen something we should look into? Send us what you know, plus any documents, photos or links that back it up.',
  },
  {
    label: 'Corrections',
    email: SITE.correctionsEmail,
    text: 'Found a mistake in one of our stories? Tell us which story and what is wrong. We review every request.',
  },
  {
    label: 'General, partnerships and advertising',
    email: SITE.email,
    text: 'Questions, feedback, collaboration ideas or advertising enquiries.',
  },
];

export default function ContactPage() {
  return (
    <PolicyPage
      eyebrow="Contact"
      title="Get in touch"
      intro="Signal 24 is a small, independent newsroom. Email is the fastest way to reach us, and we usually reply within two working days."
      current="/contact"
    >
      <div className="not-prose grid gap-4">
        {CHANNELS.map((c) => (
          <div
            key={c.email}
            className="rounded-xl border border-neutral-200 p-5 dark:border-neutral-800"
          >
            <p className="text-xs font-bold uppercase tracking-wider text-neutral-500">{c.label}</p>
            <a
              href={`mailto:${c.email}`}
              className="mt-1 block break-all text-lg font-bold text-brand no-underline hover:underline"
            >
              {c.email}
            </a>
            <p className="mt-2 text-[0.95rem] leading-relaxed text-neutral-600 dark:text-neutral-400">
              {c.text}
            </p>
          </div>
        ))}
      </div>

      <h2>Sending a sensitive tip</h2>
      <p>
        If your tip is sensitive, say so in the first line of your email. We will not publish your
        name or details without your permission, and we never reveal a confidential source.
      </p>

      <h2>Social media</h2>
      <p>
        You can also message us on <a href={SOCIAL.linkedin}>LinkedIn</a>,{' '}
        <a href={SOCIAL.instagram}>Instagram</a>, <a href={SOCIAL.facebook}>Facebook</a> or{' '}
        <a href={SOCIAL.twitter}>X</a>. For anything important, email is better, because messages
        on social platforms are easy to miss.
      </p>

      <h2>Before you write</h2>
      <p>
        For questions about how we report, check our <Link href="/editorial-policy">editorial policy</Link>.
        For how we handle your data, see our <Link href="/privacy-policy">privacy policy</Link>.
      </p>
    </PolicyPage>
  );
}
