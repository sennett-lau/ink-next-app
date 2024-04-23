'use client'
import { useEffect, useRef, useState } from 'react'
import SliderControl from './SliderControl'

type Props = {
  banner: string
  ink: string
  canvasRef: React.RefObject<HTMLCanvasElement>
  containerRef: React.RefObject<HTMLDivElement>
}

const InkCanvas = (props: Props) => {
  const { banner, ink, canvasRef, containerRef } = props

  const inkRef = useRef<HTMLImageElement>(null)

  const [isLoaded, setIsLoaded] = useState<boolean>(false)

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

          setIsLoaded(true)

          inkImage.src = `/assets/inks/${ink}.webp`

          inkImage.onload = () => {
            ctx.drawImage(inkImage, Math.min(inkXPosition, inkMaxX), 0, canvas.height, canvas.height)
          }
        }
      }
    }
  }

  const handleInkXPositionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInkXPosition(parseInt(e.target.value))

    // update imageRef position
    if (inkRef.current) {
      inkRef.current.style.transform = `translateX(${inkXPosition}px)`
    }
  }

  return (
    <div className={`w-full max-w-[800px]`}>
      <div
        ref={containerRef}
        className={`w-full relative mb-4 ${isLoaded ? '' : 'h-[266px]'}`}
        style={{
          backgroundImage: isLoaded ? `url(/assets/banner-backgrounds/${banner}.webp)` : '',
          backgroundSize: 'contain',
        }}
      >
        <canvas ref={canvasRef} className='opacity-0'></canvas>
        <img
          ref={inkRef}
          src={`/assets/inks/${ink}.webp`}
          alt={ink}
          width={containerWidth / 3}
          height={containerWidth / 3}
          className={`absolute bottom-0 left-0`}
        />
      </div>
      <SliderControl
        label='Ink Position'
        max={containerWidth - containerWidth / 3}
        value={inkXPosition}
        onChange={handleInkXPositionChange}
      />
    </div>
  )
}

export default InkCanvas
