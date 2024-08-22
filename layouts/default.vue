<script setup>
const is_shown = ref(true)

function toggle_shown() {
  is_shown.value = !is_shown.value
}
</script>

<template>
  <main class="px-5 text-center lg:px-0 md:px-0">
    <div v-if="is_shown" class="bg-gray py-1 transition duration-300 ease-in-out">
      <div class="mx-auto w-full flex justify-around text-sm lg:w-3/5">
        <p class="">
          Requests may experience delays due to the free services we currently utilize.
        </p>
        <button @click.once.prevent="toggle_shown">
          X
        </button>
      </div>
    </div>
    <Header />
    <slot />
    <Footer />
    <div class="mx-auto mt-5 text-center text-sm opacity-25" />
  </main>
</template>
