<script setup lang="ts">
import { fallbackUrls } from '../utils/utils'
</script>

<template>
  <div>
    <div>
      <p class="py-4 text-lg">
        Fallback Images used to depict Corruption/Graft
      </p>
    </div>
    <div class="mx-auto w-full flex flex-wrap gap-8 py-4 lg:w-2/5">
      <div v-for="photo in fallbackUrls" :key="photo">
        <img :src="photo" :alt="photo" srcset="" class="bg-hover h-42 w-42 border-3 border-gray-1 rounded-full">
      </div>
    </div>
  </div>
</template>
