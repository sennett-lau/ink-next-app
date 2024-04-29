import Image from 'next/image'
import { useState } from 'react'

type Props = {
  inkIds: string[]
  setInkIds: (inkId: string[]) => void
}

const MAX_INK_IDS = 5

const InkIdMultiInput = (props: Props) => {
  const { inkIds, setInkIds } = props

  const [inkId, setInkId] = useState<string>('')

  const onAddInkId = () => {
    if (!inkId || inkIds.includes(inkId) || inkIds.length >= MAX_INK_IDS) return

    setInkIds([...inkIds, inkId])
    setInkId('')
  }

  const onRemoveInkId = (index: number) => {
    const newInkIds = inkIds.filter((_, i) => i !== index)
    setInkIds(newInkIds)
  }

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex justify-between'>
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
        <button className='bg-black text-primary-500 font-sm px-4 rounded-md' onClick={onAddInkId}>
          +
        </button>
      </div>
      <div className='flex gap-2'>
        {inkIds.map((id, index) => (
          <button
            key={index}
            className='bg-white text-black font-sm w-14 h-8 rounded-md shadow-md flex items-center justify-center hover:bg-gray-200 transition-all duration-300 relative'
            onClick={() => onRemoveInkId(index)}
          >
            {id}
            <Image
              src='/icons/cancel.svg'
              alt='cancel'
              width={20}
              height={20}
              className='absolute right-0 top-1/2 transform -translate-y-1/2'
            />
          </button>
        ))}
      </div>
    </div>
  )
}

export default InkIdMultiInput
