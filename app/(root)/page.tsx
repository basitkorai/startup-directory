import StartupCard, { StartupTypeCard } from '@/components/StartupCard'
import SearchForm from '../../components/SearchForm'

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>
}) {
  const resolvedParams = await searchParams
  const query = resolvedParams.query

  const posts = [
    {
      _createdAt: 'Yesterday',
      views: 55,
      auther: { _id: 1, name: 'Dicaprio' },
      _id: 81,
      description: 'This is a description',
      image:
        'https://images.pexels.com/photos/2085831/pexels-photo-2085831.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      category: 'Robots',
      title: 'We Robots',
    },
  ]

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
    </>
  )
}
