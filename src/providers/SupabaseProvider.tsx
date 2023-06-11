'use client'

import { ReactNode, useState } from 'react'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import { Database } from '../../types_db'

interface SupabaseProviderProps {
   children: ReactNode
}

export const SupabaseProvider = ({ children }: SupabaseProviderProps) => {
   const [supabaseClient] = useState(() =>
      createClientComponentClient<Database>()
   )

   return (
      <SessionContextProvider supabaseClient={supabaseClient}>
         {children}
      </SessionContextProvider>
   )
}
