'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * "Listen to this story": reads the article aloud with the browser's own
 * text-to-speech (Web Speech API). Free, no API key, nothing leaves the page.
 * The text is split into short chunks because some browsers stop long utterances.
 */

type Status = 'idle' | 'playing' | 'paused';

const RATES = [1, 1.25, 0.85];

function buildChunks(text: string): string[] {
  const sentences = text
    .replace(/\s+/g, ' ')
    .split(/(?<=[.!?:])\s+/)
    .map((s) => s.trim())
    .filter(Boolean);
  const chunks: string[] = [];
  let cur = '';
  for (const s of sentences) {
    if ((cur + ' ' + s).length > 220 && cur) {
      chunks.push(cur);
      cur = s;
    } else {
      cur = cur ? `${cur} ${s}` : s;
    }
  }
  if (cur) chunks.push(cur);
  return chunks;
}

function pickVoice(): SpeechSynthesisVoice | null {
  const voices = window.speechSynthesis.getVoices().filter((v) => v.lang.toLowerCase().startsWith('en'));
  if (!voices.length) return null;
  const score = (v: SpeechSynthesisVoice) =>
    (/natural|neural|online/i.test(v.name) ? 4 : 0) +
    (/google/i.test(v.name) ? 3 : 0) +
    (/en-gb/i.test(v.lang) ? 1 : 0) +
    (v.localService ? 0 : 1);
  return [...voices].sort((a, b) => score(b) - score(a))[0];
}

export function ListenButton({ targetId }: { targetId: string }) {
  const [supported, setSupported] = useState(false);
  const [status, setStatus] = useState<Status>('idle');
  const [rateIdx, setRateIdx] = useState(0);
  const chunks = useRef<string[]>([]);
  const index = useRef(0);
  const runId = useRef(0);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      setSupported(true);
      window.speechSynthesis.getVoices(); // warm up the voice list
    }
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) window.speechSynthesis.cancel();
    };
  }, []);

  function collectText() {
    const root = document.getElementById(targetId);
    if (!root) return '';
    const parts: string[] = [];
    root.querySelectorAll('[data-listen]').forEach((el) => {
      const t = (el as HTMLElement).innerText.trim();
      if (t) parts.push(t.endsWith('.') ? t : `${t}.`);
    });
    return parts.join(' ');
  }

  function speakFrom(i: number, rate: number) {
    const synth = window.speechSynthesis;
    synth.cancel();
    const id = ++runId.current;
    const voice = pickVoice();
    const next = (n: number) => {
      if (id !== runId.current) return;
      if (n >= chunks.current.length) {
        index.current = 0;
        setStatus('idle');
        return;
      }
      index.current = n;
      const u = new SpeechSynthesisUtterance(chunks.current[n]);
      if (voice) u.voice = voice;
      u.lang = voice?.lang ?? 'en-GB';
      u.rate = rate;
      u.onend = () => next(n + 1);
      u.onerror = (e) => {
        if (e.error !== 'interrupted' && e.error !== 'canceled') next(n + 1);
      };
      synth.speak(u);
    };
    setStatus('playing');
    next(i);
  }

  function play() {
    if (status === 'paused') {
      speakFrom(index.current, RATES[rateIdx]);
      return;
    }
    chunks.current = buildChunks(collectText());
    if (!chunks.current.length) return;
    speakFrom(0, RATES[rateIdx]);
  }

  function pause() {
    runId.current++;
    window.speechSynthesis.cancel();
    setStatus('paused');
  }

  function stop() {
    runId.current++;
    window.speechSynthesis.cancel();
    index.current = 0;
    setStatus('idle');
  }

  function cycleRate() {
    const ni = (rateIdx + 1) % RATES.length;
    setRateIdx(ni);
    if (status === 'playing') speakFrom(index.current, RATES[ni]);
  }

  if (!supported) return null;

  return (
    <div className="flex items-center gap-2" role="group" aria-label="Listen to this story">
      <button
        type="button"
        onClick={status === 'playing' ? pause : play}
        className="inline-flex items-center gap-2 rounded-full bg-brand px-4 py-2 text-sm font-bold text-white shadow-sm transition hover:bg-brand-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
        aria-pressed={status === 'playing'}
      >
        {status === 'playing' ? <PauseIcon /> : <PlayIcon />}
        {status === 'playing' ? 'Pause' : status === 'paused' ? 'Resume' : 'Listen to this story'}
      </button>
      {status !== 'idle' && (
        <>
          <button
            type="button"
            onClick={cycleRate}
            className="rounded-full px-3 py-2 text-xs font-bold text-neutral-700 ring-1 ring-neutral-200 hover:ring-brand dark:text-neutral-200 dark:ring-neutral-700"
            aria-label="Change reading speed"
          >
            {RATES[rateIdx]}x
          </button>
          <button
            type="button"
            onClick={stop}
            className="rounded-full px-3 py-2 text-xs font-bold text-neutral-700 ring-1 ring-neutral-200 hover:ring-brand dark:text-neutral-200 dark:ring-neutral-700"
          >
            Stop
          </button>
        </>
      )}
    </div>
  );
}

function PlayIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5z" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <rect x="6" y="5" width="4" height="14" rx="1" />
      <rect x="14" y="5" width="4" height="14" rx="1" />
    </svg>
  );
}
