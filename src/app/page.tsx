'use client'

import { useRef, useState } from 'react'
import InkCanvas from '../components/canvas/InkCanvas'

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const [bannerBackground, setBannerBackground] = useState<string>('banner_001')
  const [inkId, setInkId] = useState<string>('1')

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
    <div className='w-full flex-1 flex justify-center items-center'>
      <div className='w-full flex-1 max-w-[1440px] mx-auto px-6 py-8'>
        <div className='flex w-2/3 justify-center items-center flex-col gap-8'>
          <InkCanvas banner={bannerBackground} ink={inkId} canvasRef={canvasRef} containerRef={containerRef} />
          <div className='flex justify-center items-center gap-12 text-black font-extrabold'>
            <button className='italic py-2 px-4 rounded-lg bg-white shadow-2xl bg-opacity-75 hover:bg-primary-500'>
              Share Via X
            </button>
            <button
              className='italic py-2 px-4 rounded-lg bg-white shadow-2xl bg-opacity-75 hover:bg-primary-500'
              onClick={downloadImage}
            >
              Download
            </button>
          </div>
        </div>
        <div className='w-1/3'></div>
      </div>
    </div>
  )
}
