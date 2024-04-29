import Image from 'next/image'
import { useEffect, useState } from 'react'
import { companionConfig, pfpBackgroundConfig } from '../../config/assets'
import CustomizerContainer from './common/CustomizerContainer'
import InkIdInput from './common/InkIdInput'

type Props = {
  inkId: string
  setInkId: (inkId: string) => void
  background: string
  setBackground: (background: string) => void
  companion: string
  setCompanion: (companion: string) => void
}

const ITEM_PER_PAGE = 6

const PFPCustomizer = (props: Props) => {
  const { inkId, setInkId, background, setBackground, companion, setCompanion } = props

  const [page, setPage] = useState<number>(1)
  const [totalPages, setTotalPages] = useState<number>(Math.ceil(pfpBackgroundConfig.length / ITEM_PER_PAGE))
  const [backgrounds, setBackgrounds] = useState([])
  const [companions, setCompanions] = useState([])

  const [items, setItems] = useState([])

  const [currItem, setCurrItem] = useState<string>('')

  // background
  // companion
  const [componentKey, setComponentKey] = useState<string>('background')

  const labels = {
    background: 'Select a background:',
    companion: 'Select a companion:',
  }

  useEffect(() => {
    const backgrounds = pfpBackgroundConfig.sort(() => Math.random() - 0.5)

    setBackgrounds(backgrounds)

    setCurrItem(background)

    setCompanions(companionConfig.sort(() => Math.random() - 0.5))
  }, [])

  useEffect(() => {
    switch (componentKey) {
      case 'background':
        setItems(backgrounds)
        setCurrItem(background)
        setTotalPages(Math.ceil(backgrounds.length / ITEM_PER_PAGE))
        break
      case 'companion':
        setItems(companions)
        setCurrItem(companion)
        setTotalPages(Math.ceil(companions.length / ITEM_PER_PAGE))
        break
    }
  }, [componentKey, backgrounds, companions])

  const onItemSelect = (item: string) => {
    switch (componentKey) {
      case 'background':
        setBackground(item)
        setCurrItem(item)
        break
      case 'companion':
        if (item === companion) {
          setCompanion('')
          setCurrItem('')
          break
        }
        setCompanion(item)
        setCompanion(item)
        break
    }

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  const getSrc = (item: string) => {
    switch (componentKey) {
      case 'background':
        return `/assets/pfp-backgrounds/${item}.webp`
      case 'companion':
        return `/assets/companions/${item}_preview.webp`
    }
  }

  return (
    <CustomizerContainer pageIndex={1} setPageIndex={setPage} totalPages={totalPages}>
      <InkIdInput inkId={inkId} setInkId={setInkId} />
      <div className='flex justify-between items-center'>
        <p className='text-black italic font-bold text-lg my-4 w-full text-left'>{labels[componentKey]}</p>
        <select
          className='h-6 text-black text-sm focus:outline-none shadow-md rounded-md'
          onChange={(e) => setComponentKey(e.target.value)}
        >
          <option value='background'>Background</option>
          <option value='companion'>Companion</option>
        </select>
      </div>
      <div className='flex flex-col gap-2 max-w-full'>
        <div className='grid grid-cols-2 grid-rows-3 gap-2 w-full lg:min-h-[376px]'>
          {items.slice((page - 1) * ITEM_PER_PAGE, page * ITEM_PER_PAGE).map((item, index) => (
            <div className='max-w-full flex flex-col mx-auto w-[120px] h-[120px] transform hover:scale-105 transition-transform duration-300'>
              <Image
                className={`cursor-pointer mx-auto ${currItem === item.name ? 'max-w-full border-2 border-primary-500' : ''}`}
                key={index}
                src={getSrc(item.name)}
                alt={item.name}
                width={100}
                height={100}
                onClick={() => onItemSelect(item.name)}
              />
              <a className='text-center italic text-black text-sm' href={`https://x.com/${item.by}`} target='_blank'>
                @{item.by}
              </a>
            </div>
          ))}
        </div>
      </div>
    </CustomizerContainer>
  )
}

export default PFPCustomizer
