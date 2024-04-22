import Image from 'next/image'

const Header = () => {
  return (
    <header className="flex justify-center items-center bg-primary-500 fixed top-0 w-full">
      <Image src="/logo.png" alt="logo" width={120} height={70} />
    </header>
  )
}

export default Header
