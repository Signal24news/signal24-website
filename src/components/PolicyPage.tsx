import Link from 'next/link';

export const POLICY_LINKS = [
  { href: '/about', label: 'About Signal 24' },
  { href: '/contact', label: 'Contact' },
  { href: '/editorial-policy', label: 'Editorial Policy' },
  { href: '/corrections', label: 'Corrections Policy' },
  { href: '/privacy-policy', label: 'Privacy Policy' },
  { href: '/terms', label: 'Terms of Use' },
];

export function PolicyPage({
  eyebrow,
  title,
  intro,
  updated,
  current,
  children,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  updated?: string;
  current: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
      <div className="grid gap-12 lg:grid-cols-[1fr_240px]">
        <div className="min-w-0 max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand">{eyebrow}</p>
          <h1 className="mt-2 text-4xl font-extrabold tracking-tight md:text-5xl">{title}</h1>
          {intro && (
            <p className="mt-5 text-lg text-neutral-600 dark:text-neutral-300">{intro}</p>
          )}
          {updated && <p className="mt-4 text-sm text-neutral-500">Last updated: {updated}</p>}
          <div className="prose-article mt-8">{children}</div>
        </div>

        <aside className="lg:pt-10">
          <nav
            aria-label="Signal 24 policies"
            className="rounded-xl border border-neutral-200 p-5 lg:sticky lg:top-24 dark:border-neutral-800"
          >
            <p className="text-xs font-bold uppercase tracking-wider text-neutral-500">Signal 24</p>
            <ul className="mt-3 space-y-1 text-sm">
              {POLICY_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    aria-current={l.href === current ? 'page' : undefined}
                    className={
                      l.href === current
                        ? 'block rounded-md bg-brand/10 px-3 py-2 font-semibold text-brand'
                        : 'block rounded-md px-3 py-2 text-neutral-700 hover:bg-neutral-100 hover:text-brand dark:text-neutral-300 dark:hover:bg-neutral-900'
                    }
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
      </div>
    </div>
  );
}
