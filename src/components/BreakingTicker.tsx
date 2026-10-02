import Link from 'next/link';
import type { CSSProperties } from 'react';
import type { Article } from '@/lib/types';

/**
 * Ticker speed in pixels per second. Raise it to make headlines move faster.
 * The duration is worked out from the text length, so the speed stays the same
 * whether there is one breaking story or ten.
 */
const SPEED_PX_PER_SEC = 90;

/** Rough width of one headline at text-sm, including the dot and margins. */
function estimateWidth(title: string) {
  return title.length * 7.4 + 72;
}

export function BreakingTicker({ items }: { items: Article[] }) {
  if (!items.length) return null;

  // Repeat short lists so the strip is always wider than the screen,
  // then duplicate the whole set so the CSS loop is seamless.
  let set = [...items];
  let width = set.reduce((w, a) => w + estimateWidth(a.title), 0);
  while (width < 1800) {
    set = [...set, ...items];
    width += items.reduce((w, a) => w + estimateWidth(a.title), 0);
  }
  const loop = [...set, ...set];
  const duration = Math.max(10, Math.round(width / SPEED_PX_PER_SEC));

  return (
    <div className="relative overflow-hidden border-b border-red-700 bg-breaking text-white">
      <div className="mx-auto flex max-w-7xl items-stretch">
        <div className="relative z-10 flex shrink-0 items-center gap-2 bg-red-700 px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-wider">
          <span className="relative flex h-2 w-2">
            <span className="absolute inset-0 animate-ping rounded-full bg-white/70" />
            <span className="relative h-2 w-2 rounded-full bg-white" />
          </span>
          Breaking
        </div>
        <div className="relative flex-1 overflow-hidden py-1.5">
          <div
            className="marquee-track text-sm"
            style={{ '--marquee-duration': `${duration}s` } as CSSProperties}
          >
            {loop.map((a, i) => (
              <Link
                key={`${a.slug}-${i}`}
                href={`/article/${a.slug}`}
                className="mx-6 inline-flex items-center gap-2 hover:underline"
                aria-hidden={i >= items.length ? true : undefined}
                tabIndex={i >= items.length ? -1 : undefined}
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
