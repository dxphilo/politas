<script setup lang="ts">
import GoBack from '../../components/GoBack.vue'
import { formatDate, isValidImageUrl } from '~/utils/utils'

const route = useRoute()
const id = ref<number>(0)
const show_share_popup = ref<boolean>(false)
const slice_to = ref<number>(3)

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
  <div>
    <div v-if="data">
      <div>
        <div class="mx-auto my-4 w-full border-b-1.5 border-gray-4 pb-10 lg:w-3/5">
          <div class="mx-auto w-full">
            <div class="mx-auto w-full flex justify-around lg:w-3/5 lg:justify-around">
              <img :src="photoUrl" :alt="`${politician.name}`" class="h-[150px] w-[150px] rounded-full object-cover">
              <div class="flex flex-col gap-y-1.5 text-justify">
                <h2 class="text-xl font-bold">
                  {{ politician.name }}
                </h2>
                <p class="text-base text-gray-500">
                  {{ politician.office }}
                </p>
                <p class="flex flex-row items-center gap-x-2 text-sm text-gray-500">
                  <Location class="h-4 w-4" />
                  County: {{ politician.county }}
                </p>
                <p class="flex flex-row items-center gap-x-2 text-sm text-gray-500">
                  <PoliticalParty class="h-4 w-4" />
                  Party: {{ politician.political_party }}
                </p>
                <button class="max-w-25 inline-flex items-center gap-x-2 border border-gray-400 rounded-full px-4 py-1.5 text-base hover:bg-gray-100 dark:hover:text-black" @click="show_share_popup = !show_share_popup">
                  <IconsShare class="h-5 w-5" />
                  <span>Share</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <!-- Display corruption cases -->
        <div class="mx-auto flex justify-between lg:w-3/5">
          <h2 class="text-xl text-gray-500">
            Reported Graft Cases : <span class="text-white font-bold light:text-black">{{ corruption_cases.length > 0 ? corruption_cases.length : 0 }}</span>
          </h2>
          <NuxtLink :to="`/reportgraft?politician_id=${id}&name=${politician.name}`" class="flex gap-x-2 text-sm btn">
            <IconsJudgeHummer />
            Report Graft
          </NuxtLink>
        </div>
        <div v-if="corruption_cases.length > 0">
          <div class="mx-auto mt-6 w-3/5 flex flex-wrap gap-6">
            <NuxtLink v-for="caseItem in corruption_cases.slice(0, slice_to)" :key="caseItem.id" :to="`/reviews/${caseItem.id}`" class="w-full transform break-all border border-gray-200 rounded-lg p-6 transition ease-linear hover:border-gray-5 hover:light:bg-gray-1">
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
                {{ caseItem.case_description.length > 355 ? `${caseItem.case_description.slice(0, 355)} ...` : caseItem.case_description }}
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
            <NuxtLink :to="`/reportgraft?politician_id=${id}&name=${politician.name}`" class="flex gap-x-2 btn">
              <IconsJudgeHummer />
              Report Graft
            </NuxtLink>
            <GoBack />
          </div>
        </div>
        <!-- start -->
        <div>
          <div v-if="corruption_cases.length > 3" class="pt-6">
            <p class="text-xs text-gray-400 font-light">
              Showing {{ slice_to }} of {{ corruption_cases.length }} graft cases
            </p>
            <p v-if="corruption_cases.length > 0 && slice_to !== corruption_cases.length" class="cursor-pointer text-xs text-blue-500 font-medium" @click="slice_to = corruption_cases.length">
              See all graft cases
            </p>
          </div>
        </div>
        <!-- end -->
      </div>
    </div>
    <!-- no politician found -->
    <div v-else class="flex items-center justify-center">
      <p>Profile for politician with id {{ id }} was not found!</p>
    </div>
    <Teleport to="body">
      <div v-if="show_share_popup">
        <PopupsPopup class="animate-slideInDown">
          <div class="w-full flex gap-2 p-9">
            <div>
              <div class="flex">
                <h1 class="py-3 text-2xl text-gray-800 font-bold dark:text-white">
                  Share {{ politician.name }}'s Public Watch profile
                </h1>
                <button type="button" class="absolute end-2.5 top-3 ms-auto h-8 w-8 inline-flex items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white" @click.prevent="show_share_popup = !show_share_popup">
                  <svg class="h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                  </svg>
                  <span class="sr-only">Close modal</span>
                </button>
              </div>
              <div class="flex gap-x-4 py-2">
                <img :src="photoUrl" :alt="`${politician.name} profile image`" class="h-[100px] w-[100px] border border-gray-5 rounded-lg object-cover">
                <div class="text-base text-gray-500">
                  <p>County: {{ politician.county }}</p>
                  <p>Party : {{ politician.political_party }}</p>
                  <p>Sex : {{ politician.age ? politician.age : 'Male/female' }}</p>
                  <p>Year of Birth: {{ politician.year_of_birth ? politician.year_of_birth : 'unknown' }}</p>
                </div>
              </div>
              <div class="flex flex-wrap gap-4 py-5">
                <SocialShare
                  v-for="network in ['facebook', 'twitter', 'linkedin', 'email', 'whatsapp', 'reddit']"
                  :key="network"
                  :network="network"
                  :styled="true"
                  :label="true"
                  :title="`Public Watch Corrupt politician profile for ${politician.name}, \n\n Our aim is to have a public databse of every politician ever convicted of curruption in Kenya.`"
                  hashtags="PublicWatch,CorruptPoliticians,Kenya,KenyaNiHome"
                  user="philip46906"
                  class="rounded-lg p-4 light:text-white"
                />
              </div>
            </div>
          </div>
        </PopupsPopup>
      </div>
    </teleport>
  </div>
</template>
