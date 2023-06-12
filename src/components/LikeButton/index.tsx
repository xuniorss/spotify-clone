'use client'

import useAuthModal from '@/hooks/useAuthModal'
import { useUser } from '@/hooks/useUser'
import { useSessionContext } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'

interface LikeButtonProps {
   songId: string
}

export const LikeButton = ({ songId }: LikeButtonProps) => {
   const [isLiked, setIsLiked] = useState(false)

   const router = useRouter()
   const authModal = useAuthModal()

   const { supabaseClient } = useSessionContext()
   const { user } = useUser()

   const fetchData = useCallback(
      async (userId: string) => {
         const { data, error } = await supabaseClient
            .from('liked_songs')
            .select('*')
            .eq('user_id', userId)
            .eq('song_id', songId)
            .single()

         if (!error && data) setIsLiked(true)
      },
      [songId, supabaseClient]
   )

   useEffect(() => {
      if (!user?.id) return

      fetchData(user.id)
   }, [fetchData, user?.id])

   const Icon = useMemo(() => {
      return isLiked ? AiFillHeart : AiOutlineHeart
   }, [isLiked])

   const handleLike = useCallback(async () => {
      if (!user) return authModal.onOpen()

      if (isLiked) {
         const { error } = await supabaseClient
            .from('liked_songs')
            .delete()
            .eq('user_id', user.id)
            .eq('song_id', songId)

         if (error) toast.error(error.message)
         else setIsLiked(false)
      } else {
         const { error } = await supabaseClient.from('liked_songs').insert({
            song_id: songId,
            user_id: user.id,
         })

         if (error) {
            toast.error(error.message)
         } else {
            setIsLiked(true)
         }
      }

      router.refresh()
   }, [authModal, isLiked, router, songId, supabaseClient, user])

   return (
      <button onClick={handleLike} className="transition hover:opacity-75">
         <Icon color={isLiked ? '#22C55E' : 'white'} size={25} />
      </button>
   )
}
