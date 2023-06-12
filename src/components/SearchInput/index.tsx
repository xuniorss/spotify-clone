'use client'

import useDebounce from '@/hooks/useDebounce'
import { useRouter } from 'next/navigation'
import qs from 'query-string'
import { useEffect, useState } from 'react'
import { Input } from '../Input'

export const SearchInput = () => {
   const [value, setValue] = useState('')

   const router = useRouter()
   const debouncedValue = useDebounce(value, 500)

   useEffect(() => {
      const query = { title: debouncedValue }
      const url = qs.stringifyUrl({ url: '/search', query })

      router.push(url)
   }, [debouncedValue, router])

   return (
      <Input
         placeholder="O que você quer ouvir ?"
         value={value}
         onChange={(e) => setValue(e.target.value)}
      />
   )
}
