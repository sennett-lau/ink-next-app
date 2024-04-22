'use client'

import { useState } from 'react'
import InkCanvas from '../components/canvas/InkCanvas'

export default function Home() {
  const [bannerBackground, setBannerBackground] = useState<string>('banner_001')
  const [inkId, setInkId] = useState<string>('1')

  return (
    <div className='w-full flex-1 flex justify-center items-center'>
      <div className='w-full flex-1 max-w-[1440px] mx-auto px-6 py-8'>
        <div className='flex w-2/3 justify-center items-center'>
          <InkCanvas banner={bannerBackground} ink={inkId} />
        </div>
        <div className='w-1/3'></div>
      </div>
    </div>
  )
}
