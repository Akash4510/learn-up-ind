export default {
  name: 'media',
  type: 'document',
  title: 'Media Library',
  fields: [
    // 1. Hero Image (single)
    {
      name: 'heroImage',
      type: 'image',
      title: 'Hero Image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
        },
      ],
    },

    // 2. About Page Image (single)
    {
      name: 'aboutImage',
      type: 'image',
      title: 'About Page Image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
        },
      ],
    },

    // 3. Certificates Images (array)
    {
      name: 'certificateImages',
      type: 'array',
      title: 'Certificate Images',
      of: [
        {
          type: 'image',
          options: {hotspot: true},
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative Text',
            },
            {
              name: 'title',
              type: 'string',
              title: 'Certificate Title',
            },
          ],
        },
      ],
    },

    // 4. Instructor Images (array)
    {
      name: 'instructorImages',
      type: 'array',
      title: 'Instructor Images',
      of: [
        {
          type: 'image',
          options: {hotspot: true},
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative Text',
            },
            {
              name: 'name',
              type: 'string',
              title: 'Instructor Name',
            },
            {
              name: 'role',
              type: 'string',
              title: 'Instructor Role',
            },
          ],
        },
      ],
    },

    // 5. Upcoming Courses Images (array - updated)
    {
      name: 'upcomingCoursesImages',
      type: 'array',
      title: 'Upcoming Courses Images',
      of: [
        {
          type: 'image',
          options: {hotspot: true},
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative Text',
            },
            {
              name: 'title',
              type: 'string',
              title: 'Image Title',
            },
            {
              name: 'description',
              type: 'text',
              title: 'Image Description',
            },
          ],
        },
      ],
    },

    // 6. Testimonial Videos (array)
    {
      name: 'testimonialVideos',
      type: 'array',
      title: 'Testimonial Videos',
      of: [
        {
          type: 'file',
          title: 'Video File',
          options: {
            accept: 'video/*',
          },
          fields: [
            {
              name: 'description',
              type: 'string',
              title: 'Video Description',
            },
            {
              name: 'thumbnail',
              type: 'image',
              title: 'Video Thumbnail',
              options: {
                hotspot: true,
              },
            },
          ],
        },
      ],
    },

    // 7. Why Us Section Images (array - updated with title and description)
    {
      name: 'whyUsImages',
      type: 'array',
      title: '"Why Us" Section Images',
      of: [
        {
          type: 'image',
          options: {hotspot: true},
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative Text',
            },
            {
              name: 'title',
              type: 'string',
              title: 'Image Title',
            },
            {
              name: 'description',
              type: 'text',
              title: 'Short Description',
            },
          ],
        },
      ],
    },

    // 8. Our Achievers Images (array)
    {
      name: 'achieversImages',
      type: 'array',
      title: '"Our Achievers" Images',
      of: [
        {
          type: 'image',
          options: {hotspot: true},
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative Text',
            },
            {
              name: 'name',
              type: 'string',
              title: 'Achiever Name',
            },
            {
              name: 'achievement',
              type: 'string',
              title: 'Achievement',
            },
          ],
        },
      ],
    },

    // 9. Training Courses Video Links (array)
    {
      name: 'trainingVideos',
      type: 'array',
      title: 'Training Courses Videos',
      of: [
        {
          type: 'object',
          title: 'Training Video',
          fields: [
            {
              name: 'level',
              type: 'string',
              title: 'Course Level',
              options: {
                list: [
                  {title: 'Beginner', value: 'beginner'},
                  {title: 'Intermediate', value: 'intermediate'},
                  {title: 'Advanced', value: 'advanced'},
                ],
                layout: 'radio',
              },
            },
            {
              name: 'videoUrl',
              type: 'url',
              title: 'Video URL',
            },
            {
              name: 'thumbnail',
              type: 'image',
              title: 'Thumbnail Image',
              options: {
                hotspot: true,
              },
            },
            {
              name: 'description',
              type: 'text',
              title: 'Video Description',
            },
          ],
        },
      ],
    },
  ],
}
