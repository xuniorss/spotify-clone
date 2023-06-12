'use client'

import useUploadModal from '@/hooks/useUploadModal'
import { useUser } from '@/hooks/useUser'
import { useCallback, useState } from 'react'
import { useForm, FieldValues, SubmitHandler } from 'react-hook-form'
import toast from 'react-hot-toast'
import { Button } from '../Button'
import { Input } from '../Input'
import { Modal } from '../Modal'
import uniqid from 'uniqid'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/navigation'

export const UploadModal = () => {
   const [isLoading, setIsLoading] = useState(false)
   const uploadModal = useUploadModal()
   const { user } = useUser()
   const supabaseClient = useSupabaseClient()
   const router = useRouter()

   const { register, handleSubmit, reset } = useForm<FieldValues>({
      defaultValues: { author: '', title: '', song: null, image: null },
   })

   const onChange = useCallback(
      (open: boolean) => {
         if (!open) {
            reset()
            uploadModal.onClose()
         }
      },
      [reset, uploadModal]
   )

   const onSubmit: SubmitHandler<FieldValues> = useCallback(
      async (values) => {
         try {
            setIsLoading(true)

            const imageFile = values.image?.[0]
            const songFile = values.song?.[0]

            if (!imageFile || !songFile || !user)
               return toast.error('Campos ausentes')

            const uniqueID = uniqid()

            // * Upload song
            const { data: songData, error: songError } =
               await supabaseClient.storage
                  .from('songs')
                  .upload(`song-${values.title}-${uniqueID}`, songFile, {
                     cacheControl: '3600',
                     upsert: false,
                  })

            if (songError) {
               setIsLoading(false)
               return toast.error('Falha ao inserir música')
            }

            // * Upload image
            const { data: imageData, error: imageError } =
               await supabaseClient.storage
                  .from('images')
                  .upload(`image-${values.title}-${uniqueID}`, imageFile, {
                     cacheControl: '3600',
                     upsert: false,
                  })

            if (imageError) {
               setIsLoading(false)
               return toast.error('Falha ao inserir imagem')
            }

            const { error: supabaseError } = await supabaseClient
               .from('songs')
               .insert({
                  user_id: user.id,
                  title: values.title,
                  author: values.author,
                  image_path: imageData.path,
                  song_path: songData.path,
               })

            if (supabaseError) {
               setIsLoading(false)
               return toast.error(supabaseError.message)
            }

            router.refresh()
            setIsLoading(false)
            toast.success('Música criada!')
            reset()
            uploadModal.onClose()
         } catch (error) {
            toast.error('Algo deu errado')
         } finally {
            setIsLoading(false)
         }
      },
      [reset, router, supabaseClient, uploadModal, user]
   )

   return (
      <Modal
         title="Adicionar uma música"
         description="Adicione um arquivo mp3"
         isOpen={uploadModal.isOpen}
         onChange={onChange}
      >
         <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-y-4"
         >
            <Input
               id="title"
               disabled={isLoading}
               {...register('title', { required: true })}
               placeholder="Título da música"
            />

            <Input
               id="author"
               disabled={isLoading}
               {...register('author', { required: true })}
               placeholder="Autor da música"
            />

            <div>
               <p className="pb-1">Selecione um arquivo de música</p>
               <Input
                  id="song"
                  type="file"
                  disabled={isLoading}
                  accept=".mp3"
                  {...register('song', { required: true })}
               />
            </div>

            <div>
               <p className="pb-1">Selecione uma imagem</p>
               <Input
                  id="image"
                  type="file"
                  disabled={isLoading}
                  accept="image/*"
                  {...register('image', { required: true })}
               />
            </div>

            <Button disabled={isLoading} type="submit">
               Criar
            </Button>
         </form>
      </Modal>
   )
}
