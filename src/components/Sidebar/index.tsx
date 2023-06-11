'use client'

import { ReactNode, useMemo } from 'react'
import { usePathname } from 'next/navigation'
import { HiHome } from 'react-icons/hi'
import { BiSearch } from 'react-icons/bi'
import { Box } from '../Box'
import { SidebarItem } from '../SidebarItem'
import { Library } from '../Library'

interface SidebarProps {
   children: ReactNode
}

export const Sidebar = ({ children }: SidebarProps) => {
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
               <Library />
            </Box>
         </div>
         <main className="h-full flex-1 overflow-y-auto py-2">{children}</main>
      </aside>
   )
}
