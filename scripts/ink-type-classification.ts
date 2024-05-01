import { writeFileSync } from 'fs'
import { inkMetadata } from './data'

const chimera = { s: 1, e: 17 }
const chimeraOrange = { s: 803, e: 809 }
const male = { s: 73, e: 80 }
const maleBot = { s: 419, e: 419 }
const maleInfected = { s: 543, e: 544 }
const maleBotOrange = { s: 607, e: 607 }
const maleRift = { s: 614, e: 615 }
const female = { s: 188, e: 193 }
const femaleBot = { s: 244, e: 244 }
const femaleBotOrange = { s: 250, e: 250 }
const femaleRift = { s: 638, e: 639 }

const main = () => {
  const cIds: number[] = []
  const mIds: number[] = []
  const fIds: number[] = []

  let i = 1
  for (const ink of inkMetadata) {
    for (const trait of ink) {
      if ((trait >= chimera.s && trait <= chimera.e) || (trait >= chimeraOrange.s && trait <= chimeraOrange.e)) {
        cIds.push(i++)
        break
      } else if (
        (trait >= male.s && trait <= male.e) ||
        (trait >= maleBot.s && trait <= maleBot.e) ||
        (trait >= maleInfected.s && trait <= maleInfected.e) ||
        (trait >= maleBotOrange.s && trait <= maleBotOrange.e) ||
        (trait >= maleRift.s && trait <= maleRift.e)
      ) {
        mIds.push(i++)
        break
      } else if (
        (trait >= female.s && trait <= female.e) ||
        (trait >= femaleBot.s && trait <= femaleBot.e) ||
        (trait >= femaleBotOrange.s && trait <= femaleBotOrange.e) ||
        (trait >= femaleRift.s && trait <= femaleRift.e)
      ) {
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
