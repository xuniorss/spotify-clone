'use client'

import { useCallback } from 'react'
import { TbPlaylist } from 'react-icons/tb'
import { AiOutlinePlus } from 'react-icons/ai'

export const Library = () => {
   const onClick = useCallback(() => {
      // Handle upload later
   }, [])

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
            Lista de musicas!
         </div>
      </div>
   )
}
