'use client';

import { useEffect, useState } from 'react';
import { formatDateTime } from '@/lib/format';

/**
 * Shows a date and time in the reader's own time zone (e.g. "Oct 25, 2026, 02:20 AM GMT+5"
 * in Pakistan, "Oct 24, 2026, 10:20 PM BST" in the UK). The page is first rendered in
 * Pakistan time (PKT), which is what search engines and readers without JavaScript see.
 */
export function LocalTime({ iso }: { iso: string }) {
  const [label, setLabel] = useState(() => formatDateTime(iso));

  useEffect(() => {
    try {
      setLabel(
        new Date(iso).toLocaleString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          timeZoneName: 'short',
        }),
      );
    } catch {
      // keep the Pakistan time label
    }
  }, [iso]);

  return (
    <time dateTime={iso} suppressHydrationWarning>
      {label}
    </time>
  );
}
