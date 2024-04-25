'use client'

import { useState } from 'react'
import CanvasContainer from '../components/canvas/CanvasControl'
import XBannerCustomizer from '../components/customizer/XBannerCustomizer'

export default function Home() {
  // 0 - X Banner Customizer
  // 1 - PFP Customizer
  const [inkhronizerIndex, setInkhronizerIndex] = useState<number>(1)

  const [background, setBackground] = useState<string>('ink_001')
  const [inkId, setInkId] = useState<string>('1')

  return (
    <div className='w-full flex-1 flex justify-center items-center py-10 lg:py-0'>
      <div className='w-full flex flex-col lg:flex-row flex-1 max-w-[1440px] mx-auto px-2 lg:px-6 py-8'>
        <div className='flex w-full lg:w-2/3 justify-center items-center flex-col gap-8 mb-4 lg:mb-0'>
          <CanvasContainer inkId={inkId} background={background} inkhronizerIndex={inkhronizerIndex} />
        </div>
        <div className='w-fit max-w-full lg:w-1/3 lg:px-2 xl:px-8 mx-auto'>
          <XBannerCustomizer
            inkId={inkId}
            setInkId={setInkId}
            bannerBackground={background}
            setBannerBackground={setBackground}
          />
        </div>
      </div>
    </div>
  )
}
