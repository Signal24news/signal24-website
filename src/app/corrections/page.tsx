import type { Metadata } from 'next';
import Link from 'next/link';
import { PolicyPage } from '@/components/PolicyPage';
import { SITE } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Corrections Policy',
  description: 'How Signal 24 handles mistakes, corrections and updates, and how to report an error.',
  alternates: { canonical: '/corrections' },
};

export default function CorrectionsPage() {
  return (
    <PolicyPage
      eyebrow="Standards"
      title="Corrections Policy"
      intro="We work hard to get things right, but we will sometimes make mistakes. When that happens, we fix them quickly and tell you what changed."
      updated="29 September 2026"
      current="/corrections"
    >
      <h2>How to report an error</h2>
      <p>
        Email <a href={`mailto:${SITE.correctionsEmail}`}>{SITE.correctionsEmail}</a> with the link
        to the story, what you think is wrong and, if you can, a source that shows the correct
        information. We review every request, usually within two working days.
      </p>

      <h2>What we do when we are wrong</h2>
      <ul>
        <li>
          <strong>Corrections.</strong> If a story contains a factual error, we fix it and add a
          note at the end of the story explaining what was wrong and when it was corrected.
        </li>
        <li>
          <strong>Clarifications.</strong> If a story was accurate but could be misunderstood, we
          rewrite the unclear part and add a short clarification note.
        </li>
        <li>
          <strong>Updates.</strong> In developing stories, new information arrives all the time.
          When we add significant new facts, we mark the story as updated and show the time of the
          update.
        </li>
        <li>
          <strong>Serious errors.</strong> If a mistake changes the meaning of the whole story, we
          say so at the top of the article, not only at the bottom.
        </li>
      </ul>

      <h2>What we do not do</h2>
      <p>
        We do not quietly change facts without telling readers. Small fixes to spelling, grammar or
        formatting that do not change the meaning of a story may be made without a note.
      </p>

      <h2>Removing stories</h2>
      <p>
        We rarely remove published stories. We may do so if a story is seriously wrong and cannot
        be fixed, or if keeping it online puts someone at real risk. When we remove a story, we
        explain why where it is safe to do so.
      </p>

      <p>
        This policy is part of our wider <Link href="/editorial-policy">editorial policy</Link>.
      </p>
    </PolicyPage>
  );
}
