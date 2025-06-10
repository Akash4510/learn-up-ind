// types/homePage.d.ts
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

export interface HomePageContent {
  heroSection: {
    image: {
      asset: SanityImageSource;
      alt: string;
    };
    title: string;
    description: string;
  };
  upcomingCoursesSection: {
    sectionTitle: string;
    sectionDescription: string;
    courses: {
      image: {
        asset: SanityImageSource;
        alt: string;
      };
      title: string;
      description: string;
    }[];
  };
  exploreCoursesSection: {
    sectionTitle: string;
    sectionDescription: string;
  };
  milestonesSection: {
    sectionText: string;
    milestones: {
      title: string;
      subtitle: string;
    }[];
  };
  founderSection: {
    name: string;
    description: string;
    designation: string;
    image: {
      asset: SanityImageSource;
      alt?: string;
    };
  };
  instructorsSection: {
    sectionTitle: string;
    sectionDescription: string;
    instructors: {
      image: {
        asset: SanityImageSource;
        alt: string;
      };
      name: string;
      description: string;
    }[];
  };
  whyChooseUsSection: {
    sectionTitle: string;
    sectionDescription: string;
    reasons: {
      image: {
        asset: SanityImageSource;
        alt: string;
      };
      title: string;
      description: string;
    }[];
  };
  testimonialsSection: {
    sectionTitle: string;
    sectionDescription: string;
    testimonials: {
      videoUrl: string;
      name: string;
      description: string;
      rating?: number;
    }[];
  };
  certificatesSection: {
    sectionTitle: string;
    sectionDescription: string;
    certificateImages: {
      asset: SanityImageSource;
      alt: string;
    }[];
  };
  achieversSection: {
    sectionTitle: string;
    sectionDescription: string;
    achievers: {
      image: {
        asset: SanityImageSource;
        alt: string;
      };
      name: string;
      comment: string;
    }[];
  };
}

export interface AboutPageContent {
  image: {
    asset: SanityImageSource;
    alt: string;
  };
  title: string;
  aboutText: string;
}

export interface TrainingContent {
  beginnerTraining: {
    description: string;
    videoUrl: string;
    thumbnail: {
      asset: SanityImageSource;
      alt: string;
    };
  };
  intermediateTraining: {
    description: string;
    videoUrl: string;
    thumbnail: {
      asset: SanityImageSource;
      alt: string;
    };
  };
  advancedTraining: {
    description: string;
    videoUrl: string;
    thumbnail: {
      asset: SanityImageSource;
      alt: string;
    };
  };
}

export interface CommunityLinks {
  facebook?: string;
  twitter?: string;
  instagram?: string;
  linkedin?: string;
  youtube?: string;
}

export interface LiveOfferItem {
  image: {
    asset: SanityImageSource;
    alt: string;
  };
  title: string;
  description: string;
}

export interface LiveOffers {
  offers?: LiveOfferItem[];
}

// Image metadata types
export interface ImageMetadata {
  _id: string;
  url: string;
  metadata: {
    dimensions: {
      width: number;
      height: number;
      aspectRatio: number;
    };
  };
}
