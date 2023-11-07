import {defineArrayMember, defineField, defineType} from 'sanity'

export default defineType({
  type: 'document',
  name: 'library',
  title: 'Library',
  fields: [
    defineField({
      name: 'block',
      title: 'Content Block',
      type: 'array',
      of: [
        {
          type: 'headingBlock',
          title: 'Heading',
        },
        {
          type: 'contentBlock',
          title: 'Content',
        },
        {
          type: 'teamBlock',
          title: 'Team',
        },
      ],
    }),
    defineField({
      type: 'string',
      name: 'title',
      title: 'Title',

      validation: (rule) => rule.required(),
    }),
    defineField({
      type: 'slug',
      name: 'slug',
      title: 'Slug',
      options: {
        source: 'title',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
        name: 'subcategories',
        title: 'Subcategories',
        type: 'array',
        of: [{type: 'reference', to: {type: 'library'}}],
      }),
      defineField({
        type: 'string',
        name: 'sceneIdentifier',
        title: 'Scene Identifier',
        description: 'Identifier for the 3D background scene associated with this category.',
      }),
      defineField({
        type: 'reference',
        name: 'model',
        title: '3D Model',
        to: {type: 'model'},
      }),
  
      defineField({
        type: 'boolean',
        name: 'isMain',
        title: 'Is Main Category?',
        description: 'Check this if the category is a main category.',
      }),


    defineField({
      type: 'image',
      name: 'image',
      title: 'Image',
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
        },
      ],
      options: {
        hotspot: true,
      },
    }),
  ],
})
