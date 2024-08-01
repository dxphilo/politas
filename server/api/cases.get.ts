import axios from 'axios'
import { backendUrl } from '~/constants'

async function fetchCorruptionCases(id: string) {
  try {
    const response = await axios.get(`${backendUrl}/politicians/${id}`)
    if (response.status === 200 && response.data.success === true) {
      return response.data.data.Single
    }
    else {
      console.error(`Error fetching corruption cases: ${response.statusText}`)
    }
  }
  catch (error) {
    throw (error)
  }
}

export default defineEventHandler((event) => {
  try {
    const query = getQuery(event)
    const id = query.id as string
    const corruptionCases = fetchCorruptionCases(id)
    return corruptionCases
  }
  catch (error) {
    console.error('Error fetching corruption cases:', error)
  }
})
