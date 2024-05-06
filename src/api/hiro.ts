import axios from 'axios'
import { inkInscriptionNumbers } from '../config/inks'
import { HiroApiListOfInscriptionsResponse } from '../types/hiro'

const hiroAPI = axios.create({
  baseURL: 'https://api.hiro.so',
  headers: {
    Accept: 'application/json',
  },
})

export const hiroApiGetInkHoldings = async (address: string, page?: number): Promise<HiroApiListOfInscriptionsResponse> => {
  const limit = 60
  const offset = page ? page * limit : 0

  const { data } = await hiroAPI.get(
    `/ordinals/v1/inscriptions?from_number=${inkInscriptionNumbers.from}&to_number=${inkInscriptionNumbers.to}&address=${address}&limit=${limit}&offset=${offset}`,
  )

  return data as HiroApiListOfInscriptionsResponse
}
