import Image from 'next/image'
import { useEffect, useState } from 'react'
import { pfpBackgroundConfig } from '../../config/background'
import CustomizerContainer from './common/CustomizerContainer'
import InkIdInput from './common/InkIdInput'

type Props = {
  inkId: string
  setInkId: (inkId: string) => void
  background: string
  setBackground: (background: string) => void
}

const BACKGROUND_PER_PAGE = 6

const PFPCustomizer = (props: Props) => {
  const { inkId, setInkId, background, setBackground } = props

  const [backgroundPage, setBackgroundPage] = useState<number>(1)
  const [backgroundTotalPages, setBackgroundTotalPages] = useState<number>(
    Math.ceil(pfpBackgroundConfig.length / BACKGROUND_PER_PAGE),
  )
  const [backgrounds, setBackgrounds] = useState([])

  useEffect(() => {
    setBackgrounds(pfpBackgroundConfig.sort(() => Math.random() - 0.5))
  }, [])

  const onBackgroundSelect = (background: string) => {
    setBackground(background)

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <CustomizerContainer pageIndex={1} setPageIndex={() => {}} totalPages={1}>
      <InkIdInput inkId={inkId} setInkId={setInkId} />
      <p className='text-black italic font-bold text-lg my-4 w-full text-left'>Select a background:</p>
      <div className='flex flex-col gap-2 max-w-full'>
        <div className='grid grid-cols-2 gap-2 w-full lg:min-h-[376px]'>
          {backgrounds
            .slice((backgroundPage - 1) * BACKGROUND_PER_PAGE, backgroundPage * BACKGROUND_PER_PAGE)
            .map((banner, index) => (
              <div className='max-w-full flex flex-col mx-auto w-[120px] h-[120px] transform hover:scale-105 transition-transform duration-300'>
                <Image
                  className={`cursor-pointer mx-auto ${background === banner.name ? 'max-w-full border-2 border-primary-500' : ''}`}
                  key={index}
                  src={`/assets/pfp-backgrounds/${banner.name}.webp`}
                  alt={banner.name}
                  width={100}
                  height={100}
                  onClick={() => onBackgroundSelect(banner.name)}
                />
                <a className='text-center italic text-black text-sm' href={`https://x.com/${banner.by}`} target='_blank'>
                  @{banner.by}
                </a>
              </div>
            ))}
        </div>
      </div>
    </CustomizerContainer>
  )
}

export default PFPCustomizer
