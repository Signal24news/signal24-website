export const SITE = {
  name: 'Signal 24',
  tagline: 'Pakistan & World News, 24/7',
  description:
    'Signal 24 — breaking news, in-depth analysis, and live updates from Pakistan and around the world, 24/7.',
  url: 'https://signal24.info',
  email: 'news@signal24.info',
  locale: 'en_US',
  twitterHandle: '@Signal24info',
};

export const CATEGORIES = [
  { slug: 'pakistan', name: 'Pakistan' },
  { slug: 'world', name: 'World' },
  { slug: 'sports', name: 'Sports' },
  { slug: 'tech', name: 'Tech' },
  { slug: 'business', name: 'Business' },
] as const;

export type CategorySlug = (typeof CATEGORIES)[number]['slug'];

export const SOCIAL = {
  facebook: 'https://www.facebook.com/share/1Bpko7sgpb/',
  instagram: 'https://www.instagram.com/signal24.info',
  twitter: 'https://x.com/Signal24info',
  threads: 'https://www.threads.com/@signal24.info',
  linkedin: 'https://www.linkedin.com/company/signal2four/',
  whatsapp: 'https://wa.me/?text=',
};
