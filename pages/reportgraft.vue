<script setup lang="ts">
import { onMounted, ref } from 'vue'
import axios from 'axios'
import { areAllValuesPresent, legalOutcomesArray } from '../utils/utils'

const router = useRouter()
const snackbar = useSnackbar()

const politician_id = ref<number>()
const name = ref<string>('')
const case_description = ref<string>('')
const legal_outcome = ref<string>('')
const case_date = ref<string>('')
const title = ref<string>('')
const link = ref<string>('')

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
  try {
    const response = await axios.post('/api/cases', {
      politician_id: Number(politician_id.value),
      name: name.value,
      case_description: case_description.value.substring(0, 500), // timming to 500 chars as of now but we can adjuts this later
      case_date: case_date.value,
      legal_outcome: legal_outcome.value,
      title: title.value.substring(0, 255),
      link: link.value.substring(0, 255),
    })

    if (response.status === 200) {
      snackbar.add({ title: 'Case added successfully', type: 'success' })
      router.back()
    }
    else {
      console.error(`Error creating case: ${response.statusText}`)
    }
  }
  catch (error) {
    console.error(error)
  }
}
</script>

<template>
  <div>
    <p class="text-2xl font-bold">
      Report graft case for {{ name }}
    </p>
    <form class="mx-auto max-w-lg p-6 text-justify space-y-4">
      <div class="mb-4">
        <label for="title" class="block text-sm font-medium light:text-gray-700">Case Title:</label>
        <textarea
          id="title" v-model="title" placeholder="Enter case title"
          class="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:border-green-500 sm:text-sm dark:text-gray-900 focus:outline-none focus:ring-green-500"
        />
      </div>
      <div class="mb-4">
        <label for="case_description" class="block text-sm font-medium light:text-gray-700">Case Description:</label>
        <textarea
          id="case_description" v-model="case_description" placeholder="Enter case description"
          class="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:border-green-500 sm:text-sm dark:text-gray-900 focus:outline-none focus:ring-green-500"
        />
      </div>
      <div class="mb-4">
        <label for="case_date" class="block text-sm font-medium light:text-gray-700">Case Date:</label>
        <input
          id="case_date" v-model="case_date" type="date" placeholder="Pick a case date"
          class="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:border-green-500 sm:text-sm dark:text-gray-500 focus:outline-none focus:ring-green-500"
        >
      </div>
      <div class="mb-4">
        <label for="link" class="block text-sm font-medium light:text-gray-700">Link:</label>
        <input
          id="link" v-model="link" type="text" placeholder="Enter a reference link (optional)"
          class="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:border-green-500 sm:text-sm dark:text-gray-500 focus:outline-none focus:ring-green-500"
        >
      </div>
      <div class="mb-4">
        <label for="legal_outcome" class="block text-sm font-medium light:text-gray-700">Legal Outcome:</label>
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

      <button type="submit" class="w-full flex justify-center btn" @click.once.prevent="submitForm()">
        Submit
      </button>
    </form>
  </div>
</template>
