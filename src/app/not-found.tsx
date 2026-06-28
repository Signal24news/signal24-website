import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center px-4 py-24 text-center">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand">404</p>
      <h1 className="mt-3 text-4xl font-extrabold tracking-tight md:text-5xl">
        Story not found.
      </h1>
      <p className="mt-4 text-neutral-600 dark:text-neutral-400">
        The page you’re looking for has moved, been removed, or never existed.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 rounded-md bg-brand px-5 py-3 text-sm font-semibold text-white hover:bg-brand-600"
      >
        ← Back to homepage
      </Link>
    </div>
  );
}
