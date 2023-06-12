'use client'

import { LikeButton } from '@/components/LikeButton'
import { MediaItem } from '@/components/MediaItem'
import { useUser } from '@/hooks/useUser'
import { Song } from '@/types'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

interface LikedContentProps {
   songs: Array<Song>
}

export const LikedContent = ({ songs }: LikedContentProps) => {
   const router = useRouter()
   const { isLoading, user } = useUser()

   useEffect(() => {
      if (!isLoading && !user) {
         router.replace('/')
      }
   }, [isLoading, user, router])

   if (songs.length === 0) {
      return (
         <span className="flex w-full flex-col gap-y-2 px-6 text-neutral-400">
            Nenhuma música curtida.
         </span>
      )
   }

   return (
      <div className="flex w-full flex-col gap-y-2 p-6">
         {songs.map((song: any) => (
            <div key={song.id} className="flex w-full items-center gap-x-4">
               <div className="flex-1">
                  <MediaItem onClick={() => {}} data={song} />
               </div>
               <LikeButton songId={song.id} />
            </div>
         ))}
      </div>
   )
}
