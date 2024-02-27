<script setup>
import ShipList from '../components/ShipList.vue'

</script>

<template>
  <div class="container">
    <h1>Starship Application</h1>
    <Suspense>
      <ShipList />
      <template #fallback> Loading... </template>
    </Suspense>
  </div>
</template>

<style scoped>
.container {
  flex-direction: column;
  flex-wrap: wrap;
  flex: "flex-grow";
}
h1 {
  text-align: center;
  justify-content: center;
  align-items: center;
}
</style>
