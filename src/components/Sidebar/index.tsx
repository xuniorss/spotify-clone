'use client'

import { Song } from '@/types'
import { usePathname } from 'next/navigation'
import { ReactNode, useMemo } from 'react'
import { BiSearch } from 'react-icons/bi'
import { HiHome } from 'react-icons/hi'
import { Box } from '../Box'
import { Library } from '../Library'
import { SidebarItem } from '../SidebarItem'

interface SidebarProps {
   children: ReactNode
   songs: Array<Song>
}

export const Sidebar = ({ children, songs }: SidebarProps) => {
   const pathname = usePathname()

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
      <aside className="flex h-full">
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
