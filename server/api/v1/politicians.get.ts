import axios from 'axios'

const config = useRuntimeConfig()
const backendUrl = config.public.backendUrl

async function fetchPoliticians() {
  try {
    const response = await axios.get(`${backendUrl}politicians`)
    if (response.status === 200) {
      return response.data.data.Multiple
    }
    else {
      console.error(`Error fetching politicians: ${response.statusText}`)
    }
  }
  catch (error) {
    console.error(`Error fetching politicians: ${error}`)
    return error
  }
}

export default defineEventHandler(async (_context) => {
  const politicians = await fetchPoliticians()
  return { politicians }
})
