/** Signal 24 is edited in Pakistan, so dates and times are shown in Pakistan time (PKT). */
const TIME_ZONE = 'Asia/Karachi';

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: TIME_ZONE,
  });
}

export function formatDateTime(iso: string): string {
  const s = new Date(iso).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: TIME_ZONE,
  });
  return `${s} PKT`;
}
