import axios from 'axios'
import type { Politician } from '~/type'

const config = useRuntimeConfig()
const backendUrl = config.public.backendUrl

async function fetchPoliticians(): Promise<Array<Politician> | undefined> {
  try {
    const response = await axios.get(`${backendUrl}politicians`)
    if (response.status === 200) {
      const data: Array<Politician> = response.data.data.Multiple
      return data
    }
    else {
      console.error(`Error fetching politicians: ${response.statusText}`)
    }
  }
  catch (error) {
    throw new Error(`Error fetching politicians: ${error}`)
  }
}

export default defineEventHandler(async (_context) => {
  const politicians = await fetchPoliticians()
  return { politicians }
})
