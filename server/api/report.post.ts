import axios from 'axios'

const config = useRuntimeConfig();
const backendUrl = config.public.backendUrl

interface Comment {
  case_id: string
  title: string
  review_text: string
  user_id: string
}

async function postReview(body: Comment) {
  try {
    const response = await axios.post(`${backendUrl}/report`, body)
    if (response.status === 201) {
      return response.data
    }
    else {
      console.error(`Error fetching post reviews: ${response.statusText}`)
    }
  }
  catch (error) {
    console.error(error)
  }
}

export default defineEventHandler(async (context) => {
  const body = await readBody(context)
  return await postReview(body)
})
