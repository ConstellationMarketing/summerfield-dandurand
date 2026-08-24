import type {
  PracticeAreaFaqContent,
  PracticeAreaReviewsContent,
  PracticeAreaSocialProofContent,
} from "@site/lib/cms/practiceAreaPageTypes";

export interface AreaServedHeroContent {
  sectionLabel: string;
  tagline: string;
  description: string;
  backgroundImage: string;
  backgroundImageAlt: string;
}

export interface AreaServedLinkItem extends Record<string, unknown> {
  title: string;
  link: string;
}

export interface AreaServedFocusItem extends AreaServedLinkItem {
  icon: string;
  description: string;
}

export interface AreaServedPracticeItem extends AreaServedLinkItem {
  tagline: string;
  body: string;
  casesHeading: string;
  cases: AreaServedLinkItem[];
}

export interface AreaServedPageContent {
  template: "area-served";
  hero: AreaServedHeroContent;
  socialProof: PracticeAreaSocialProofContent;
  intro: {
    sectionLabel: string;
    heading: string;
    body: string;
    buttonLabel: string;
    buttonLink: string;
    testimonial: string;
    testimonialAuthor: string;
  };
  focus: {
    sectionLabel: string;
    heading: string;
    items: AreaServedFocusItem[];
  };
  practiceAreas: {
    sectionLabel: string;
    heading: string;
    items: AreaServedPracticeItem[];
  };
  serviceArea: {
    sectionLabel: string;
    heading: string;
    body: string;
    mapImage: string;
    mapImageAlt: string;
    cities: AreaServedLinkItem[];
  };
  approach: {
    sectionLabel: string;
    heading: string;
    tagline: string;
    body: string;
    features: string[];
  };
  reviews: PracticeAreaReviewsContent;
  faq: PracticeAreaFaqContent;
  headingTags?: Record<string, string>;
}

export const defaultAreaServedPageContent: AreaServedPageContent = {
  template: "area-served",
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
    awards: { logos: [] },
  },
  intro: {
    sectionLabel: "",
    heading: "",
    body: "",
    buttonLabel: "",
    buttonLink: "",
    testimonial: "",
    testimonialAuthor: "",
  },
  focus: {
    sectionLabel: "",
    heading: "",
    items: [],
  },
  practiceAreas: {
    sectionLabel: "",
    heading: "",
    items: [],
  },
  serviceArea: {
    sectionLabel: "",
    heading: "",
    body: "",
    mapImage: "",
    mapImageAlt: "",
    cities: [],
  },
  approach: {
    sectionLabel: "",
    heading: "",
    tagline: "",
    body: "",
    features: [],
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

export function isAreaServedPageContent(value: unknown): value is AreaServedPageContent {
  return Boolean(
    value &&
      typeof value === "object" &&
      !Array.isArray(value) &&
      (value as { template?: unknown }).template === "area-served",
  );
}

export function normalizeAreaServedPageContent(value: unknown): AreaServedPageContent {
  const content = isAreaServedPageContent(value) ? value : defaultAreaServedPageContent;
  return {
    ...defaultAreaServedPageContent,
    ...content,
    template: "area-served",
    hero: { ...defaultAreaServedPageContent.hero, ...content.hero },
    socialProof: { ...defaultAreaServedPageContent.socialProof, ...content.socialProof },
    intro: { ...defaultAreaServedPageContent.intro, ...content.intro },
    focus: { ...defaultAreaServedPageContent.focus, ...content.focus, items: content.focus?.items || [] },
    practiceAreas: { ...defaultAreaServedPageContent.practiceAreas, ...content.practiceAreas, items: content.practiceAreas?.items || [] },
    serviceArea: { ...defaultAreaServedPageContent.serviceArea, ...content.serviceArea, cities: content.serviceArea?.cities || [] },
    approach: { ...defaultAreaServedPageContent.approach, ...content.approach, features: content.approach?.features || [] },
    reviews: { ...defaultAreaServedPageContent.reviews, ...content.reviews, items: content.reviews?.items || [] },
    faq: { ...defaultAreaServedPageContent.faq, ...content.faq, items: content.faq?.items || [] },
  };
}
