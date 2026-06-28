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
  body: string;
  readingTime: string;
  readingMinutes: number;
};
