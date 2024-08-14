<script setup lang="ts">
import GoBack from '../../components/GoBack.vue'
import { formatDate, getParty, isValidImageUrl } from '~/utils/utils'

const route = useRoute()
const id = ref<number>(0)

if ('id' in route.params)
  id.value = Number.parseInt(route.params.id)

const { data } = await useFetch('/api/cases', {
  method: 'GET',
  query: { id },
})

const { politician, corruption_cases } = data?.value

const photoUrl = computed((): string => {
  return isValidImageUrl(data.value.politician.photo_url) ? data.value.politician.photo_url : randomFallbackUrl()
})

definePageMeta({
  layout: 'default',
})
</script>

<template>
  <div v-if="data">
    <div>
      <div class="mx-auto my-4 w-full border-b-1.5 border-gray-4 pb-10 lg:w-3/5">
        <div class="mx-auto w-full">
          <div class="mx-auto w-full flex justify-around lg:w-3/5 lg:justify-between">
            <img :src="photoUrl" :alt="`${politician.name}`" class="h-[150px] w-[150px] rounded-full object-cover">
            <div class="text-justify">
              <h2 class="text-xl font-bold">
                {{ politician.name }}
              </h2>
              <p class="text-sm text-gray-500">
                {{ politician.office }}
              </p>
              <p class="flex flex-row items-center gap-x-2 text-sm text-gray-500">
                <Location />
                County: {{ politician.county }}
              </p>
              <p class="flex flex-row items-center gap-x-2 text-sm text-gray-500">
                <PoliticalParty />
                Party: {{ getParty(politician.political_party) }}
              </p>
              <div class="flex flex-row justify-center gap-2 pt-2">
                <SocialShare
                  v-for="network in ['facebook', 'twitter', 'linkedin', 'email', 'whatsapp', 'reddit']"
                  :key="network"
                  :network="network"
                  :styled="true"
                  :label="false"
                  :title="`Public Watch Corrupt politician profile for ${politician.name}`"
                  hashtags="PublicWatch,CorruptPoliticians,Kenya"
                  user="philip46906"
                  class="rounded-full p-2 light:text-white"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Display corruption cases -->
      <div class="mx-auto flex justify-between lg:w-3/5">
        <h2 class="text-xl text-gray-500">
          Reported Graft Cases : <span class="text-white font-bold light:text-black">{{ corruption_cases.length > 0 ? corruption_cases.length : 0 }}</span>
        </h2>
        <NuxtLink :to="`/reportgraft?politician_id=${id}&name=${politician.name}`" class="text-sm btn">
          Report Graft
        </NuxtLink>
      </div>
      <div v-if="corruption_cases.length > 0">
        <div class="mx-auto mt-6 w-3/5 flex flex-wrap gap-6">
          <NuxtLink v-for="caseItem in corruption_cases" :key="caseItem.id" :to="`/reviews/${caseItem.id}`" class="w-full transform break-all border border-gray-200 rounded-lg p-6 transition ease-linear hover:border-gray-5 hover:light:bg-gray-1">
            <h3 class="mb-2 text-xl font-medium">
              {{ caseItem.description }}
            </h3>
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2 pb-2">
                <img :src="photoUrl" alt="corrupt politician avatar" class="h-10 w-10 rounded-full bg-cover">
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
        <div class="flex justify-center gap-x-4">
          <NuxtLink :to="`/reportgraft?politician_id=${id}&name=${politician.name}`" class="btn">
            Report Graft
          </NuxtLink>
          <GoBack />
        </div>
      </div>
    </div>
  </div>
  <!-- no politician found -->
  <div v-else class="flex items-center justify-center">
    <p>Profile for politician with id {{ id }} was not found!</p>
  </div>
</template>
