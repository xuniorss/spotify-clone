'use client'

import useAuthModal from '@/hooks/useAuthModal'
import {
   useSessionContext,
   useSupabaseClient,
} from '@supabase/auth-helpers-react'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect } from 'react'
import { Modal } from '../Modal'

export const AuthModal = () => {
   const supabaseClient = useSupabaseClient()
   const router = useRouter()
   const { session } = useSessionContext()
   const { onClose, isOpen } = useAuthModal()

   useEffect(() => {
      if (session) {
         router.refresh()
         onClose()
      }
   }, [onClose, router, session])

   const onChange = useCallback(
      (open: boolean) => {
         if (!open) onClose()
      },
      [onClose]
   )

   return (
      <Modal
         title="Bem-vindo(a) de volta"
         description="Faça login na sua conta"
         isOpen={isOpen}
         onChange={onChange}
      >
         <Auth
            theme="dark"
            providers={['github']}
            supabaseClient={supabaseClient}
            appearance={{
               theme: ThemeSupa,
               variables: {
                  default: {
                     colors: { brand: '#404040', brandAccent: '#22C55E' },
                  },
               },
            }}
         />
      </Modal>
   )
}
