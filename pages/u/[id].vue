<script setup lang="ts">
import { formatDate, getParty, isValidImageUrl } from '~/utils/utils'

const route = useRoute()
const id = route.params.id as string

const { data } = await useFetch('/api/cases', {
  method: 'GET',
  query: { id },
})

const { politician, corruption_cases } = data.value

const photoUrl = computed(() => {
  return isValidImageUrl(politician.photo_url) ? politician.photo_url : randomFallbackUrl()
})

definePageMeta({
  layout: 'default',
})
</script>

<template>
  <div>
    <div class="">
      <div class="flex flex-col items-center">
        <img :src="`${photoUrl}`" :alt="`${politician.name}`" class="h-24 w-24 rounded-full object-cover">
        <div class="pt-4">
          <h2 class="text-xl font-bold">
            {{ politician.name }}
          </h2>
          <p class="text-xl text-gray-500">
            {{ politician.office }}
          </p>
        </div>
      </div>
      <div class="mb-2">
        <p class="text-gray-500">
          County: {{ politician.county }}
        </p>
        <p class="text-gray-500">
          Party: {{ getParty(politician.political_party) }}
        </p>
      </div>
    </div>
    <!-- Display corruption cases -->
    <div class="mx-auto flex justify-between px-4 lg:w-3/5">
      <h2 class="text-xl text-gray-500">
        Reported Graft Cases : <span class="text-white font-bold light:text-black">{{ corruption_cases.length > 0 ? corruption_cases.length : 0 }}</span>
      </h2>
      <NuxtLink :to="`/reportgraft?politician_id=${id}&name=${politician.name}`" class="btn">
        Report Graft
      </NuxtLink>
    </div>
    <div v-if="corruption_cases.length > 0">
      <div class="mx-auto mt-6 w-3/5 flex flex-wrap gap-6">
        <NuxtLink v-for="caseItem in corruption_cases" :key="caseItem.id" :to="`/reviews/${caseItem.id}`" class="w-full transform overflow-hidden border border-gray-200 rounded-2xl p-6 transition ease-linear hover:border-gray-5 hover:light:bg-gray-1">
          <h3 class="mb-2 text-xl font-medium">
            {{ caseItem.description }}
          </h3>
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2 pb-2">
              <img :src="photoUrl" :alt="photoUrl" class="h-10 w-10 rounded-full bg-cover">
              <div class="flex flex-col text-justify">
                <span class="font-medium">{{ politician.name }}</span>
                <span class="text-xs text-gray-400 font-light">
                  {{ formatDate(caseItem.created_at) }}
                </span>
              </div>
            </div>
            <span
              v-if="caseItem.legal_outcome"
              :class="{ 'text-green-500': caseItem.legal_outcome === 'Convicted',
                        'text-red-500': caseItem.legal_outcome === 'Acquitted' || 'suspended' }"
              class="text-sm text-gray-600 font-medium"
            >
              Status: {{ caseItem.legal_outcome }}
            </span>
          </div>
          <div class="my-2 text-justify font-bold">
            {{ caseItem.title }}
          </div>
          <div class="text-justify text-base font-light light:text-slate-5">
            {{ caseItem.case_description }}
          </div>
          <div class="my-2 flex space-x-4">
            <div class="flex items-center gap-x-1 border border-green rounded-full px-2 py-2 text-xs text-gray-700">
              <span>👍</span>
              <span class="text-teal-500">{{ caseItem.upvotes }}</span>
            </div>
            <div class="flex items-center gap-x-1 border border-red rounded-full px-2 py-2 text-xs text-gray-700">
              <span>👎</span>
              <span class="text-[#ff0000]">{{ caseItem.downvotes }}</span>
            </div>
          </div>
        </NuxtLink>
      </div>
    </div>
    <div v-else class="mx-auto mb-10 py-4 lg:w-3/5">
      <p class="py-6 text-lg text-gray-400">
        No reported Graft Cases, Do you want to add your report?
      </p>
      <NuxtLink :to="`/reportgraft?politician_id=${id}&name=${politician.name}`" class="btn">
        Report Graft
      </NuxtLink>
    </div>
    <div>
      <NuxtLink
        class="m-3 text-sm btn"
        to="/"
      >
        Back
      </NuxtLink>
    </div>
  </div>
</template>
