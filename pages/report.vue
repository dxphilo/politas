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
const political_party = ref<string>('')
const source_website = ref<string>('')
const politician_data = ref<Politician>()
const imagefile = ref<File | null>(null)
const imageUrl = ref<string>('')
const newYear = new Date().getFullYear()

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
    step.value++
    return
  }

  if (step.value === 2) {
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
      year_of_birth: Number(year_of_birth.value),
      sex: sex.value,
    }
    const formData = new FormData()

    if (!imagefile.value) {
      snackbar.add({ title: `Pleass upload an image`, type: 'warning' })
      return
    }
    formData.append('file', imagefile.value)
    formData.append('json', JSON.stringify(body_data))

    const response = await axios.post(`${backendUrl}/politicians`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    if (response.status === 201) {
      const data = await response.data

      snackbar.add({ title: `${name.value} info added successfully`, text: 'Your contribution is invaluable. Your impact is huge!', type: 'success' })

      politician_data.value = data.data.Single
      show_share_card.value = !show_share_card.value
      resetForm()

      // redirect to the already crated public profile
      router.push(`/profile/${politician_data.value!.politician_id!}?ref=sign_up`)
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

function handleImageUpload(event: Event) {
  if (!event) {
    snackbar.add({ title: 'Error uploading image', type: 'warning' })
    return
  }
  const target = event.target as HTMLInputElement
  if (target && target.files) {
    imagefile.value = target.files[0]
    imageUrl.value = URL.createObjectURL(imagefile.value!)
  }
}

function removeUploadedImage() {
  imagefile.value = null
  imageUrl.value = ''
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
            Office
          </h1>
          <label for="office" class="block py-1 text-sm font-normal light:text-gray-500">What office does the politician hold</label>
          <input id="office" v-model="office" placeholder="Enter office" type="text" class="mt-1 block w-full border border-gray-300 rounded-md bg-gray-50 px-3 py-2 shadow-sm focus:border-green-500 sm:text-sm focus:outline-none focus:ring-green-500">
        </div>
        <div>
          <h1 class="text-2xl text-gray-800 font-bold">
            Year of Birth
          </h1>
          <label for="year" class="block py-1 text-sm text-gray-500 font-normal">Whats the year of birth of this politician</label>
          <input id="year_of_birth" v-model="year_of_birth" type="number" min="1900" :max="`${newYear}`" placeholder="Enter year of birth of politician" class="mt-1 block w-full border border-gray-300 rounded-md bg-gray-50 px-3 py-2 shadow-sm focus:border-green-500 sm:text-sm focus:ring-green-500">
          <span class="text-xs text-gray-600">{{ age() }} {{ age() > 0 ? 'years' : 'year' }} old</span>
        </div>
        <div>
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
      </div>
      <!-- end of srep 0 -->
      <!-- start of step 1 -->
      <div v-if="step === 1">
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

      <!-- step 3 image upload -->
      <div
        v-if="step === 2"
        class="py-4"
      >
        <div class="w-full flex flex-col">
          <!-- start of image -->
          <div v-if="imagefile" class="group relative h-[150px] w-[150px] pb-8">
            <img :src="`${imageUrl}`" alt="Image" class="h-full w-full rounded-lg object-cover">
            <div class="absolute inset-0 flex items-center justify-center rounded-lg bg-black bg-opacity-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <button class="rounded bg-red-600 px-4 py-2 text-white" @click.prevent="removeUploadedImage()">
                Delete
              </button>
            </div>
          </div>

          <!-- end of image -->
          <label for="dropzone-file" class="h-64 w-full flex flex-col cursor-pointer items-center justify-center border-2 border-gray-300 rounded-lg border-dashed bg-gray-50 dark:border-gray-600 dark:bg-gray-700 hover:bg-gray-100 dark:hover:border-gray-500 dark:hover:bg-gray-800">
            <div class="flex flex-col items-center justify-center pb-6 pt-5">
              <svg class="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
              </svg>
              <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
              <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
            </div>
            <input id="dropzone-file" type="file" class="hidden" accept="image/*" @change="handleImageUpload($event)">
          </label>
        </div>
      </div>
      <!-- end of step 3 -->

      <div class="mt-4 w-full flex justify-between">
        <button class="flex gap-x-2 text-sm btn" @click.prevent="handleNext()">
          <IconsJudgeHummer />
          {{ step === 0 ? 'Next Step' : step === 1 ? `Next Step` : step === 2 ? `Submit Report` : 'Submit' }}
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
