<script setup lang="ts">
import axios from 'axios'
import { backendUrl } from '~/constants'
import { getParty, randomFallbackUrl } from '~/utils/utils'

const { data } = await useFetch('/api/politicians')

interface CorruptionCase {
  id: number
  politician_id: number
  title?: string
  name: string
  case_description: string
  legal_outcome?: string
  case_date: string
  downvotes?: number
  upvotes?: number
  created_at?: string
  updated_at?: string
}

const upvotedCases = ref<CorruptionCase[]>()

onMounted(() => {
  mostUpvotedCases()
})

async function mostUpvotedCases() {
  try {
    const response = await axios.get(`${backendUrl}/cases/ratings`)
    const data = response
    upvotedCases.value = data.data.data.Multiple
  }
  catch (error) {
    console.error('Error fetching politicians', error)
  }
}
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold font-sans">
      Public Database to track Politicians charged with Corruption
    </h1>
  </div>
  <h1 class="py-10 text-xl text-gray-500">
    Newly Reported
  </h1>
  <div class="mx-auto lg:w-3/5">
    <Vue3Marquee>
      <div v-for="politician in data?.politicians" :key="politician.politician_id" class="px-3">
        <img :src="`${isValidImageUrl(politician.photo_url) ? politician.photo_url : randomFallbackUrl()}`" :alt="`${politician.name}`" class="h-42 w-42 border-2 border-gray-4 rounded-full bg-cover">
        <p class="pt-4 text-lg">
          {{ politician.name }}
        </p>
      </div>
    </Vue3Marquee>
  </div>
  <h1 class="pt-6 text-xl text-gray-500">
    Highest Upvoted Graft Cases
  </h1>
  <div class="mx-auto lg:w-3/5">
    <div v-if="upvotedCases && upvotedCases.length > 0">
      <NuxtLink v-for="caseData in upvotedCases.slice(0, 4)" :key="caseData.id" :to="`/reviews/${caseData.id}`" class="px-3">
        <div class="m-4 border border-gray-200 rounded-2xl p-6 text-justify hover:light:bg-gray-1">
          <div class="flex justify-between">
            <div class="mb-1">
              <p class="text-lg font-medium light:text-gray-700">
                <span class="font-bold">Name:</span> {{ caseData.name }}
              </p>
            </div>
            <p class="text-sm text-gray-500">
              <span class="font-bold">Reported :</span>
              <span class="text-xs font-light light:text-gray-400">
                {{ formatDate(caseData.created_at) }}
              </span>
            </p>
          </div>
          <div>
            <p class="text-lg light:text-gray-700">
              <span class="font-bold">Title: </span>
              <span class="font-semibold">
                {{ caseData.title?.trim() }}
              </span>
            </p>
            <p class="my-1 text-base text-gray-700">
              <span class="font-bold">Legal Outcome:</span> <span class="rounded-xl bg-fuchsia px-3 py-1 text-xs">{{ caseData.legal_outcome }}</span>
            </p>
          </div>
          <div class="my-1">
            <p class="text-base font-light light:text-slate-5">
              {{ caseData.case_description }}
            </p>
          </div>
          <div class="mb-4 flex space-x-4">
            <div class="flex items-center gap-x-1 text-lg text-gray-700">
              <IconsThumpsUp fill="rgb(20 184 166)" class="h-5 w-5" />
              <span class="text-teal-500">{{ caseData.upvotes }}</span>
            </div>
            <div class="flex items-center gap-x-1 text-lg text-gray-700">
              <IconsThumpsDown fill="#FF0000" class="h-5 w-5" />
              <span class="text-[#ff0000]">{{ caseData.downvotes }}</span>
            </div>
          </div>
        </div>
      </NuxtLink>
    </div>
  </div>
  <h1 class="py-10 text-xl text-gray-500">
    Reported Graft Cases
  </h1>
  <div class="mx-auto w-3/5 flex flex-wrap gap-6">
    <NuxtLink v-for="politician in data?.politicians" :key="politician.politician_id" :to="`/u/${politician.politician_id}`" class="w-280px overflow-hidden border border-gray-200 rounded-2xl pb-6 transition ease-linear hover:border-gray-5">
      <img :src="`${isValidImageUrl(politician.photo_url) ? politician.photo_url : randomFallbackUrl()}`" :alt="`${politician.name}`" class="object-fit h-42 w-full bg-cover">
      <div class="p-4">
        <h5 class="text-xl font-bold">
          {{ politician.name }}
        </h5>
        <p class="">
          Office: {{ politician.office }}
        </p>
        <p class="">
          County: {{ politician.county }}
        </p>
        <p class="">
          Party: {{ getParty(politician.political_party) }}
        </p>
      </div>
    </NuxtLink>
  </div>
</template>
