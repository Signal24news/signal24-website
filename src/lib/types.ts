import type { CategorySlug } from './constants';

export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  category: CategorySlug;
  date: string;
  author: string;
  image: string;
  imageAlt?: string;
  featured?: boolean;
  breaking?: boolean;
  tags?: string[];
  signal?: SignalBox;
  body: string;
  readingTime: string;
  readingMinutes: number;
};

export type SignalBox = {
  whatHappened?: string;
  whyItMatters?: string;
  whatsNext?: string;
};
