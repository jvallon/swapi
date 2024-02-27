<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <main>
    <RouterView />
  </main>
</template>

<style scoped>
#app {
 width: 100vw;
}
main {
  flex-direction: column;
  width: inherit;
}
</style>
