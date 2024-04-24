import Image from 'next/image'

const Header = () => {
  return (
    <header className='bg-header-bg fixed top-0 w-full bg-no-repeat bg-cover bg-center shadow-md'>
      <div className='flex justify-center lg:justify-between items-center w-full max-w-[1440px] mx-auto px-6'>
        <Image src='/logo.png' alt='logo' width={80} height={70} />
        <p className='font-black text-black text-2xl italic hidden lg:block'>Ink Is For The People.</p>
      </div>
    </header>
  )
}

export default Header
