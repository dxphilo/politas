<template>
  <div text="xl gray4" m-5 flex="~ gap3" justify-center>
    <NuxtLink i-carbon-campsite to="/" />
    <a i-carbon-logo-github href="https://github.com/antfu/vitesse-nuxt3" target="_blank" />
    <NuxtLink to="/apidocs">
      API
    </NuxtLink>
    <NuxtLink to="/guide">
      Guide
    </NuxtLink>
    <DarkToggle />
  </div>
</template>
