import {defineType, defineField} from 'sanity'
import type {ImageRule, StringRule, TextRule} from 'sanity'

export default defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  fields: [
    defineField({
      name: 'image',
      title: 'About Image',
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
      title: 'Page Title',
      type: 'string',
      validation: (rule: StringRule) => rule.required(),
    }),
    defineField({
      name: 'aboutText',
      title: 'About Text',
      type: 'text',
      validation: (rule: TextRule) => rule.required(),
    }),
  ],
})
