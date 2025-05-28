export const heroImageQuery = `*[_type == "media"][0]{
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
  }
}`;
