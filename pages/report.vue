<script setup lang="ts">
import axios from 'axios'
import { ref } from 'vue'
import { counties, kenyanPoliticalParties } from '~/constants/index'
import type { Politician } from '~/type/index'

const router = useRouter()
const snackbar = useSnackbar()
const config = useRuntimeConfig()
const current_year = new Date().getFullYear()

const backendUrl = config.public.backendUrl
const show_share_card = ref<boolean>(false)
const step = ref<number>(0)
const sex = ref<'male' | 'female'>('male')
const year_of_birth = ref<number>()
const name = ref<string>('')
const office = ref<string>('')
const county = ref<string>('')
const photo_url = ref<string>('')
const political_party = ref<string>('')
const source_website = ref<string>('')
const politician_data = ref<Politician>()

// methods

function age() {
  return current_year - year_of_birth.value!
}

function validateForm(): boolean {
  if (!year_of_birth.value) {
    snackbar.add({ title: 'Please enter year of birth', type: 'warning' })
    return false
  }

  if (!political_party.value) {
    snackbar.add({ title: 'Please enter political party', type: 'warning' })
    return false
  }
  if (!source_website.value) {
    snackbar.add({ title: 'Please enter source website', type: 'warning' })
    return false
  }
  if (!county.value) {
    snackbar.add({ title: 'Please enter county', type: 'warning' })
    return false
  }

  return true
}

function handleNext() {
  if (step.value === 0) {
    if (!checkStepOne()) {
      return
    }
    step.value++
    return
  }
  if (step.value === 1) {
    if (!validateForm()) {
      return
    }
    handleSubmit()
  }
}

async function handleSubmit() {
  if (!validateForm()) {
    return
  }

  try {
    const body_data = {
      name: name.value,
      office: office.value,
      county: county.value,
      political_party: political_party.value,
      source_website: source_website.value,
      photo_url: photo_url.value,
      year_of_birth: Number(year_of_birth.value),
      sex: sex.value,
    }
    const response = await axios.post(`${backendUrl}/politicians`, body_data)
    if (response.status === 201) {
      const data = await response.data

      snackbar.add({ title: `${name.value} info added successfully`, text: 'Your contribution is invaluable. Your impact is huge!', type: 'success' })

      politician_data.value = data.data.Single
      show_share_card.value = !show_share_card.value
      resetForm()

      // redirect to the already crated public profile
      router.push(`/profile/${politician_data.value!.politician_id!}`)
      return
    }
    throw createError({
      statusCode: 400,
      statusMessage: `Error creating case: ${response.statusText}`,
    })
  }
  catch (error) {
    // handle retries
    console.error(error)
  }
}

function checkStepOne() {
  if (!name.value) {
    snackbar.add({ title: 'Please enter name', type: 'warning' })
    return false
  }
  if (!office.value) {
    snackbar.add({ title: 'Please enter office', type: 'warning' })
    return false
  }
  if (!photo_url.value) {
    snackbar.add({ title: 'Please enter photo URL', type: 'warning' })
    return false
  }
  if (!sex.value) {
    snackbar.add({ title: 'Please enter sex', type: 'warning' })
    return false
  }

  return true
}

function resetForm() {
  name.value = ''
  office.value = ''
  county.value = ''
  political_party.value = ''
  source_website.value = ''
  photo_url.value = ''
  sex.value = 'male'
  year_of_birth.value = 0
}
</script>

<template>
  <div class="mx-auto max-w-md text-justify space-y-4">
    <div>
      <h1 class="py-2 text-center text-3xl font-bold">
        Add a Corrupt Politician
      </h1>
      <p class="text-sm font-normal light:text-gray-500">
        Your contribution helps build a public database of corrupt politicians
      </p>
      <!-- starte step 0 -->
      <div v-if="step === 0">
        <div>
          <h1 class="text-2xl font-bold">
            Name
          </h1>
          <label for="name" class="block py-1 text-sm font-normal light:text-gray-500">Enter name of the political</label>
          <input id="name" v-model="name" placeholder="Enter name" type="text" class="mt-1 block w-full border border-gray-300 rounded-md bg-gray-50 px-3 py-2 shadow-sm focus:border-green-500 sm:text-sm focus:outline-none focus:ring-green-500">
        </div>

        <div class="py-1">
          <h1 class="text-2xl font-bold">
            Photo Url
          </h1>
          <label for="photo_url" class="block py-1 text-sm font-normal light:text-gray-500">Enter photo url of this politician (image uploads soon 🙏)</label>
          <input id="photo_url" v-model="photo_url" placeholder="Enter photo url" type="text" class="mt-1 block w-full border border-gray-300 rounded-md bg-gray-50 px-3 py-2 shadow-sm focus:border-green-500 sm:text-sm focus:outline-none focus:ring-green-500">
        </div>

        <div class="py-1">
          <h1 class="text-2xl font-bold">
            Office
          </h1>
          <label for="office" class="block py-1 text-sm font-normal light:text-gray-500">What office does the politician hold</label>
          <input id="office" v-model="office" placeholder="Enter office" type="text" class="mt-1 block w-full border border-gray-300 rounded-md bg-gray-50 px-3 py-2 shadow-sm focus:border-green-500 sm:text-sm focus:outline-none focus:ring-green-500">
        </div>
        <h1 class="text-2xl font-bold">
          Sex
        </h1>
        <label for="sex" class="block py-1 text-sm text-gray-500 font-normal">Choose sex below</label>
        <div id="sex" class="my-2 flex flex-row items-center space-x-8">
          <div class="flex items-center">
            <input id="male" v-model="sex" name="sex" value="male" type="radio" class="h-4 w-4 border-gray-300 text-green-600 focus:ring-green-500">
            <label for="male" class="ml-2 block text-sm text-gray-700 font-normal">Male</label>
          </div>
          <div class="flex items-center">
            <input id="female" v-model="sex" name="sex" value="female" type="radio" class="h-4 w-4 border-gray-300 text-green-600 focus:ring-green-500">
            <label for="female" class="ml-2 block text-sm text-gray-700 font-normal">Female</label>
          </div>
        </div>
      </div>
      <!-- end of srep 0 -->
      <!-- start of step 1 -->
      <div v-if="step === 1">
        <div>
          <h1 class="text-2xl text-gray-800 font-bold">
            Year of Birth
          </h1>
          <label for="year" class="block py-1 text-sm text-gray-500 font-normal">Whats the year of birth of this politician</label>
          <input id="year_of_birth" v-model="year_of_birth" type="number" min="1900" max="2024" placeholder="Enter your year of birth" class="mt-1 block w-full border border-gray-300 rounded-md bg-gray-50 px-3 py-2 shadow-sm focus:border-green-500 sm:text-sm focus:ring-green-500">
          <span class="text-xs text-gray-600">{{ age() }} {{ age() > 0 ? 'years' : 'year' }} old</span>
        </div>
        <div class="py-2">
          <h1 class="text-2xl text-gray-800 font-bold">
            County
          </h1>
          <label for="county" class="block py-1 text-sm text-gray-500 font-normal">Select the county where the politician comes from</label>
          <select id="county" v-model="county" class="mt-1 block w-full border border-gray-300 rounded-md bg-gray-50 px-3 py-2 shadow-sm focus:border-green-500 sm:text-sm dark:text-gray-500 focus:outline-none focus:ring-green-500">
            <option value="" disabled>
              Select County
            </option>
            <option v-for="counti in counties" :key="counti" :value="counti">
              {{ counti }}
            </option>
          </select>
        </div>

        <div class="py-2">
          <h1 class="text-2xl text-gray-800 font-bold">
            Political Party
          </h1>
          <label for="political_party" class="block py-1 text-sm text-gray-500 font-normal">Which party does this politician represent</label>
          <select id="political_party" v-model="political_party" class="mt-1 block w-full border border-gray-300 rounded-md bg-gray-50 px-3 py-2 shadow-sm focus:border-green-500 sm:text-sm dark:text-gray-500 focus:outline-none focus:ring-green-500">
            <option value="" disabled class="text-gray-500">
              Select Political Party
            </option>
            <option v-for="party in kenyanPoliticalParties" :key="party" :value="party">
              {{ party }}
            </option>
          </select>
        </div>

        <div>
          <h1 class="text-2xl text-gray-800 font-bold">
            Source website\link
          </h1>
          <label for="source_website" class="block py-1 text-sm text-gray-500 font-normal">Enter a link for reference (optional)</label>
          <input id="source_website" v-model="source_website" placeholder="Enter graft case link" type="text" class="mt-1 block w-full border border-gray-300 rounded-md bg-gray-50 px-3 py-2 shadow-sm focus:border-green-500 sm:text-sm focus:outline-none focus:ring-green-500">
        </div>
      </div>
      <!-- end of step 1 -->

      <div class="mt-4 w-full flex justify-between">
        <button class="text-sm btn" @click.prevent="handleNext()">
          {{ step === 0 ? 'Next Step' : 'Submit' }}
        </button>
        <button v-if="step > 0" class="text-sm btn_secondary" @click.prevent="step = step - 1">
          Back
        </button>
      </div>
    </div>
    <!-- start popups -->
    <Teleport to="body">
      <div v-if="show_share_card" class="modal">
        <PopupsSharePolitician :politician="politician_data!" @toggle="show_share_card = !show_share_card" />
      </div>
    </Teleport>
    <!-- end popups -->
  </div>
</template>
