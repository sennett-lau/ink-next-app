import { OrdConnectKit, useOrdConnect } from '@ordzaar/ord-connect'
import Image from 'next/image'

const Header = () => {
  const { address } = useOrdConnect()

  const displayAddress = () => {
    if (address) {
      // get first 4 and ... last 4
      return `${address.ordinals.slice(0, 4)}...${address.ordinals.slice(-4)}`
    }
  }

  return (
    <header className='bg-header-bg fixed top-0 w-full bg-no-repeat bg-cover bg-center shadow-md'>
      <div className='flex justify-between items-center w-full max-w-[1440px] mx-auto px-6'>
        <Image src='/logo.png' alt='logo' width={80} height={70} />
        <div className={address ? 'hidden' : ''}>
          <OrdConnectKit />
        </div>
        <div className={`font-black text-black text-2xl italic ${address ? '' : 'hidden'}`}>{displayAddress()}</div>
      </div>
    </header>
  )
}

export default Header
