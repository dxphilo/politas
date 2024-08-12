import axios from 'axios'

const config = useRuntimeConfig()
const backendUrl = config.public.backendUrl

interface Politician {
  name: string
  office: string
  county: string
  political_party: string
  source_website: string
  photo_url: string
}

async function reportPolitician(body: Politician) {
  try {
    const response = await axios.post(`${backendUrl}politicians`, body)
    if (response.status === 201 && response.data.success === true) {
      return response.data.data.Single
    }
    else {
      console.error(`Error posting politician: ${response.statusText},`)
    }
  }
  catch (error) {
    console.error(error)
  }
}

export default defineEventHandler(async (context) => {
  const body = await readBody(context)
  const politician = await reportPolitician(body)
  return { politician }
})
