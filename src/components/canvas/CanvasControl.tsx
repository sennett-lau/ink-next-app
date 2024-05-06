import { useRef, useState } from 'react'
import PFPCanvas from './PFPCanvas'
import XBannerCanvas from './XBannerCanvas'
import GeneratorCanvas from './GeneratorCanvas'

type Props = {
  inkId: string
  inkIds: string[]
  background: string
  inkhronizerIndex: number
  companion: string
  selectedOption: string
}

const CanvasControl = (props: Props) => {
  const { inkId, inkIds, background, inkhronizerIndex, companion, selectedOption } = props

  const canvasRef = useRef<HTMLCanvasElement>(null)

  const downloadImage = () => {
    const canvas = canvasRef.current
    if (canvas) {
      console.log('Downloading image')
      const image = canvas.toDataURL('image/png')
      const link = document.createElement('a')
      link.href = image
      link.download = `inkonbtc-${background}-ink_${inkId}.png`
      link.click()
    } else {
      console.error('Canvas is not available')
    }
  }

  return (
    <>
      {inkhronizerIndex === 0 && <XBannerCanvas banner={background} inks={inkIds} canvasRef={canvasRef} />}
      {inkhronizerIndex === 1 && (
        <PFPCanvas background={background} ink={inkId} canvasRef={canvasRef} companion={companion} />
      )}
      {inkhronizerIndex === 2 && <GeneratorCanvas inkId={inkId} selectedOption={selectedOption} canvasRef={canvasRef} />}
      <div className='flex justify-center items-center mt-8 text-black font-extrabold'>
        <button
          className='italic py-2 px-4 rounded-lg bg-white shadow-2xl bg-opacity-75 hover:bg-primary-500'
          onClick={downloadImage}
        >
          Download
        </button>
      </div>
    </>
  )
}

export default CanvasControl
