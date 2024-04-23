type Props = {
  label: string
  max: number
  value: number
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const SliderControl = (props: Props) => {
  const { label, max, value, onChange } = props
  
  return (
    <div className='flex flex-col gap-1 w-full'>
        <p className='text-black italic font-bold'>{label}</p>
        <input
          type='range'
          min='0'
          max={max}
          value={value}
          onChange={onChange}
          className='w-full accent-primary-500 outline-none'
        />
      </div>
  )
}

export default SliderControl