<script setup lang="ts">
defineEmits(['toggle'])
</script>

<template>
  <div>
    <PopupsPopup @click.prevent="$emit('toggle')">
      <div class="w-full flex gap-2 p-9">
        <div>
          <div class="flex">
            <h1 class="py-3 text-2xl text-gray-800 font-bold dark:text-white">
              Share Public Watch
            </h1>
            <button type="button" class="absolute end-2.5 top-3 ms-auto h-8 w-8 inline-flex items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white" @click.prevent="$emit('toggle')">
              <svg class="h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
              </svg>
              <span class="sr-only">Close modal</span>
            </button>
          </div>
          <div class="flex justify-center items-center flex-wrap gap-4 py-5">
            <SocialShare
              v-for="network in ['facebook', 'twitter', 'linkedin', 'email', 'whatsapp', 'reddit']"
              :key="network"
              :network="network"
              :styled="true"
              :label="true"
              title="I have added details of corruption politician \n\n on Public watch. Help report more graft cases and achieve our mission of providing a public database of corrupt politicians in Kenya."
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
