export const mediaQuery = `*[_type == "media"][0]{
  // Single Images
  heroImage {
    asset->{
      _id,
      url,
      metadata {
        dimensions {
          width,
          height
        }
      }
    },
    alt
  },
  aboutImage {
    asset->{
      _id,
      url,
      metadata {
        dimensions {
          width,
          height
        }
      }
    },
    alt
  },
  ceo {
    asset->{
      _id,
      url,
      metadata {
        dimensions {
          width,
          height
        }
      }
    },
    alt,
    name,
    about
  },
  
  // Array Fields
  certificateImages[] {
    asset->{
      _id,
      url,
      metadata {
        dimensions {
          width,
          height
        }
      }
    },
    alt,
    title
  },
  
  instructorImages[] {
    asset->{
      _id,
      url,
      metadata {
        dimensions {
          width,
          height
        }
      }
    },
    alt,
    name,
    role
  },
  
  upcomingCoursesImages[] {
    asset->{
      _id,
      url,
      metadata {
        dimensions {
          width,
          height
        }
      }
    },
    alt,
    title,
    description
  },
  
  testimonialVideos[] {
    "asset": asset->,
    description,
    thumbnail {
      asset->{
        _id,
        url,
        metadata {
          dimensions {
            width,
            height
          }
        }
      }
    }
  },
  
  whyUsImages[] {
    asset->{
      _id,
      url,
      metadata {
        dimensions {
          width,
          height
        }
      }
    },
    alt,
    title,
    description
  },
  
  achieversImages[] {
    asset->{
      _id,
      url,
      metadata {
        dimensions {
          width,
          height
        }
      }
    },
    alt,
    name,
    achievement
  },
  
  trainingVideos[] {
    level,
    videoUrl,
    description,
    thumbnail {
      asset->{
        _id,
        url,
        metadata {
          dimensions {
            width,
            height
          }
        }
      }
    }
  }
}`;
