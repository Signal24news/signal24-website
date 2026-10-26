import type { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import { PolicyPage } from '@/components/PolicyPage';
import { SITE } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Send Signal 24 a tip',
  description:
    'Seen something we should look into? Send the Signal 24 newsroom a news tip. Your name and contact details are optional.',
  alternates: { canonical: '/tip' },
};

const TALLY_FORM_ID = 'Z99doe';

export default function TipPage() {
  return (
    <PolicyPage
      eyebrow="Send a tip"
      title="Know something we should look into?"
      intro="Tell us what you know. A member of our newsroom reads every tip, and we check everything before we publish. You can stay anonymous."
      current="/tip"
    >
      <div className="not-prose -mx-2 sm:mx-0">
        <iframe
          data-tally-src={`https://tally.so/embed/${TALLY_FORM_ID}?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1`}
          src={`https://tally.so/embed/${TALLY_FORM_ID}?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1`}
          loading="lazy"
          width="100%"
          height="1400"
          frameBorder={0}
          title="Send Signal 24 a tip"
          className="w-full"
        />
        <Script src="https://tally.so/widgets/embed.js" strategy="lazyOnload" />
      </div>

      <h2>How we handle tips</h2>
      <ul>
        <li>We never publish your name or details without your permission, and we never reveal a confidential source.</li>
        <li>A tip is a starting point, not a story. We check it with at least two independent sources before we report it.</li>
        <li>We cannot reply to every tip, but if you leave contact details and we need more information, we will get in touch.</li>
      </ul>

      <h2>Prefer email?</h2>
      <p>
        Write to <a href={`mailto:${SITE.tipsEmail}`}>{SITE.tipsEmail}</a>. If your tip is sensitive, say so in the first
        line. For corrections to a published story, see our <Link href="/corrections">corrections policy</Link>.
      </p>
    </PolicyPage>
  );
}
