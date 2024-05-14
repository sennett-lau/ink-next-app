import Image from 'next/image'
import React, { useState } from 'react'

type Props = {
  color: string
  setTextColor: (color: string) => void
  fontFamily: string
  setFontFamily: (fontFamily: string) => void
  fontWeight: string
  setFontWeight: (fontWeight: string) => void
  onTextToggle: () => void
}

const CanvasTextLayerControl = (props: Props) => {
  const { color, fontFamily, fontWeight, setTextColor, setFontFamily, setFontWeight, onTextToggle } = props
  const [isShowingText, setIsShowingText] = useState<boolean>(false)

  const handleAddTextClick = () => {
    setIsShowingText(true)
    onTextToggle()
  }

  return (
    <div className='flex w-full justify-between mt-2'>
      {!isShowingText && (
        <button
          className='italic py-2 px-4 rounded-lg bg-black text-primary-500 shadow-2xl hover:bg-gray-800 w-full'
          onClick={handleAddTextClick}
        >
          Add Text
        </button>
      )}
      {isShowingText && (
        <div className='flex width-full gap-2'>
          <button className='italic py-2 px-4 rounded-lg bg-black text-primary-500 shadow-2xl hover:bg-gray-800'>
            Remove
          </button>
          <input
            type='text'
            className='flex-1 bg-white text-black rounded-lg p-2 shadow-2xl focus:outline-none'
            value={color}
            onChange={(e) => setTextColor(e.target.value)}
          />
          <input
            type='text'
            className='flex-1 bg-white text-black rounded-lg p-2 shadow-2xl focus:outline-none'
            value={fontFamily}
            onChange={(e) => setFontFamily(e.target.value)}
          />
          <input
            type='text'
            className='flex-1 bg-white text-black rounded-lg p-2 shadow-2xl focus:outline-none'
            value={fontWeight}
            onChange={(e) => setFontWeight(e.target.value)}
          />
        </div>
      )}
    </div>
  )
}

export default CanvasTextLayerControl
