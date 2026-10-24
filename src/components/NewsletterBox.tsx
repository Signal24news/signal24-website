'use client';

import { useState } from 'react';

/** Inline newsletter sign-up for the homepage. Posts to the same Beehiiv route as the popup. */
export function NewsletterBox() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'done' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus('error');
      setErrorMsg('Please enter a valid email address.');
      return;
    }
    setStatus('submitting');
    setErrorMsg(null);
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'signal24-homepage' }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        setStatus('error');
        setErrorMsg(data.error ?? 'Could not complete sign-up. Please try again.');
        return;
      }
      try {
        localStorage.setItem('signal24_subscribe_v2', '1');
      } catch {
        // non-fatal
      }
      setStatus('done');
    } catch {
      setStatus('error');
      setErrorMsg('Network error. Please check your connection and try again.');
    }
  }

  return (
    <section
      id="newsletter"
      aria-labelledby="newsletter-title"
      className="my-11 scroll-mt-28 overflow-hidden rounded-xl bg-brand-50 px-6 py-8 md:px-9 md:py-9 dark:bg-brand-900/40"
    >
      <div className="grid items-center gap-6 md:grid-cols-2">
        <div>
          <p className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-brand-700 dark:text-brand-300">Signal 24 Weekly</p>
          <h2 id="newsletter-title" className="mt-2 text-2xl font-black tracking-tight md:text-[1.75rem]">
            The week&apos;s biggest stories, explained.
          </h2>
          <p className="mt-2 text-[15px] text-neutral-600 dark:text-neutral-300">Free, every Sunday. No spam, unsubscribe anytime.</p>
        </div>

        {status === 'done' ? (
          <p className="rounded-lg bg-white px-4 py-3 text-sm font-medium dark:bg-neutral-900">
            Thanks, you&apos;re on the list. Check your inbox for a welcome email.
          </p>
        ) : (
          <form onSubmit={submit} className="w-full">
            <div className="flex flex-col gap-2 sm:flex-row">
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                required
                placeholder="you@example.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status === 'error') {
                    setStatus('idle');
                    setErrorMsg(null);
                  }
                }}
                className="min-w-0 flex-1 rounded-full border border-brand-200 bg-white px-5 py-3 text-[15px] text-neutral-900 placeholder:text-neutral-500 outline-none focus:border-brand focus:ring-2 focus:ring-brand/30 dark:border-neutral-700 dark:bg-neutral-900 dark:text-white"
              />
              <button
                type="submit"
                disabled={status === 'submitting'}
                className="rounded-full bg-brand-600 px-6 py-3 text-[15px] font-bold text-white transition hover:bg-brand-700 disabled:opacity-60"
              >
                {status === 'submitting' ? 'Signing up…' : 'Subscribe'}
              </button>
            </div>
            {status === 'error' && errorMsg && <p className="mt-2 text-xs text-red-700 dark:text-red-300">{errorMsg}</p>}
          </form>
        )}
      </div>
    </section>
  );
}
