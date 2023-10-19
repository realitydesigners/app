import {defineArrayMember, defineField, defineType} from 'sanity'
import {UploadIcon} from '@sanity/icons'

export default defineType({
  name: 'modules',
  title: 'Internal World Modules',
  icon: UploadIcon,
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      type: 'slug',
      name: 'slug',
      title: 'Slug',
      options: {
        source: 'title',
      },
    }),
    defineField({
      type: 'reference',
      name: 'model',
      title: '3D Model',
      to: {type: 'model'},
    }),
    defineField({
      name: 'subcategories',
      title: 'Subcategories',
      type: 'array',
      of: [{type: 'reference', to: {type: 'modules'}}],
    }),
    defineField({
      type: 'boolean',
      name: 'isMain',
      title: 'Is Main Category?',
      description: 'Check this if the category is a main category.',
    }),
  ],
})
