<script setup lang="ts">
const route = useRoute()
</script>

<template>
  <div class="mx-auto flex flex-wrap justify-between lg:w-3/5">
    <NuxtLink to="/" class="flex items-center gap-x-4 text-2xl font-bold">
      <IconsKenyaFlag class="" />
      Public Watch
    </NuxtLink>
    <NuxtLink to="/report" class="btn">
      Report
    </NuxtLink>
  </div>
</template>
