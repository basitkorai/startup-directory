import { formatDate } from '@/lib/utils'
import { client } from '@/sanity/lib/client'
import {
  PLAYLIST_BY_SLUG_QUERY,
  STARTUP_BY_ID_QUERY,
} from '@/sanity/lib/queries'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import markdownit from 'markdown-it'
import { Suspense } from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import View from '@/components/View'
import StartupCard, { StartupTypeCard } from '@/components/StartupCard'

const md = markdownit()

// /startup/4 (dynamic route)
// export const experimental_ppr = true // allows for sanity's api to perform incremental static regeneration to work.

const Startup = async ({ params }: { params: Promise<{ id?: string }> }) => {
  const startupId = (await params).id
  // Sequential Data Fetching
  // const { select: startupsOfTheMonth } = await client.fetch(
  //   PLAYLIST_BY_SLUG_QUERY,
  //   {
  //     slug: 'startups-of-the-month',
  //   }
  // )
  // const startup = await client.fetch(STARTUP_BY_ID_QUERY, { id: startupId })

  // Parallel Fetching
  const [startup, { select: startupsOfTheMonth }] = await Promise.all([
    client.fetch(STARTUP_BY_ID_QUERY, { id: startupId }),
    client.fetch(PLAYLIST_BY_SLUG_QUERY, {
      slug: 'startups-of-the-month',
    }),
  ])

  if (!startup) {
    return notFound() // navigates to a 404 page
  }
  const parsedContent = md.render(startup?.pitch || '')

  return (
    <>
      <section className="pink_container !min-h-[230px]">
        <p className="bg-yellow-300 p-3 font-bold rounded-xl">
          {formatDate(startup?._createdAt)}
        </p>
        <h1 className="heading">{startup?.name}</h1>
        <h2 className="sub-heading">{startup?.description}</h2>
      </section>
      <section className="section_container bg-white">
        <Image
          src={startup?.image}
          alt={startup?.name}
          width={400}
          height={400}
          className="w-full h-auto rounded-xl"
        />

        <div className="space-y-5 mt-10 max-w-4xl mx-auto">
          <div className="flex-between gap-5 w-full">
            <Link
              href={`/user/${startup.author?._id}`}
              className="flex gap-2 items-center mb-3 drop-shadow-2xl"
            >
              <div>
                <Image
                  src={startup.author?.image}
                  alt="user"
                  width={64}
                  height={64}
                  className="rounded-full w-15 h-15 object-cover "
                />
                <p className="text-20-medium">{startup.author?.name}</p>
                <p className="text-16-medium !text-black-300 !text-gray-800">
                  @{startup.author?.username}
                </p>
              </div>
            </Link>

            <p className="category-tag">{startup.category}</p>
          </div>
          <h3 className="text-30-bold ">Pitch Details</h3>
          {parsedContent ? (
            <article
              className="prose max-w-4xl font-work-sans"
              dangerouslySetInnerHTML={{ __html: parsedContent }}
            />
          ) : (
            <p className="no-result">No details provided</p>
          )}
        </div>

        <hr className="divider my-7" />

        {startupsOfTheMonth?.length > 0 && (
          <div className="max-w-4xl mx-auto">
            <p className="text-30-semibold">Startups of the month</p>

            <ul className="mt-7 card_grid-sm">
              {startupsOfTheMonth.map((post: StartupTypeCard, i: number) => (
                <StartupCard key={i} post={post} />
              ))}
            </ul>
          </div>
        )}
      </section>

      <Suspense fallback={<Skeleton className="view_skeleton" />}>
        <View id={startupId} />
      </Suspense>
    </>
  )
}

export default Startup
