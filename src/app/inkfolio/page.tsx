'use client'

import { useOrdConnect } from '@ordzaar/ord-connect'
import Image from 'next/image'
import { useEffect } from 'react'
import { SITE_URL } from '../../config/general'

const InkfolioLanding = () => {
  const { openModal, address } = useOrdConnect()

  useEffect(() => {
    if (address && address.ordinals) {
      // if on dev, use localhost
      if (process.env.NODE_ENV === 'development') {
        window.location.href = `http://localhost:3000/inkfolio/${address.ordinals}`
        return
      }
      
      window.location.href = `${SITE_URL}/inkfolio/${address.ordinals}`
    }
  }, [address])

  return (
    <div className='flex flex-col w-full flex-1 bg-black'>
      <div className='flex flex-col flex-1 items-center justify-center w-full h-full bg-v1_dark bg-no-repeat bg-cover'>
        <div className='p-4 text-white bg-[#2d2d2d] min-h-screen md:min-h-[unset] rounded-lg'>
          <Image
            className='object-cover w-full h-30 sm:h-56 rounded-lg box-border border border-white/10'
            src='/web/inkfolio/6176.png'
            alt='logo'
            width={486}
            height={224}
          />
          <h1 className='pt-7 pb-3 uppercase font-black text-2xl text-primary-500'>The INKfolio</h1>
          <p className='opacity-80 pb-6 font-light leading-1.3'>
            The portfolio of your INK collection. Customize and showcase your INKs in style.
          </p>
          <div className='bg-[#3d3d3d] rounded p-3 mb-6'>
            <h2 className='font-bold pb-2 uppercase'>Way to access</h2>
            <ul className='flex flex-col gap-2 text-sm'>
              <li className='flex flex-row overflow-hidden'>
                <div className='w-5 mr-1.5 flex justify-center flex-shrink-[0] rounded text-white bg-white/10 h-[fit-content]'>
                  1
                </div>
                <div className='flex flex-row truncate'>
                  <div className='opacity-80'>{SITE_URL.replace('https://', '')}/inkfolio/</div>
                  <div className='bg-black border-[0.5px] leading-1.3 rounded-md text-white w-[fit-content] px-1 truncate ml-[2px] text-xs py-[0.5px]'>
                    wallet address
                  </div>
                </div>
              </li>
              <li className='flex flex-row overflow-hidden'>
                <div className='w-5 mr-1.5 flex justify-center flex-shrink-[0] rounded text-white bg-white/10 h-[fit-content]'>
                  2
                </div>
                <div className='flex flex-row truncate'>
                  <div className='opacity-80'>{SITE_URL.replace('https://', '')}/inkfolio/</div>
                  <div className='bg-black border-[0.5px] leading-1.3 rounded-md text-white w-[fit-content] px-1 truncate ml-[2px] text-xs py-[0.5px]'>
                    brc137 DID
                  </div>
                </div>
              </li>
              <li className='flex flex-row overflow-hidden'>
                <div className='w-5 mr-1.5 flex justify-center flex-shrink-[0] rounded text-white bg-white/10 h-[fit-content]'>
                  3
                </div>
                <div className='flex flex-row truncate'>
                  <div className='opacity-80'>
                    Connect your wallet, the INKfolio navigation will then redirect to your page
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <button
            className='w-full flex items-center justify-center uppercase h-12 duration-200 cursor-pointer font-medium rounded text-black bg-primary-500 hover:bg-primary-700'
            onClick={openModal}
          >
            Connect Wallet
          </button>
        </div>
      </div>
    </div>
  )
}

export default InkfolioLanding
