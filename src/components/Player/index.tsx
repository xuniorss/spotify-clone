'use client'

import usePlayer from '@/hooks/usePlayer'
import useSongById from '@/hooks/useGetSongById'
import useLoadSongUrl from '@/hooks/useLoadSongUrl'
import { PlayerContent } from '../PlayerContent'

export const Player = () => {
   const player = usePlayer()
   const { song } = useSongById(player.activeId)
   const songUrl = useLoadSongUrl(song!)

   if (!song || !songUrl || !player.activeId) return null

   return (
      <div className="fixed bottom-0 h-[5rem] w-full bg-black px-4">
         <PlayerContent key={songUrl} song={song} songUrl={songUrl} />
      </div>
   )
}
