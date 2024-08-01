<script setup lang="ts">
const route = useRoute()
</script>

<template>
  <div class="mx-auto flex flex-wrap justify-between lg:w-3/5">
    <NuxtLink to="/" class="flex items-center gap-x-4 text-2xl font-bold">
      <IconsKenyaFlag class="animate-bounce" />
      Public Watch
    </NuxtLink>
    <NuxtLink v-if="!route.path.includes('/report')" to="/report" class="btn">
      Report
    </NuxtLink>
  </div>
</template>
