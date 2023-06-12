'use client'

import useLoadImage from '@/hooks/useLoadImage'
import { Song } from '@/types'
import Image from 'next/image'
import { useCallback } from 'react'

interface MediaItemProps {
   data: Song
   onClick?: (id: string) => void
}

export const MediaItem = ({ data, onClick }: MediaItemProps) => {
   const imageUrl = useLoadImage(data)

   const handleClick = useCallback(() => {
      if (onClick) return onClick(data.id)

      // TODO: Default turn on player
   }, [data.id, onClick])

   return (
      <div
         onClick={handleClick}
         className="flex w-full cursor-pointer items-center gap-x-3 rounded-md p-2 hover:bg-neutral-800/50"
      >
         <div className="relative min-h-[3rem] min-w-[3rem] overflow-hidden rounded-md">
            <Image
               fill
               src={imageUrl || '/images/liked.png'}
               alt="Media Item"
               className="object-cover"
            />
         </div>
         <div className="flex flex-col gap-y-1 overflow-hidden">
            <p className="truncate text-white">{data.title}</p>
            <p className="truncate text-sm text-neutral-400">{data.author}</p>
         </div>
      </div>
   )
}
