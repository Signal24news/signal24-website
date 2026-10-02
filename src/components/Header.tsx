'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { Logo } from './Logo';
import { ThemeToggle } from './ThemeToggle';
import { SearchBar } from './SearchBar';
import { MORE_CATEGORIES, PRIMARY_CATEGORIES } from '@/lib/constants';

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
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-neutral-200 text-neutral-700 lg:hidden dark:border-neutral-800 dark:text-neutral-200"
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

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-0.5 text-sm font-medium">
            {PRIMARY_CATEGORIES.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/category/${c.slug}`}
                  className="whitespace-nowrap rounded-md px-3 py-2 font-semibold text-neutral-800 transition hover:bg-neutral-100 hover:text-brand dark:text-neutral-100 dark:hover:bg-neutral-900"
                >
                  {c.name}
                </Link>
              </li>
            ))}
            <li>
              <MoreMenu />
            </li>
            <li>
              <Link
                href="/about"
                className="whitespace-nowrap rounded-md px-2.5 py-2 text-neutral-700 transition hover:bg-neutral-100 hover:text-brand dark:text-neutral-200 dark:hover:bg-neutral-900"
              >
                About
              </Link>
            </li>
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden 2xl:block">
            <SearchBar />
          </div>
          <ThemeToggle />
        </div>
      </div>

      {open && (
        <div className="border-t border-neutral-200 bg-white lg:hidden dark:border-neutral-800 dark:bg-ink">
          <div className="mx-auto max-w-7xl px-4 py-3">
            <SearchBar compact />
            <ul className="mt-3 grid grid-cols-3 gap-1 text-sm font-semibold">
              {PRIMARY_CATEGORIES.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/category/${c.slug}`}
                    onClick={() => setOpen(false)}
                    className="block rounded-md bg-neutral-50 px-3 py-2 text-center text-neutral-900 hover:bg-neutral-100 hover:text-brand dark:bg-neutral-900 dark:text-white dark:hover:bg-neutral-800"
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-4 px-3 text-[11px] font-bold uppercase tracking-wider text-neutral-500">More</p>
            <ul className="mt-1 grid grid-cols-2 gap-1 text-sm font-medium">
              {MORE_CATEGORIES.map((c) => (
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

function MoreMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-1 whitespace-nowrap rounded-md px-3 py-2 text-neutral-700 transition hover:bg-neutral-100 hover:text-brand dark:text-neutral-200 dark:hover:bg-neutral-900"
      >
        More
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden className={`transition ${open ? 'rotate-180' : ''}`}>
          <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open && (
        <div className="absolute left-0 top-full z-50 pt-1">
          <ul className="w-48 overflow-hidden rounded-lg border border-neutral-200 bg-white py-1 shadow-lg dark:border-neutral-800 dark:bg-neutral-900">
            {MORE_CATEGORIES.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/category/${c.slug}`}
                  onClick={() => setOpen(false)}
                  className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50 hover:text-brand dark:text-neutral-200 dark:hover:bg-neutral-800"
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
