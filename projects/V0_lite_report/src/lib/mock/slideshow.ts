/**
 * Slideshow titles — drives SlideshowSection thumbnail strip + active slide title.
 * TODO Phase E: replace placeholder image gradients w/ real preview thumbnails.
 */

export interface SlideMeta {
  id: number;
  title: string;
  /** CSS gradient placeholder. Replace w/ real image asset. */
  gradient: string;
}

const palette = [
  'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
  'linear-gradient(135deg, #0f3460 0%, #16213e 100%)',
  'linear-gradient(135deg, #533483 0%, #1a1a2e 100%)',
  'linear-gradient(135deg, #1a1a1a 0%, #2d2d44 100%)',
  'linear-gradient(135deg, #0a0a0c 0%, #2c1e3f 100%)',
  'linear-gradient(135deg, #1f1f2e 0%, #3a2a4d 100%)',
];

const titles = [
  'Executive Summary',
  'AI Healthcare Market Overview',
  'Technology Landscape',
  'Competitive Analysis',
  'ML Diagnostics Segment',
  'Drug Discovery AI',
  'NLP for EHR Systems',
  'Regional Analysis',
  'North America Deep-Dive',
  'Revenue Forecast 2024-2030',
  'Investment & Funding Trends',
  'Clinical Trial AI Applications',
];

export const slides: SlideMeta[] = titles.map((title, i) => ({
  id: i + 1,
  title,
  gradient: palette[i % palette.length],
}));
