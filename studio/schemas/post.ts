import {ImageIcon, LinkIcon, UserIcon, UploadIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

import categoryType from './category'

import teamType from './team'

export default defineType({
  type: 'document',
  name: 'post',
  title: 'Post',
  icon: UploadIcon,
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
      type: 'array',
      name: 'content',
      title: 'Content',
      description:
        "This is where you can write the page's content. Including custom blocks like timelines for more a more visual display of information.",
      of: [
        // Paragraphs
        {
          type: 'block',
          lists: [
            {title: 'Bullet', value: 'bullet'},
            {title: 'Numbered', value: 'number'},
          ],
          marks: {
            annotations: [
              {
                name: 'internalLink',
                type: 'object',
                title: 'Internal link',
                icon: UserIcon,
                fields: [
                  {
                    name: 'reference',
                    type: 'reference',
                    title: 'Reference',
                    to: [{type: 'posts'}],
                  },
                ],
              },
            ],
          },
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'Quote', value: 'blockquote'},
            {title: 'H1', value: 'h1'},
            {title: 'H2', value: 'h2'},
            {title: 'H3', value: 'h3'},
            {title: 'H4', value: 'h4'},
            {title: 'H5', value: 'h5'},
            {title: 'H6', value: 'h6'},
          ],
        },
        defineField({
          type: 'object',
          name: 'postsRef',
          title: 'Post',
          preview: {
            select: {
              imageUrl: 'post.image.asset.url',
              title: 'post.title',
            },
          },
          fields: [
            defineField({
              type: 'reference',
              name: 'post',
              title: 'Referenced Post',
              to: [{type: 'post'}],
            }),
          ],
        }),
        defineField({
          type: 'object',
          name: 'mediaRef',
          title: 'Media',
          preview: {
            select: {
              imageUrl: 'media.image.asset.url',
              title: 'media.title',
            },
          },
          fields: [
            defineField({
              type: 'reference',
              icon: ImageIcon,
              name: 'media',
              title: 'Media Item',
              to: [{type: 'media'}],
            }),
            {
              name: 'className',
              title: 'CSS Class',
              type: 'string',
              options: {
                list: [
                  {title: 'Card 1', value: 'card-1'},
                  {title: 'Card 2', value: 'card-2'},
                  // Add more class options if needed
                ],
              },
            },
          ],
        }),

        defineField({
          type: 'image',
          icon: ImageIcon,
          name: 'image',
          title: 'Image',
          options: {
            hotspot: true,
          },
          preview: {
            select: {
              imageUrl: 'asset.url',
              title: 'caption',
            },
          },
          fields: [
            defineField({
              name: 'alt',
              type: 'string',
              title: 'Alt text',
              description: 'Alternative text for screenreaders. Falls back on caption if not set',
            }),
            {
              name: 'className',
              title: 'CSS Class',
              type: 'string',
              options: {
                list: [
                  {title: 'img-dark', value: 'img-dark'},
                  {
                    title: 'img-light',
                    value: 'img-light',
                  },
                  // Add more class options if needed
                ],
              },
            },
          ],
        }),
        defineField({
          type: 'object',
          icon: LinkIcon,
          name: 'iframe',
          title: 'iframe',
          fields: [
            defineField({
              type: 'url',
              name: 'url',
              title: 'URL',
              validation: (rule) => rule.uri({scheme: ['http', 'https']}),
            }),
            defineField({
              type: 'string',
              name: 'width',
              title: 'Width',
            }),
            defineField({
              type: 'string',
              name: 'height',
              title: 'Height',
            }),
          ],
        }),
        defineField({
          type: 'object',
          icon: LinkIcon,
          name: 'spline',
          title: 'Spline',
          fields: [
            defineField({
              type: 'url',
              name: 'url',
              title: 'URL',
              validation: (rule) => rule.uri({scheme: ['http', 'https']}),
            }),
          ],
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
