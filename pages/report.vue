<script setup lang="ts">
import { ref } from 'vue'
import { counties, kenyanPoliticalParties } from '../utils/utils'

const snackbar = useSnackbar()

const name = ref<string>('William Ruto')
const office = ref<string>('President')
const county = ref<string>('Uasin Gishu')
const political_party = ref<string>('Jubilee Party')
const source_website = ref<string>('https://en.wikipedia.org/wiki/KPC_Ngong_Forest_land_scandal')
const photo_url = ref<string>('https://kenyastockholm.com/wp-content/uploads/2015/08/william-ruto.jpg')

function validateForm(): boolean {
  if (!name.value) {
    snackbar.add({ title: 'Please enter name', type: 'warning' })
    return false
  }
  if (!office.value) {
    snackbar.add({ title: 'Please enter office', type: 'warning' })
    return false
  }
  if (!county.value) {
    snackbar.add({ title: 'Please enter county', type: 'warning' })
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
  if (!photo_url.value) {
    snackbar.add({ title: 'Please enter photo URL', type: 'warning' })
    return false
  }
  return true
}

async function handleSubmit() {
  if (!validateForm()) {
    return
  }

  const { error } = await useFetch('/api/politicians', {
    method: 'POST',
    body: {
      name: name.value,
      office: office.value,
      county: county.value,
      political_party: political_party.value,
      source_website: source_website.value,
      photo_url: photo_url.value,
    },
  })

  if (!error.value) {
    snackbar.add({ title: 'Politician added successfully.', type: 'success' })
    resetForm()
  }
  else {
    // retry functionality
  }
}

function resetForm() {
  name.value = ''
  office.value = ''
  county.value = ''
  political_party.value = ''
  source_website.value = ''
  photo_url.value = ''
}
</script>

<template>
  <div class="mx-auto max-w-md text-justify space-y-4">
    <h1 class="text-center text-xl font-bold">
      Add a Corrupt Politician
    </h1>
    <p class="text-center light:text-gray-500">
      Your contribution helps us build a public database of corrupt politicians.
    </p>
    <div>
      <label for="name" class="block text-sm font-medium light:text-gray-700">Name</label>
      <input id="name" v-model="name" placeholder="Enter name" type="text" class="mt-1 block w-full border border-gray-300 rounded-md bg-gray-50 px-3 py-2 shadow-sm focus:border-green-500 sm:text-sm focus:outline-none focus:ring-green-500">
    </div>

    <div>
      <label for="photo_url" class="block text-sm font-medium light:text-gray-700">Photo URL</label>
      <input id="photo_url" v-model="photo_url" placeholder="Enter photo url" type="text" class="mt-1 block w-full border border-gray-300 rounded-md bg-gray-50 px-3 py-2 shadow-sm focus:border-green-500 sm:text-sm focus:outline-none focus:ring-green-500">
    </div>

    <div>
      <label for="office" class="block text-sm font-medium light:text-gray-700">Office</label>
      <input id="office" v-model="office" placeholder="Enter office" type="text" class="mt-1 block w-full border border-gray-300 rounded-md bg-gray-50 px-3 py-2 shadow-sm focus:border-green-500 sm:text-sm focus:outline-none focus:ring-green-500">
    </div>
    <div>
      <label for="county" class="block text-sm font-medium light:text-gray-700">County</label>
      <select id="county" v-model="county" class="mt-1 block w-full border border-gray-300 rounded-md bg-gray-50 px-3 py-2 shadow-sm focus:border-green-500 sm:text-sm dark:text-gray-500 focus:outline-none focus:ring-green-500">
        <option value="" disabled>
          Select County
        </option>
        <option v-for="counti in counties" :key="counti" :value="counti">
          {{ counti }}
        </option>
      </select>
    </div>

    <div>
      <label for="political_party" class="block text-sm font-medium light:text-gray-700">Political Party</label>
      <select id="political_party" v-model="political_party" class="mt-1 block w-full border border-gray-300 rounded-md bg-gray-50 px-3 py-2 shadow-sm focus:border-green-500 sm:text-sm dark:text-gray-500 focus:outline-none focus:ring-green-500">
        <option value="" disabled>
          Select Political Party
        </option>
        <option v-for="party in kenyanPoliticalParties" :key="party.acronym" :value="party.acronym">
          {{ party.name }}
        </option>
      </select>
    </div>

    <div>
      <label for="source_website" class="block text-sm font-medium light:text-gray-700">Source Website/link</label>
      <input id="source_website" v-model="source_website" placeholder="Enter graft case link" type="text" class="mt-1 block w-full border border-gray-300 rounded-md bg-gray-50 px-3 py-2 shadow-sm focus:border-green-500 sm:text-sm focus:outline-none focus:ring-green-500">
    </div>

    <button class="mt-4 w-full justify-center text-sm btn" @click.prevent="handleSubmit">
      Submit
    </button>
  </div>
</template>
