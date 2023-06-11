'use client'

import { useRouter } from 'next/navigation'
import { ReactNode, useCallback } from 'react'
import { twMerge } from 'tailwind-merge'
import { RxCaretLeft, RxCaretRight } from 'react-icons/rx'
import { HiHome } from 'react-icons/hi'
import { BiSearch } from 'react-icons/bi'
import { Button } from '../Button'

interface HeaderProps {
   children: ReactNode
   className?: string
}

export const Header = ({ children, className }: HeaderProps) => {
   const router = useRouter()

   const handleLogout = useCallback(() => {
      // Handle logout
   }, [])

   return (
      <header
         className={twMerge(
            `h-fit bg-gradient-to-b from-emerald-800 p-6`,
            className
         )}
      >
         <div className="mb-4 flex w-full items-center justify-between">
            <div className="hidden items-center gap-x-2 md:flex">
               <button className="flex items-center justify-center rounded-full bg-black transition hover:opacity-75">
                  <RxCaretLeft
                     onClick={() => router.back()}
                     className="text-white"
                     size={35}
                  />
               </button>
               <button className="flex items-center justify-center rounded-full bg-black transition hover:opacity-75">
                  <RxCaretRight
                     onClick={() => router.forward()}
                     className="text-white"
                     size={35}
                  />
               </button>
            </div>
            <div className="flex items-center gap-x-2 md:hidden">
               <button className="flex items-center justify-center rounded-full bg-white p-2 transition hover:opacity-75">
                  <HiHome className="text-black" size={20} />
               </button>
               <button className="flex items-center justify-center rounded-full bg-white p-2 transition hover:opacity-75">
                  <BiSearch className="text-black" size={20} />
               </button>
            </div>
            <div className="flex items-center justify-between gap-x-4">
               <>
                  <div>
                     <Button
                        onClick={() => {}}
                        className="bg-transparent font-medium text-neutral-300"
                     >
                        Inscrever-se
                     </Button>
                  </div>
                  <div>
                     <Button onClick={() => {}} className="bg-white px-6 py-2">
                        Entrar
                     </Button>
                  </div>
               </>
            </div>
         </div>
         {children}
      </header>
   )
}
