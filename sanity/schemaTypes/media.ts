export default {
  name: 'media',
  type: 'document',
  title: 'Media',
  fields: [
    {
      name: 'heroImage',
      type: 'image',
      title: 'Hero Image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'aboutImage',
      type: 'image',
      title: 'About Image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'testimonialVideos',
      type: 'array',
      title: 'Testimonial Videos',
      of: [{type: 'file', accept: 'video/*'}],
    },
  ],
}
