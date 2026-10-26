import type { CategorySlug } from './constants';

export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  category: CategorySlug;
  date: string;
  /** Set when a story is updated after publishing (CMS field "Last updated"). */
  updated?: string;
  author: string;
  image: string;
  imageAlt?: string;
  featured?: boolean;
  breaking?: boolean;
  tags?: string[];
  signal?: SignalBox;
  /** News, Analysis, Explainer, Fact Check or Opinion (CMS field "Story type"). */
  storyType: StoryType;
  /** Corrections and clarifications added after publishing. */
  corrections: Correction[];
  body: string;
  readingTime: string;
  readingMinutes: number;
};

export type SignalBox = {
  whatHappened?: string;
  whyItMatters?: string;
  whatsNext?: string;
};

export type StoryType = 'news' | 'analysis' | 'explainer' | 'fact-check' | 'opinion';

export const STORY_TYPES: Record<StoryType, { label: string; schema: string; hint: string }> = {
  news: { label: 'News', schema: 'NewsArticle', hint: 'Reporting of facts, events and what people said.' },
  analysis: {
    label: 'Analysis',
    schema: 'AnalysisNewsArticle',
    hint: 'Interprets the news and explains what it may mean, based on evidence.',
  },
  explainer: {
    label: 'Explainer',
    schema: 'BackgroundNewsArticle',
    hint: 'Background and context to help you understand a story.',
  },
  'fact-check': { label: 'Fact Check', schema: 'NewsArticle', hint: 'Tests a claim against the evidence.' },
  opinion: {
    label: 'Opinion',
    schema: 'OpinionNewsArticle',
    hint: "The writer's own view. It does not represent Signal 24's reporting.",
  },
};

export type Correction = {
  date: string;
  kind: 'correction' | 'clarification';
  text: string;
  /** Also show the note at the top of the story (for serious errors). */
  top?: boolean;
};
