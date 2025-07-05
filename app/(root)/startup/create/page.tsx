import { auth } from '@/auth'
import StartupForm from '@/components/StartupForm'
import { redirect } from 'next/navigation'
import React from 'react'

const Create = async () => {
  const session = await auth() // checks if user is logged in

  if (!session) redirect('/')
  return (
    <>
      <section className="pink_container bg-white !min-h-[230px]">
        <h1 className="heading">Submit your startup!</h1>
      </section>
      <StartupForm />
    </>
  )
}

export default Create
