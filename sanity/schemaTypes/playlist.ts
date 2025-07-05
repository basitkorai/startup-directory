import { defineField, defineType } from 'sanity'

export const playlist = defineType({
  name: 'playlist',
  title: 'Playlist',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {
        source: 'name',
      },
    }),
    defineField({
      name: 'select',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'startup' }] }],
    }),
  ],
  preview: {
    select: {
      title: 'name',
    },
  },
})
