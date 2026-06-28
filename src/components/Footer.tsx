import Link from 'next/link';
import { Logo } from './Logo';
import { CATEGORIES, SITE, SOCIAL } from '@/lib/constants';

export function Footer() {
  const year = 2026;

  return (
    <footer className="mt-20 border-t border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-950">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <Logo />
            <p className="mt-4 max-w-md text-sm text-neutral-600 dark:text-neutral-400">
              {SITE.description}
            </p>
            <div className="mt-5 flex items-center gap-3">
              <SocialIcon href={SOCIAL.facebook} label="Facebook">
                <path d="M22 12a10 10 0 1 0-11.6 9.9v-7H8v-2.9h2.4V9.7c0-2.4 1.4-3.7 3.6-3.7 1 0 2.1.2 2.1.2v2.3h-1.2c-1.2 0-1.5.7-1.5 1.5v1.8H16l-.4 2.9h-2.2v7A10 10 0 0 0 22 12Z" />
              </SocialIcon>
              <SocialIcon href={SOCIAL.instagram} label="Instagram">
                <path d="M12 2.2c3.2 0 3.6 0 4.8.1 1.2.1 1.8.2 2.2.4.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.2.4.4 1 .4 2.2.1 1.2.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 1.2-.2 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.2-1 .4-2.2.4-1.2.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-1.2-.1-1.8-.2-2.2-.4-.6-.2-1-.5-1.4-.9a3.8 3.8 0 0 1-.9-1.4c-.2-.4-.4-1-.4-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.8c.1-1.2.2-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1-.4 2.2-.4 1.2-.1 1.6-.1 4.8-.1Zm0 1.8c-3.1 0-3.5 0-4.7.1-1.1.1-1.7.2-2.1.4-.5.2-.9.4-1.2.8-.4.4-.6.8-.8 1.2-.2.4-.3 1-.4 2.1-.1 1.2-.1 1.6-.1 4.7s0 3.5.1 4.7c.1 1.1.2 1.7.4 2.1.2.5.4.9.8 1.2.4.4.8.6 1.2.8.4.2 1 .3 2.1.4 1.2.1 1.6.1 4.7.1s3.5 0 4.7-.1c1.1-.1 1.7-.2 2.1-.4.5-.2.9-.4 1.2-.8.4-.4.6-.8.8-1.2.2-.4.3-1 .4-2.1.1-1.2.1-1.6.1-4.7s0-3.5-.1-4.7c-.1-1.1-.2-1.7-.4-2.1-.2-.5-.4-.9-.8-1.2-.4-.4-.8-.6-1.2-.8-.4-.2-1-.3-2.1-.4-1.2-.1-1.6-.1-4.7-.1Zm0 3.1a4.9 4.9 0 1 1 0 9.8 4.9 4.9 0 0 1 0-9.8Zm0 8.1a3.2 3.2 0 1 0 0-6.4 3.2 3.2 0 0 0 0 6.4Zm6.3-8.3a1.1 1.1 0 1 1-2.3 0 1.1 1.1 0 0 1 2.3 0Z" />
              </SocialIcon>
              <SocialIcon href={SOCIAL.twitter} label="X (Twitter)">
                <path d="M18.244 2H21.5l-7.5 8.57L22.5 22h-6.86l-5.36-7.02L4.2 22H1l8.05-9.2L1.5 2h7.04l4.85 6.41L18.244 2Zm-2.4 18h1.86L7.26 4H5.3l10.55 16Z" />
              </SocialIcon>
              <SocialIcon href={SOCIAL.threads} label="Threads">
                <path d="M17.6 11.4c-.1-.05-.2-.1-.3-.14-.18-3.36-2.01-5.29-5.08-5.31h-.04c-1.84 0-3.36.78-4.3 2.21l1.69 1.16c.7-1.07 1.8-1.3 2.6-1.3h.03c1 .01 1.76.3 2.25.86.36.41.6 1 .72 1.74-.9-.15-1.87-.2-2.9-.14-2.92.17-4.8 1.87-4.67 4.24.06 1.2.66 2.23 1.69 2.9.87.57 1.99.85 3.16.78 1.54-.08 2.74-.66 3.58-1.72.64-.81 1.04-1.86 1.22-3.18.74.45 1.29 1.04 1.6 1.75.52 1.2.55 3.18-1.06 4.78-1.41 1.4-3.11 2.01-5.67 2.03-2.84-.02-4.99-.93-6.39-2.7-1.31-1.66-1.98-4.06-2-7.13.02-3.07.69-5.47 2-7.13C7.06 3.83 9.21 2.92 12.05 2.9c2.86.02 5.04.94 6.49 2.72.71.88 1.25 1.98 1.6 3.27l1.9-.5c-.42-1.6-1.1-2.97-2-4.11C18.18 2.1 15.5.92 12.06.9h-.01C8.62.92 5.97 2.1 4.16 4.39 2.55 6.43 1.71 9.26 1.69 12.79c.02 3.53.86 6.36 2.47 8.4 1.81 2.3 4.46 3.47 7.9 3.49h.01c3.05-.02 5.21-.83 6.99-2.6 2.33-2.33 2.26-5.24 1.49-7.03-.55-1.28-1.6-2.32-3.04-2.99-.01-.34-.05-.69-.11-1.02Zm-5.27 5c-1.3.07-2.65-.51-2.72-1.78-.05-.94.66-1.99 2.79-2.11.25-.02.49-.02.72-.02.78 0 1.5.08 2.16.22-.25 3.07-1.7 3.6-2.95 3.69Z" />
              </SocialIcon>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-500">Sections</h3>
            <ul className="mt-3 space-y-2 text-sm">
              {CATEGORIES.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/category/${c.slug}`}
                    className="text-neutral-700 hover:text-brand dark:text-neutral-300"
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-500">Signal 24</h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-neutral-700 hover:text-brand dark:text-neutral-300">
                  About
                </Link>
              </li>
              <li>
                <a
                  href={`mailto:${SITE.email}`}
                  className="text-neutral-700 hover:text-brand dark:text-neutral-300"
                >
                  Contact
                </a>
              </li>
              <li>
                <Link href="/rss.xml" className="text-neutral-700 hover:text-brand dark:text-neutral-300">
                  RSS feed
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-neutral-700 hover:text-brand dark:text-neutral-300">
                  Newsroom CMS
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-neutral-200 pt-6 text-xs text-neutral-500 sm:flex-row dark:border-neutral-800">
          <p>© {year} Signal 24. All rights reserved.</p>
          <p>{SITE.tagline}</p>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 text-neutral-600 transition hover:border-brand hover:bg-brand hover:text-white dark:border-neutral-800 dark:text-neutral-300"
    >
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden>
        {children}
      </svg>
    </a>
  );
}
