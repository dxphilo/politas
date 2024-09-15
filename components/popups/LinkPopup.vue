<script setup>
const props = defineProps({
  link: String,
})

defineEmits(['toggle'])

function gotoUrl() {
  window.location.href = props.link
}
</script>

<template>
  <div class="modal-animation fixed bottom-0 left-0 right-0 top-0 z-30 h-screen w-full flex items-center justify-center bg-gray-300 bg-opacity-80 dark:bg-gray5 dark:bg-opacity-50">
    <div
      class="card-animation popup z-10 mx-auto w-600px overflow-y-auto rounded-lg px-6 pb-6 pt-4"
    >
      <div class="relative rounded bg-white shadow dark:bg-gray-700">
        <button type="button" class="absolute end-2.5 top-3 ms-auto h-8 w-8 inline-flex items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white" @click.once.prevent="$emit('toggle')">
          <svg class="h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
          </svg>
          <span class="sr-only">Close modal</span>
        </button>
        <div class="p-4 text-center md:p-5">
          <svg class="mx-auto mb-4 h-12 w-12 text-gray-400 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
          <div class="text-justify">
            <h3 class="text-2xl font-bold">
              You are about to open a reference link to this case
            </h3>
            <h3 class="mb-5 text-lg text-gray-400 font-normal dark:text-gray-300">
              You will be redirected to the url below, Are you sure you want to proceed?
            </h3>
            <h3 class="my-3 rounded bg-gray-1 p-2 text-xs text-gray-400 font-normal dark:text-gray-400">
              {{ link }}
            </h3>
          </div>
          <button data-modal-hide="popup-modal" type="button" class="inline-flex items-center rounded-lg bg-green-600 px-5 py-2.5 text-center text-sm text-white font-medium hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 dark:focus:ring-green-800" @click.once.prevent="gotoUrl()">
            Yes, I'm sure
          </button>
          <button data-modal-hide="popup-modal" type="button" class="ms-3 border border-gray-200 rounded-lg bg-white px-5 py-2.5 text-sm text-gray-900 font-medium focus:z-10 dark:border-gray-600 dark:bg-gray-800 hover:bg-gray-100 dark:text-gray-400 hover:text-blue-700 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700" @click.once.prevent="$emit('toggle')">
            No, cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
