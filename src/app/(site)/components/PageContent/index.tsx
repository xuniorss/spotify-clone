'use client'

import { SongItem } from '@/components/SongItem'
import { Song } from '@/types'

interface PageContentProps {
   songs: Array<Song>
}

export const PageContent = ({ songs }: PageContentProps) => {
   if (songs.length === 0) {
      return (
         <span className="mt-4 text-neutral-400">
            Nenhuma música disponível.
         </span>
      )
   }

   return (
      <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-8">
         {songs.map((item) => (
            <SongItem key={item.id} onClick={() => {}} data={item} />
         ))}
      </div>
   )
}
