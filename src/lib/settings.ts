import 'server-only';
import fs from 'fs';
import path from 'path';

export type InternshipSettings = {
  open: boolean;
  formUrl: string;
  applyBy: string;
};

/** Internship settings, edited in the CMS under Site settings > Internship page. */
export function getInternshipSettings(): InternshipSettings {
  const file = path.join(process.cwd(), 'content', 'settings', 'internship.json');
  try {
    const data = JSON.parse(fs.readFileSync(file, 'utf8')) as Partial<InternshipSettings>;
    return {
      open: data.open !== false,
      formUrl: (data.formUrl ?? '').trim(),
      applyBy: data.applyBy || '24 October 2026',
    };
  } catch {
    return { open: true, formUrl: '', applyBy: '24 October 2026' };
  }
}
