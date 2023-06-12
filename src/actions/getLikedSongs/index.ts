import { Song } from '@/types'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

const getLikedSongs = async (): Promise<Array<Song>> => {
   const supabase = createServerComponentClient({ cookies })

   const {
      data: { session },
   } = await supabase.auth.getSession()

   const { data, error } = await supabase
      .from('liked_songs')
      .select('*, songs(*)')
      .eq('user_id', session?.user?.id)
      .order('created_at', { ascending: false })

   if (!data || error) {
      console.error(error)
      return []
   }

   return data.map((item) => ({ ...item.songs }))
}

export default getLikedSongs
