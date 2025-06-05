import {defineType, defineField, defineArrayMember} from 'sanity'
import type {
  StringRule,
  NumberRule,
  ArrayRule,
  ImageRule,
  TextRule,
  ObjectRule,
  UrlRule,
} from 'sanity'

export default defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  fields: [
    // 1. Hero Section
    defineField({
      name: 'heroSection',
      title: 'Hero Section',
      type: 'object',
      validation: (rule: ObjectRule) => rule.required(),
      fields: [
        defineField({
          name: 'image',
          title: 'Hero Image',
          type: 'image',
          options: {hotspot: true},
          validation: (rule: ImageRule) => rule.required(),
          fields: [
            {
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
              options: {isHighlighted: true},
            },
          ],
        }),
        defineField({
          name: 'title',
          title: 'Hero Title',
          type: 'string',
        }),
        defineField({
          name: 'description',
          title: 'Hero Description',
          type: 'text',
        }),
      ],
    }),

    // 2. Upcoming Courses Section
    defineField({
      name: 'upcomingCoursesSection',
      title: 'Upcoming Courses Section',
      type: 'object',
      validation: (rule: ObjectRule) => rule.required(),
      fields: [
        defineField({
          name: 'sectionTitle',
          title: 'Section Title',
          type: 'string',
          validation: (rule: StringRule) => rule.required(),
        }),
        defineField({
          name: 'sectionDescription',
          title: 'Section Description',
          type: 'text',
          validation: (rule: TextRule) => rule.required(),
        }),
        defineField({
          name: 'courses',
          title: 'Courses',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              fields: [
                defineField({
                  name: 'image',
                  title: 'Course Image',
                  type: 'image',
                  options: {hotspot: true},
                  validation: (rule: ImageRule) => rule.required(),
                  fields: [
                    {
                      name: 'alt',
                      title: 'Alt Text',
                      type: 'string',
                      options: {isHighlighted: true},
                    },
                  ],
                }),
                defineField({
                  name: 'title',
                  title: 'Course Title',
                  type: 'string',
                  validation: (rule: StringRule) => rule.required(),
                }),
                defineField({
                  name: 'description',
                  title: 'Course Description',
                  type: 'text',
                  validation: (rule: TextRule) => rule.required(),
                }),
              ],
            }),
          ],
        }),
      ],
    }),

    // 3. Explore Our Courses Section
    defineField({
      name: 'exploreCoursesSection',
      title: 'Explore Our Courses Section',
      type: 'object',
      validation: (rule: ObjectRule) => rule.required(),
      fields: [
        defineField({
          name: 'sectionTitle',
          title: 'Section Title',
          type: 'string',
          validation: (rule: StringRule) => rule.required(),
        }),
        defineField({
          name: 'sectionDescription',
          title: 'Section Description',
          type: 'text',
          validation: (rule: TextRule) => rule.required(),
        }),
      ],
    }),

    // 4. Milestones Section
    defineField({
      name: 'milestonesSection',
      title: 'Milestones Section',
      type: 'object',
      validation: (rule: ObjectRule) => rule.required(),
      fields: [
        defineField({
          name: 'sectionText',
          title: 'Section Text',
          type: 'text',
          validation: (rule: TextRule) => rule.required(),
        }),
        defineField({
          name: 'milestones',
          title: 'Milestones',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              fields: [
                defineField({
                  name: 'title',
                  title: 'Milestone Title',
                  type: 'string',
                  validation: (rule: StringRule) => rule.required(),
                }),
                defineField({
                  name: 'subtitle',
                  title: 'Milestone Subtitle',
                  type: 'string',
                  validation: (rule: StringRule) => rule.required(),
                }),
              ],
            }),
          ],
        }),
      ],
    }),

    // 5. Founder and CEO Section
    defineField({
      name: 'founderSection',
      title: 'Founder and CEO Section',
      type: 'object',
      validation: (rule: ObjectRule) => rule.required(),
      fields: [
        defineField({
          name: 'designation',
          title: 'Designation',
          type: 'string',
          validation: (rule: StringRule) => rule.required(),
        }),
        defineField({
          name: 'name',
          title: 'Name',
          type: 'string',
          validation: (rule: StringRule) => rule.required(),
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'text',
          validation: (rule: TextRule) => rule.required(),
        }),
        defineField({
          name: 'image',
          title: 'Image',
          type: 'image',
          options: {hotspot: true},
          validation: (rule: ImageRule) => rule.required(),
          fields: [
            {
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
            },
          ],
        }),
      ],
    }),

    // 6. Our Instructors Section
    defineField({
      name: 'instructorsSection',
      title: 'Our Instructors Section',
      type: 'object',
      validation: (rule: ObjectRule) => rule.required(),
      fields: [
        defineField({
          name: 'sectionTitle',
          title: 'Section Title',
          type: 'string',
          validation: (rule: StringRule) => rule.required(),
        }),
        defineField({
          name: 'sectionDescription',
          title: 'Section Description',
          type: 'text',
          validation: (rule: TextRule) => rule.required(),
        }),
        defineField({
          name: 'instructors',
          title: 'Instructors',
          type: 'array',
          validation: (rule: ArrayRule<object>) => rule.required(),
          of: [
            defineArrayMember({
              type: 'object',
              fields: [
                defineField({
                  name: 'image',
                  title: 'Instructor Image',
                  type: 'image',
                  options: {hotspot: true},
                  validation: (rule: ImageRule) => rule.required(),
                  fields: [
                    {
                      name: 'alt',
                      title: 'Alt Text',
                      type: 'string',
                      options: {isHighlighted: true},
                    },
                  ],
                }),
                defineField({
                  name: 'name',
                  title: 'Instructor Name',
                  type: 'string',
                  validation: (rule: StringRule) => rule.required(),
                }),
                defineField({
                  name: 'description',
                  title: 'Instructor Description',
                  type: 'string',
                  validation: (rule: StringRule) => rule.required(),
                }),
              ],
            }),
          ],
        }),
      ],
    }),

    // 7. Why Choose Us Section
    defineField({
      name: 'whyChooseUsSection',
      title: 'Why Choose Us Section',
      type: 'object',
      validation: (rule: ObjectRule) => rule.required(),
      fields: [
        defineField({
          name: 'sectionTitle',
          title: 'Section Title',
          type: 'string',
          validation: (rule: StringRule) => rule.required(),
        }),
        defineField({
          name: 'sectionDescription',
          title: 'Section Description',
          type: 'text',
          validation: (rule: TextRule) => rule.required(),
        }),
        defineField({
          name: 'reasons',
          title: 'Reasons',
          type: 'array',
          validation: (rule: ArrayRule<object>) => rule.required(),
          of: [
            defineArrayMember({
              type: 'object',
              fields: [
                defineField({
                  name: 'image',
                  title: 'Reason Image',
                  type: 'image',
                  options: {hotspot: true},
                  validation: (rule: ImageRule) => rule.required(),
                  fields: [
                    {
                      name: 'alt',
                      title: 'Alt Text',
                      type: 'string',
                      options: {isHighlighted: true},
                    },
                  ],
                }),
                defineField({
                  name: 'title',
                  title: 'Reason Title',
                  type: 'string',
                  validation: (rule: StringRule) => rule.required(),
                }),
                defineField({
                  name: 'description',
                  title: 'Reason Description',
                  type: 'text',
                  validation: (rule: TextRule) => rule.required(),
                }),
              ],
            }),
          ],
        }),
      ],
    }),

    // 8. Testimonials Section (with optional rating)
    defineField({
      name: 'testimonialsSection',
      title: 'Testimonials Section',
      type: 'object',
      validation: (rule: ObjectRule) => rule.required(),
      fields: [
        defineField({
          name: 'sectionTitle',
          title: 'Section Title',
          type: 'string',
          validation: (rule: StringRule) => rule.required(),
        }),
        defineField({
          name: 'sectionDescription',
          title: 'Section Description',
          type: 'text',
          validation: (rule: TextRule) => rule.required(),
        }),
        defineField({
          name: 'testimonials',
          title: 'Testimonials',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              fields: [
                defineField({
                  name: 'videoUrl',
                  title: 'Video URL',
                  type: 'url',
                  validation: (rule: UrlRule) => rule.required().uri({scheme: ['http', 'https']}),
                }),
                defineField({
                  name: 'name',
                  title: 'Person Name',
                  type: 'string',
                  validation: (rule: StringRule) => rule.required(),
                }),
                defineField({
                  name: 'description',
                  title: 'Testimonial Text',
                  type: 'text',
                  validation: (rule: TextRule) => rule.required(),
                }),
                defineField({
                  name: 'rating',
                  title: 'Rating (1-5)',
                  type: 'number',
                  validation: (rule: NumberRule) => rule.min(1).max(5).integer(),
                }),
              ],
            }),
          ],
        }),
      ],
    }),

    // 9. Certificates Section
    defineField({
      name: 'certificatesSection',
      title: 'Certificates Section',
      type: 'object',
      validation: (rule: ObjectRule) => rule.required(),
      fields: [
        defineField({
          name: 'sectionTitle',
          title: 'Section Title',
          type: 'string',
          validation: (rule: StringRule) => rule.required(),
        }),
        defineField({
          name: 'sectionDescription',
          title: 'Section Description',
          type: 'text',
          validation: (rule: TextRule) => rule.required(),
        }),
        defineField({
          name: 'certificateImages',
          title: 'Certificate Images',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'image',
              options: {hotspot: true},
              fields: [
                {
                  name: 'alt',
                  title: 'Alt Text',
                  type: 'string',
                  options: {isHighlighted: true},
                },
              ],
            }),
          ],
        }),
      ],
    }),

    // 10. Our Achievers Section
    defineField({
      name: 'achieversSection',
      title: 'Our Achievers Section',
      type: 'object',
      validation: (rule: ObjectRule) => rule.required(),
      fields: [
        defineField({
          name: 'sectionTitle',
          title: 'Section Title',
          type: 'string',
          validation: (rule: StringRule) => rule.required(),
        }),
        defineField({
          name: 'sectionDescription',
          title: 'Section Description',
          type: 'text',
          validation: (rule: TextRule) => rule.required(),
        }),
        defineField({
          name: 'achievers',
          title: 'Achievers',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              fields: [
                defineField({
                  name: 'image',
                  title: 'Achiever Image',
                  type: 'image',
                  options: {hotspot: true},
                  validation: (rule: ImageRule) => rule.required(),
                  fields: [
                    {
                      name: 'alt',
                      title: 'Alt Text',
                      type: 'string',
                      options: {isHighlighted: true},
                    },
                  ],
                }),
                defineField({
                  name: 'name',
                  title: 'Achiever Name',
                  type: 'string',
                  validation: (rule: StringRule) => rule.required(),
                }),
                defineField({
                  name: 'comment',
                  title: 'Achiever Comment',
                  type: 'text',
                  validation: (rule: TextRule) => rule.required(),
                }),
              ],
            }),
          ],
        }),
      ],
    }),
  ],
})
