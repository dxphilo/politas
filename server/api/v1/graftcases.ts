import axios from 'axios'

const config = useRuntimeConfig();
const backendUrl = config.public.backendUrl

async function fetchGraft() {
  try {
    const response = await axios.get(`${backendUrl}/corruption_cases`)
    if (response.status === 200 && response.data.success === true) {
      return response.data.data.Multiple
    }
    else {
      console.error(`Error fetching graft: ${response.statusText}`)
    }
  }
  catch (error) {
    console.error(error)
  }
}

export default defineEventHandler(async (_context) => {
  const graft = await fetchGraft()
  return { graft }
})
