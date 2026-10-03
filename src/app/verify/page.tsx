import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE } from '@/lib/constants';
import { findCertificate, formatCertDate, normaliseCertId } from '@/lib/certificates';

// Results depend on the ID in the URL, so this page is rendered on request.
export const dynamic = 'force-dynamic';

export function generateMetadata({ searchParams }: { searchParams: { id?: string } }): Metadata {
  const hasId = Boolean(searchParams.id);
  return {
    title: 'Verify a certificate',
    description:
      'Check that a Signal 24 internship or programme certificate is genuine by entering its certificate ID.',
    alternates: { canonical: '/verify' },
    // Individual lookups should not appear in search results.
    robots: hasId ? { index: false, follow: false } : undefined,
  };
}

export default function VerifyPage({ searchParams }: { searchParams: { id?: string } }) {
  const raw = (searchParams.id ?? '').slice(0, 64);
  const id = raw ? normaliseCertId(raw) : '';
  const cert = id ? findCertificate(id) : null;

  return (
    <div className="mx-auto max-w-2xl px-4 py-14 md:py-20">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand">Certificates</p>
      <h1 className="mt-2 text-3xl font-extrabold tracking-tight md:text-4xl">Verify a certificate</h1>
      <p className="mt-4 text-neutral-600 dark:text-neutral-300">
        Every certificate issued by Signal 24 has a unique ID, printed on the certificate. Enter it
        below to confirm it is genuine.
      </p>

      <form action="/verify" method="get" className="mt-8 flex flex-col gap-2 sm:flex-row">
        <label htmlFor="cert-id" className="sr-only">
          Certificate ID
        </label>
        <input
          id="cert-id"
          name="id"
          defaultValue={id}
          required
          placeholder="e.g. S24-INT-2026-001"
          autoComplete="off"
          spellCheck={false}
          className="min-w-0 flex-1 rounded-lg border border-neutral-300 bg-white px-4 py-3 font-mono text-sm uppercase outline-none focus:border-brand focus:ring-2 focus:ring-brand/30 dark:border-neutral-700 dark:bg-neutral-900"
        />
        <button
          type="submit"
          className="rounded-lg bg-brand px-6 py-3 text-sm font-bold text-white transition hover:bg-brand-600"
        >
          Verify
        </button>
      </form>

      {id && !cert && (
        <div role="status" className="mt-8 rounded-xl border border-red-200 bg-red-50 p-6 dark:border-red-900 dark:bg-red-950/40">
          <p className="font-bold text-red-700 dark:text-red-300">No certificate found</p>
          <p className="mt-2 text-sm text-red-700/80 dark:text-red-300/80">
            We could not find a certificate with the ID <span className="font-mono">{id}</span>. Check
            the ID and try again. If you think this is a mistake, write to{' '}
            <a href={`mailto:${SITE.careersEmail}`} className="underline">
              {SITE.careersEmail}
            </a>
            .
          </p>
        </div>
      )}

      {cert && cert.status === 'revoked' && (
        <div role="status" className="mt-8 rounded-xl border border-amber-200 bg-amber-50 p-6 dark:border-amber-900 dark:bg-amber-950/40">
          <p className="font-bold text-amber-800 dark:text-amber-300">This certificate has been revoked</p>
          <p className="mt-2 text-sm text-amber-800/80 dark:text-amber-300/80">
            Certificate <span className="font-mono">{cert.id}</span> is no longer valid. For details,
            write to{' '}
            <a href={`mailto:${SITE.careersEmail}`} className="underline">
              {SITE.careersEmail}
            </a>
            .
          </p>
        </div>
      )}

      {cert && cert.status === 'valid' && (
        <div role="status" className="mt-8 overflow-hidden rounded-xl border border-emerald-200 dark:border-emerald-900">
          <div className="flex items-center gap-3 bg-emerald-50 px-6 py-4 dark:bg-emerald-950/40">
            <span
              aria-hidden
              className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-600 text-white"
            >
              ✓
            </span>
            <p className="font-bold text-emerald-800 dark:text-emerald-300">Valid certificate</p>
          </div>
          <dl className="grid gap-4 p-6 text-sm sm:grid-cols-2">
            <Row label="Certificate ID" value={<span className="font-mono">{cert.id}</span>} />
            <Row label="Awarded to" value={<span className="font-bold">{cert.name}</span>} />
            <Row label="Program" value={cert.program} />
            {cert.cohort && <Row label="Cohort" value={cert.cohort} />}
            {cert.desk && <Row label="Desk" value={cert.desk} />}
            {(cert.startDate || cert.endDate) && (
              <Row
                label="Dates"
                value={[formatCertDate(cert.startDate), formatCertDate(cert.endDate)].filter(Boolean).join(' to ')}
              />
            )}
            {cert.issued && <Row label="Issued on" value={formatCertDate(cert.issued)} />}
            {cert.authorSlug && (
              <Row
                label="Published work"
                value={
                  <Link href={`/author/${cert.authorSlug}`} className="font-semibold text-brand hover:underline">
                    View author profile →
                  </Link>
                }
              />
            )}
          </dl>
        </div>
      )}

      <p className="mt-10 text-xs text-neutral-500">
        Signal 24 never charges for its programs or certificates.
      </p>
    </div>
  );
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div>
      <dt className="text-[11px] font-bold uppercase tracking-wider text-neutral-500">{label}</dt>
      <dd className="mt-1 text-neutral-900 dark:text-neutral-100">{value}</dd>
    </div>
  );
}
