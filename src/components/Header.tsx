'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Logo } from './Logo';
import { ThemeToggle } from './ThemeToggle';
import { SearchBar } from './SearchBar';
import { CATEGORIES } from '@/lib/constants';

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-neutral-200 bg-white/85 backdrop-blur dark:border-neutral-800 dark:bg-ink/85">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label="Open menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-neutral-200 text-neutral-700 md:hidden dark:border-neutral-800 dark:text-neutral-200"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M4 6h16M4 12h16M4 18h16"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
          <Logo />
        </div>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-1 text-sm font-medium">
            {CATEGORIES.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/category/${c.slug}`}
                  className="rounded-md px-3 py-2 text-neutral-700 transition hover:bg-neutral-100 hover:text-brand dark:text-neutral-200 dark:hover:bg-neutral-900"
                >
                  {c.name}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/about"
                className="rounded-md px-3 py-2 text-neutral-700 transition hover:bg-neutral-100 hover:text-brand dark:text-neutral-200 dark:hover:bg-neutral-900"
              >
                About
              </Link>
            </li>
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden lg:block">
            <SearchBar />
          </div>
          <ThemeToggle />
        </div>
      </div>

      {open && (
        <div className="border-t border-neutral-200 bg-white md:hidden dark:border-neutral-800 dark:bg-ink">
          <div className="mx-auto max-w-7xl px-4 py-3">
            <SearchBar compact />
            <ul className="mt-3 grid grid-cols-2 gap-1 text-sm font-medium">
              {CATEGORIES.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/category/${c.slug}`}
                    onClick={() => setOpen(false)}
                    className="block rounded-md px-3 py-2 text-neutral-700 hover:bg-neutral-100 dark:text-neutral-200 dark:hover:bg-neutral-900"
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/about"
                  onClick={() => setOpen(false)}
                  className="block rounded-md px-3 py-2 text-neutral-700 hover:bg-neutral-100 dark:text-neutral-200 dark:hover:bg-neutral-900"
                >
                  About
                </Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </header>
  );
}
