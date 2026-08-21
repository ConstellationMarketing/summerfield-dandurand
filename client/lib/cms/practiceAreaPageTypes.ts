// Each section maps directly to a static component's data needs

export interface PracticeAreaHeroContent {
  sectionLabel: string;
  tagline: string;
  description: string;
  backgroundImage?: string;
  backgroundImageAlt?: string;
}

export interface PracticeAreaTestimonialItem extends Record<string, unknown> {
  text: string;
  author: string;
  ratingImage: string;
  ratingImageAlt?: string;
}

export interface PracticeAreaAwardsContent {
  logos: Array<{ src: string; alt: string }>;
}

export interface PracticeAreaSocialProofContent {
  mode: "testimonials" | "awards" | "none";
  testimonials: PracticeAreaTestimonialItem[];
  awards: PracticeAreaAwardsContent;
}

export interface PracticeAreaSubpractice extends Record<string, unknown> {
  title: string;
  description: string;
  link: string;
}

export interface PracticeAreaContentSectionItem extends Record<string, unknown> {
  body: string;
  image: string;
  imageAlt: string;
  imagePosition: "left" | "right";
  showCTAs?: boolean;
  subPracticesHeading?: string;
  subPractices?: PracticeAreaSubpractice[];
}

export interface PracticeAreaExpectationFeature extends Record<string, unknown> {
  number: string;
  title: string;
  description: string;
}

export interface PracticeAreaExpectationStat extends Record<string, unknown> {
  value: string;
  label: string;
}

export interface PracticeAreaExpectationAttorney extends Record<string, unknown> {
  image: string;
  imageAlt: string;
  name: string;
  title: string;
  link: string;
}

export interface PracticeAreaExpectationsContent {
  enabled: boolean;
  sectionLabel: string;
  heading: string;
  description: string;
  attorneys: PracticeAreaExpectationAttorney[];
  features: PracticeAreaExpectationFeature[];
  stats: PracticeAreaExpectationStat[];
}

export interface PracticeAreaReviewsContent {
  enabled: boolean;
  sectionLabel: string;
  heading: string;
  reviewBadgeText: string;
  backgroundImage: string;
  backgroundImageAlt: string;
  items: PracticeAreaTestimonialItem[];
}

export interface PracticeAreaFaqContent {
  enabled: boolean;
  heading: string;
  description: string;
  items: Array<{ question: string; answer: string }>;
}

export interface PracticeAreaPageContent {
  hero: PracticeAreaHeroContent;
  socialProof: PracticeAreaSocialProofContent;
  contentSections: PracticeAreaContentSectionItem[];
  expectations: PracticeAreaExpectationsContent;
  reviews: PracticeAreaReviewsContent;
  faq: PracticeAreaFaqContent;
  headingTags?: Record<string, string>;
}

export function getPracticeAreaSectionImagePosition(
  index: number,
): "left" | "right" {
  return index % 2 === 0 ? "right" : "left";
}

export function getPracticeAreaSectionShowCtasDefault(_index: number): boolean {
  return false;
}

export function createPracticeAreaContentSection(
  index: number,
  overrides: Partial<PracticeAreaContentSectionItem> = {},
): PracticeAreaContentSectionItem {
  return {
    body: overrides.body ?? "",
    image: overrides.image ?? "",
    imageAlt: overrides.imageAlt ?? "",
    imagePosition:
      overrides.imagePosition ?? getPracticeAreaSectionImagePosition(index),
    showCTAs:
      Boolean(overrides.image) ||
      (overrides.showCTAs ?? getPracticeAreaSectionShowCtasDefault(index)),
    subPracticesHeading: overrides.subPracticesHeading ?? "",
    subPractices: overrides.subPractices ?? [],
  };
}

export function normalizePracticeAreaContentSections(
  sections: Array<Partial<PracticeAreaContentSectionItem>> | null | undefined,
): PracticeAreaContentSectionItem[] {
  if (!sections?.length) {
    return [];
  }

  return sections.map((section, index) =>
    createPracticeAreaContentSection(index, section),
  );
}

// Default content - empty defaults, content comes exclusively from the CMS
export const defaultPracticeAreaPageContent: PracticeAreaPageContent = {
  hero: {
    sectionLabel: "",
    tagline: "",
    description: "",
    backgroundImage: "",
    backgroundImageAlt: "",
  },
  socialProof: {
    mode: "none",
    testimonials: [],
    awards: {
      logos: [],
    },
  },
  contentSections: [],
  expectations: {
    enabled: false,
    sectionLabel: "",
    heading: "",
    description: "",
    attorneys: [],
    features: [],
    stats: [],
  },
  reviews: {
    enabled: false,
    sectionLabel: "",
    heading: "",
    reviewBadgeText: "",
    backgroundImage: "",
    backgroundImageAlt: "",
    items: [],
  },
  faq: {
    enabled: false,
    heading: "",
    description: "",
    items: [],
  },
};
