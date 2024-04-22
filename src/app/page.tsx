'use client'

import Image from 'next/image'
import { useRef, useState } from 'react'
import InkCanvas from '../components/canvas/InkCanvas'
import { bannerConfig } from '../config/banners'

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const [bannerBackground, setBannerBackground] = useState<string>('banner_001')
  const [inkId, setInkId] = useState<string>('1')

  const [bannerPage, setBannerPage] = useState<number>(1)
  const [bannerTotalPages, setBannerTotalPages] = useState<number>(Math.ceil(bannerConfig.length / 3))

  const banners = bannerConfig

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
            {/* <button className='italic py-2 px-4 rounded-lg bg-white shadow-2xl bg-opacity-75 hover:bg-primary-500'>
              Share Via X
            </button> */}
            <button
              className='italic py-2 px-4 rounded-lg bg-white shadow-2xl bg-opacity-75 hover:bg-primary-500'
              onClick={downloadImage}
            >
              Download
            </button>
          </div>
        </div>
        <div className='w-1/3 px-8'>
          <div className='flex flex-col w-full rounded-2xl bg-white bg-opacity-50 px-4 py-4 shadow-xl min-h-[400px]'>
            <div className='flex gap-2'>
              <label className='text-black italic font-bold pointer' htmlFor='ink-id'>
                INK #:
              </label>
              <input
                className='bg-transparent border-b-2 border-black text-black font-bold italic pl-2 focus:outline-none'
                type='text'
                id='ink-id'
                value={inkId}
                onChange={(e) => setInkId(e.target.value)}
              />
            </div>
            <p className='text-black italic font-bold text-lg mt-4 w-full text-left'>Choose a banner Background:</p>
            <div className='flex flex-col gap-2'>
              <div className='flex flex-col gap-2 min-h-[376px]'>
                {banners.slice((bannerPage - 1) * 3, bannerPage * 3).map((banner, index) => (
                  <div className='w-[365px] h-[120px] relative transform hover:scale-105 transition-transform duration-300'>
                    <a
                      className='italic text-black text-md bg-white bg-opacity-75 rounded-br-lg p-2 absolute top-0 left-0'
                      href={`https://x.com/${banner.by}`}
                    >
                      @{banner.by}
                    </a>
                    <Image
                      className={`cursor-pointer ${bannerBackground === banner.name ? 'border-2 border-primary-500' : ''}`}
                      key={index}
                      src={`/assets/banner-backgrounds/${banner.name}.webp`}
                      alt={banner.name}
                      width={365}
                      height={120}
                      onClick={() => setBannerBackground(banner.name)}
                    />
                  </div>
                ))}
              </div>
              <div className='flex'>
                <p className='text-black italic font-bold w-full text-left'>
                  Page {bannerPage} of {bannerTotalPages}
                </p>
                <button
                  onClick={() => setBannerPage((prev) => (prev === 1 ? prev : prev - 1))}
                  className='mr-2 text-black font-bold'
                >
                  {'<'}
                </button>
                <input
                  className='bg-transparent border-b-2 border-black text-black font-bold pl-2 focus:outline-none w-[24px]'
                  type='text'
                  value={bannerPage}
                  onChange={(e) => setBannerPage(parseInt(e.target.value))}
                  disabled
                />
                <button
                  onClick={() => setBannerPage((prev) => (prev === bannerTotalPages ? prev : prev + 1))}
                  className='ml-2 text-black font-bold'
                >
                  {'>'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
