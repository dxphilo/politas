import axios from 'axios'
import { backendUrl } from '~/constants'

async function fetchReviews(case_id: number) {
  try {
    const response = await axios.get(`${backendUrl}/report/${case_id}`)
    if (response.status === 200) {
      return response.data
    }
    else {
      console.error(`Error fetching case reviews: ${response.statusText}`)
    }
  }
  catch (error) {
    throw (error)
  }
}

export default defineEventHandler(async (context) => {
  try {
    const query = getQuery(context)
    const id = query.id as number
    return await fetchReviews(id)
  }
  catch (error) {
    console.error('Error fetching Case reviews:', error)
  }
})
