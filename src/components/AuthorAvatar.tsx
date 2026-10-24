import Image from 'next/image';
import type { Author } from '@/lib/constants';

/**
 * Author picture. Shows the real photo when there is one. Writers without a
 * photo get the Signal 24 "navy signal" avatar instead: a navy circle with the
 * blue signal waves and a female or male figure (CMS field "Avatar").
 */
export function AuthorAvatar({
  author,
  size,
  className = '',
  alt = '',
  priority = false,
}: {
  author: Pick<Author, 'name' | 'image' | 'hasPhoto' | 'avatar'>;
  size: number;
  className?: string;
  alt?: string;
  priority?: boolean;
}) {
  if (author.hasPhoto) {
    return (
      <Image
        src={author.image}
        alt={alt}
        width={size}
        height={size}
        priority={priority}
        className={`shrink-0 rounded-full object-cover ${className}`}
      />
    );
  }
  return <SignalAvatar kind={author.avatar ?? 'female'} size={size} className={className} label={alt} />;
}

export function SignalAvatar({
  kind,
  size,
  className = '',
  label = '',
}: {
  kind: 'female' | 'male';
  size: number;
  className?: string;
  label?: string;
}) {
  const id = `s24av-${kind}`;
  return (
    <svg
      viewBox="0 0 96 96"
      width={size}
      height={size}
      className={`shrink-0 rounded-full ${className}`}
      role={label ? 'img' : undefined}
      aria-label={label || undefined}
      aria-hidden={label ? undefined : true}
    >
      <defs>
        <clipPath id={id}>
          <circle cx="48" cy="48" r="48" />
        </clipPath>
      </defs>
      <g clipPath={`url(#${id})`}>
        <rect width="96" height="96" fill="#0E1733" />
        {/* Signal waves, as in the Signal 24 mark */}
        <path d="M64 13a30 30 0 0 1 19 19" stroke="#4467FE" strokeWidth="4" strokeLinecap="round" fill="none" />
        <path d="M65 3a40 40 0 0 1 28 28" stroke="#4467FE" strokeWidth="4" strokeLinecap="round" fill="none" opacity="0.5" />
        {kind === 'female' ? (
          <>
            {/* Long hair, falling behind the shoulders */}
            <path d="M48 24c-12 0-19 9-19 21 0 10-2 22-8 31h54c-6-9-8-21-8-31 0-12-7-21-19-21z" fill="#99ADF9" />
            <circle cx="48" cy="45" r="11" fill="#FFFFFF" />
            {/* Fringe */}
            <path d="M36.5 44c1-9 6-14 11.5-14s11 5 11.5 13c-7-1-13-4-16-8-2 4-4 7-7 9z" fill="#99ADF9" />
            <path d="M22 100c0-17 11-27 26-27s26 10 26 27z" fill="#FFFFFF" />
          </>
        ) : (
          <>
            <circle cx="48" cy="41" r="14" fill="#FFFFFF" />
            {/* Short hair */}
            <path d="M34 39c0-10 6-16 14-16s14 6 14 16c-3-5-8-7-14-7s-11 2-14 7z" fill="#99ADF9" />
            <path d="M18 100c0-18 13-30 30-30s30 12 30 30z" fill="#FFFFFF" />
          </>
        )}
      </g>
    </svg>
  );
}
