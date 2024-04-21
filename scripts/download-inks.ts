import axios from 'axios'
import sharp, { OverlayOptions } from 'sharp'
import { inkMetadata, traits } from './data'

const ORD_URL = 'https://ord-mirror.magiceden.dev/content'
const PATH = 'inks'

const fetchImage = async (url: string): Promise<Buffer> => {
  const response = await axios.get(url, { responseType: 'arraybuffer' })
  return Buffer.from(response.data)
}

const generateWebp = async (ids: string[], filename: string): Promise<void> => {
  try {
    const imageBuffers = await Promise.all(ids.map((id) => fetchImage(`${ORD_URL}/${id}`)))

    let overlay = sharp(imageBuffers[0], { pages: -1 })

    // Proper chaining of the composite operation
    const composites = imageBuffers.slice(1).map((buffer) => ({ input: buffer, gravity: 'center', blend: 'over' }))

    overlay = overlay.composite(composites as OverlayOptions[])

    await overlay.webp().toFile(`${PATH}/${filename}`)

    console.log(`Generated ${filename}`)
  } catch (error) {
    console.error(error)
  }
}

const main = async () => {
  const t = traits
    .map(([trait_type, ts]) => (ts as string[][]).map(([value, id]) => ({ trait_type, value, id })))
    .flat()
  const m = inkMetadata

  for (let i = 0; i < m.length; i++) {
    const inkTraits = m[i].map((trait) => t[trait])

    const ids = inkTraits.map((trait) => trait.id)

    // remove the first id, which is the background
    ids.shift()

    console.log(`Generating ${i + 1}.webp`)
    console.log(`Number of layers: ${ids.length}`)

    const filename = i + 1 + '.webp'

    await generateWebp(ids, filename)
  }
}

main()
