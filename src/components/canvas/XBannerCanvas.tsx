'use client'
import { useEffect, useRef, useState } from 'react'
import SliderControl from './SliderControl'

type Props = {
  banner: string
  inks: string[]
  canvasRef: React.RefObject<HTMLCanvasElement>
}

const XBannerCanvas = (props: Props) => {
  const { banner, inks, canvasRef } = props

  const containerRef = useRef<HTMLDivElement>(null)
  const blackLayerRef = useRef<HTMLDivElement>(null)

  const [isLoaded, setIsLoaded] = useState<boolean>(false)

  const [containerWidth, setContainerWidth] = useState<number>(0)
  const [inkXPositions, setInkXPositions] = useState<number[]>([])
  const [blackLayerOpacity, setBlackLayerOpacity] = useState<number>(25)

  const [inkIdToPosition, setInkIdToPosition] = useState<{ [key: string]: number }>({})
  const [inkIdToIsFacingLeft, setInkIdToIsFacingLeft] = useState<{ [key: string]: boolean }>({})

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth)

        containerRef.current.style.height = `${containerRef.current.offsetWidth / 3}px`
      }
    }

    window.addEventListener('resize', handleResize)
    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (inks.length !== inkXPositions.length) {
      const newInkXPositions = inks.map((ink) => inkIdToPosition[ink] || 0)
      const newInkFacings: { [key: string]: boolean } = {}

      for (const ink of inks) {
        newInkFacings[ink] =
          inkIdToIsFacingLeft[ink] === undefined || inkIdToIsFacingLeft[ink] === null || inkIdToIsFacingLeft[ink]
      }

      newInkXPositions.forEach((pos, index) => {
        const inkLayer = document.getElementById(`ink-layer-${index}`)

        if (inkLayer) {
          inkLayer.style.transform = `translateX(${pos}px) scaleX(${newInkFacings[inks[index]] ? 1 : -1})`
        }
      })

      setInkXPositions(newInkXPositions)
      setInkIdToIsFacingLeft(newInkFacings)
    }
    if (containerWidth > 0) {
      drawImages()
    }
  }, [banner, inks, containerWidth, inkXPositions, inkIdToIsFacingLeft, blackLayerOpacity])

  const drawImages = () => {
    const canvas = canvasRef.current
    if (canvas && banner && inks && containerWidth) {
      const ctx = canvas.getContext('2d')

      canvas.width = 1500
      canvas.height = 500

      if (ctx) {
        const baseImage = new Image()

        baseImage.src = `/assets/banner-backgrounds/${banner}.webp`

        baseImage.onload = () => {
          ctx.clearRect(0, 0, canvas.width, canvas.height)
          ctx.drawImage(baseImage, 0, 0, canvas.width, canvas.height)

          ctx.fillStyle = `rgba(0, 0, 0, ${blackLayerOpacity / 100})`
          ctx.fillRect(0, 0, canvas.width, canvas.height)

          blackLayerRef.current.style.opacity = `${blackLayerOpacity / 100}`

          setIsLoaded(true)

          drawInks(canvas, 0)
        }
      }
    }
  }

  const drawInks = (canvas: HTMLCanvasElement, index: number) => {
    if (index >= inks.length) {
      return
    }
    const ctx = canvas.getContext('2d')

    const inkMaxX = canvas.width - canvas.width / 3

    const inkImage = new Image()

    inkImage.src = `/assets/inks/${inks[index]}.webp`

    const isFacingLeft =
      inkIdToIsFacingLeft[inks[index]] === undefined ||
      inkIdToIsFacingLeft[inks[index]] === null ||
      inkIdToIsFacingLeft[inks[index]]

    const inkXPositionOnCanvas = (inkXPositions[index] / containerWidth) * canvas.width

    inkImage.onload = () => {
      if (isFacingLeft) {
        ctx.drawImage(inkImage, Math.min(inkXPositionOnCanvas, inkMaxX), 0, canvas.height, canvas.height)
      } else {
        ctx.save()
        ctx.translate(Math.min(inkXPositionOnCanvas, inkMaxX) + canvas.height, 0)
        ctx.scale(-1, 1)
        ctx.drawImage(inkImage, 0, 0, canvas.height, canvas.height)
        ctx.restore()
      }

      drawInks(canvas, index + 1)
    }
  }

  const handleBackgroundBlackLayerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBlackLayerOpacity(parseInt(e.target.value))

    if (blackLayerRef.current) {
      blackLayerRef.current.style.opacity = `${blackLayerOpacity / 100}`
    }
  }

  const handleInkXPositionChange = (pos: number, index: number) => {
    const newInkXPositions = [...inkXPositions]
    newInkXPositions[index] = pos

    setInkXPositions(newInkXPositions)

    const inkLayer = document.getElementById(`ink-layer-${index}`)

    const newMap = { ...inkIdToPosition }

    newMap[inks[index]] = newInkXPositions[index]

    setInkIdToPosition(newMap)

    if (inkLayer) {
      inkLayer.style.transform = `translateX(${newInkXPositions[index]}px) scaleX(${inkIdToIsFacingLeft[inks[index]] ? 1 : -1})`
    }
  }

  const onToggleFacing = (isFacingLeft: boolean, index: number) => {
    const newInkFacings = { ...inkIdToIsFacingLeft }
    newInkFacings[inks[index]] = isFacingLeft

    setInkIdToIsFacingLeft(newInkFacings)

    const inkLayer = document.getElementById(`ink-layer-${index}`)

    if (inkLayer) {
      inkLayer.style.transform = `translateX(${inkXPositions[index]}px) scaleX(${isFacingLeft ? 1 : -1})`
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
        <canvas ref={canvasRef} className='hidden'></canvas>
        <div ref={blackLayerRef} className={`absolute top-0 left-0 w-full h-full ${isLoaded ? 'bg-black' : ''}`} />
        {inks.length > 0 &&
          inks.map((ink, index) => (
            <img
              key={index}
              src={`/assets/inks/${ink}.webp`}
              alt={ink}
              width={containerWidth / 3}
              height={containerWidth / 3}
              className={`absolute bottom-0 left-0 z-20`}
              id={`ink-layer-${index}`}
            />
          ))}
      </div>
      <SliderControl
        label='Black Layer Opacity'
        max={100}
        value={blackLayerOpacity}
        onChange={handleBackgroundBlackLayerChange}
      />
      {inkXPositions.length > 0 &&
        inkXPositions.map((inkXPosition, index) => (
          <SliderControl
            key={index}
            label={`Ink ${index + 1} Position`}
            max={containerWidth - containerWidth / 3}
            value={inkXPosition}
            onChange={(e) => handleInkXPositionChange(parseInt(e.target.value), index)}
            toggleLabel='Facing'
            toggleTextPair={['L', 'R']}
            toggleValue={inkIdToIsFacingLeft[inks[index]]}
            onToggle={(isFacingLeft) => onToggleFacing(isFacingLeft, index)}
          />
        ))}
    </div>
  )
}

export default XBannerCanvas
