'use client'

import { useOrdConnect } from "@ordzaar/ord-connect"


const Inkfolio = () => {
  const { address } = useOrdConnect()
  return (
    <div className='flex flex-col w-full flex-1 bg-black justify-center'>
      <h1 className='text-primary-500'>My Inkfolio: {address.ordinals}</h1>
    </div>
  )
}

export default Inkfolio