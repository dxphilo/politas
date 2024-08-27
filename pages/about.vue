<script>
export default {
  setup() {
    return {
      // any required setup logic
    }
  },
}
</script>

<template>
  <div class="mx-auto max-w-3xl p-8 text-justify">
    <div class="mb-8">
      <div class="mx-auto my-4 w-3/5 text-center">
        <h1 class="font-cursive mb-4 text-8xl header1">
          Our Story
        </h1>
        <p class="pt-2 text-base font-normal">
          Our goal is to create a free, digital public database documenting all politicians charged with corruption.
        </p>
      </div>
      <div class="text-lg text-gray-500 font-light leading-relaxed">
        <p class="drop-cap mb-6">
          In light of the current political climate, I've observed that many publicly elected leaders have become public enemy number one. This is evident in the numerous corruption charges reported, as well as the passing of fraudulent laws that threaten our national heritage, culture, and morals.
        </p>
        <p class="mb-6">
          For these reasons, I decided to build <span class="text-blue-600 font-semibold">Public Watch</span> a free, public database to document every politician ever charged with corruption and abuse of office, both deceased and living. This will allow us to track these acts and individuals, providing this crucial information freely to the public.
        </p>
        <p class="mb-6">
          Our mission is simple: to document and share the truth about corruption, ensuring that every case, every misuse of public resources, and every betrayal of public trust is brought to light.
        </p>
        <p class="mb-6">
          This is the first iteration of this project, and there's much more to be done. If you're a designer(UI/UX), developer, programmer, or data enthusiast, your help would be invaluable in bringing this project to life. Check out our <a href="/apidocs" class="text-blue-600 font-semibold">Public API</a>.
        </p>
        <p class="mb-6">
          Thank you for being part of this journey. Your support means the world to us and brings us one step closer to a more just and accountable society.
        </p>
      </div>
    </div>
    <div class="mb-8">
      <p class="text-xl font-semibold">
        Warm regards,
      </p>
      <p class="font-cursive py-8 text-6xl font-bold">
        John
      </p>
      <p class="text-lg text-gray-600 italic">
        Building Public Watch
      </p>
    </div>
    <div>
      <p class="mb-2 text-lg font-bold">
        Contribute to our mission:
      </p>
      <ul class="list-disc list-inside text-blue-600">
        <li><a href="/report" class="hover:underline">Submit a Case</a></li>
        <li><a href="#" class="hover:underline">Share Our Platform</a></li>
      </ul>
    </div>
  </div>
</template>

  <style>
  @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&display=swap');

.font-cursive {
  font-family: 'Dancing Script', cursive;
}
.drop-cap::first-letter {
  font-size: 3em; /* Make the first letter larger */
  font-weight: bold; /* Optional: make it bold */
  float: left; /* Align the letter to the left */
  line-height: 1; /* Control the spacing around the letter */
  margin-right: 0.1em; /* Space between the first letter and the rest of the text */
  color: black;
}
</style>
