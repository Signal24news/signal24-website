import Link from 'next/link';
import type { Article } from '@/lib/types';

export function BreakingTicker({ items }: { items: Article[] }) {
  if (!items.length) return null;

  // Duplicate the list so the CSS marquee loops seamlessly.
  const loop = [...items, ...items];

  return (
    <div className="relative overflow-hidden border-b border-red-700 bg-breaking text-white">
      <div className="mx-auto flex max-w-7xl items-stretch">
        <div className="flex shrink-0 items-center gap-2 bg-red-700 px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-wider">
          <span className="relative flex h-2 w-2">
            <span className="absolute inset-0 animate-ping rounded-full bg-white/70" />
            <span className="relative h-2 w-2 rounded-full bg-white" />
          </span>
          Breaking
        </div>
        <div className="relative flex-1 overflow-hidden py-1.5">
          <div className="marquee-track text-sm">
            {loop.map((a, i) => (
              <Link
                key={`${a.slug}-${i}`}
                href={`/article/${a.slug}`}
                className="mx-6 inline-flex items-center gap-2 hover:underline"
              >
                <span aria-hidden className="text-white/70">●</span>
                <span>{a.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
