import { writeFileSync } from 'fs'
import { inkMetadata } from './data'

const chimera = { s: 1, e: 17 }
const male = { s: 73, e: 80 }
const female = { s: 188, e: 193 }

const main = () => {
  const cIds: number[] = []
  const mIds: number[] = []
  const fIds: number[] = []

  let i = 1
  for (const ink of inkMetadata) {
    for (const trait of ink) {
      if (trait >= chimera.s && trait <= chimera.e) {
        cIds.push(i++)
        break
      } else if (trait >= male.s && trait <= male.e) {
        mIds.push(i++)
        break
      } else if (trait >= female.s && trait <= female.e) {
        fIds.push(i++)
        break
      }
    }
  }

  // save the arrays to a ts file
  const txt = `export const chimeraIds = ${JSON.stringify(cIds)}\nexport const maleIds = ${JSON.stringify(mIds)}\nexport const femaleIds = ${JSON.stringify(fIds)}`

  writeFileSync('inks.ts', txt)
}

main()
