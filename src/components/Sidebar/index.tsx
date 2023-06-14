'use client'

import usePlayer from '@/hooks/usePlayer'
import { Song } from '@/types'
import { usePathname } from 'next/navigation'
import { ReactNode, useMemo } from 'react'
import { BiSearch } from 'react-icons/bi'
import { HiHome } from 'react-icons/hi'
import { twMerge } from 'tailwind-merge'
import { Box } from '../Box'
import { Library } from '../Library'
import { SidebarItem } from '../SidebarItem'

interface SidebarProps {
   children: ReactNode
   songs: Array<Song>
}

export const Sidebar = ({ children, songs }: SidebarProps) => {
   const pathname = usePathname()
   const player = usePlayer()

   const routes = useMemo(
      () => [
         {
            icon: HiHome,
            label: 'Início',
            active: pathname !== '/search',
            href: '/',
         },
         {
            icon: BiSearch,
            label: 'Buscar',
            actiive: pathname === '/search',
            href: '/search',
         },
      ],
      [pathname]
   )

   return (
      <aside
         className={twMerge(
            `flex h-full`,
            player.activeId && 'h-[calc(100%-5rem)]'
         )}
      >
         <div className="hidden h-full w-[18.75rem] flex-col gap-y-2 bg-black p-2 md:flex">
            <Box>
               <div className="flex flex-col gap-y-4 px-5 py-4">
                  {routes.map((item) => (
                     <SidebarItem key={item.label} {...item} />
                  ))}
               </div>
            </Box>
            <Box className="h-full overflow-y-auto">
               <Library songs={songs} />
            </Box>
         </div>
         <main className="h-full flex-1 overflow-y-auto py-2">{children}</main>
      </aside>
   )
}
