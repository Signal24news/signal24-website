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
      aria-labelledby="newsletter-title"
      className="mt-12 overflow-hidden rounded-2xl bg-[#0E1733] px-6 py-8 text-white md:px-10 md:py-10"
    >
      <div className="grid items-center gap-6 md:grid-cols-2">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-300">The Signal 24 brief</p>
          <h2 id="newsletter-title" className="mt-2 text-2xl font-extrabold tracking-tight md:text-3xl">
            The day&apos;s biggest stories, explained.
          </h2>
          <p className="mt-2 text-sm text-white/70">Free, every morning. No spam, unsubscribe anytime.</p>
        </div>

        {status === 'done' ? (
          <p className="rounded-lg bg-white/10 px-4 py-3 text-sm font-medium">
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
                className="min-w-0 flex-1 rounded-lg border border-white/15 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/50 outline-none focus:border-brand focus:ring-2 focus:ring-brand/40"
              />
              <button
                type="submit"
                disabled={status === 'submitting'}
                className="rounded-lg bg-brand px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-600 disabled:opacity-60"
              >
                {status === 'submitting' ? 'Signing up…' : 'Subscribe'}
              </button>
            </div>
            {status === 'error' && errorMsg && <p className="mt-2 text-xs text-red-300">{errorMsg}</p>}
          </form>
        )}
      </div>
    </section>
  );
}
