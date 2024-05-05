import { OrdConnectKit, useOrdConnect } from '@ordzaar/ord-connect'
import Image from 'next/image'
import { useEffect, useState } from 'react'

import { signMessage as okxSignMessage } from '@ordzaar/ordit-sdk/okx'
import { signMessage as magicedenSignMessage } from '@ordzaar/ordit-sdk/magiceden'
import { signMessage as unisatSignMessage } from '@ordzaar/ordit-sdk/unisat'
import { signMessage as xverseSignMessage } from '@ordzaar/ordit-sdk/xverse'

enum Wallet {
  UNISAT = 'unisat',
  XVERSE = 'xverse',
  MAGICEDEN = 'magiceden',
  LEATHER = 'leather',
  OKX = 'okx',
}

const Header = () => {
  const { address, disconnectWallet, wallet } = useOrdConnect()

  const [isSigned, setIsSigned] = useState(false)

  useEffect(() => {
    if (address && address.ordinals && !isSigned && wallet) {
      const message = 'Welcome to INK Community'
      try {
        switch (wallet) {
          case Wallet.UNISAT:
            unisatSignMessage(message)
            break
          case Wallet.XVERSE:
            xverseSignMessage(message, address.ordinals)
            break
          case Wallet.MAGICEDEN:
            magicedenSignMessage(message, address.ordinals)
            break
          case Wallet.OKX:
            okxSignMessage(message)
            break
          default:
            break
        }
        setIsSigned(true)
      } catch (error) {
        console.error(error)
      }
    }
  }, [address, isSigned, wallet])

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
