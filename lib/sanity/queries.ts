export const homePageQuery = `*[_type == "homePage"][0] {
  heroSection {
    image {
      asset->{
        _id,
        url,
        metadata {
          dimensions
        }
      },
      alt
    },
    title,
    description
  },
  upcomingCoursesSection {
    sectionTitle,
    sectionDescription,
    courses[] {
      image {
        asset->{
          _id,
          url,
          metadata {
            dimensions
          }
        },
        alt
      },
      title,
      description
    }
  },
  exploreCoursesSection {
    sectionTitle,
    sectionDescription
  },
  milestonesSection {
    sectionText,
    milestones[] {
      title,
      subtitle
    }
  },
  founderSection {
    name,
    description,
    designation,
    image {
      asset->{
        _id,
        url,
        metadata {
          dimensions
        }
      },
      alt
    }
  },
  instructorsSection {
    sectionTitle,
    sectionDescription,
    instructors[] {
      image {
        asset->{
          _id,
          url,
          metadata {
            dimensions
          }
        },
        alt
      },
      name,
      description
    }
  },
  whyChooseUsSection {
    sectionTitle,
    sectionDescription,
    reasons[] {
      image {
        asset->{
          _id,
          url,
          metadata {
            dimensions
          }
        },
        alt
      },
      title,
      description
    }
  },
  testimonialsSection {
    sectionTitle,
    sectionDescription,
    testimonials[] {
      videoUrl,
      name,
      description,
      rating
    }
  },
  certificatesSection {
    sectionTitle,
    sectionDescription,
    certificateImages[] {
      asset->{
        _id,
        url,
        metadata {
          dimensions
        }
      },
      alt
    }
  },
  achieversSection {
    sectionTitle,
    sectionDescription,
    achievers[] {
      image {
        asset->{
          _id,
          url,
          metadata {
            dimensions
          }
        },
        alt
      },
      name,
      comment
    }
  }
}`;

export const aboutPageQuery = `*[_type == "aboutPage"][0] {
  image {
    asset->{
      _id,
      url,
      metadata {
        dimensions
      }
    },
    alt
  },
  title,
  aboutText
}`;

type TrainingType = "beginner" | "intermediate" | "advanced";

export function getTrainingQuery(trainingType: TrainingType): string {
  return `*[_type == "training"][0].${trainingType}Training {
    description,
    videoUrl,
    thumbnail {
      asset->{
        _id,
        url,
        metadata {
          dimensions
        }
      },
      alt
    }
  }`;
}

export const getCommunityLinksQuery = `*[_type == "communityLinks"][0] {
  facebook,
  twitter,
  instagram,
  linkedin,
  youtube
}`;

export const getLiveOffersQuery = `*[_type == "liveOffers"][0] {
  offers[] {
    image {
      asset->{
        _id,
        url,
        metadata {
          dimensions
        }
      },
      alt
    },
    title,
    description
  }
}`;
