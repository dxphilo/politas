<script setup lang="ts">
defineProps<{
  label: string
  isActive?: boolean
}>()
</script>

<template>
  <button
    type="button"
    class="h-8 w-8 inline-flex shrink-0 flex-row items-center justify-center rounded-md disabled:bg-transparent disabled:text-gray-300" :class="[
      isActive
        ? 'bg-blue-200 text-blue-800 hover:bg-opacity-80'
        : 'text-gray-600 hover:bg-blue-50',
    ]"
    :aria-label="label"
  >
    <slot />
  </button>
</template>
