import axios from 'axios'
import { backendUrl } from '~/constants'

async function fetchPoliticians() {
  try {
    const response = await axios.get(`${backendUrl}/politicians`)
    if (response.status === 200 && response.data.success === true) {
      return response.data.data.Multiple
    }
    else {
      console.error(`Error fetching politicians: ${response.statusText}`)
    }
  }
  catch (error) {
    throw (error)
  }
}

export default defineEventHandler(async (_context) => {
  try {
    const politicians = await fetchPoliticians()
    return { politicians }
  }
  catch (error) {
    console.error('Error fetching politicians:', error)
  }
})
