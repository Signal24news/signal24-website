import Link from 'next/link';

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="group flex items-center gap-2" aria-label="Signal 24 home">
      <span className="relative flex h-9 w-9 items-center justify-center rounded-md bg-brand text-white">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          aria-hidden
        >
          <path
            d="M3 12c0-4.97 4.03-9 9-9M6 12c0-3.31 2.69-6 6-6M9 12a3 3 0 0 1 3-3"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <circle cx="12" cy="12" r="1.6" fill="currentColor" />
          <path
            d="M12 21v-3"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </span>
      {!compact && (
        <span className="flex flex-col leading-none">
          <span className="text-lg font-extrabold tracking-tight">
            Signal<span className="text-brand">24</span>
          </span>
          <span className="text-[10px] uppercase tracking-[0.18em] text-neutral-500 dark:text-neutral-400">
            News · 24/7
          </span>
        </span>
      )}
    </Link>
  );
}
