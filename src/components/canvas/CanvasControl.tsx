import { useRef } from 'react'
import PFPCanvas from './PFPCanvas'
import XBannerCanvas from './XBannerCanvas'

type Props = {
  inkId: string
  inkIds: string[]
  background: string
  inkhronizerIndex: number
  companion: string
}

const CanvasControl = (props: Props) => {
  const { inkId, inkIds, background, inkhronizerIndex, companion } = props

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const textCanvasRef = useRef<HTMLCanvasElement>(null)

  const outputCanvasRef = useRef<HTMLCanvasElement>(null)

  const downloadImage = () => {
    if (!canvasRef.current || !outputCanvasRef.current) return

    const base = canvasRef.current
    const output = outputCanvasRef.current

    const ctx = output.getContext('2d')

    if (!ctx) return

    if (inkhronizerIndex === 0) {
      output.width = 1500
      output.height = 500

      const text = textCanvasRef.current

      ctx.drawImage(base, 0, 0, 1500, 500)
      ctx.drawImage(text, 0, 0, 1500, 500)
    } else {
      output.width = 1000
      output.height = 1000

      ctx.drawImage(base, 0, 0, 1000, 1000)
    }

    const link = document.createElement('a')
    link.href = output.toDataURL('image/png')
    link.download = `inkonbtc-${background}-ink_${inkId}.png`
    link.click()
  }

  return (
    <>
      {inkhronizerIndex === 0 && (
        <XBannerCanvas banner={background} inks={inkIds} canvasRef={canvasRef} textCanvasRef={textCanvasRef} />
      )}
      {inkhronizerIndex === 1 && (
        <PFPCanvas background={background} ink={inkId} canvasRef={canvasRef} companion={companion} />
      )}
      <div className='flex justify-center items-center mt-8 text-black font-extrabold'>
        <button
          className='italic py-2 px-4 rounded-lg bg-white shadow-2xl bg-opacity-75 hover:bg-primary-500'
          onClick={downloadImage}
        >
          Download
        </button>
      </div>

      <canvas ref={outputCanvasRef} className='hidden' />
    </>
  )
}

export default CanvasControl
