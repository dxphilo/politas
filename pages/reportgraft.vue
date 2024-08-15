<script setup lang="ts">
import axios from 'axios'
import { onMounted, ref } from 'vue'
import { areAllValuesPresent, legalOutcomesArray } from '../utils/utils'
import type { CorruptionCase } from '~/type/index'

const router = useRouter()
const snackbar = useSnackbar()
const config = useRuntimeConfig()

const backendUrl = config.public.backendUrl
const titleChars = 255
const descriptionChars = 1000
const step = ref<number>(0)
const name = ref<string>('')
const link = ref<string>('')
const title = ref<string>('')
const case_date = ref<string>('')
const politician_id = ref<number>()
const legal_outcome = ref<string>('')
const case_description = ref<string>('')

// TODO: find a better way to handle this in props as opposed to url params
onMounted(() => {
  const url = new URL(window.location.href)
  const params = new URLSearchParams(url.search)

  const idParam = params.get('politician_id')
  const nameParam = params.get('name')

  if (idParam) {
    politician_id.value = Number.parseInt(idParam, 10)
  }
  if (nameParam) {
    name.value = nameParam
  }
})

// Methods
function toggleSteps() {
  if (step.value === 1) {
    submitForm()
    return
  }

  step.value++
}

async function submitForm() {
  const result = areAllValuesPresent(
    politician_id.value,
    name.value,
    case_description.value,
    legal_outcome.value,
    case_date.value,
    title.value,
  )

  if (!result) {
    snackbar.add({ title: 'All fields are required', type: 'warning' })
    return
  }
  const body_data = {
    politician_id: Number(politician_id.value),
    name: name.value,
    title: title.value.substring(0, 255),
    case_description: case_description.value.trim().substring(0, 1000),
    legal_outcome: legal_outcome.value,
    case_date: case_date.value,
    link: link.value.substring(0, 255),
  }
  await addCase(body_data)
}

async function addCase(body: CorruptionCase, retries = 3) {
  try {
    const response = await axios.post(`${backendUrl}/corruption_cases`, body)

    if (response.status === 200) {
      snackbar.add({ title: 'Case created successfully', text: 'Your contribution is invaluable. You are playing a crucial role in holding public figures accountable. Your impact is huge!', type: 'success' })
      resetForm()
      router.push(`/reviews/${response.data.data.Single.id}`)
      return
    }
    throw createError({
      statusCode: 400,
      statusMessage: `Error creating case: ${response.statusText}`,
    })
  }
  catch (error) {
    if (isNetworkError(error)) {
      if (retries > 1) {
        snackbar.add({ title: `Network error creating case. Retrying... (Attempts left: ${retries - 1})`, type: 'warning' })
        await new Promise(resolve => setTimeout(resolve, 1000)) // Optional delay before retrying
        return addCase(body, retries - 1) // Retry with decremented retries
      }
      else {
        snackbar.add({ title: `Network error creating case after ${retries} retries.`, type: 'warning' })
      }
    }
    else {
      snackbar.add({ title: `Error creating case: ${error}`, type: 'warning' })
    }
  }
}

function resetForm() {
  step.value = 0
  name.value = ''
  link.value = ''
  title.value = ''
  case_date.value = ''
  politician_id.value = 0
  legal_outcome.value = ''
  case_description.value = ''
}
</script>

<template>
  <div class="mx-auto w-full py-6 text-justify lg:w-3/5 space-y-4">
    <div class="mx-auto w-full py-6 text-justify lg:w-3/5 space-y-4">
      <p class="text-justify text-3xl font-bold">
        Report graft case for {{ name }}
      </p>
      <!-- start Step 1 -->
      <div v-if="step === 0">
        <div class="mb-4">
          <h1 class="text-2xl font-bold">
            Case Title
          </h1>
          <label for="case_date" class="block py-2 text-sm font-medium light:text-gray-500">This could be a short description about the case/schandal you want to report</label>
          <textarea
            id="title" v-model="title" placeholder="Enter case title"
            class="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:border-green-500 sm:text-sm dark:text-gray-900 focus:outline-none focus:ring-green-500"
          />
          <span class="text-xs text-gray-600">{{ titleChars - (title.length) }} chars remaining</span>
        </div>
        <div class="mb-4">
          <h1 class="text-2xl font-bold">
            Case Description
          </h1>
          <label for="case_description" class="block py-2 text-sm font-medium light:text-gray-500">This should be an axhaustive description of the case/scandal</label>
          <textarea
            id="case_description" v-model="case_description" placeholder="Enter case description" rows="7"
            class="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:border-green-500 sm:text-sm dark:text-gray-900 focus:outline-none focus:ring-green-500"
          />
          <span class="text-xs text-gray-600">{{ descriptionChars - (case_description.length) }} chars remaining</span>
        </div>
      </div>
      <!-- end of step 1 -->
      <!-- start step 2 -->
      <div v-if="step === 1">
        <div class="py-5">
          <h1 class="text-2xl font-bold">
            Case Date
          </h1>
          <label for="case_date" class="block py-2 text-sm font-medium light:text-gray-500">Date the case/scandal was reported</label>
          <input
            id="case_date" v-model="case_date" type="date" placeholder="Pick a case date"
            class="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:border-green-500 sm:text-sm dark:text-gray-500 focus:outline-none focus:ring-green-500"
          >
        </div>
        <div class="mb-4">
          <h1 class="text-2xl font-bold">
            Legal Outcome
          </h1>
          <label for="legal_outcome" class="block py-2 text-sm font-medium light:text-gray-500">What is/was the legal outcome of the case(choose below):</label>
          <select
            id="legal_outcome"
            v-model="legal_outcome"
            class="mt-1 block w-full border border-gray-300 rounded-lg px-4 py-2 shadow-sm dark:text-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="" disabled>
              Select a legal outcome
            </option>
            <option
              v-for="outcome in legalOutcomesArray"
              :key="outcome"
              :value="outcome"
              class=""
            >
              {{ outcome }}
            </option>
          </select>
        </div>
        <div class="mb-4">
          <h1 class="text-2xl font-bold">
            Link
          </h1>
          <label for="link" class="block py-2 text-sm font-medium light:text-gray-500">Enter an optional link that backs/references the case you want to report</label>
          <input
            id="link" v-model="link" type="text" placeholder="Enter a reference link (optional)"
            class="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:border-green-500 sm:text-sm dark:text-gray-500 focus:outline-none focus:ring-green-500"
          >
        </div>
      </div>
      <!-- end of step 2 -->

      <div class="py-2">
        <button type="submit" class="w-full flex cursor-pointer justify-center btn" @click.prevent="toggleSteps()">
          <Next /> {{ step === 0 ? 'Next' : 'Submit' }}
        </button>
      </div>
    </div>
  </div>
</template>
