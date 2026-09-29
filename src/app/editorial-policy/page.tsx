import type { Metadata } from 'next';
import Link from 'next/link';
import { PolicyPage } from '@/components/PolicyPage';
import { SITE } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Editorial Policy',
  description:
    'How Signal 24 reports the news: our standards for sourcing, verification, independence, AI use, images and corrections.',
  alternates: { canonical: '/editorial-policy' },
};

export default function EditorialPolicyPage() {
  return (
    <PolicyPage
      eyebrow="Standards"
      title="Editorial Policy"
      intro="This page explains how we decide what to cover, how we check it and what we do when we get it wrong. It is the standard we hold ourselves to on every story."
      updated="29 September 2026"
      current="/editorial-policy"
    >
      <h2>Our mission</h2>
      <p>
        Signal 24 explains the biggest global stories in clear language. We focus on geopolitics,
        the Middle East, business, AI and technology, and sport. Our goal is simple: after reading
        a Signal 24 story, you should know what happened, why it matters and what to watch next.
      </p>

      <h2>Who is responsible</h2>
      <p>
        Signal 24 is currently run by its founder and editor, <Link href="/author/saad-ali">Saad Ali</Link>,
        who is responsible for everything we publish. Every story carries the name of the person
        who wrote it. As we grow and add contributors, they will follow this same policy.
      </p>

      <h2 id="verification">Sourcing and verification</h2>
      <ul>
        <li>
          We rely on primary sources wherever we can: official statements, court and government
          documents, company filings and on-the-record interviews.
        </li>
        <li>
          When we use reporting from other news organisations, such as wire agencies, we credit
          them by name and link to their work where possible.
        </li>
        <li>
          In fast-moving stories like wars and disasters, early information is often wrong. We say
          clearly what is confirmed and what is not, and we update the story as facts change.
        </li>
        <li>
          Casualty figures and claims made by sides in a conflict are attributed to whoever made
          them. We do not present one side&apos;s claims as fact.
        </li>
        <li>
          Before we share a viral video or image, we try to confirm where and when it was taken. If
          we cannot, we either leave it out or say that it is unverified.
        </li>
      </ul>

      <h2>Fact checks</h2>
      <p>
        Our Fact Check section looks at viral claims, images and videos. Each fact check explains
        the claim, the evidence we found and how we found it, and ends with a clear verdict. We
        check claims from every side, not only the ones we disagree with.
      </p>

      <h2>News, analysis and opinion</h2>
      <p>
        News stories and explainers report and explain facts. When a piece includes our own
        analysis or opinion, we make that clear to the reader. We do not mix paid content with
        news, and any sponsored content will always be clearly labelled as sponsored.
      </p>

      <h2>Independence</h2>
      <p>
        Signal 24 is independently owned. No government, political party, company or advertiser
        has any say over what we cover or how we cover it. We do not accept payment or gifts in
        exchange for coverage. If a story involves a personal or financial connection to anyone at
        Signal 24, we will say so in the story.
      </p>

      <h2>How we use AI</h2>
      <p>
        We use AI tools to help with research, translation, summarising long documents and early
        drafts. AI does not decide what we publish. A person edits, fact checks and approves every
        story, and that person&apos;s name is on it. We do not publish AI-generated quotes, and we
        do not use AI to create fake photos of real events.
      </p>
      <p>
        When we use an AI-generated illustration, it is labelled as one in the caption.
      </p>

      <h2>Images and graphic content</h2>
      <p>
        We cover wars and violence, but we do not use graphic images to attract clicks. We avoid
        images of dead or badly injured people. If a graphic image is truly necessary to understand
        a story, we warn readers first. We credit photographers and image sources whenever we can.
      </p>

      <h2>Corrections</h2>
      <p>
        We correct mistakes quickly and openly. Corrections are noted at the bottom of the story
        with the date of the change. You can read the details in our{' '}
        <Link href="/corrections">corrections policy</Link> or report an error to{' '}
        <a href={`mailto:${SITE.correctionsEmail}`}>{SITE.correctionsEmail}</a>.
      </p>

      <h2>Anonymous sources</h2>
      <p>
        We prefer named sources. We only use anonymous sources when the information is important,
        cannot be obtained any other way, and the source has a good reason to stay unnamed, such
        as a risk to their safety or job. We explain to readers why the source is not named.
      </p>

      <h2>Contact the editor</h2>
      <p>
        Questions about this policy can be sent to <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
      </p>
    </PolicyPage>
  );
}
