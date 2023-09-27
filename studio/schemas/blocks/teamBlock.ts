import {defineField} from 'sanity'

import teamType from '../team'

export default {
  type: 'object',
  name: 'teamBlock',
  title: 'Team Block',
  fields: [
    defineField({
      name: 'team',
      title: 'Team',
      type: 'reference',
      to: [{type: teamType.name}],
    }),
  ],
  preview: {
    select: {
      title: 'team.title',
    },
  },
}
