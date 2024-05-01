import sharp, { OverlayOptions } from 'sharp'

const customTraits: number[] = []

const main = async () => {
  console.log('Generating custom ink image')

  const traitPaths = customTraits.map((id) => `./traits/t_${id}.webp`)

  // load the webp images as buffers
  const buffers = await Promise.all(traitPaths.map(async (path) => await sharp(path).toBuffer()))

  let overlay = sharp(buffers[0], { pages: -1 })

  const composites = buffers.slice(1).map((buffer) => ({ input: buffer, gravity: 'center', blend: 'over' }))

  overlay = overlay.composite(composites as OverlayOptions[])

  await overlay.webp().toFile('./custom-ink.webp')

  console.log('Generated custom ink image')
}

main()
