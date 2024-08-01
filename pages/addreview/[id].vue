<script setup lang="ts">
import { ref } from 'vue'
import { ToastType, toastMessage } from '../utils/utils'

const route = useRoute()
const router = useRouter()

const case_id = ref<number>(route.params.id)
const title = ref<string>('')
const review_text = ref<string>('')
const user_id = ref<string>('')
const link = ref<string>('')

function checkValues() {
  if (case_id.value && title.value && review_text.value && user_id.value && title.value) {
    submitCase()
  }
  else {
    toastMessage('Please fill in all fields', ToastType.Warning)
  }
}
async function submitCase() {
  try {
    const { status } = await useFetch('/api/report', {
      method: 'POST',
      body: {
        case_id: Number(case_id.value),
        title: title.value.trim().substring(0, 255),
        review_text: review_text.value.trim().substring(0, 500),
        user_id: user_id.value.trim(),
        link: link.value.trim().substring(0, 255),

      },
    })
    if (status.value === 'success') {
      toastMessage('Case submitted successfully', ToastType.Success)
      router.go(-1)
    }
  }
  catch (error) {
    console.error(error)
  }
}
</script>

<template>
  <div class="mx-auto w-full lg:w-3/5">
    <form class="mx-auto max-w-lg rounded-lg p-4 text-justify" @submit.prevent="checkValues()">
      <div class="mb-4">
        <label for="title" class="block text-sm font-medium light:text-gray-700">Title:</label>
        <textarea
          id="title" v-model="title" required placeholder="Enter comment title here..."
          class="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:border-green-500 sm:text-sm focus:outline-none focus:ring-green-500"
        />
      </div>

      <div class="mb-4">
        <label for="review_text" class="block text-sm font-medium light:text-gray-700">Comment Text:</label>
        <textarea
          id="review_text" v-model="review_text" required placeholder="Enter your comment text here..."
          class="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:border-green-500 sm:text-sm focus:outline-none focus:ring-green-500"
        />
      </div>
      <div class="mb-4">
        <label for="link" class="block text-sm font-medium light:text-gray-700">Link:</label>
        <input
          id="link" v-model="link" type="text" required placeholder="Enter link for reference to your comment"
          class="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:border-green-500 sm:text-sm focus:outline-none focus:ring-green-500"
        >
      </div>

      <div class="mb-4">
        <label for="user_id" class="block text-sm font-medium light:text-gray-700">Name:</label>
        <input
          id="user_id" v-model="user_id" type="text" required placeholder="Enter your name here"
          class="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:border-green-500 sm:text-sm focus:outline-none focus:ring-green-500"
        >
      </div>

      <button
        type="submit"
        class="w-full inline-flex items-center justify-center border border-transparent rounded-md bg-green-600 px-4 py-2 text-sm text-white font-medium shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
      >
        Submit
      </button>
    </form>
  </div>
</template>
