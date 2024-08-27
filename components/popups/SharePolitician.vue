<script setup lang="ts">
import { isValidImageUrl, randomFallbackUrl } from '../../utils/utils'

defineProps({
  politician: {
    type: Object as PropType<{
      politician_id: number
      name: string
      office?: string
      county: string
      political_party?: string
      source_website?: string
      age: string
      year_of_birth: number
      photo_url?: string
      created_at?: string
      updated_at?: string
    }>,
    required: true,
  },
})

defineEmits(['toggle'])
</script>

<template>
  <div>
    <PopupsPopup>
      <div class="w-full flex gap-2 p-9">
        <div>
          <div class="flex">
            <h1 class="py-3 text-2xl text-gray-800 font-bold dark:text-white">
              Share {{ politician.name! }}'s Public Watch profile
            </h1>
            <button type="button" class="absolute end-2.5 top-3 ms-auto h-8 w-8 inline-flex items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white" @click.prevent="$emit('toggle')">
              <svg class="h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
              </svg>
              <span class="sr-only">Close modal</span>
            </button>
          </div>
          <div class="flex gap-x-4 py-2">
            <img :src="`${isValidImageUrl(politician.photo_url!) ? politician.photo_url! : randomFallbackUrl()}`" :alt="`${politician.name}'s profile image`" class="h-[100px] w-[100px] border border-gray-2 rounded-full object-cover">
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
              :title="`I have added details of ${politician.name} \n\n on Public watch. Help report more graft cases and achieve our mission of providing a public database of corrupt politicians in Kenya.`"
              hashtags="PublicWatch,CorruptPoliticians,Kenya,KenyaNiHome"
              user="philip46906"
              class="rounded-lg p-4 light:text-white"
            />
          </div>
        </div>
      </div>
    </PopupsPopup>
  </div>
</template>
