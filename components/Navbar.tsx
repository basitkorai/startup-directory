import { auth, signIn, signOut } from '@/auth'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from './ui/button'

const Navbar = async () => {
  const session = await auth()
  return (
    <header className="px-5 py-3 bg-white shadow-sm font-work-sans">
      <nav className="flex justify-between items-center font-semibold">
        <Link href={'/'}>
          <Image src={'/logo.png'} alt="logo" width={144} height={30} />
        </Link>

        <div className="flex item-center gap-5">
          {session && session?.user ? (
            <>
              <Button>
                <Link href="/startup/create">
                  <span>Create</span>
                </Link>
              </Button>

              <form
                action={async () => {
                  'use server'
                  await signOut({ redirectTo: '/' })
                }}
              >
                <Button className="cursor-pointer" type="submit">
                  <span>Logout</span>
                </Button>
              </form>

              <Button>
                <Link href={`/user/${session?.user?.id}`}>
                  <span>{session?.user?.name}</span>
                  {/* <Image
                  src={session?.user?.image}
                  alt={session?.user?.name}
                  width={50}
                  height={50}
                /> */}
                </Link>
              </Button>
            </>
          ) : (
            <form
              action={async () => {
                'use server'
                await signIn('github')
              }}
            >
              <Button className="cursor-pointer" type="submit">
                Signin with GitHub
              </Button>
            </form>
          )}
        </div>
      </nav>
    </header>
  )
}

export default Navbar
