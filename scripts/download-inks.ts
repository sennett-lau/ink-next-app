import axios from 'axios'
import sharp, { OverlayOptions } from 'sharp'
import { inkMetadata, traits } from './data'

const ORD_URL = 'https://ord-mirror.magiceden.dev/content'
const PATH = 'inks'

const traitsBufferMap = new Map<string, Buffer>()

const fetchImage = async (url: string): Promise<Buffer> => {
  const response = await axios.get(url, { responseType: 'arraybuffer' })
  return Buffer.from(response.data)
}

const generateWebp = async (ids: string[], filename: string): Promise<void> => {
  try {
    const imageBuffers = ids.map((id) => traitsBufferMap.get(id))

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

const loadTraits = async (ids: string[]) => {
  console.log(`Loading ${ids.length} traits`)
  const traits = await Promise.all(ids.map((id) => fetchImage(`${ORD_URL}/${id}`)))
  console.log('Traits loaded')

  for (let i = 0; i < ids.length; i++) {
    traitsBufferMap.set(ids[i], traits[i])
  }
}

const main = async () => {
  const t = traits
    .map(([trait_type, ts]) => (ts as string[][]).map(([value, id]) => ({ trait_type, value, id })))
    .flat()

  const traitIds = t.map((trait) => trait.id)

  await loadTraits(traitIds)

  const m = inkMetadata

  console.log(`Generating ${m.length} images`)

  const ps: Promise<void>[] = []

  for (let i = 0; i < m.length; i++) {
    const inkTraits = m[i].map((trait) => t[trait])

    const ids = inkTraits.map((trait) => trait.id)

    // remove the first id, which is the background
    ids.shift()

    const filename = i + 1 + '.webp'

    ps.push(generateWebp(ids, filename))
  }

  await Promise.all(ps)

  console.log('Done')
}

main()
