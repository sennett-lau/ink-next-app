import { fabric } from 'fabric'
import { v4 as uuidv4 } from 'uuid'

import { CustomFabricObject, ElementDirection, ImageUpload, ModifyShape } from '@/types/canvas'

export const createText = (pointer: PointerEvent, text: string) => {
  return new fabric.IText(text, {
    left: pointer.x,
    top: pointer.y,
    fill: '#aabbcc',
    fontFamily: 'Helvetica',
    fontSize: 36,
    fontWeight: '400',
    objectId: uuidv4(),
  } as fabric.ITextOptions)
}

export const createTextDetailed = (
  pointer: PointerEvent, text: string, color: string, fontFamily: string, fontWeight: string
) => {
  return new fabric.IText(text, {
    left: pointer.x,
    top: pointer.y,
    fill: color,
    fontFamily,
    fontSize: 48,
    fontWeight,
    objectId: uuidv4(),
  } as fabric.ITextOptions)
}

export const createRectangle = (pointer: PointerEvent) => {
  const rect = new fabric.Rect({
    left: pointer.x,
    top: pointer.y,
    width: 100,
    height: 100,
    fill: '#aabbcc',
    objectId: uuidv4(),
  } as CustomFabricObject<fabric.Rect>)

  return rect
}

export const createSpecificShape = (shapeType: string, pointer: PointerEvent) => {
  switch (shapeType) {
    case "rectangle":
      return createRectangle(pointer);
      
    case 'text':
      return createText(pointer, 'Tap to Type')

    default:
      return null
  }
}

export const handleImageUpload = ({ file, canvas, shapeRef, syncShapeInStorage }: ImageUpload) => {
  const reader = new FileReader()

  reader.onload = () => {
    fabric.Image.fromURL(reader.result as string, (img) => {
      img.scaleToWidth(200)
      img.scaleToHeight(200)

      canvas.current.add(img)

      // @ts-ignore
      img.objectId = uuidv4()

      shapeRef.current = img

      syncShapeInStorage(img)
      canvas.current.requestRenderAll()
    })
  }

  reader.readAsDataURL(file)
}

export const createShape = (canvas: fabric.Canvas, pointer: PointerEvent, shapeType: string) => {
  if (shapeType === 'freeform') {
    canvas.isDrawingMode = true
    return null
  }

  return createSpecificShape(shapeType, pointer)
}

export const modifyShape = ({ canvas, property, value, activeObjectRef }: ModifyShape) => {
  const objs = canvas.getObjects()

  if (!objs.length) return

  const selectedElement = objs[0]

  if (!selectedElement || selectedElement?.type === 'activeSelection') return

  // if  property is width or height, set the scale of the selected element
  if (property === 'width') {
    selectedElement.set('scaleX', 1)
    selectedElement.set('width', value)
  } else if (property === 'height') {
    selectedElement.set('scaleY', 1)
    selectedElement.set('height', value)
  } else {
    if (selectedElement[property as keyof object] === value) return
    selectedElement.set(property as keyof object, value)
  }

  // set selectedElement to activeObjectRef
  activeObjectRef.current = selectedElement
}

export const bringElement = ({ canvas, direction, syncShapeInStorage }: ElementDirection) => {
  if (!canvas) return

  // get the selected element. If there is no selected element or there are more than one selected element, return
  const selectedElement = canvas.getActiveObject()

  if (!selectedElement || selectedElement?.type === 'activeSelection') return

  // bring the selected element to the front
  if (direction === 'front') {
    canvas.bringToFront(selectedElement)
  } else if (direction === 'back') {
    canvas.sendToBack(selectedElement)
  }

  // canvas.renderAll();
  syncShapeInStorage(selectedElement)

  // re-render all objects on the canvas
}
