import { inkMetadata } from "./data"

const chimera = { s: 1, e: 17 }
const male = { s: 73, e: 80 }
const female = { s: 188, e: 193 }

const main = () => {
  const cIds = []
  const mIds = []
  const fIds = []

  for (const ink of inkMetadata) {
    for (const trait of ink) {
      if (trait >= chimera.s && trait <= chimera.e) {
        cIds.push(ink)
        break
      } else if (trait >= male.s && trait <= male.e) {
        mIds.push(ink)
        break
      } else {
        fIds.push(ink)
        break
      }
    }
  }

  console.log('===========================================================')
  console.log('Chimera')
  console.log(cIds)
  console.log('===========================================================')
  console.log('Male')
  console.log(mIds)
  console.log('===========================================================')
  console.log('Female')
  console.log(fIds)
}

main()

