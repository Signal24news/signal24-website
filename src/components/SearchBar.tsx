'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function SearchBar({ compact = false }: { compact?: boolean }) {
  const router = useRouter();
  const [q, setQ] = useState('');

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (q.trim()) router.push(`/search?q=${encodeURIComponent(q.trim())}`);
      }}
      className={`relative flex items-center ${compact ? 'w-full' : 'w-56'}`}
      role="search"
    >
      <svg
        aria-hidden
        viewBox="0 0 24 24"
        fill="none"
        className="absolute left-3 h-4 w-4 text-neutral-400"
      >
        <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
        <path d="m20 20-3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        type="search"
        placeholder="Search news…"
        aria-label="Search news"
        className="w-full rounded-md border border-neutral-200 bg-white py-2 pl-9 pr-3 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/30 dark:border-neutral-800 dark:bg-neutral-900"
      />
    </form>
  );
}
