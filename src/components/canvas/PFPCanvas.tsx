import { useEffect, useRef, useState } from 'react'
import { chimeraIds, femaleIds, maleIds } from '../../config/inks'
import SliderControl from './common/SliderControl'

type Props = {
  background: string
  ink: string
  companion: string
  canvasRef: React.RefObject<HTMLCanvasElement>
}

const PFPCanvas = (props: Props) => {
  const { background, ink, canvasRef, companion } = props

  const backgroundBrightnessLayerRef = useRef<HTMLDivElement>(null)

  const [isLoaded, setIsLoaded] = useState<boolean>(false)

  const [backgroundBrightness, setBackgroundBrightness] = useState<number>(25)

  const [companionByType, setCompanionByType] = useState<string>('')

  useEffect(() => {
    if (backgroundBrightnessLayerRef.current) {
      backgroundBrightnessLayerRef.current.style.opacity = `${backgroundBrightness / 100}`
    }

    setIsLoaded(true)

    drawImages()
  }, [background, ink, backgroundBrightness, companionByType])

  useEffect(() => {
    if (companion && ink) {
      const inkNum = parseInt(ink)
      console.log(`Ink number: ${inkNum}, Companion: ${companion}`)
      if (chimeraIds.includes(inkNum)) {
        setCompanionByType(companion + '_c')
      } else if (maleIds.includes(inkNum)) {
        setCompanionByType(companion + '_m')
      } else if (femaleIds.includes(inkNum)) {
        setCompanionByType(companion + '_f')
      } else {
        setCompanionByType(companion)
      }
    }
  }, [companion, ink])

  const drawImages = () => {
    const canvas = canvasRef.current
    if (canvas && background && ink) {
      const ctx = canvas.getContext('2d')

      canvas.width = 1000
      canvas.height = 1000

      if (ctx) {
        const baseImage = new Image()
        const inkImage = new Image()

        baseImage.src = `/assets/pfp-backgrounds/${background}.webp`

        console.log(`Using banner: ${baseImage.src} and ink: ${inkImage.src}`)

        baseImage.onload = () => {
          ctx.clearRect(0, 0, canvas.width, canvas.height)
          ctx.drawImage(baseImage, 0, 0, canvas.width, canvas.height)

          ctx.fillStyle = `rgba(0, 0, 0, ${backgroundBrightness / 100})`
          ctx.fillRect(0, 0, canvas.width, canvas.height)

          inkImage.src = `/assets/inks/${ink}.webp`

          inkImage.onload = () => {
            ctx.drawImage(inkImage, 0, 0, canvas.height, canvas.height)

            if (companionByType) {
              const companionImage = new Image()
              companionImage.src = `/assets/companions/${companionByType}.webp`

              companionImage.onload = () => {
                ctx.drawImage(companionImage, 0, 0, canvas.height, canvas.height)
              }
            }
          }
        }
      }
    }
  }

  return (
    <div className={`w-full max-w-[800px]`}>
      <div className={`w-full mb-4 h-[300px]`}>
        <canvas ref={canvasRef} className='hidden'></canvas>
        <div
          className='h-full aspect-square mx-auto relative'
          style={{
            backgroundImage: `url(/assets/pfp-backgrounds/${background}.webp)`,
            backgroundSize: 'contain',
          }}
        >
          <div
            ref={backgroundBrightnessLayerRef}
            className={`absolute top-0 left-0 w-full h-full ${isLoaded ? 'bg-black' : ''}`}
          />
          <img
            src={`/assets/inks/${ink}.webp`}
            alt={ink}
            width={300}
            height={300}
            className={`absolute bottom-0 left-0 z-20`}
          />
          <img
            src={`/assets/companions/${companionByType}.webp`}
            alt={companion}
            width={300}
            height={300}
            className={`absolute bottom-0 left-0 z-30 ${companion ? '' : 'hidden'}`}
          />
        </div>
      </div>
      <SliderControl
        label='Background Brightness'
        max={100}
        value={backgroundBrightness}
        onChange={(e) => setBackgroundBrightness(parseInt(e.target.value))}
      />
    </div>
  )
}

export default PFPCanvas
