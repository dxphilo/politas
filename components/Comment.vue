<script setup lang="ts">
import { ref } from 'vue'
import { maxCharsDescription } from '~/constants';

const prop = defineProps({
  id: Number,
  title: String,
})
const emit = defineEmits(['refreshComments'])

const snackbar = useSnackbar()

const case_id = ref<number>(prop.id!)
const title = ref<string>(prop.title!)
const review_text = ref<string>('')
const user_id = ref<string>('')
const link = ref<string>('')

function checkValues() {
  if (case_id.value && title.value && review_text.value && title.value) {
    submitCase()
  }
  else {
    snackbar.add({ text: 'Please write a comment!', type: 'warning' })
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
      snackbar.add({ text: 'You comment was submitted successfully', type: 'success' })
      review_text.value = ''
      emit('refreshComments')
    }
  }
  catch (error) {
    console.error(error)
  }
}
</script>

<template>
  <form class="mx-auto rounded-lg py-4 text-justify">
    <div class="mb-4 w-full border border-gray-200 rounded-lg bg-gray-50 dark:border-gray-600 dark:bg-gray-700">
      <div class="rounded-t-lg bg-white px-4 py-2 dark:bg-gray-800">
        <label for="comment" class="sr-only">Your comment</label>
        <textarea id="comment" v-model="review_text" rows="4" class="w-full border-0 bg-white px-0 text-sm text-gray-900 dark:bg-gray-800 dark:text-white focus:ring-0 dark:placeholder-gray-400" placeholder="Write a comment..." required />
      </div>
      <div class="flex items-center justify-between border-t px-3 py-2 dark:border-gray-600">
        <button type="submit" class="inline-flex items-center gap-x-2 rounded-lg bg-green-700 px-4 py-2.5 text-center text-xs text-white font-medium hover:bg-green-800 focus:ring-4 focus:ring-green-200 dark:focus:ring-green-900" @click.prevent="checkValues()">
          <IconsJudgeHummer />
          Post comment
        </button>
        <div class="flex ps-0 space-x-1 sm:ps-2 rtl:space-x-reverse">
          <button type="button" class="inline-flex cursor-pointer items-center justify-center rounded p-2 text-gray-500 hover:bg-gray-100 dark:text-gray-400 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white">
            <svg class="h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 12 20">
              <path stroke="currentColor" stroke-linejoin="round" stroke-width="2" d="M1 6v8a5 5 0 1 0 10 0V4.5a3.5 3.5 0 1 0-7 0V13a2 2 0 0 0 4 0V6" />
            </svg>
            <span class="sr-only">Add Link</span>
          </button>
          <button type="button" class="inline-flex cursor-pointer items-center justify-center rounded p-2 text-gray-500 hover:bg-gray-100 dark:text-gray-400 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white">
            <svg class="h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
              <path d="M8 0a7.992 7.992 0 0 0-6.583 12.535 1 1 0 0 0 .12.183l.12.146c.112.145.227.285.326.4l5.245 6.374a1 1 0 0 0 1.545-.003l5.092-6.205c.206-.222.4-.455.578-.7l.127-.155a.934.934 0 0 0 .122-.192A8.001 8.001 0 0 0 8 0Zm0 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
            </svg>
            <span class="sr-only">Set location</span>
          </button>
          <button type="button" class="inline-flex cursor-pointer items-center justify-center rounded p-2 text-gray-500 hover:bg-gray-100 dark:text-gray-400 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white">
            <svg class="h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
              <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
            </svg>
            <span class="sr-only">Upload image</span>
          </button>
        </div>
      </div>
    </div>
    <p class="text-sm text-gray-400">{{ maxCharsDescription - review_text.length  }} chars remaining</p>
  </form>
</template>
