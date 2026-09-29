import type { SignalBox as SignalBoxData } from '@/lib/types';

const ROWS: { key: keyof SignalBoxData; label: string }[] = [
  { key: 'whatHappened', label: 'What happened' },
  { key: 'whyItMatters', label: 'Why it matters' },
  { key: 'whatsNext', label: "What's next" },
];

/** The three-line summary shown at the top of a story. Hidden when all fields are empty. */
export function SignalBox({ signal }: { signal?: SignalBoxData }) {
  if (!signal) return null;
  const rows = ROWS.filter((r) => signal[r.key]);
  if (rows.length === 0) return null;

  return (
    <aside
      aria-label="Signal Box: the story in brief"
      className="my-8 overflow-hidden rounded-xl border border-brand/30 bg-brand/5 dark:border-brand/40 dark:bg-brand/10"
    >
      <div className="flex items-center gap-2 border-b border-brand/20 px-5 py-3">
        <span className="relative flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full rounded-full bg-brand opacity-60 motion-safe:animate-ping" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-brand" />
        </span>
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand">Signal Box</p>
      </div>
      <dl className="divide-y divide-brand/15">
        {rows.map((r) => (
          <div key={r.key} className="grid gap-1 px-5 py-4 sm:grid-cols-[140px_1fr] sm:gap-4">
            <dt className="text-sm font-bold text-neutral-900 dark:text-white">{r.label}</dt>
            <dd className="text-[0.975rem] leading-relaxed text-neutral-700 dark:text-neutral-300">
              {signal[r.key]}
            </dd>
          </div>
        ))}
      </dl>
    </aside>
  );
}
