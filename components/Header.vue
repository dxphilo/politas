<script setup lang="ts">
</script>

<template>
  <div class="mx-auto w-full flex flex-wrap justify-between py-6 lg:w-3/5 lg:justify-between lg:px-0">
    <NuxtLink to="/" class="flex items-center gap-x-4 text-2xl font-bold hover:underline">
      <IconsKenyaFlag class="" />
      Public Watch
    </NuxtLink>
    <NuxtLink to="/report" class="flex gap-x-2 text-sm btn">
      <IconsJudgeHummer />
      Report
    </NuxtLink>
  </div>
</template>
