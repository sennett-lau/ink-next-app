import { fontFamilies } from '@/config/general'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { SketchPicker } from 'react-color'

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

  const [showColorPicker, setShowColorPicker] = useState<boolean>(false)
  const [showFontPicker, setShowFontPicker] = useState<boolean>(false)

  const handleAddTextClick = () => {
    setIsShowingText(true)
    onTextToggle()
  }

  useEffect(() => {
    const colorShowcase = document.getElementById('color-showcase')

    if (colorShowcase) {
      colorShowcase.style.backgroundColor = color
    }
  }, [color, isShowingText])

  const handleChangeComplete = (color: { hex: string }) => {
    setTextColor(color.hex)
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
        <div className='flex w-full gap-2'>
          <button className='italic py-2 px-4 rounded-lg bg-black text-primary-500 shadow-2xl hover:bg-gray-800'>
            Remove
          </button>
          <div className='flex flex-1 items-center gap-2 bg-white rounded-lg p-2 shadow-2xl'>
            <p className='m-0 text-black'>Color:</p>
            <div
              id='color-showcase'
              className={`w-full h-full bg-[${color}] relative`}
              onClick={() => setShowColorPicker(!showColorPicker)}
            >
              <div
                className={`flex flex-col w-fit h-fit gap-2 bg-white rounded-2xl drop-shadow-md p-2 absolute top-0 left-0 z-20 translate-y-[40px] ${showColorPicker ? '' : 'hidden'}`}
                onClick={(e) => e.stopPropagation()}
              >
                <SketchPicker color={color} onChangeComplete={handleChangeComplete} />
                <button
                  className='bg-black text-white py-1 px-2 rounded-lg shadow-2xl hover:bg-primary-500 hover:text:black transition-all duration-200 ease-in-out'
                  onClick={() => setShowColorPicker(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
          <div className='flex flex-1 items-center gap-2 bg-white rounded-lg p-2 shadow-2xl'>
            <p className='m-0 text-black'>Font:</p>
            <div className='flex gap-2 relative w-full cursor-pointer' onClick={() => setShowFontPicker(!showFontPicker)}>
              <p className='m-0 text-black text-sm w-full'>{fontFamily}</p>
              <Image
                src='/icons/chevron.svg'
                alt='Arrow Down'
                width={12}
                height={12}
                onClick={() => setShowFontPicker(!showFontPicker)}
              />
              <div
                className={`absolute top-0 left-0 w-[150px] h-fit overflow-hidden flex flex-col bg-white rounded-lg shadow-2xl translate-y-[40px] z-20 ${showFontPicker ? '' : 'hidden'}`}
              >
                {fontFamilies.map((font, index) => (
                  <p
                    key={index}
                    className='m-0 text-black cursor-pointer hover:text-primary-500 hover:bg-gray-100 duration-200 ease-in-out text-sm px-2 py-1'
                    onClick={() => {
                      setFontFamily(font)
                      setShowFontPicker(false)
                    }}
                  >
                    {font}
                  </p>
                ))}
              </div>
            </div>
          </div>
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
