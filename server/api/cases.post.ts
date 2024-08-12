import axios from 'axios'
import { defineEventHandler, readBody } from 'h3'

const config = useRuntimeConfig()
const backendUrl = config.public.backendUrl

async function addCase(body: any) {
  try {
    const response = await axios.post(`${backendUrl}corruption_cases`, body)
    if (response.status === 200) {
      return response.data
    }
    else {
      console.error(`Error creating case: ${response.statusText}`)
      throw new Error(`Error creating case: ${response.statusText}`)
    }
  }
  catch (error) {
    console.error(`Error creating case: ${error}`)
    throw error
  }
}

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  try {
    const response = await addCase(body)
    return response
  }
  catch (error) {
    console.error(`Error adding case: ${error}`)
  }
})
