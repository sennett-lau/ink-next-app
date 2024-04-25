type Props = {
  inkId: string
  setInkId: (inkId: string) => void
}

const InkIdInput = (props: Props) => {
  const { inkId, setInkId } = props

  return (
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
  )
}

export default InkIdInput
