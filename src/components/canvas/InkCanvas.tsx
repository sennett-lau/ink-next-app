'use client'
import { useEffect, useRef, useState } from 'react'

type Props = {
  banner: string
  ink: string
  canvasRef: React.RefObject<HTMLCanvasElement>
  containerRef: React.RefObject<HTMLDivElement>
}

const InkCanvas = (props: Props) => {
  const { banner, ink, canvasRef, containerRef } = props

  const [containerWidth, setContainerWidth] = useState<number>(0)
  const [inkXPosition, setInkXPosition] = useState<number>(0)

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth)
      }
    }

    window.addEventListener('resize', handleResize)
    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (containerWidth > 0) {
      drawImages()
    }
  }, [banner, ink, containerWidth, inkXPosition])

  const drawImages = () => {
    const canvas = canvasRef.current
    if (canvas && banner && ink && containerWidth) {
      const ctx = canvas.getContext('2d')

      const inkMaxX = canvas.width - canvas.width / 3

      canvas.width = containerWidth
      canvas.height = containerWidth / 3

      if (ctx) {
        const baseImage = new Image()
        const inkImage = new Image()

        baseImage.src = `/assets/banner-backgrounds/${banner}.webp`

        console.log(`Using banner: ${baseImage.src} and ink: ${inkImage.src}`)

        baseImage.onload = () => {
          ctx.clearRect(0, 0, canvas.width, canvas.height)
          ctx.drawImage(baseImage, 0, 0, canvas.width, canvas.height)

          inkImage.src = `/assets/inks/${ink}.webp`

          inkImage.onload = () => {
            ctx.drawImage(inkImage, Math.min(inkXPosition, inkMaxX), 0, canvas.height, canvas.height)
          }
        }
      }
    }
  }

  return (
    <div className={`w-full max-w-[800px]`}>
      <div
        ref={containerRef}
        className={`w-full`}
        style={{ backgroundImage: `url(/assets/banner-backgrounds/${banner}.webp)`, backgroundSize: 'contain' }}
      >
        <canvas ref={canvasRef} className='border'></canvas>
      </div>
      <input
        type='range'
        min='0'
        max={containerWidth - containerWidth / 3} // Update max based on current canvas dimensions
        value={inkXPosition}
        onChange={(e) => setInkXPosition(parseInt(e.target.value))}
        className='w-full accent-black'
      />
    </div>
  )
}

export default InkCanvas
