'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Logo } from './Logo';
import { ThemeToggle } from './ThemeToggle';
import { SearchBar } from './SearchBar';
import { CATEGORIES, SITE } from '@/lib/constants';

const UTILITY_LINKS = [
  { href: '/about', label: 'About' },
  { href: '/team', label: 'Our newsroom' },
  { href: '/contact', label: 'Contact' },
  { href: '/contact', label: 'Send a tip' },
  { href: '/editorial-policy', label: 'Editorial Policy' },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close the mobile menu after navigating.
  useEffect(() => setOpen(false), [pathname]);

  return (
    <>
      {/* Thin navy utility bar (desktop only) */}
      <div className="hidden bg-[#0E1733] text-[13px] text-[#C9D2EA] md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2">
          <span className="font-medium">Independent digital news · {SITE.tagline}</span>
          <ul className="flex items-center gap-5">
            <li>
              <Link href="/#newsletter" className="font-semibold text-white hover:underline">
                Newsletter
              </Link>
            </li>
            {UTILITY_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-white hover:underline">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <header className="sticky top-0 z-40 border-b border-neutral-200 bg-white dark:border-neutral-800 dark:bg-ink">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 lg:py-4">
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-md text-neutral-800 lg:hidden dark:text-neutral-100"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
                {open ? (
                  <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
                ) : (
                  <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
                )}
              </svg>
            </button>
            <div className="flex flex-col">
              <Logo />
              <span className="mt-1 hidden pl-[46px] text-[11px] font-bold uppercase tracking-[0.16em] text-brand-600 sm:block dark:text-brand-300">
                {SITE.tagline}
              </span>
            </div>
          </div>

          <nav aria-label="Sections" className="hidden lg:block">
            <ul className="flex items-center gap-1 text-[15px] font-bold">
              {CATEGORIES.map((c) => {
                const active = pathname === `/category/${c.slug}`;
                return (
                  <li key={c.slug}>
                    <Link
                      href={`/category/${c.slug}`}
                      aria-current={active ? 'page' : undefined}
                      className={`whitespace-nowrap border-b-[3px] px-2.5 py-2 transition xl:px-3 ${
                        active
                          ? 'border-brand text-brand-600 dark:text-brand-300'
                          : 'border-transparent text-neutral-900 hover:border-brand hover:text-brand-600 dark:text-neutral-100 dark:hover:text-brand-300'
                      }`}
                    >
                      {c.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/search"
              aria-label="Search"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-neutral-200 text-neutral-800 transition hover:border-brand hover:text-brand-600 dark:border-neutral-800 dark:text-neutral-100"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2.2" />
                <path d="m20 20-3.5-3.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
              </svg>
            </Link>
            <ThemeToggle />
            <Link
              href="/#newsletter"
              className="hidden rounded-full bg-brand-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-brand-700 sm:inline-block"
            >
              Subscribe
            </Link>
          </div>
        </div>

        {/* Mobile: swipeable section strip */}
        <nav aria-label="Sections" className="no-scrollbar overflow-x-auto border-t border-neutral-200 lg:hidden dark:border-neutral-800">
          <ul className="flex gap-5 whitespace-nowrap px-4 py-2.5 text-sm font-bold">
            <li>
              <Link href="/" className={pathname === '/' ? 'text-brand-600 dark:text-brand-300' : ''}>
                Top
              </Link>
            </li>
            {CATEGORIES.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/category/${c.slug}`}
                  className={
                    pathname === `/category/${c.slug}`
                      ? 'text-brand-600 dark:text-brand-300'
                      : 'text-neutral-800 dark:text-neutral-100'
                  }
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {open && (
          <div className="border-t border-neutral-200 bg-white lg:hidden dark:border-neutral-800 dark:bg-ink">
            <div className="mx-auto max-w-7xl px-4 py-4">
              <SearchBar compact />
              <ul className="mt-4 grid grid-cols-2 gap-1 text-[15px] font-semibold">
                {CATEGORIES.map((c) => (
                  <li key={c.slug}>
                    <Link
                      href={`/category/${c.slug}`}
                      className="block rounded-md px-3 py-2.5 text-neutral-900 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-900"
                    >
                      {c.name}
                    </Link>
                  </li>
                ))}
              </ul>
              <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2 border-t border-neutral-200 px-3 pt-3 text-sm text-neutral-600 dark:border-neutral-800 dark:text-neutral-300">
                <li>
                  <Link href="/#newsletter" className="font-semibold text-brand-600 dark:text-brand-300">
                    Newsletter
                  </Link>
                </li>
                {UTILITY_LINKS.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href}>{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
