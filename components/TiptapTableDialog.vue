<script setup lang="ts">
import { ref } from 'vue'
import { Switch, SwitchGroup, SwitchLabel } from '@headlessui/vue'
import Dialog from './Dialog.vue'
import InputContainer from './InputContainer.vue'
import Label from './Label.vue'
import Input from './Input.vue'
import type Table from '@/models/table'

defineProps<{
  show: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'insert', table: Table): void
}>()

const inputColumnsRef = ref<number>(3)
const inputRowsRef = ref<number>(3)
const inputWithHeaderRef = ref<boolean>(true)

function closeDialog() {
  emit('close')
}

function onSubmit() {
  emit('insert', {
    rows: inputRowsRef.value,
    columns: inputColumnsRef.value,
    withHeader: inputWithHeaderRef.value,
  })
  closeDialog()
}
</script>

<template>
  <Dialog title="Tambah Tabel" :show="show" @close="closeDialog">
    <form @submit.prevent="onSubmit">
      <div class="flex flex-col space-y-5">
        <div class="flex flex-row space-x-5">
          <InputContainer class="w-full flex-1">
            <Label for="input-table-columns">Kolom</Label>
            <Input
              id="input-table-columns"
              v-model="inputColumnsRef"
              required
              type="number"
              min="1"
              class="w-full"
            />
          </InputContainer>
          <InputContainer class="w-full flex-1">
            <Label for="input-table-rows">Baris</Label>
            <Input
              id="input-table-rows"
              v-model="inputRowsRef"
              required
              type="number"
              min="1"
              class="w-full"
            />
          </InputContainer>
        </div>
        <SwitchGroup>
          <div class="flex flex-row items-center space-x-3">
            <Switch
              v-model="inputWithHeaderRef"
              :class="inputWithHeaderRef ? 'bg-blue-600' : 'bg-gray-200'"
              class="relative h-6 w-11 inline-flex shrink-0 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <span
                :class="inputWithHeaderRef ? 'translate-x-6' : 'translate-x-1'"
                class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform"
              />
            </Switch>
            <SwitchLabel class="select-none text-sm text-gray-600">
              Tabel Header
            </SwitchLabel>
          </div>
        </SwitchGroup>
        <div class="flex flex-row justify-end space-x-3">
          <button
            type="button"
            class="rounded-md px-4 py-3 text-sm text-gray-600 font-medium hover:bg-gray-100"
            @click="closeDialog"
          >
            Batal
          </button>
          <button
            type="submit"
            class="rounded-md bg-blue-700 px-4 py-3 text-sm text-white font-medium hover:bg-opacity-80"
          >
            Tambah
          </button>
        </div>
      </div>
    </form>
  </Dialog>
</template>
