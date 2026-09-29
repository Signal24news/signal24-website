import type { Metadata } from 'next';
import Link from 'next/link';
import { PolicyPage } from '@/components/PolicyPage';
import { SITE } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Terms of Use',
  description: 'The terms that apply when you use signal24.info and share Signal 24 content.',
  alternates: { canonical: '/terms' },
};

export default function TermsPage() {
  return (
    <PolicyPage
      eyebrow="Legal"
      title="Terms of Use"
      intro="By using signal24.info you agree to these terms. They are short, and we have tried to write them in plain English."
      updated="29 September 2026"
      current="/terms"
    >
      <h2>Using our content</h2>
      <p>
        All stories, explainers, graphics and other material on Signal 24 belong to Signal 24 or
        to the people and organisations we credit. You are welcome to:
      </p>
      <ul>
        <li>Read and share links to our stories.</li>
        <li>Quote short parts of a story, as long as you credit Signal 24 and link to the original.</li>
      </ul>
      <p>
        You may not copy whole stories, republish our content as your own, or use it for
        commercial purposes without written permission. For permission requests, email{' '}
        <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
      </p>

      <h2>Accuracy</h2>
      <p>
        We work hard to make our reporting accurate, but news changes quickly and mistakes can
        happen. Our content is for general information only. It is not financial, legal, medical or
        professional advice. If you spot an error, please tell us through our{' '}
        <Link href="/corrections">corrections process</Link>.
      </p>

      <h2>Links to other websites</h2>
      <p>
        We link to other websites as part of our reporting. We do not control those sites and are
        not responsible for their content.
      </p>

      <h2>Advertising</h2>
      <p>
        Signal 24 may show advertising. Ads are provided by third parties and do not mean we
        endorse the product or service. Advertising never influences our news coverage. See our{' '}
        <Link href="/privacy-policy#advertising">privacy policy</Link> for how ads use cookies.
      </p>

      <h2>Acceptable use</h2>
      <p>
        Please do not try to break, overload or gain unauthorised access to the website, or use
        automated tools to copy large amounts of our content.
      </p>

      <h2>Limitation of liability</h2>
      <p>
        We provide Signal 24 as it is. As far as the law allows, we are not liable for any loss
        that comes from using the website or relying on its content.
      </p>

      <h2>Changes</h2>
      <p>
        We may update these terms from time to time. The date at the top of this page shows when
        they last changed. If you keep using the site after a change, you accept the new terms.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about these terms can be sent to <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
      </p>
    </PolicyPage>
  );
}
