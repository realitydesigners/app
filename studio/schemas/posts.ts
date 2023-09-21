import {ImageIcon, LinkIcon, UserIcon, PlayIcon, BookIcon} from '@sanity/icons'
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
          type: 'object',
          name: 'headingBlock',
          icon: UserIcon,
          title: 'Heading Block',
          fields: [
            {
              name: 'heading',
              title: 'Heading',
              type: 'string',
            },
            {
              name: 'subheading',
              title: 'Subheading',
              type: 'text',
            },
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
          ],
        },

        {
          type: 'object',
          name: 'contentBlock',
          title: 'Content Block',
          fields: [
            {
              name: 'content',
              title: 'Content',
              type: 'array',
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
                      imageUrl: 'posts.image.asset.url',
                      title: 'posts.title',
                    },
                  },
                  fields: [
                    defineField({
                      type: 'reference',
                      name: 'posts',
                      title: 'Referenced Post',
                      to: [{type: 'posts'}],
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
                  type: 'object',
                  name: 'quoteRef',
                  title: 'Quote',
                  icon: BookIcon,
                  preview: {
                    select: {
                      imageUrl: 'quote.mediaRef.image.asset.url',
                      title: 'quote.quote',
                    },
                  },
                  fields: [
                    defineField({
                      type: 'reference',
                      icon: ImageIcon,
                      name: 'quote',
                      title: 'Quote Item',
                      to: [{type: 'quote'}],
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
                  type: 'object',
                  name: 'audioRef',
                  icon: PlayIcon,
                  title: 'Audio',
                  preview: {
                    select: {
                      title: 'audio.title',
                    },
                  },
                  fields: [
                    defineField({
                      type: 'reference',
                      name: 'audio',
                      title: 'Audio File',
                      to: [{type: 'audio'}],
                      // This references the 'audio' schema
                    }),
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
                      description:
                        'Alternative text for screenreaders. Falls back on caption if not set',
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
                  title: 'iFrame',
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
            },
          ],
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
