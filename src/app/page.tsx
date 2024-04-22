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
      <div className='w-full flex flex-1 max-w-[1440px] mx-auto px-6 py-8'>
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
        <div className='w-1/3 px-8'>
          <div className='flex flex-col w-full rounded-2xl bg-white bg-opacity-50 px-4 py-8 shadow-xl min-h-[400px] items-center'>
            <div className='flex gap-2'>
              <label className='text-black italic font-bold pointer' htmlFor='ink-id'>
                INK #: 
              </label>
              <input 
                className='bg-transparent border-b-2 border-black text-black font-bold italic pl-2 focus:outline-none'
              type="text" id='ink-id' value={inkId} onChange={(e) => setInkId(e.target.value)} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
