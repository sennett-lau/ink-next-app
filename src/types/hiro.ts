export type HiroApiListOfInscriptionsResponse = {
  limit: number
  offset: number
  total: number
  results: HiroApiInscription[]
}

export type HiroApiInscription = {
  id: string
  number: number
  address: string
  genesis_address: string
  genesis_block_height: number
  genesis_block_hash: string
  genesis_tx_id: string
  genesis_fee: string
  genesis_timestamp: number
  tx_id: string
  location: string
  output: string
  value: string
  offset: string
  sat_ordinal: string
  sat_rarity: string
  sat_coinbase_height: number
  mime_type: string
  content_type: string
  content_length: number
  timestamp: number
  curse_type: string
  recursive: boolean
  recursion_refs: string[]
}
