import Link from 'next/link';
import type { Correction } from '@/lib/types';
import { formatDate } from '@/lib/format';

function label(c: Correction) {
  return c.kind === 'clarification' ? 'Clarification' : 'Correction';
}

/** Short note at the top of a story, only for corrections marked "show at top". */
export function CorrectionBanner({ corrections }: { corrections: Correction[] }) {
  const top = corrections.filter((c) => c.top);
  if (!top.length) return null;
  return (
    <div className="mb-6 rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-950 dark:border-amber-700 dark:bg-amber-950/40 dark:text-amber-100">
      {top.map((c) => (
        <p key={c.date + c.text.slice(0, 12)}>
          <strong>
            {label(c)}, {formatDate(c.date)}:
          </strong>{' '}
          {c.text}
        </p>
      ))}
      <p className="mt-2 text-xs">
        <a href="#corrections" className="font-semibold underline">
          See all changes to this story
        </a>
      </p>
    </div>
  );
}

/** Full list at the end of a story, as our corrections policy promises. */
export function CorrectionList({ corrections }: { corrections: Correction[] }) {
  if (!corrections.length) return null;
  return (
    <section
      id="corrections"
      aria-labelledby="corrections-heading"
      className="mt-10 rounded-xl border border-neutral-200 bg-neutral-50 p-5 dark:border-neutral-800 dark:bg-neutral-900"
    >
      <h2 id="corrections-heading" className="text-xs font-bold uppercase tracking-wider text-neutral-500">
        Corrections and clarifications
      </h2>
      <ul className="mt-3 space-y-2 text-sm text-neutral-700 dark:text-neutral-300">
        {corrections.map((c) => (
          <li key={c.date + c.text.slice(0, 12)}>
            <strong>
              {label(c)}, {formatDate(c.date)}:
            </strong>{' '}
            {c.text}
          </li>
        ))}
      </ul>
      <p className="mt-3 text-xs text-neutral-500">
        Spotted a mistake? <Link href="/corrections" className="font-semibold text-brand hover:underline">Tell us</Link>.
      </p>
    </section>
  );
}
