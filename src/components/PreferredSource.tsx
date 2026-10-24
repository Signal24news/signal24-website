/**
 * "Add Signal 24 as a preferred source on Google" box.
 * Uses Google's deeplink (no extra script), as described in Google Search Central:
 * https://developers.google.com/search/docs/appearance/preferred-sources
 */
const PREFERRED_SOURCE_URL = 'https://www.google.com/preferences/source?q=signal24.info';

/**
 * Turn this on once signal24.info shows up when you search for it at
 * https://www.google.com/preferences/source (until then the link shows "No results").
 */
const SHOW_PREFERRED_SOURCE = false;

export function PreferredSource({ className = '' }: { className?: string }) {
  if (!SHOW_PREFERRED_SOURCE) return null;
  return (
    <div
      className={`flex flex-col gap-3 rounded-xl border border-brand-100 bg-brand-50 p-5 sm:flex-row sm:items-center sm:justify-between dark:border-brand-900 dark:bg-brand-900/30 ${className}`}
    >
      <div className="min-w-0">
        <p className="text-sm font-bold text-neutral-900 dark:text-white">See more Signal 24 on Google</p>
        <p className="mt-0.5 text-sm text-neutral-600 dark:text-neutral-300">
          Add us as a preferred source, and our stories will show up more often in your Google results.
        </p>
      </div>
      <a
        href={PREFERRED_SOURCE_URL}
        target="_blank"
        rel="noopener"
        className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-bold text-neutral-900 shadow-sm ring-1 ring-neutral-200 transition hover:ring-brand dark:bg-neutral-900 dark:text-white dark:ring-neutral-700"
      >
        <StarIcon />
        Add Signal 24 on Google
      </a>
    </div>
  );
}

function StarIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9l-5.2 2.7 1-5.8-4.3-4.1 5.9-.9L12 3.5z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}
