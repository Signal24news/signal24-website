export const SITE = {
  name: 'Signal 24',
  tagline: 'Global news, explained.',
  description:
    "Signal 24 explains the world's biggest stories, from geopolitics and the Middle East to business, AI and sports. Clear reporting, no noise.",
  url: 'https://signal24.info',
  email: 'news@signal24.info',
  tipsEmail: 'tips@signal24.info',
  correctionsEmail: 'corrections@signal24.info',
  locale: 'en_US',
  twitterHandle: '@Signal24info',
  logo: 'https://signal24.info/icon-512.png',
  founded: '2026',
};

export const CATEGORIES = [
  { slug: 'world', name: 'World', blurb: 'Global news and geopolitics, explained.' },
  { slug: 'middle-east', name: 'Middle East', blurb: 'Conflicts, diplomacy and power across the Middle East.' },
  { slug: 'business', name: 'Business', blurb: 'Markets, oil, trade and the global economy.' },
  { slug: 'ai-tech', name: 'AI & Tech', blurb: 'Artificial intelligence, big tech and the tools changing how we live.' },
  { slug: 'sports', name: 'Sports', blurb: 'Cricket, football and the biggest global sporting events.' },
  { slug: 'fact-check', name: 'Fact Check', blurb: 'Viral claims, videos and images, checked.' },
  { slug: 'explainers', name: 'Explainers', blurb: 'The background you need to understand the big stories.' },
] as const;

export type CategorySlug = (typeof CATEGORIES)[number]['slug'];

/** The three main sections. Shown in the top nav and as blocks on the homepage. */
export const PRIMARY_CATEGORY_SLUGS: CategorySlug[] = ['world', 'middle-east', 'business'];

export const PRIMARY_CATEGORIES = CATEGORIES.filter((c) =>
  PRIMARY_CATEGORY_SLUGS.includes(c.slug),
);

/** Everything else lives under the "More" menu. */
export const MORE_CATEGORIES = CATEGORIES.filter(
  (c) => !PRIMARY_CATEGORY_SLUGS.includes(c.slug),
);

export const SOCIAL = {
  facebook: 'https://www.facebook.com/share/1Bpko7sgpb/',
  instagram: 'https://www.instagram.com/signal24.info',
  twitter: 'https://x.com/Signal24info',
  threads: 'https://www.threads.com/@signal24.info',
  linkedin: 'https://www.linkedin.com/company/signal2four/',
  whatsapp: 'https://wa.me/?text=',
};

export type Author = {
  slug: string;
  name: string;
  role: string;
  image: string;
  shortBio: string;
  bio: string[];
  linkedin?: string;
  email?: string;
  /** Lower numbers are listed first. The founder is 1. */
  order?: number;
};

// Author profiles now live in content/authors/*.json and are edited from the
// CMS (/admin > Authors). Read them on the server with getAuthors() from
// '@/lib/authors'.
export const DEFAULT_AUTHOR_SLUG = 'saad-ali';
