import StartupCard, { StartupTypeCard } from '@/components/StartupCard'
import SearchForm from '../../components/SearchForm'
import { STARTUPS_QUERY } from '@/sanity/lib/queries'
import { sanityFetch, SanityLive } from '@/sanity/lib/live'
import { auth } from '@/auth'

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>
}) {
  // const resolvedParams = await searchParams
  // const query = resolvedParams.query
  const query = (await searchParams).query
  const params = { search: query || null }

  const session = await auth()
  console.log(session?.user?.id)

  // const posts = await client.fetch(STARTUPS_QUERY)
  const { data: posts } = await sanityFetch({ query: STARTUPS_QUERY, params })

  return (
    <>
      {/* HERO SECTION */}
      <section className="pink_container">
        <h1 className="heading rounded-3xl">
          Pitch your Startup, <br />
          Connect With Entrepreneurs
        </h1>

        <p className="sub-heading max-w-3xl">
          Submit Ideas, Vote on Pitches, and Get Noticed in Virtual Competition
        </p>

        <SearchForm query={query} />
      </section>
      {/* ******************** */}

      <section className="section_container bg-white">
        <p className="text-30-semibold">
          {query ? `Search result for ${query}` : 'All Startups'}
        </p>

        <ul className="mt-7 card_grid">
          {posts.map((post: StartupTypeCard, index: number) => {
            return <StartupCard key={post?._id} post={post} />
          })}
        </ul>
      </section>

      <SanityLive />
    </>
  )
}
