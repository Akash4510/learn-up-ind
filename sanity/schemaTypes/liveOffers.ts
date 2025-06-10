import {defineType, defineField, defineArrayMember} from 'sanity'
import type {ImageRule} from 'sanity'

export default defineType({
  name: 'liveOffers',
  title: 'Live Offers',
  type: 'document',
  fields: [
    defineField({
      name: 'offers',
      title: 'Current Offers',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              options: {hotspot: true},
              validation: (rule: ImageRule) => rule.required(),
              fields: [
                defineField({
                  name: 'alt',
                  title: 'Alt Text',
                  type: 'string',
                }),
              ],
            }),
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
            }),
          ],
        }),
      ],
    }),
  ],
})
