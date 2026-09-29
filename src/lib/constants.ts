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
};

export const AUTHORS: Author[] = [
  {
    slug: 'saad-ali',
    name: 'Saad Ali',
    role: 'Founder & Editor',
    image: '/team/saad-ali.jpg',
    shortBio:
      'Saad Ali is the founder and editor of Signal 24. He writes about geopolitics, the Middle East and the stories shaping the world.',
    bio: [
      'Saad Ali is the founder and editor of Signal 24. He studied Communication and Media Studies and has spent the last four years working in news and digital media.',
      'He started Signal 24 because keeping up with world news had become tiring. Big stories arrive as a flood of alerts, hot takes and half-finished updates, and readers end up knowing that something happened without knowing why it matters. Signal 24 is his attempt to fix that, one clear story at a time.',
      'He writes mostly about geopolitics, the Middle East and the way global events reach ordinary people.',
    ],
    linkedin: '',
    email: 'news@signal24.info',
  },
];

export const DEFAULT_AUTHOR_SLUG = 'saad-ali';

/** Match a free-text author name from an article to a known author profile. */
export function findAuthor(name: string | undefined): Author | undefined {
  if (!name) return undefined;
  const n = name.toLowerCase();
  return AUTHORS.find((a) => n.startsWith(a.name.toLowerCase()));
}
