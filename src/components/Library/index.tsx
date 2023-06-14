'use client'

import useAuthModal from '@/hooks/useAuthModal'
import useOnPlay from '@/hooks/useOnPlay'
import useUploadModal from '@/hooks/useUploadModal'
import { useUser } from '@/hooks/useUser'
import { Song } from '@/types'
import { useCallback } from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import { TbPlaylist } from 'react-icons/tb'
import { MediaItem } from '../MediaItem'

interface LibraryProps {
   songs: Array<Song>
}

export const Library = ({ songs }: LibraryProps) => {
   const authModal = useAuthModal()
   const uploadModal = useUploadModal()
   const { user } = useUser()

   const onPlay = useOnPlay(songs)

   const onClick = useCallback(() => {
      if (!user) return authModal.onOpen()

      // TODO: Check for subscription

      return uploadModal.onOpen()
   }, [authModal, uploadModal, user])

   return (
      <div className="flex flex-col">
         <div className="flex items-center justify-between px-5 pt-4">
            <div className="inline-flex items-center gap-x-2">
               <TbPlaylist size={26} className="text-neutral-400" />
               <p className="text-md font-medium text-neutral-400">
                  Sua Biblioteca
               </p>
            </div>
            <AiOutlinePlus
               onClick={onClick}
               size={20}
               className="cursor-pointer text-neutral-400 transition hover:text-white"
            />
         </div>
         <div className="mt-4 flex flex-col gap-y-2 px-3">
            {songs.map((item) => (
               <MediaItem
                  key={item.id}
                  onClick={(id: string) => onPlay(id)}
                  data={item}
               />
            ))}
         </div>
      </div>
   )
}
