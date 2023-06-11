'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useCallback } from 'react'
import { FaPlay } from 'react-icons/fa'

interface ListItemProps {
   image: string
   name: string
   href: string
}

export const ListItem = ({ image, name, href }: ListItemProps) => {
   const router = useRouter()

   const onClick = useCallback(() => {
      // Add authentication before push
      router.push(href)
   }, [href, router])

   return (
      <button
         onClick={onClick}
         className="trnasition group relative flex items-center gap-x-4 overflow-hidden rounded-md bg-neutral-100/10 pr-4 hover:bg-neutral-100/20"
      >
         <div className="relative min-h-[4rem] min-w-[4rem]">
            <Image className="object-cover" fill src={image} alt="Image" />
         </div>
         <p className="truncate py-5 font-medium">{name}</p>
         <div className="absolute right-5 flex items-center justify-center rounded-full bg-green-500 p-4 opacity-0 drop-shadow-md transition hover:scale-110 group-hover:opacity-100">
            <FaPlay className="text-black" />
         </div>
      </button>
   )
}
