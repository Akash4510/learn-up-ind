import {defineType, defineField} from 'sanity'
import type {UrlRule} from 'sanity'

export default defineType({
  name: 'communityLinks',
  title: 'Community Links',
  type: 'document',
  fields: [
    defineField({
      name: 'facebook',
      title: 'Facebook URL',
      type: 'url',
      validation: (rule: UrlRule) => rule.uri({scheme: ['http', 'https']}),
    }),
    defineField({
      name: 'twitter',
      title: 'Twitter URL',
      type: 'url',
      validation: (rule: UrlRule) => rule.uri({scheme: ['http', 'https']}),
    }),
    defineField({
      name: 'instagram',
      title: 'Instagram URL',
      type: 'url',
      validation: (rule: UrlRule) => rule.uri({scheme: ['http', 'https']}),
    }),
    defineField({
      name: 'linkedin',
      title: 'LinkedIn URL',
      type: 'url',
      validation: (rule: UrlRule) => rule.uri({scheme: ['http', 'https']}),
    }),
    defineField({
      name: 'youtube',
      title: 'YouTube URL',
      type: 'url',
      validation: (rule: UrlRule) => rule.uri({scheme: ['http', 'https']}),
    }),
  ],
})
