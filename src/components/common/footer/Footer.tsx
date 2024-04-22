import Image from 'next/image'

const Footer = () => {
  return (
    <footer className='w-full fixed bottom-0'>
      <div className="w-full max-w-[1440px] mx-auto flex justify-between px-6 py-4">
        <p className='text-black italic font-bold text-lg'>
          By <a href="https://x.com/sennettlau_13">Sennett Lau</a>
        </p>
        <div className="flex gap-4">
          <a href="https://x.com/inkonbtc">
            <Image src="/icons/x.svg" alt="x" width={24} height={24} />
          </a>
          <a href="http://discord.gg/inkonbtc">
            <Image src="/icons/discord.svg" alt="discord" width={24} height={24} />
          </a>
        </div>
      </div>    
    </footer>
  )
}

export default Footer
