<script setup lang="ts">
</script>

<template>
  <div class="mx-auto w-full flex flex-wrap justify-between py-6 lg:w-3/5 lg:justify-between lg:px-0">
    <NuxtLink to="/" class="flex items-center text-2xl text-green-800 font-bold hover:underline">
      <IconsKenyaFlag class="" />
      PublicWatch
    </NuxtLink>
    <NuxtLink to="/report" class="flex gap-x-2 text-sm btn">
      <IconsPlusSign />
      Add Report
    </NuxtLink>
  </div>
</template>
