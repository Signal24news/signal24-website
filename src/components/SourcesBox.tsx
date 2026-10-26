import Link from 'next/link';
import type { Source } from '@/lib/sources';

export function SourcesBox({ sources }: { sources: Source[] }) {
  if (!sources.length) return null;
  return (
    <section
      aria-labelledby="sources-heading"
      className="mt-10 rounded-xl border border-neutral-200 p-5 dark:border-neutral-800"
    >
      <h2 id="sources-heading" className="text-xs font-bold uppercase tracking-wider text-neutral-500">
        Sources
      </h2>
      <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
        This story is based on reporting and documents from:
      </p>
      <ul className="mt-3 flex flex-wrap gap-2">
        {sources.map((s) => (
          <li key={s.name} className="inline-flex items-center gap-1 rounded-full bg-neutral-100 py-1 pl-3 pr-2 text-sm dark:bg-neutral-800">
            <a
              href={s.links[0]}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-neutral-800 hover:text-brand dark:text-neutral-100"
            >
              {s.name}
            </a>
            {s.links.length > 1 &&
              s.links.slice(1).map((l, i) => (
                <a
                  key={l}
                  href={l}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full px-1.5 text-xs font-bold text-brand hover:underline"
                  aria-label={`${s.name}, report ${i + 2}`}
                >
                  {i + 2}
                </a>
              ))}
          </li>
        ))}
      </ul>
      <p className="mt-3 text-xs text-neutral-500">
        We check facts with at least two independent sources.{' '}
        <Link href="/editorial-policy" className="font-semibold text-brand hover:underline">
          How we work
        </Link>
      </p>
    </section>
  );
}
