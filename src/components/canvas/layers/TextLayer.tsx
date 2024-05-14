import { ActiveElement } from '@/types/canvas'
import {
  handleCanvaseMouseMove,
  handleCanvasMouseDown,
  handleCanvasMouseUp,
  handleResize,
  initializeFabric,
} from '@/utils/canvas'
import React, { useEffect, useRef, useState } from 'react'

type Props = {
  textCanvasRef: React.RefObject<HTMLCanvasElement>
}

const TextLayer = (props: Props) => {
  const { textCanvasRef } = props

  const containerRef = useRef<HTMLDivElement>(null)
  const fabricRef = useRef<fabric.Canvas | null>(null)
  const isDrawing = useRef<boolean>(false)
  const shapeRef = useRef<fabric.Object | null>(null)
  const selectedShapeRef = useRef<string | null>('text')
  const activeObjectRef = useRef<fabric.Object | null>(null)

  const [activeElement, setActiveElement] = useState<ActiveElement>({
    name: '',
    value: '',
    icon: '',
  })

  const handleActiveElement = (el: ActiveElement) => {
    setActiveElement(el)

    selectedShapeRef.current = el?.value
  }

  useEffect(() => {
    if (!containerRef.current) return

    const canvas = initializeFabric({
      canvasRef: textCanvasRef,
      fabricRef,
      width: containerRef.current.offsetWidth,
      height: containerRef.current.offsetWidth / 3,
    })

    canvas.on('mouse:down', (options) => {
      handleCanvasMouseDown({
        options,
        canvas,
        isDrawing,
        shapeRef,
        selectedShapeRef,
      })
    })

    canvas.on('mouse:move', (options) => {
      handleCanvaseMouseMove({
        options,
        canvas,
        isDrawing,
        selectedShapeRef,
        shapeRef,
      })
    })

    canvas.on('mouse:up', () => {
      handleCanvasMouseUp({
        canvas,
        isDrawing,
        shapeRef,
        activeObjectRef,
        selectedShapeRef,
        setActiveElement,
      })
    })

    window.addEventListener('resize', () => {
      handleResize({
        canvas: fabricRef.current,
      })
    })

    handleActiveElement({
      icon: '/assets/text.svg',
      value: 'text',
      name: 'Text',
    })
  }, [])

  return (
    <div ref={containerRef} className='w-full h-full top-0 left-0 absolute z-20'>
      <canvas ref={textCanvasRef} />
    </div>
  )
}

export default TextLayer
