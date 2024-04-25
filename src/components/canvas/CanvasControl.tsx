import { useRef } from 'react'
import XBannerCanvas from './XBannerCanvas'

type Props = {
  inkId: string
  bannerBackground: string
}

const CanvasControl = (props: Props) => {
  const { inkId, bannerBackground } = props

  const canvasRef = useRef<HTMLCanvasElement>(null)

  const downloadImage = () => {
    const canvas = canvasRef.current
    if (canvas) {
      console.log('Downloading image')
      const image = canvas.toDataURL('image/png')
      const link = document.createElement('a')
      link.href = image
      link.download = `inkonbtc-${bannerBackground}-ink_${inkId}.png`
      link.click()
    }
  }

  return (
    <>
      <XBannerCanvas banner={bannerBackground} ink={inkId} canvasRef={canvasRef} />
      <div className='flex justify-center items-center gap-12 text-black font-extrabold'>
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
