import { OrdConnectKit, useOrdConnect } from '@ordzaar/ord-connect'
import Image from 'next/image'

const Header = () => {
  const { address, disconnectWallet } = useOrdConnect()

  const displayAddress = () => {
    if (address && address.ordinals) {
      // get first 4 and ... last 4
      return `${address.ordinals.slice(0, 4)}...${address.ordinals.slice(-4)}`
    }
  }

  const handleDisconnect = () => {
    disconnectWallet()
  }

  return (
    <header className='bg-header-bg fixed top-0 w-full bg-no-repeat bg-cover bg-center shadow-md'>
      <div className='flex justify-between items-center w-full max-w-[1440px] mx-auto px-6'>
        <Image src='/logo.png' alt='logo' width={80} height={70} />
        <div className={address && address.ordinals ? 'hidden' : ''}>
          <OrdConnectKit />
        </div>
        <div
          className={`flex bg-black bg-opacity-75 rounded-lg h-[48px] items-center px-4 gap-2 cursor-pointer ${address && address.ordinals ? '' : 'hidden'}`}
          onClick={handleDisconnect}
        >
          <div className={`font-black text-primary-500 text-sm italic`}>{displayAddress()}</div>
          <div className='w-[1px] h-2/5 bg-primary-500 ml-2'></div>
          <Image src={'/icons/exit.svg'} alt='exit' width={20} height={20} />
        </div>
      </div>
    </header>
  )
}

export default Header
