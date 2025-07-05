import { formatDate } from '@/lib/utils'
import { EyeIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from './ui/button'
import { Startup } from '@/sanity/types'

export type StartupTypeCard = Omit<Startup, 'author'> & { author?: 'Author' }

const StartupCard = ({ post }: { post: StartupTypeCard }) => {
  const { _createdAt, views, author, name, category, description, _id, image } =
    post
  return (
    <li className="startup-card group">
      <div className="">
        <p className="startup_card_date">{formatDate(_createdAt)}</p>
        <div className="flex gap-1.5">
          <EyeIcon className="size-6" />
          <span className="text-16-medium">{views}</span>
        </div>

        <div className="flex-between mt-5 gap-5">
          <div className="flex-1">
            <Link href={`/user/${author?._id}`}>
              <p className="text-16-medium line-clamp-1">{author?.name}</p>
            </Link>

            <Link href={`/startup/${_id}`}>
              <h3 className="text-26-semibold line-clamp-1">{name}</h3>
            </Link>
          </div>
        </div>
        <Link href={`/user/${author?._id}`}>
          <Image
            src={author?.image}
            alt={author?.name}
            width={50}
            height={50}
            className="rounded-full"
          />
        </Link>
      </div>
      <Link href={`/startup/${_id}`}>
        <p className="startup-card_desc">{description}</p>

        <Image
          src={image}
          alt="placeholder"
          className="startup-card_img"
          width={100}
          height={70}
        />
      </Link>

      <div className="flex-between gap-3 mt-5">
        <Link href={`/?query=${category?.toLowerCase()}`}>
          <p className="font-bold">{category}</p>
        </Link>
        <Button className="startup-card_btn">
          <Link href={`/startup/${_id}`}>Details</Link>
        </Button>
      </div>
    </li>
  )
}

export default StartupCard
