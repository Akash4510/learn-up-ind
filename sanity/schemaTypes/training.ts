import {defineType, defineField} from 'sanity'
import type {UrlRule} from 'sanity'

export default defineType({
  name: 'training',
  title: 'Training Programs',
  type: 'document',
  fields: [
    defineField({
      name: 'beginnerTraining',
      title: 'Beginner Training',
      type: 'object',
      validation: (rule) => rule.required(),
      fields: [
        defineField({
          name: 'description',
          title: 'Description',
          type: 'text',
        }),
        defineField({
          name: 'videoUrl',
          title: 'Video URL',
          type: 'url',
          validation: (rule: UrlRule) => rule.required().uri({scheme: ['http', 'https']}),
        }),
        defineField({
          name: 'thumbnail',
          title: 'Thumbnail',
          type: 'image',
          options: {hotspot: true},
          fields: [
            defineField({
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'intermediateTraining',
      title: 'Intermediate Training',
      type: 'object',
      validation: (rule) => rule.required(),
      fields: [
        defineField({
          name: 'description',
          title: 'Description',
          type: 'text',
        }),
        defineField({
          name: 'videoUrl',
          title: 'Video URL',
          type: 'url',
          validation: (rule: UrlRule) => rule.required().uri({scheme: ['http', 'https']}),
        }),
        defineField({
          name: 'thumbnail',
          title: 'Thumbnail',
          type: 'image',
          options: {hotspot: true},
          fields: [
            defineField({
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'advancedTraining',
      title: 'Advanced Training',
      type: 'object',
      validation: (rule) => rule.required(),
      fields: [
        defineField({
          name: 'description',
          title: 'Description',
          type: 'text',
        }),
        defineField({
          name: 'videoUrl',
          title: 'Video URL',
          type: 'url',
          validation: (rule: UrlRule) => rule.required().uri({scheme: ['http', 'https']}),
        }),
        defineField({
          name: 'thumbnail',
          title: 'Thumbnail',
          type: 'image',
          options: {hotspot: true},
          fields: [
            defineField({
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
            }),
          ],
        }),
      ],
    }),
  ],
})
