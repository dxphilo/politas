import axios from 'axios'
import { backendUrl } from '~/constants'

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
    throw (error)
  }
}

export default defineEventHandler(async (_context) => {
  try {
    const graft = await fetchGraft()
    return { graft }
  }
  catch (error) {
    console.error('Error fetching graft:', error)
  }
})
