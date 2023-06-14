'use client'

import { Song } from '@/types'
import { LikeButton } from '../LikeButton'
import { MediaItem } from '../MediaItem'
import { BsPauseFill, BsPlayFill } from 'react-icons/bs'
import { AiFillStepBackward, AiFillStepForward } from 'react-icons/ai'
import { HiSpeakerXMark, HiSpeakerWave } from 'react-icons/hi2'
import { Slider } from '../Slider'
import usePlayer from '@/hooks/usePlayer'
import { useCallback, useEffect, useState } from 'react'
import useSound from 'use-sound'

interface PlayerContent {
   song: Song
   songUrl: string
}

export const PlayerContent = ({ song, songUrl }: PlayerContent) => {
   const [volume, setVolume] = useState(1)
   const [isPlaying, setIsPlaying] = useState(false)

   const player = usePlayer()

   const Icon = isPlaying ? BsPauseFill : BsPlayFill
   const VolumeIcon = volume === 0 ? HiSpeakerXMark : HiSpeakerWave

   const onPlayNext = useCallback(() => {
      if (player.ids.length === 0) return

      const currentIndex = player.ids.findIndex((id) => id === player.activeId)
      const nextSong = player.ids[currentIndex + 1]

      if (!nextSong) return player.setId(player.ids[0])

      player.setId(nextSong)
   }, [player])

   const onPlayPrevious = useCallback(() => {
      if (player.ids.length === 0) return

      const currentIndex = player.ids.findIndex((id) => id === player.activeId)
      const previousSong = player.ids[currentIndex - 1]

      if (!previousSong) return player.setId(player.ids[player.ids.length - 1])

      player.setId(previousSong)
   }, [player])

   const [play, { pause, sound }] = useSound(songUrl, {
      volume,
      onplay: () => setIsPlaying(true),
      onend: () => {
         setIsPlaying(false), onPlayNext()
      },
      onpause: () => setIsPlaying(false),
      format: ['mp3'],
   })

   useEffect(() => {
      sound?.play()
      return () => sound?.unload()
   }, [sound])

   const handlePlay = useCallback(() => {
      if (!isPlaying) play()
      else pause()
   }, [isPlaying, pause, play])

   const toggleMute = useCallback(() => {
      if (volume === 0) setVolume(1)
      else setVolume(0)
   }, [volume])

   return (
      <div className="grid h-full grid-cols-2 md:grid-cols-3">
         <div className="flex w-full justify-start">
            <div className="flex items-center gap-x-4">
               <MediaItem data={song} />
               <LikeButton songId={song.id} />
            </div>
         </div>
         <div className="col-auto flex w-full items-center justify-end md:hidden">
            <div
               onClick={handlePlay}
               className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white p-1"
            >
               <Icon size={30} className="text-black" />
            </div>
         </div>
         <div className="hidden h-full w-full max-w-[45.125rem] items-center justify-center gap-x-6 md:flex">
            <AiFillStepBackward
               onClick={onPlayPrevious}
               size={30}
               className="cursor-pointer text-neutral-400 transition hover:text-white"
            />
            <div
               onClick={handlePlay}
               className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white p-1"
            >
               <Icon size={30} className="text-black" />
            </div>
            <AiFillStepForward
               onClick={onPlayNext}
               size={30}
               className="cursor-pointer text-neutral-400 transition hover:text-white"
            />
         </div>
         <div className="hidden w-full justify-end pr-2 md:flex">
            <div className="flex w-[7.5rem] items-center gap-x-2">
               <VolumeIcon
                  onClick={toggleMute}
                  className="cursor-pointer"
                  size={34}
               />
               <Slider value={volume} onChange={(value) => setVolume(value)} />
            </div>
         </div>
      </div>
   )
}
