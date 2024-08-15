import axios from 'axios'
import { defineEventHandler, readBody } from 'h3'
import { isNetworkError } from '~/utils/utils'

const config = useRuntimeConfig()
const backendUrl = config.public.backendUrl

interface CorruptionCase {
  politician_id: number
  name: string
  case_date: string
  case_description: string
  legal_outcome?: string
  link?: string
  title: string
}

async function addCase(body: CorruptionCase, retries = 3) {
  try {
    const response = await axios.post(`${backendUrl}/corruption_cases`, body)
    if (response.status === 200) {
      return response.data
    }
    throw createError({
      statusCode: 400,
      statusMessage: `Error creating case: ${response.statusText}`,
    })
  }
  catch (error) {
    if (isNetworkError(error)) {
      if (retries > 1) {
        console.warn(`Network error creating case. Retrying... (Attempts left: ${retries - 1})`)
        return await addCase(body, retries - 1)
      }
      else {
        throw createError({
          statusCode: 400,
          statusMessage: `Network error creating case after ${retries} retries.`,
        })
      }
    }
    else {
      throw createError({
        statusCode: 500,
        statusMessage: `${error}`,
      })
    }
  }
}

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const response = await addCase(body)
  return response
})
