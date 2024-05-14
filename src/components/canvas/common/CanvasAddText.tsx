import React from 'react'
import Image from 'next/image'

type Props = {
  texts: string[]
  onAddText: () => void
}

const CanvasAddText = (props: Props) => {
  const { texts, onAddText } = props

  return (
    <div className='flex w-full justify-between mt-2'>
      <div className='flex gap-2'>
      </div>
      <button
        className='italic py-2 px-4 rounded-lg bg-black text-primary-500 shadow-2xl hover:bg-gray-800'
        onClick={onAddText}
      >
        Add Text
      </button>
    </div>
  )
}

export default CanvasAddText
