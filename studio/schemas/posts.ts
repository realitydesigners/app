import {defineArrayMember, defineField, defineType} from 'sanity'

export default defineType({
  type: 'document',
  name: 'posts',
  title: 'Posts',
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
      type: 'text',
      name: 'excerpt',
      title: 'Excerpt',
      validation: (rule) => rule.required(),
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

    defineField({
      name: 'linkedContent',
      title: 'Linked Content',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'postsRef',
          title: 'Posts Reference',
          type: 'object',
          fields: [
            {
              name: 'post',
              type: 'reference',
              to: {type: 'posts'},
            },
            {
              name: 'layout',
              type: 'string',
              title: 'Layout',
              options: {
                list: [
                  {title: 'Dark', value: 'dark'},
                  {title: 'Light', value: 'light'},
                ],
              },
            },
          ],
          preview: {
            select: {
              title: 'post.title',
              layout: 'layout',
              imageUrl: 'post.image.asset.url',
            },
            prepare(selection) {
              const {title, layout} = selection
              return {
                title: title,
                subtitle: layout ? `Type: Post | Layout: ${layout}` : 'Type: Post',
                imageUrl: selection.imageUrl,
              }
            },
          },
        }),
        defineArrayMember({
          name: 'mediaRef',
          title: 'Image Reference',
          type: 'object',
          fields: [
            {
              name: 'img',
              type: 'reference',
              to: {type: 'img'},
            },
            {
              name: 'layout',
              type: 'string',
              title: 'Layout',
              options: {
                list: [
                  {title: 'Full Width', value: 'Full Width'},
                  {title: 'Half Width', value: 'Half Width'},
                ],
              },
            },
          ],
          preview: {
            select: {
              title: 'img.title',
              layout: 'layout',
              imageUrl: 'img.image.asset.url',
            },
            prepare(selection) {
              const {title, layout} = selection
              return {
                title: title,
                subtitle: layout ? `Type: Image | Layout: ${layout}` : 'Type: Post',
                imageUrl: selection.imageUrl,
              }
            },
          },
        }),
      ],
    }),

    defineField({
      name: 'subcategories',
      title: 'Subcategories',
      type: 'array',
      of: [{type: 'reference', to: {type: 'posts'}}],
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



  ],
})
