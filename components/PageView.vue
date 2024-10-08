<script setup lang="ts">
import axios from 'axios'
import CorruptionStatsCard from './CorruptionStatsCard.vue'
import { randomFallbackUrl } from '~/utils/utils'

interface CorruptionCase {
  id: number
  politician_id: number
  title?: string
  name: string
  case_description: string
  legal_outcome: string
  case_date: string
  downvotes: number
  upvotes: number
  created_at: string
  updated_at: string
}

const config = useRuntimeConfig()
const backendUrl = config.public.backendUrl
const upvotedCases = ref<CorruptionCase[]>()
const paginate = ref<number>(6)

const { data } = await useFetch('/api/politicians')

onMounted(() => {
  mostUpvotedCases()
})

async function mostUpvotedCases(): Promise<undefined> {
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
  <div class="mt-10 h-80 flex flex-col items-center justify-center gap-y-6">
    <h1 class="text-2xl font-bold lg:text-5xl">
      Corrupt Politicians Database
    </h1>
    <p class="mx-auto w-full pt-2 text-base text-gray-500 lg:w-2/5">
      Our mission is to build a free public database documenting all politicians charged with corruption, abuse of office, and misuse of public resources.
    </p>
    <div class="flex gap-x-8">
      <NuxtLink to="/report" class="flex gap-x-2 btn">
        <IconsJudgeHummer />
        Report Graft
      </NuxtLink>
      <div>
        <NuxtLink to="/about" class="flex btn_black">
          <span>
            About Us
          </span>
        </NuxtLink>
      </div>
    </div>
  </div>
  <div class="py-10">
    <h1 class="header1">
      Newly Reported
    </h1>
    <p class="py-3 text-base text-gray-500">
      Newly reported politicians
    </p>
    <div class="mx-auto mb-6 pt-6 lg:w-3/5">
      <Vue3Marquee v-if="data?.politicians">
        <div v-for="politician in data?.politicians.slice(0, 10)" :key="politician.politician_id" class="px-3">
          <img :src="`${isValidImageUrl(politician.photo_url) ? politician.photo_url : randomFallbackUrl()}`" :alt="`${politician.name}`" class="h-42 w-42 border border-gray-4 rounded-full bg-cover">
          <p class="pt-4 text-lg">
            {{ politician.name }}
          </p>
        </div>
      </Vue3Marquee>
      <div v-else class="mx-auto flex items-center justify-center gap-x-3 lg:w-3/5">
        <div v-for="n in 4" :key="n" class="px-3">
          <SkeletonSliderCard />
        </div>
      </div>
    </div>
  </div>
  <!-- start scandal -->
  <CorruptionStatsCard class="mx-auto lg:w-3/5" />
  <!-- end scandal -->
  <div class="py-6">
    <h1 class="header1">
      Highest Upvoted Graft Cases
    </h1>
    <p class="py-3 text-base text-gray-500">
      Reported graft cases with highest upvotes
    </p>
  </div>
  <div class="mx-auto lg:w-3/5">
    <div v-if="upvotedCases && upvotedCases.length > 0" class="flex flex-col gap-y-8">
      <div v-for="caseData in upvotedCases.slice(0, 3)" :key="caseData.id">
        <NuxtLink :to="`/reviews/${caseData.id}`">
          <div class="transform break-all border border-gray-200 rounded-lg p-6 text-justify transition hover:light:bg-gray-1">
            <div class="flex justify-between">
              <div class="mb-1">
                <p class="text-base text-gray-500">
                  {{ caseData.name }}
                </p>
              </div>
              <p class="text-sm text-gray-500">
                <span class="text-xs font-bold">Reported : </span>
                <span class="text-xs font-light light:text-gray-400">
                  {{ formatDate(caseData.created_at) }}
                </span>
              </p>
            </div>
            <div>
              <p class="text-lg light:text-gray-700">
                <span class="font-semibold">
                  {{ caseData.title?.trim() }}
                </span>
              </p>
              <p class="my-1 text-base text-gray-700">
                <span class="font-bold">Legal Outcome:</span> <span class="rounded-xl bg-fuchsia px-2 py-1 text-xs">{{ caseData.legal_outcome }}</span>
              </p>
            </div>
            <div class="my-1">
              <p class="text-base font-light light:text-slate-5">
                {{ caseData.case_description.length > 355 ? `${caseData.case_description.slice(0, 355)} ...` : caseData.case_description }}
              </p>
            </div>
            <div class="my-2 flex space-x-4">
              <div class="flex items-center gap-x-1 border border-green rounded-full px-2 py-2 text-xs text-gray-700">
                <span>👍</span>
                <span class="text-teal-500">{{ caseData.upvotes }}</span>
              </div>
              <div class="flex items-center gap-x-1 border border-red rounded-full px-2 py-2 text-xs text-gray-700">
                <span>👎</span>
                <span class="text-[#ff0000]">{{ caseData.downvotes }}</span>
              </div>
            </div>
          </div>
        </NuxtLink>
      </div>
    </div>
    <div v-else>
      <div class="flex flex-col gap-y-8">
        <SkeletonCaseLoader v-for="n in 3" :key="n" />
      </div>
    </div>
  </div>
  <div>
    <h1 class="pt-10 header1">
      Reported Politicians
    </h1>
    <p class="py-3 text-base text-gray-500">
      Reported graft cases with highest upvotes
    </p>
  </div>
  <div v-if="data" class="mx-auto w-3/5 flex flex-wrap lg:gap-6">
    <NuxtLink v-for="politician in data?.politicians?.slice(0, paginate)" :key="politician.politician_id" :to="`/profile/${politician.politician_id}`" class="w-300px flex flex-col transform items-center justify-center border-gray-200 rounded-lg py-6 transition ease-linear hover:bg-gray-1 hover:dark:bg-gray-5">
      <img :src="`${isValidImageUrl(politician.photo_url) ? politician.photo_url : randomFallbackUrl()}`" :alt="`${politician.name}`" class="h-[150px] w-[150px] border border-gray-3 rounded-full bg-cover">
      <div class="p-4">
        <h5 class="text-xl font-bold">
          {{ politician.name }}
        </h5>
        <div class="text-gray-500">
          <p class="">
            Office: {{ politician.office }}
          </p>
          <p class="">
            County: {{ politician.county }}
          </p>
          <p class="">
            Party: {{ politician.political_party }}
          </p>
        </div>
      </div>
    </NuxtLink>
  </div>
  <div v-else class="mx-auto w-3/5 flex flex-wrap justify-center gap-8 py-6">
    <SkeletonPoliticianCard v-for="n in 6" :key="n" />
  </div>
  <!-- start pagination -->
  <div>
    <div v-if="data?.politicians?.length! > paginate">
      <p class="text-xs text-gray-400 font-light">
        Showing {{ paginate }} of {{ data?.politicians?.length! }} politicians
      </p>
      <p v-if="data?.politicians?.length! > 0 && paginate !== data?.politicians?.length!" class="cursor-pointer text-xs text-blue-500 font-medium" @click="paginate += 20">
        See all politicians
      </p>
    </div>
  </div>
  <!-- end pagination -->
</template>
