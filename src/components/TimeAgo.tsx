'use client';

import { useEffect, useState } from 'react';
import { formatDate } from '@/lib/format';

/**
 * Shows "2 hours ago" style times for recent stories, and a normal date for
 * anything older than a week. The server renders the plain date first, so the
 * page still makes sense before JavaScript loads.
 */
export function relativeTime(iso: string, now = Date.now()): string {
  const diff = Math.max(0, now - new Date(iso).getTime());
  const min = Math.floor(diff / 60_000);
  if (min < 1) return 'Just now';
  if (min < 60) return `${min} min ago`;
  const hrs = Math.floor(min / 60);
  if (hrs < 24) return `${hrs} ${hrs === 1 ? 'hour' : 'hours'} ago`;
  const days = Math.floor(hrs / 24);
  if (days < 7) return days === 1 ? 'Yesterday' : `${days} days ago`;
  return formatDate(iso);
}

export function TimeAgo({ date, className }: { date: string; className?: string }) {
  const [label, setLabel] = useState(() => formatDate(date));

  useEffect(() => {
    const update = () => setLabel(relativeTime(date));
    update();
    const id = window.setInterval(update, 60_000);
    return () => window.clearInterval(id);
  }, [date]);

  return (
    <time dateTime={date} title={new Date(date).toUTCString()} className={className} suppressHydrationWarning>
      {label}
    </time>
  );
}
