import 'server-only';
import fs from 'fs';
import path from 'path';
import type { Author } from './constants';

const AUTHORS_DIR = path.join(process.cwd(), 'content', 'authors');

let cache: Author[] | null = null;

/** All author profiles from content/authors, founder first. */
export function getAuthors(): Author[] {
  if (cache) return cache;
  if (!fs.existsSync(AUTHORS_DIR)) return [];
  // Note: never let one bad file take the whole site down.
  const authors = fs
    .readdirSync(AUTHORS_DIR)
    .filter((f) => f.endsWith('.json'))
    .map((f) => {
      let data: Partial<Author> = {};
      try {
        data = JSON.parse(fs.readFileSync(path.join(AUTHORS_DIR, f), 'utf8')) as Partial<Author>;
      } catch {
        return null;
      }
      const slug = (data.slug || f.replace(/\.json$/, '')).trim();
      return {
        slug,
        name: (data.name ?? '').trim(),
        role: data.role ?? 'Contributor',
        image: data.image || '/icon-512.png',
        shortBio: data.shortBio ?? '',
        bio: Array.isArray(data.bio) ? data.bio.filter(Boolean) : [],
        linkedin: data.linkedin || undefined,
        email: data.email || undefined,
        order: typeof data.order === 'number' ? data.order : 100,
      } satisfies Author;
    })
    .filter((a): a is NonNullable<typeof a> => a !== null && Boolean(a.name && a.slug))
    .sort((a, b) => (a.order ?? 100) - (b.order ?? 100) || a.name.localeCompare(b.name));
  cache = authors;
  return authors;
}

export function getAuthorBySlug(slug: string): Author | undefined {
  return getAuthors().find((a) => a.slug === slug);
}

/** Match the author name written on an article to a profile. */
export function findAuthor(name: string | undefined): Author | undefined {
  if (!name) return undefined;
  const n = name.trim().toLowerCase();
  return getAuthors().find((a) => a.name.toLowerCase() === n);
}

const FALLBACK_FOUNDER: Author = {
  slug: 'saad-ali',
  name: 'Saad Ali',
  role: 'Founder & Editor',
  image: '/team/saad-ali.jpg',
  shortBio: 'Saad Ali is the founder and editor of Signal 24.',
  bio: [],
  email: 'news@signal24.info',
};

/** The founder profile. Falls back to a built-in copy so no page can crash if the file is missing. */
export function getFounder(): Author {
  return getAuthors()[0] ?? FALLBACK_FOUNDER;
}
