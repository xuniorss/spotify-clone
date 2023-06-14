'use client'

import * as RadixSlider from '@radix-ui/react-slider'
import { useCallback } from 'react'

interface SlideProps {
   value?: number
   onChange?: (value: number) => void
}

export const Slider = ({ value = 1, onChange }: SlideProps) => {
   const handleChange = useCallback(
      (newValue: Array<number>) => {
         onChange?.(newValue[0])
      },
      [onChange]
   )

   return (
      <RadixSlider.Root
         className="relative flex h-10 w-full touch-none select-none items-center"
         defaultValue={[1]}
         value={[value]}
         onValueChange={handleChange}
         max={1}
         step={0.1}
         aria-label="Volume"
      >
         <RadixSlider.Track className="relative h-[0.188rem] grow rounded-full bg-neutral-600">
            <RadixSlider.Range className="absolute h-full rounded-full bg-white" />
         </RadixSlider.Track>
      </RadixSlider.Root>
   )
}
