// Type definitions for structured homepage content
// Each section maps directly to a static component's data needs

export interface HeroContent {
  h1Title: string; // H1 title text (all caps, ~20px) between headline and phone button
  headline: string;
  highlightedText: string;
  phone: string;
  phoneLabel: string;
  eyebrow: string; // small label above the headline (e.g. "Indiana & Illinois Trial Attorneys")
  subheadline: string; // supporting paragraph below the headline
  backgroundImage: string;
  backgroundImageAlt: string;
  primaryCtaText: string;
  primaryCtaLink: string;
  secondaryCtaText: string;
  secondaryCtaLink: string;
}

export interface ValuePropItem {
  text: string;
}

export interface ValuePropsContent {
  sectionLabel: string;
  heading: string;
  description: string;
  image: string;
  imageAlt: string;
  wantsHeading: string;
  wants: ValuePropItem[];
}

export interface PracticeSpotlightSubItem {
  label: string;
}

export interface PracticeSpotlightItem {
  tagline: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  itemsHeading: string;
  items: PracticeSpotlightSubItem[];
  ctaText: string;
  ctaLink: string;
}

export interface PracticeSpotlightsContent {
  sectionLabel: string;
  heading: string;
  items: PracticeSpotlightItem[];
}

export interface AreaCounty {
  name: string;
}

export interface AreaRegion {
  state: string;
  counties: AreaCounty[];
}

export interface AreasWeServeContent {
  sectionLabel: string;
  heading: string;
  description: string;
  mapImage: string;
  mapImageAlt: string;
  regions: AreaRegion[];
}

export interface PartnerLogo {
  src: string;
  alt: string;
}

export interface AboutFeature {
  number: string;
  title: string;
  description: string;
}

export interface AboutStat {
  value: string;
  label: string;
}

export interface AboutAttorney {
  image: string;
  imageAlt: string;
  name: string;
  title: string;
  link: string;
}

export interface AboutContent {
  sectionLabel: string;
  heading: string;
  description: string;
  phone: string;
  phoneLabel: string;
  contactLabel: string;
  contactText: string;
  attorneyImage: string;
  attorneyImageAlt: string;
  attorneys: AboutAttorney[];
  features: AboutFeature[];
  stats: AboutStat[];
}

export interface PracticeAreaItem {
  title: string;
  image: string;
  imageAlt: string;
  link: string;
}

export interface PracticeAreasIntroContent {
  sectionLabel: string;
  heading: string;
  buttonLink: string;
  buttonTextLine1: string;
  buttonTextLine2: string;
}

export interface AwardsContent {
  sectionLabel: string;
  heading: string;
  description: string;
  logos: Array<{ src: string; alt: string }>;
}

export interface TestimonialItem {
  text: string;
  author: string;
  ratingImage: string;
  ratingImageAlt?: string;
}

export interface TestimonialsContent {
  sectionLabel: string;
  heading: string;
  backgroundImage: string;
  backgroundImageAlt?: string;
  items: TestimonialItem[];
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export interface ProcessContent {
  sectionLabel: string;
  headingLine1: string;
  headingLine2: string;
  steps: ProcessStep[];
}

export interface GoogleReviewItem {
  text: string;
  author: string;
  ratingImage: string;
  ratingImageAlt?: string;
}

export interface GoogleReviewsContent {
  sectionLabel: string;
  heading: string;
  description: string;
  reviews: GoogleReviewItem[];
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqContent {
  heading: string;
  description: string;
  videoThumbnail: string;
  videoThumbnailAlt?: string;
  videoUrl: string;
  items: FaqItem[];
}

export interface ContactContent {
  sectionLabel: string;
  heading: string;
  description: string;
  phone: string;
  phoneLabel: string;
  address: string;
  formHeading: string;
  availabilityText: string;
  image: string;
  imageAlt: string;
  backgroundImage?: string;
  backgroundImageAlt?: string;
}

// Complete homepage content structure
export interface HomePageContent {
  hero: HeroContent;
  partnerLogos: PartnerLogo[];
  valueProps: ValuePropsContent;
  about: AboutContent;
  practiceAreasIntro: PracticeAreasIntroContent;
  practiceAreas: PracticeAreaItem[];
  practiceSpotlights: PracticeSpotlightsContent;
  areasWeServe: AreasWeServeContent;
  awards: AwardsContent;
  testimonials: TestimonialsContent;
  process: ProcessContent;
  googleReviews: GoogleReviewsContent;
  faq: FaqContent;
  contact: ContactContent;
  /** Maps heading keys (e.g. "about.heading") to HTML tag names (e.g. "h2") */
  headingTags?: Record<string, string>;
}

// Default content - empty defaults, content comes exclusively from the CMS
export const defaultHomeContent: HomePageContent = {
  hero: {
    h1Title: "",
    headline: "",
    highlightedText: "",
    phone: "",
    phoneLabel: "",
    eyebrow: "",
    subheadline: "",
    backgroundImage: "",
    backgroundImageAlt: "",
    primaryCtaText: "",
    primaryCtaLink: "",
    secondaryCtaText: "",
    secondaryCtaLink: "",
  },
  partnerLogos: [],
  valueProps: {
    sectionLabel: "",
    heading: "",
    description: "",
    image: "",
    imageAlt: "",
    wantsHeading: "",
    wants: [],
  },
  about: {
    sectionLabel: "",
    heading: "",
    description: "",
    phone: "",
    phoneLabel: "",
    contactLabel: "",
    contactText: "",
    attorneyImage: "",
    attorneyImageAlt: "",
    attorneys: [],
    features: [],
    stats: [],
  },
  practiceAreasIntro: {
    sectionLabel: "",
    heading: "",
    buttonLink: "",
    buttonTextLine1: "",
    buttonTextLine2: "",
  },
  practiceAreas: [],
  practiceSpotlights: {
    sectionLabel: "",
    heading: "",
    items: [],
  },
  areasWeServe: {
    sectionLabel: "",
    heading: "",
    description: "",
    mapImage: "",
    mapImageAlt: "",
    regions: [],
  },
  awards: {
    sectionLabel: "",
    heading: "",
    description: "",
    logos: [],
  },
  testimonials: {
    sectionLabel: "",
    heading: "",
    backgroundImage: "",
    backgroundImageAlt: "",
    items: [],
  },
  process: {
    sectionLabel: "",
    headingLine1: "",
    headingLine2: "",
    steps: [],
  },
  googleReviews: {
    sectionLabel: "",
    heading: "",
    description: "",
    reviews: [],
  },
  faq: {
    heading: "",
    description: "",
    videoThumbnail: "",
    videoThumbnailAlt: "",
    videoUrl: "",
    items: [],
  },
  contact: {
    sectionLabel: "",
    heading: "",
    description: "",
    phone: "",
    phoneLabel: "",
    address: "",
    formHeading: "",
    availabilityText: "",
    image: "",
    imageAlt: "",
    backgroundImage: "",
    backgroundImageAlt: "",
  },
};
