import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {theme} from 'https://themer.sanity.build/api/hues?default=ffffff;50;lightest:ffffff&primary=878787;200;lightest:ffffff;darkest:111212&transparent=c6c8c8;300;lightest:000000&positive=6e6e6e;300&caution=fbd024;200&critical=darkest:111212&lightest=fafafa&darkest=000000'
import article from './schemas/article'
import posts from './schemas/posts'

import team from './schemas/team'
import category from './schemas/category'
import media from './schemas/media'
import img from './schemas/img'
import quote from './schemas/quote'
import video from './schemas/video'
import audio from './schemas/audio'
import model from './schemas/model'
import headingBlock from './blocks/headingBlock'
import contentBlock from './blocks/contentBlock'
import teamBlock from './blocks/teamBlock'

import CustomField from './components/CustomField'
import CustomItem from './components/CustomItem'

export default defineConfig({
  theme,
  name: 'default',
  title: 'Reality Designers | Studio',

  projectId: 'fovvfda4',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2023-08-31',

  plugins: [deskTool(), visionTool()],

  schema: {
    types: [
      posts,
      img,
      audio,
      video,
      quote,
      team,
      category,
      media,
      article,
      headingBlock,
      contentBlock,
      teamBlock,
      model,
    ],
  },
  form: {
    components: {
      // Define custom components for the desk tool
      item: CustomItem,
      field: CustomField,
    },
  },
})
