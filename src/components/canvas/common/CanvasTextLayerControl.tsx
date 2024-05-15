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
        <div className='flex width-full gap-2'>
          <button className='italic py-2 px-4 rounded-lg bg-black text-primary-500 shadow-2xl hover:bg-gray-800'>
            Remove
          </button>
          <div className='flex items-center gap-2 bg-white rounded-lg p-2 shadow-2xl'>
            <p className='m-0 text-black'>Color:</p>
            <div
              id='color-showcase'
              className={`w-[80px] h-full bg-[${color}] relative`}
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
