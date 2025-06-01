'use client'

import { X } from 'lucide-react'
import Link from 'next/link'
import { useEffect } from 'react'
import { Button } from './ui/button'

const SearchResetForm = () => {
  let form: any = ''

  useEffect(() => {
    const formElement = document.querySelector(
      '.search-form'
    ) as HTMLFormElement

    form = formElement
    console.log(form)
  }, [])

  return (
    <Link
      className="w-8 h-8 rounded-full flex place-content-center items-center overflow-hidden bg-black text-white self-center cursor-pointer"
      href="/"
    >
      <Button
        onClick={() => {
          if (form) form.reset()
        }}
        type="reset"
        className=""
      >
        <X />
      </Button>
    </Link>
  )
}

export default SearchResetForm
