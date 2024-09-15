<script setup>
defineEmits(['close'])
</script>

<template>
  <div class="modal-animation fixed bottom-0 left-0 right-0 top-0 z-30 h-screen w-full flex items-center justify-center bg-gray-600 bg-opacity-80 dark:bg-gray5 dark:bg-opacity-50">
    <div
      class="card-animation popup z-10 mx-auto w-650px overflow-y-auto rounded-lg px-6 pb-6 pt-4"
    >
      <div class="relative overscroll-none rounded-lg bg-white shadow dark:bg-gray-700">
        <slot />
      </div>
    </div>
  </div>
</template>
