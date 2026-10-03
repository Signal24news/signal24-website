import 'server-only';
import fs from 'fs';
import path from 'path';

export type Certificate = {
  id: string;
  name: string;
  program: string;
  cohort?: string;
  desk?: string;
  startDate?: string;
  endDate?: string;
  issued?: string;
  status: 'valid' | 'revoked';
  authorSlug?: string;
};

const DIR = path.join(process.cwd(), 'content', 'certificates');

/** Normalise what people type: trim, uppercase, and turn spaces into dashes. */
export function normaliseCertId(raw: string): string {
  return raw.trim().toUpperCase().replace(/\s+/g, '-');
}

export function findCertificate(rawId: string): Certificate | null {
  const id = normaliseCertId(rawId);
  if (!id || !fs.existsSync(DIR)) return null;
  for (const f of fs.readdirSync(DIR)) {
    if (!f.endsWith('.json')) continue;
    try {
      const data = JSON.parse(fs.readFileSync(path.join(DIR, f), 'utf8')) as Partial<Certificate>;
      if (data.id && normaliseCertId(data.id) === id) {
        return {
          id: normaliseCertId(data.id),
          name: data.name ?? '',
          program: data.program || 'Signal 24 Newsroom Internship',
          cohort: data.cohort || undefined,
          desk: data.desk || undefined,
          startDate: data.startDate || undefined,
          endDate: data.endDate || undefined,
          issued: data.issued || undefined,
          status: data.status === 'revoked' ? 'revoked' : 'valid',
          authorSlug: data.authorSlug || undefined,
        };
      }
    } catch {
      // skip unreadable files
    }
  }
  return null;
}

export function formatCertDate(value?: string): string | undefined {
  if (!value) return undefined;
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
}
