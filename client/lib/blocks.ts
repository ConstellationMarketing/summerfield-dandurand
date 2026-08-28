// client/lib/blocks.ts

export type ContentBlock =
  | {
      type: "hero";
      sectionLabel: string;
      tagline: string;
      description: string;
      backgroundImage?: string;
      backgroundImageAlt?: string;
    }
  | { type: "heading"; level: 1 | 2 | 3; text: string }
  | {
      type: "attorney-profile";
      sectionLabel: string;
      name: string;
      title: string;
      email: string;
      image: string;
      imageAlt: string;
      biography: string;
    }
  | {
      type: "attorney-credentials";
      sectionLabel: string;
      heading: string;
      groups: Array<{
        heading: string;
        items: string[];
      }>;
    }
  | {
      type: "content-section";
      body: string;
      image?: string;
      imageAlt?: string;
      imagePosition: "left" | "right";
      showCTAs?: boolean;
      secondaryButton?: { label: string; sublabel: string; link: string };
    }
  | {
      type: "cta";
      heading: string;
      description: string;
      secondaryButton?: { label: string; sublabel: string; link: string };
    }
  | {
      type: "team-members";
      sectionLabel: string;
      heading: string;
      members: Array<{
        name: string;
        title: string;
        bio: string;
        image: string;
        imageAlt?: string;
        specialties?: string[];
      }>;
    }
  | {
      type: "testimonials";
      sectionLabel: string;
      heading: string;
      backgroundImage?: string;
      backgroundImageAlt?: string;
      items: Array<{
        text: string;
        author: string;
        ratingImage?: string;
        ratingImageAlt?: string;
      }>;
    }
  | {
      type: "contact-section";
      sectionLabel: string;
      heading: string;
      description: string;
      formHeading: string;
    }
  | {
      type: "map";
      heading?: string;
      subtext?: string;
      mapEmbedUrl: string;
    }
  | {
      type: "practice-areas-grid";
      heading: string;
      description?: string;
      areas: Array<{
        icon: string;
        title: string;
        description: string;
        image: string;
        imageAlt?: string;
        link: string;
      }>;
    }
  | {
      type: "recent-posts";
      sectionLabel: string;
      heading: string;
      postCount?: number;
    }
  | {
      type: "testimonials-showcase";
      sectionLabel: string;
      heading: string;
      description: string;
      items: Array<{
        text: string;
        author: string;
        category: string;
      }>;
      reviewLinks: Array<{
        label: string;
        url: string;
      }>;
    }
  | {
      type: "locations-hub";
      sectionLabel: string;
      heading: string;
      description: string;
      officesHeading: string;
      offices: Array<{
        city: string;
        state: string;
        address: string;
        link?: string;
      }>;
      primaryHeading: string;
      primaryLocations: Array<{
        name: string;
        link?: string;
      }>;
      coverageHeading: string;
      coverageDescription: string;
      regions: Array<{
        name: string;
        locations: string[];
      }>;
      servicesHeading: string;
      services: Array<{
        title: string;
        link: string;
        icon: string;
      }>;
    };
