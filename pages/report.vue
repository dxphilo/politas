<script setup lang="ts">
import { ref } from 'vue'
import { counties, kenyanPoliticalParties } from '../utils/utils'

const name = ref<string>('')
const office = ref<string>('')
const county = ref<string>('')
const political_party = ref<string>('')
const source_website = ref<string>('')
const photo_url = ref<string>('')

function validateForm(): boolean {
  if (!name.value) {
    alert('Please enter name')
    return false
  }
  if (!office.value) {
    alert('Please enter office')
    return false
  }
  if (!county.value) {
    alert('Please enter county')
    return false
  }
  if (!political_party.value) {
    alert('Please enter political party')
    return false
  }
  if (!source_website.value) {
    alert('Please enter source website')
    return false
  }
  if (!photo_url.value) {
    alert('Please enter photo URL')
    return false
  }
  return true
}

async function handleSubmit() {
  if (!validateForm()) {
    return
  }

  const { status } = await useFetch('/api/politicians', {
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

  if (status.value === 'success') {
    alert('Politician added successfully.')
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
      Add a Corruption Case to the Public Watch
    </h1>
    <p class="text-center light:text-gray-500">
      Your contribution helps us build a public database of corrupt politicians.
    </p>
    <div>
      <label for="name" class="block text-sm font-medium light:text-gray-700">Name</label>
      <input id="name" v-model="name" placeholder="Enter name" type="text" class="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:border-green-500 sm:text-sm focus:outline-none focus:ring-green-500">
    </div>

    <div>
      <label for="photo_url" class="block text-sm font-medium light:text-gray-700">Photo URL</label>
      <input id="photo_url" v-model="photo_url" placeholder="Enter photo url"type="text" class="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:border-green-500 sm:text-sm focus:outline-none focus:ring-green-500">
    </div>

    <div>
      <label for="office" class="block text-sm font-medium light:text-gray-700">Office</label>
      <input id="office" v-model="office" placeholder="Enter office"type="text" class="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:border-green-500 sm:text-sm focus:outline-none focus:ring-green-500">
    </div>
    <div>
      <label for="county" class="block text-sm font-medium light:text-gray-700">County</label>
      <select id="county" v-model="county" class="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:border-green-500 sm:text-sm dark:text-gray-500 focus:outline-none focus:ring-green-500">
        <option value="" disabled>
          Select County
        </option>
        <option v-for="county in counties" :key="county" :value="county">
          {{ county }}
        </option>
      </select>
    </div>

    <div>
      <label for="political_party" class="block text-sm font-medium light:text-gray-700">Political Party</label>
      <select id="political_party" v-model="political_party" class="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:border-green-500 sm:text-sm dark:text-gray-500 focus:outline-none focus:ring-green-500">
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
      <input id="source_website" v-model="source_website" placeholder="Enter graft case link"type="text" class="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:border-green-500 sm:text-sm focus:outline-none focus:ring-green-500">
    </div>

    <button class="inline-flex items-center border border-transparent rounded-md bg-green-600 px-4 py-2 text-sm text-white font-medium shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500" @click.prevent="handleSubmit">
      Submit
    </button>
  </div>
</template>
