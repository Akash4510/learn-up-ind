// Base Image Type
export interface SanityImage {
  asset: {
    _id: string;
    url: string;
    metadata: {
      dimensions: {
        width: number;
        height: number;
      };
    };
  };
  alt?: string;
}

// Extended Types for specific fields
export interface CertificateImage extends SanityImage {
  title?: string;
}

export interface InstructorImage extends SanityImage {
  name?: string;
  role?: string;
}

export interface upcomingCoursesImage extends SanityImage {
  title?: string;
  description?: string;
}

export interface Ceo extends SanityImage {
  name?: string;
  about?: string;
}

export interface WhyUsImage extends SanityImage {
  title?: string;
  description?: string;
}

export interface AchieversImage extends SanityImage {
  name?: string;
  achievement?: string;
}

export interface TrainingVideo {
  level: "beginner" | "intermediate" | "advanced";
  videoUrl: string;
  thumbnail: SanityImage;
  description?: string;
}

export interface TestimonialVideo {
  description?: string;
  thumbnail: SanityImage;
  asset?: {
    url: string;
    // Add other asset properties if needed
  };
}
export interface MediaDocument {
  heroImage: SanityImage;
  aboutImage: SanityImage;
  ceo: Ceo;
  certificateImages: CertificateImage[];
  instructorImages: InstructorImage[];
  upcomingCoursesImages: upcomingCoursesImage[];
  testimonialVideos: TestimonialVideo[];
  whyUsImages: WhyUsImage[];
  achieversImages: AchieversImage[];
  trainingVideos: TrainingVideo[];
}
