import NextAuth from 'next-auth'
import GitHub from 'next-auth/providers/github'
import { client } from './sanity/lib/client'
import { AUTHOR_BY_GITHUB_ID_QUERY } from './sanity/lib/queries'
import { writeClient } from './sanity/lib/write-client'

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [GitHub],
  callbacks: {
    async signIn({ user: { name, email, image }, profile }) {
      //  You're checking if this GitHub user already exists in your Sanity backend. If not, you're creating a new user document.

      const existingUser = await client
        .withConfig({ useCdn: false })
        .fetch(AUTHOR_BY_GITHUB_ID_QUERY, {
          id: profile?.id,
        })
      console.log(existingUser)

      if (!existingUser) {
        console.log(`user does not exist!`)
        await writeClient.create({
          _type: 'author',
          id: profile?.id, // we can refer to only values where key value names are the same.
          name,
          username: profile?.login,
          email,
          image,
          bio: profile?.bio || '',
        })
      }

      return true
    },
    async jwt({ token, account, profile }) {
      // Purpose:
      // Link Sanity user to JWT token
      // This callback runs every time a token is created or refreshed (e.g., on sign-in or page reload).

      // Why you're using it:
      // You're fetching the Sanity author’s internal _id using the GitHub ID, and storing it in the JWT token.
      if (account && profile) {
        const user = await client
          .withConfig({ useCdn: false })
          .fetch(AUTHOR_BY_GITHUB_ID_QUERY, {
            id: profile?.id,
          })

        token.id = user?._id
      }

      return token
    },

    async session({ session, token }) {
      // Expose user ID to the client

      // Purpose:
      // This callback runs when the session is created from the JWT, and it's what gets sent to the client-side.

      // Why you're using it:
      // You're taking the token.id (Sanity _id) and attaching it to the session object that can be accessed on the client:
      session.user.id = token.id
      return session
    },
  },
})
