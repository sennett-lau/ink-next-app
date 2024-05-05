'use client'

import { useOrdConnect } from '@ordzaar/ord-connect'
import { useState } from 'react'
import CanvasContainer from '../components/canvas/CanvasControl'
import CanvasTab from '../components/canvas/CanvasTab'
import PFPCustomizer from '../components/customizer/PFPCustomizer'
import XBannerCustomizer from '../components/customizer/XBannerCustomizer'

export default function Home() {
  const { address } = useOrdConnect()

  const tabs = ['X Banner', 'PFP']

  // 0 - X Banner Customizer
  // 1 - PFP Customizer
  const [inkhronizerIndex, setInkhronizerIndex] = useState<number>(0)

  const [background, setBackground] = useState<string>('ink_001')

  // for X Banner
  const [inkIds, setInkIds] = useState<string[]>(['1'])

  // for PFP
  const [inkId, setInkId] = useState<string>('1')
  const [companion, setCompanion] = useState<string>('')

  return (
    <div className='w-full flex-1 flex justify-center items-center py-10 lg:py-0'>
      <div className='w-full flex flex-col lg:flex-row flex-1 max-w-[1440px] mx-auto px-2 lg:px-6 py-8'>
        <div className='flex w-full lg:w-2/3 items-center flex-col mb-4 lg:mb-0 pt-6'>
          <CanvasTab tabs={tabs} selectedTab={inkhronizerIndex} setSelectedTab={setInkhronizerIndex} />
          <CanvasContainer
            inkId={inkId}
            inkIds={inkIds}
            background={background}
            inkhronizerIndex={inkhronizerIndex}
            companion={companion}
          />
        </div>
        <div className='w-fit max-w-full lg:w-1/3 lg:px-2 xl:px-8 mx-auto'>
          {inkhronizerIndex === 0 && (
            <XBannerCustomizer
              inkIds={inkIds}
              setInkIds={setInkIds}
              bannerBackground={background}
              setBannerBackground={setBackground}
            />
          )}
          {inkhronizerIndex === 1 && (
            <PFPCustomizer
              inkId={inkId}
              setInkId={setInkId}
              background={background}
              setBackground={setBackground}
              companion={companion}
              setCompanion={setCompanion}
            />
          )}
        </div>
      </div>
    </div>
  )
}
