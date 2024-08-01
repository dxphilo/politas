<script setup lang="ts">
import axios from 'axios'
import { formatDate } from '../../utils/utils'
import { backendUrl } from '~/constants'

const route = useRoute()
const id = ref<number>(route.params.id)
const upvoted = ref<boolean>(false)
const downvoted = ref<boolean>(false)
const green = ref('rgb(0, 186, 124)')

const { data, status, error, refresh } = await useFetch('/api/report', {
  method: 'GET',
  query: { id },
  watch: [id],
})
const isDataValid = () => data.value !== undefined

async function handleUpvote(case_id: number) {
  if (upvoted.value) {
    alert('You have upvoted this case, thank you!')
    return
  }
  try {
    const responce = await axios.post(`${backendUrl}/case/upvote/${case_id}`)
    const { status } = responce
    if (status === 201) {
      alert('You have upvoted this case, thank you!')
    }
    upvoted.value = !upvoted.value
    refresh()
  }
  catch (error) {
    console.error(`Error updating vote: ${error}`)
  }
}

async function handleDownvote(case_id: number) {
  if (downvoted.value) {
    alert('You have Dwonvoted this case, thank you!')
    return
  }
  try {
    const responce = await axios.post(`${backendUrl}/case/downvote/${case_id}`)
    const { status } = responce
    if (status === 201) {
      alert('You have downvoted this case, thank you!')
    }
    downvoted.value = !downvoted.value
    refresh()
  }
  catch (error) {
    console.error(`Error updating vote: ${error}`)
  }
}

function commentUpvote(event: any) {
  alert(' comment upvote')
}

function commentDownvote(event: any) {
  alert('comment downvote')
}
</script>

<template>
  <p class="pb-3 text-4xl">
    {{ data.case.name }} Graft Comments
  </p>
  <div v-if="isDataValid()">
    <!-- start main -->
    <div class="transform mx-auto w-full border border-gray-200 rounded-2xl p-4 text-justify lg:w-3/5 hover:light:bg-gray-100">
      <div class="flex flex-wrap justify-between">
        <div class="flex flex-col">
          <p class="font-medium">
            {{ data.case.name }}
          </p>
          <p class="pt-1 text-xs text-gray-400 font-light">
            {{ formatDate(data.case.created_at) }}
          </p>
        </div>
        <span
          v-if="data.case.legal_outcome"
          :class="{ 'text-green-500': data.case.legal_outcome === 'Convicted',
                    'text-red-500': data.case.legal_outcome === 'Acquitted' || 'suspended' }"
          class="text-sm text-gray-600 font-medium"
        >
          Status: {{ data.case.legal_outcome }}
        </span>
      </div>
      <p class="mt-2 font-bold light:text-gray-800">
        {{ data.case.title }}
      </p>
      <p class="py-2 text-base font-light light:text-slate-5">
        {{ data.case.case_description }}
      </p>
      <!-- TODO add like/dislike feature -->
      <div class="flex gap-x-2">
        <div class="flex items-center gap-4" style="z-index: 999;">
          <div :class="upvoted ? 'text-green border-green' : '' " class="flex cursor-pointer gap-2 border rounded-full px-2 py-1 hover:bg-gray-2" @click.prevent="handleUpvote(data.case.id)">
            <IconsThumpsUp :fill="upvoted ? 'rgb(0, 186, 124)' : 'currentColor'" class="h-5 w-5" />
            <span>{{ data.case.upvotes }}</span>
          </div>
          <div :class="downvoted ? 'text-[#FF0000] border-[#FF0000]' : '' " class="flex cursor-pointer items-center gap-2 border rounded-full px-2 py-1 hover:bg-gray-2" @click.prevent="handleDownvote(data.case.id)">
            <IconsThumpsDown :fill="downvoted ? '#FF0000' : 'currentColor'" class="h-5 w-5" />
            <span>{{ data.case.downvotes }}</span>
          </div>
        </div>
        <NuxtLink v-if="data.case.link" :to="`${data.case.link}`" class="rounded-xl text-center bg-green px-4 py-1 font-extralight">
          Reference
        </NuxtLink>
      </div>
    </div>
    <!-- end main -->

    <div class="mx-auto lg:w-2/5">
      <div class="flex justify-between py-4">
        <p class="text-justify font-normal light:text-gray-700">
          Public comments for this case: <span class="font-bold">{{ data.reviews.length }}</span>
        </p>
        <NuxtLink :to="`/addreview/${id}`" class="btn">
          Add Comment
        </NuxtLink>
      </div>
      <div v-for="review in data.reviews" :key="review.id" class="mb-5 w-full overflow-hidden transform border-1 border-gray-200 rounded-2xl p-4 text-justify hover:light:bg-gray-100">
        <div class="flex gap-2">
          <a class="rounded-xl bg-purple px-3 py-1 text-xs font-extralight">{{ review.user_id === null ? "Anonymous review" : review.user_id }}</a>
          <p class="pt-1 text-xs text-gray-400 font-light">
            {{ formatDate(review.created_at) }}
          </p>
        </div>
        <p class="py-3 text-xl font-semibold">
          {{ review.title }}
        </p>
        <p class="font-normal light:text-slate-5">
          {{ review.review_text }}
        </p>
        <!-- UPVOTE AND DOWNVOTE SECTION -->
        <!-- <div class="mt-2 flex items-center gap-6" style="z-index: 999;">
          <div class="flex cursor-pointer gap-2 border rounded-full px-2 py-1 hover:bg-gray-2" @click.prevent="commentUpvote">
            <IconsThumpsUp class="h-5 w-5" />
            <span>{{ review.upvotes }}</span>
          </div>
          <div class="flex cursor-pointer items-center gap-2 border rounded-full px-2 py-1 hover:bg-gray-2" @click.prevent="commentDownvote">
            <IconsThumpsDown class="h-5 w-5" />
            <span>{{ review.downvotes }}</span>
          </div>
        </div> -->
      <!-- END OF UPVOTE AND DOWNVOTE -->
      </div>
    </div>
  </div>
  <div v-else class="mx-auto w-full lg:w-2/5">
    <p class="py-6 text-lg text-gray-400">
      Comments or this case not found, Do you want to add your comment?
    </p>
    <NuxtLink class="btn" :to="`/addreview/${id}`">
      Add Comment
    </NuxtLink>
  </div>
</template>
