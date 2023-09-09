import {UploadIcon, BookIcon, PlayIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export default defineType({
  type: 'document',
  name: 'video',
  icon: UploadIcon,
  title: 'Video',
  fields: [
    defineField({
      type: 'string',
      name: 'title',
      title: 'Title',
    }),
    defineField({
      name: 'video',
      title: 'Video',
      type: 'file',
      options: {
        accept: 'video/*',
      },
    }),

    defineField({
      name: 'alt',
      type: 'string',
      title: 'Alt text',
      description: 'Alternative text for screenreaders. Falls back on caption if not set',
    }),
    defineField({
      name: 'team',
      title: 'Team',
      type: 'reference',
      to: {type: 'team'},
    }),
  ],
})
