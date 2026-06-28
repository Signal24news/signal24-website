'use client';

import { useEffect, useState } from 'react';

const STORAGE_KEY = 'signal24_subscribe_v2';
const DISMISSED_KEY = 'signal24_subscribe_dismissed_v1';

export function SubscribePopup({
  delayMs = 25_000,
  scrollPct = 25,
}: {
  delayMs?: number;
  scrollPct?: number;
}) {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'done' | 'error'>('idle');

  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      if (localStorage.getItem(STORAGE_KEY)) return;
      const dismissedAt = Number(localStorage.getItem(DISMISSED_KEY) ?? 0);
      // Don't re-show within 7 days of a dismiss.
      if (dismissedAt && Date.now() - dismissedAt < 7 * 24 * 60 * 60 * 1000) return;
    } catch {
      // ignore storage errors and still show popup
    }

    let timer: number | undefined;
    let shown = false;

    const show = () => {
      if (shown) return;
      shown = true;
      setOpen(true);
      window.removeEventListener('scroll', onScroll);
      if (timer) window.clearTimeout(timer);
    };

    const onScroll = () => {
      const doc = document.documentElement;
      const scrolled = window.scrollY / (doc.scrollHeight - doc.clientHeight || 1);
      if (scrolled * 100 >= scrollPct) show();
    };

    timer = window.setTimeout(show, delayMs);
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      if (timer) window.clearTimeout(timer);
      window.removeEventListener('scroll', onScroll);
    };
  }, [delayMs, scrollPct]);

  function close(persist = true) {
    setOpen(false);
    if (persist) {
      try {
        localStorage.setItem(DISMISSED_KEY, String(Date.now()));
      } catch {
        // ignore
      }
    }
  }

  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus('error');
      setErrorMsg('Please enter a valid email address.');
      return;
    }
    setStatus('submitting');
    setErrorMsg(null);

    try {
      // eslint-disable-next-line no-console
      console.log('[Signal 24] subscribing:', email);
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'signal24-popup' }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string; ok?: boolean };
      // eslint-disable-next-line no-console
      console.log('[Signal 24] subscribe response:', res.status, data);

      if (!res.ok) {
        setStatus('error');
        setErrorMsg(data.error ?? 'Could not complete sign-up. Please try again.');
        return;
      }

      try {
        localStorage.setItem(STORAGE_KEY, '1');
      } catch {
        // storage failure is non-fatal
      }
      setStatus('done');
      setTimeout(() => setOpen(false), 2200);
    } catch {
      setStatus('error');
      setErrorMsg('Network error — please check your connection and try again.');
    }
  }

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="subscribe-title"
      className="fixed bottom-4 right-4 left-4 z-40 sm:left-auto sm:bottom-6 sm:right-6 sm:max-w-sm"
    >
      <div className="relative overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-2xl animate-slide-up dark:border-neutral-800 dark:bg-neutral-900">
        <button
          type="button"
          onClick={() => close()}
          aria-label="Close"
          className="absolute right-2 top-2 inline-flex h-8 w-8 items-center justify-center rounded-full text-neutral-500 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800"
        >
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" aria-hidden>
            <path
              d="M6 6l12 12M18 6L6 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>

        <div className="flex items-start gap-3 p-4 pr-10">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-brand text-white">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden>
              <path
                d="M3 7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                d="m3 7 9 7 9-7"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="min-w-0">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-brand">
              The Signal 24 brief
            </p>
            <h2
              id="subscribe-title"
              className="mt-0.5 text-base font-extrabold leading-snug text-neutral-900 dark:text-white"
            >
              Top stories, every morning.
            </h2>
          </div>
        </div>

        <div className="px-4 pb-4">
          {status === 'done' ? (
            <p className="rounded-md bg-green-50 px-3 py-2 text-sm text-green-700 dark:bg-green-950 dark:text-green-300">
              ✓ Thanks — you’re on the list.
            </p>
          ) : (
            <>
              <p className="text-xs text-neutral-600 dark:text-neutral-400">
                Free daily digest. No spam. Unsubscribe anytime.
              </p>
              <form onSubmit={submit} className="mt-3 flex gap-2">
                <input
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
                  className="min-w-0 flex-1 rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/30 dark:border-neutral-700 dark:bg-neutral-800"
                />
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="shrink-0 rounded-md bg-brand px-3 py-2 text-sm font-semibold text-white transition hover:bg-brand-600 disabled:opacity-60"
                >
                  {status === 'submitting' ? '…' : 'Subscribe'}
                </button>
              </form>
              {status === 'error' && errorMsg && (
                <p className="mt-2 text-xs text-red-600">{errorMsg}</p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
