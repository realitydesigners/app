import {defineField, defineType} from 'sanity'
import {BookIcon} from '@sanity/icons'

export default defineType({
  name: 'post',
  title: 'Post',
  icon: BookIcon,
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'meta',
      title: 'Meta',
      type: 'string',
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'string',
    }),
    defineField({
      title: 'Author',
      name: 'author',
      type: 'reference',
      to: [{type: 'author'}],
    }),

    defineField({
      name: 'iframedesktop',
      title: 'Iframe Desktop',
      type: 'string',
    }),
    defineField({
      name: 'iframemobile',
      title: 'Iframe Mobile',
      type: 'string',
    }),

    defineField({
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      title: 'Category',
      name: 'category',
      type: 'reference',
      to: [{type: 'category'}],
    }),

    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'blockContent',
    }),
  ],

  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage',
    },
    prepare(selection) {
      const {author} = selection
      return {...selection, subtitle: author && `by ${author}`}
    },
  },
})
