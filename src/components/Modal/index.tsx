'use client'

import * as Dialog from '@radix-ui/react-dialog'
import { ReactNode } from 'react'
import { IoMdClose } from 'react-icons/io'

interface ModalProps {
   isOpen: boolean
   onChange: (open: boolean) => void
   title: string
   description: string
   children: ReactNode
}

export const Modal = ({
   isOpen,
   onChange,
   title,
   description,
   children,
}: ModalProps) => {
   return (
      <Dialog.Root open={isOpen} defaultOpen={isOpen} onOpenChange={onChange}>
         <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 bg-neutral-900/90 backdrop-blur-sm" />
            <Dialog.Content className="fixed left-[50%] top-[50%] h-full max-h-full w-full translate-x-[-50%] translate-y-[-50%] rounded-md border border-neutral-700 bg-neutral-800 p-[1.563rem] drop-shadow-md focus:outline-none md:h-auto md:max-h-[85vh] md:w-[90vw] md:max-w-[28.125rem]">
               <Dialog.Title className="mb-4 text-center text-xl font-bold">
                  {title}
               </Dialog.Title>
               <Dialog.Description className="mb-5 text-center text-sm leading-normal">
                  {description}
               </Dialog.Description>
               <div>{children}</div>
               <Dialog.Close asChild>
                  <button className="absolute right-[0.625rem] top-[0.625rem] inline-flex h-[1.563rem] w-[1.563rem] appearance-none items-center justify-center rounded-full text-neutral-400 hover:text-white focus:outline-none">
                     <IoMdClose />
                  </button>
               </Dialog.Close>
            </Dialog.Content>
         </Dialog.Portal>
      </Dialog.Root>
   )
}
