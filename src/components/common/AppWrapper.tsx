'use client'

import { Network, OrdConnectProvider } from '@ordzaar/ord-connect'
import { Inter } from 'next/font/google'
import Footer from './footer/Footer'
import Header from './header/Header'

const inter = Inter({ subsets: ['latin'] })

type Props = {
  children: React.ReactNode
}

const AppWrapper = (props: Props) => {
  const { children } = props

  return (
    <OrdConnectProvider initialNetwork={Network.MAINNET}>
      <body className={inter.className}>
        <Header />
        <main className='flex min-h-screen flex-col items-center justify-between bg-dotted'>{children}</main>
        <Footer />
      </body>
    </OrdConnectProvider>
  )
}

export default AppWrapper
