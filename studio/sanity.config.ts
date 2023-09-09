import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'

import article from './schemas/article'
import posts from './schemas/posts'
import post from './schemas/post'
import team from './schemas/team'
import category from './schemas/category'
import media from './schemas/media'
import img from './schemas/img'
import quote from './schemas/quote'
import video from './schemas/video'

export default defineConfig({
  name: 'default',
  title: 'website',

  projectId: 'fovvfda4',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2023-08-31',

  plugins: [deskTool(), visionTool()],

  schema: {
    types: [article, img, video, quote, post, team, posts, category, media],
  },
})
