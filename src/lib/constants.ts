export const SITE = {
  name: 'Signal 24',
  tagline: 'Pakistan & World News, 24/7',
  description:
    'Signal 24 — breaking news, in-depth analysis, and live updates from Pakistan and around the world, 24/7.',
  url: 'https://signal24.info',
  email: 'news@signal24.info',
  locale: 'en_US',
  twitterHandle: '@signal24',
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
  facebook: 'https://facebook.com/signal24',
  instagram: 'https://instagram.com/signal24',
  twitter: 'https://x.com/signal24',
  threads: 'https://threads.net/@signal24',
  whatsapp: 'https://wa.me/?text=',
};
