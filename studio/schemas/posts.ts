import {defineArrayMember, defineField, defineType} from 'sanity'

import categoryType from './category'

import teamType from './team'

export default defineType({
  type: 'document',
  name: 'posts',
  title: 'Posts',

  fields: [
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
      name: 'publicationDate', // Replace with the desired name for the field
      title: 'Publication Date', // Replace with the desired title for the field
      type: 'date', // Use the 'date' type for a Date field
      options: {
        dateFormat: 'DD-MM-YYYY', // Specify the desired date format
      },
      validation: (rule) => rule.required(), // Add validation rules if needed
    }),

    defineField({
      name: 'team',
      title: 'Team',
      type: 'reference',
      to: [{type: teamType.name}],
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      type: 'text',
      name: 'excerpt',
      title: 'Excerpt',
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{type: categoryType.name}],
    }),
    defineField({
      name: 'layout',
      title: 'Layout',
      type: 'string',
      options: {
        list: [
          {title: 'Dark', value: 'dark'},
          {title: 'Light', value: 'light'},
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      type: 'image',
      name: 'image',
      title: 'Image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
        },
      ],
    }),

    defineField({
      name: 'block',
      title: 'Content Block',
      type: 'array',

      of: [
        {
          type: 'headingBlock',
          title: 'Heading ',
        },
        {
          type: 'contentBlock',
          title: 'Content',
        },
      ],
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
  ],

  preview: {
    select: {
      title: 'title',
    },
    prepare({title}) {
      return {
        subtitle: 'Page',
        title,
      }
    },
  },
})
