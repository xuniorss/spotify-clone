import { Figtree } from 'next/font/google'
import { ReactNode } from 'react'

import './globals.css'

const font = Figtree({ subsets: ['latin'] })

export const metadata = {
   title: 'Spotify Clone',
   description: 'Ouvir música!',
}

export default function RootLayout({ children }: { children: ReactNode }) {
   return (
      <html lang="pt-BR">
         <body className={font.className}>{children}</body>
      </html>
   )
}
