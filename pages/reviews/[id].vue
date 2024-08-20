<script setup lang="ts">
import axios from 'axios'
import { formatDate, getRandomColor } from '../../utils/utils'

const snackbar = useSnackbar()
const config = useRuntimeConfig()

const route = useRoute()
const id = ref<number>(0)

if ('id' in route.params)
  id.value = Number.parseInt(route.params.id)

const upvoted = ref<boolean>(false)
const downvoted = ref<boolean>(false)
const slice_to = ref<number>(3)
const backendUrl = config.public.backendUrl
const show_popup = ref<boolean>(false)

const { data, refresh } = await useFetch('/api/report', {
  method: 'GET',
  query: { id },
  watch: [id],
})
const isDataValid = () => data.value !== undefined

async function handleUpvote(case_id: number) {
  if (upvoted.value) {
    snackbar.add({ title: 'You have upvoted this case, thank you!', type: 'warning' })
    return
  }
  try {
    const responce = await axios.post(`${backendUrl}/case/upvote/${case_id}`)
    const { status } = responce
    if (status === 201) {
      refresh()
      snackbar.add({ text: 'You have upvoted this case, thank you!', type: 'success' })
      upvoted.value = !upvoted.value
    }
  }
  catch (error) {
    console.error(`Error updating vote: ${error}`)
  }
}

async function handleDownvote(case_id: number) {
  if (downvoted.value) {
    snackbar.add({ text: 'You have Downvoted this case, thank you!', type: 'warning' })
    return
  }
  try {
    const responce = await axios.post(`${backendUrl}/case/downvote/${case_id}`)
    const { status } = responce
    if (status === 201) {
      snackbar.add({ text: 'You have downvoted this case, thank you!', type: 'success' })
      downvoted.value = !downvoted.value
      refresh()
    }
  }
  catch (error) {
    console.error(`Error updating vote: ${error}`)
  }
}
refresh()
</script>

<template>
  <div>
    <div v-if="data">
      <div class="mx-auto w-full pb-4 text-justify lg:w-3/5">
        <GoBack />
      </div>
      <p class="pb-3 text-3xl">
        <NuxtLink class="hover:underline" :to="`/profile/${data.case.politician_id}`">
          {{ data.case.name }}
        </NuxtLink> Graft Comments
      </p>
      <div v-if="isDataValid()">
        <!-- start main -->
        <div class="mx-auto w-full transform break-all border border-gray-200 rounded-lg p-4 text-justify lg:w-3/5">
          <div class="flex flex-wrap justify-between">
            <div class="flex flex-col">
              <NuxtLink class="font-medium hover:underline" :to="`/profile/${data.case.politician_id}`">
                {{ data.case.name }}
              </NuxtLink>
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
          <a v-if="data.case.link" :href="`${data.case.link}`" class="underline">Reference link</a>
          <div class="flex justify-between gap-x-2">
            <div class="flex items-center gap-4" style="z-index: 999;">
              <div :class="upvoted ? 'text-green border-green' : '' " class="flex cursor-pointer items-center gap-1 border rounded-full px-2 py-1 text-center hover:bg-gray-2" @click.once.prevent="handleUpvote(data.case.id)">
                <span>👍</span>
                <span class="text-xs">{{ data.case.upvotes }}</span>
              </div>
              <div :class="downvoted ? 'text-[#FF0000] border-[#FF0000]' : '' " class="flex cursor-pointer items-center gap-1 border rounded-full px-2 py-1 text-center hover:bg-gray-2" @click.once.prevent="handleDownvote(data.case.id)">
                <span>👎</span>
                <span class="text-xs">{{ data.case.downvotes }}</span>
              </div>
            </div>

            <div class="flex flex-row gap-2">
              <SocialShare
                v-for="network in ['facebook', 'twitter', 'linkedin', 'email', 'whatsapp', 'reddit']"
                :key="network"
                :network="network"
                :styled="true"
                :label="false"
                :title="`${data.case.title}`"
                hashtags="PublicWatch,CorruptPoliticians,Kenya"
                user="philip46906"
                class="rounded-full p-1.9 light:text-white"
              />
            </div>
          </div>
        </div>
        <!-- end main -->

        <div class="mx-auto lg:w-2/5">
          <div class="flex justify-between py-4">
            <p class="text-justify font-normal light:text-gray-700">
              Public comments for this case: <span class="font-bold">{{ data.reviews.length }}</span>
            </p>
          </div>
          <div>
            <Comment :id="id" :title="data.case.title" @refresh-comments="refresh()" />
          </div>
          <div v-for="review in data.reviews.slice(0, slice_to)" :key="review.id" class="mb-6 w-full flex items-start gap-2.5 break-all border border-gray-200 rounded-lg p-3 dark:border-gray-600 dark:bg-gray-700">
            <div>
              <div class="my-2 flex gap-3">
                <p :style="{ backgroundColor: getRandomColor() }" class="h-8 w-8 border border-gray-50 rounded-full" />
                <div class="flex items-center space-x-2 rtl:space-x-reverse">
                  <span class="text-sm text-gray-900 font-semibold dark:text-white">{{ review.user_id ? review.user_id : "Anonymous Comment" }}</span>
                  <span class="text-xs text-gray-400 font-light dark:text-gray-400">{{ formatDate(review.created_at) }}</span>
                </div>
              </div>
              <div class="max-w-full w-full flex flex-col gap-1">
                <div class="flex flex-col p-2 leading-1.5 dark:bg-gray-700">
                  <p class="overflow-hidden text-justify text-sm text-gray-900 font-normal dark:text-white">
                    {{ review.review_text }}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div v-if="data.reviews.length > 3">
            <p class="text-xs text-gray-400 font-light">
              Showing {{ slice_to }} of {{ data.reviews.length }} comments
            </p>
            <p v-if="data.reviews.length > 0 && slice_to !== data.reviews.length" class="cursor-pointer text-xs text-blue-500 font-medium" @click="slice_to = data.reviews.length">
              See all comments
            </p>
          </div>
        </div>
      </div>
      <div v-else class="mx-auto w-full lg:w-2/5">
        <p class="py-6 text-lg text-gray-400">
          Comments for this case not found, Do you want to add your comment?
        </p>
        <NuxtLink class="btn" :to="`/addreview/${id}`">
          Add Comment
        </NuxtLink>
      </div>
    </div>
    <!-- loader -->
    <div v-else class="h-90 flex justify-center text-center">
      <div class="py-30">
        <IconsLoading class="h-10 w-10" />
      </div>
    </div>
    <Teleport to="body">
      <div v-if="show_popup" class="modal">
        <PopupsLinkPopup :link="data.case.link" @toggle="show_popup = !show_popup" />
      </div>
    </Teleport>
  </div>
</template>
