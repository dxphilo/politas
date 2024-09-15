<script lang="ts" setup>
const stats = ref([
  {
    title: 'Cases Filed per Year',
    value: '1,234',
    icon: '📂', // Use an emoji as an example icon or replace with a proper icon component reference
  },
  {
    title: 'Total Misappropriated Funds',
    value: 'Kshs 20.6B',
    icon: '💰',
  },
  {
    title: 'Conviction Rate',
    value: '27%',
    icon: '⚖️',
  },
  {
    title: 'Public Officials Indicted',
    value: '78',
    icon: '👨‍⚖️',
  },
])
</script>

<template>
  <div class="mx-auto w-full">
    <h2 class="header1">
      Numbers Behind the Scandals
    </h2>
    <p class="py-3 text-base text-gray-500">
      Rough estimate on the Data That Exposes Corruption
    </p>
    <div class="mx-auto my-6 w-4/5 flex flex-wrap justify-around gap-x-6 gap-y-10">
      <div v-for="stat in stats" :key="stat.value" class="h-[250px] w-[320px] flex flex-col items-center justify-center border border-gray-200 rounded-lg transition hover:light:bg-gray-1">
        <span class="text-5xl">{{ stat.icon }}</span>
        <img :src="`${stat.icon}`" alt="" srcset="">
        <div class="flex flex-col pt-8">
          <span class="text-3xl text-gray-900 font-bold">{{ stat.value }}</span>
          <span class="py-3 text-base text-gray-500">{{ stat.title }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
