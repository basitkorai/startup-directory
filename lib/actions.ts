'use server'

import { auth } from '@/auth'
import { parseServerActionResponse, slugify } from './utils'
import { writeClient } from '@/sanity/lib/write-client'

export const createPitch = async (
  state: any,
  form: FormData,
  pitch: string
) => {
  const session = await auth()

  if (!session)
    return parseServerActionResponse({
      error: 'Not signed in',
      status: 'ERROR',
    })

  const { name, description, category, link } = Object.fromEntries(
    Array.from(form).filter(([key]) => key !== 'pitch')
  )

  const slug = slugify(name as string)

  try {
    const startup = {
      name,
      description,
      category,
      image: link,
      slug: {
        _type: 'slug',
        current: slug,
      },
      author: {
        _type: 'reference',
        _ref: session?.user?.id, // make sure this is valid
      },
      pitch,
    }

    const result = await writeClient.create({ _type: 'startup', ...startup })
    return parseServerActionResponse({
      ...result,
      error: '',
      status: 'SUCCESS',
    })
  } catch (error) {
    console.log(error)

    parseServerActionResponse({ error: JSON.stringify(error), status: 'ERROR' })
  }
}
