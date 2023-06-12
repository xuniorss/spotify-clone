'use client'

import useAuthModal from '@/hooks/useAuthModal'
import { useUser } from '@/hooks/useUser'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/navigation'
import { ReactNode, useCallback } from 'react'
import { toast } from 'react-hot-toast'
import { BiSearch } from 'react-icons/bi'
import { FaUserAlt } from 'react-icons/fa'
import { HiHome } from 'react-icons/hi'
import { RxCaretLeft, RxCaretRight } from 'react-icons/rx'
import { twMerge } from 'tailwind-merge'
import { Button } from '../Button'

interface HeaderProps {
   children: ReactNode
   className?: string
}

export const Header = ({ children, className }: HeaderProps) => {
   const router = useRouter()
   const authModal = useAuthModal()

   const supabaseClient = useSupabaseClient()
   const { user } = useUser()

   const handleLogout = useCallback(async () => {
      const { error } = await supabaseClient.auth.signOut()
      // TODO: Reset any playing songs
      router.refresh()

      if (error) toast.error(error.message)
      else toast.success('Desconectado(a)')
   }, [router, supabaseClient.auth])

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
               {user && (
                  <div className="flex items-center gap-x-4">
                     <Button
                        onClick={handleLogout}
                        className="bg-white px-6 py-2"
                     >
                        Sair
                     </Button>
                     <Button
                        onClick={() => router.push('/account')}
                        className="bg-white"
                     >
                        <FaUserAlt />
                     </Button>
                  </div>
               )}

               {!user && (
                  <>
                     <div>
                        <Button
                           onClick={authModal.onOpen}
                           className="bg-transparent font-medium text-neutral-300"
                        >
                           Inscrever-se
                        </Button>
                     </div>
                     <div>
                        <Button
                           onClick={authModal.onOpen}
                           className="bg-white px-6 py-2"
                        >
                           Entrar
                        </Button>
                     </div>
                  </>
               )}
            </div>
         </div>
         {children}
      </header>
   )
}
