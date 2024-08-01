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
    console.error(error)
  }
}

export default defineEventHandler(async (context) => {
  const query = getQuery(context)
  const id = query.id as number
  return await fetchReviews(id)
})
