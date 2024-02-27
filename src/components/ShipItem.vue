<script setup>
import { VCard } from 'vuetify/components/VCard'

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  model: {
    type: String,
    required: true
  },
  cost_in_credits: {
    type: String,
    required: true
  }
})

</script>

<template>
  <v-card 
  :title="name"
  :subtitle="model" 
  >
    <template v-slot:text >
      Cost in Credits: {{ cost_in_credits }}
    </template>
  </v-card>
</template>

<style scoped>
.v-card {
  flex: 0 0 30%;
  padding: 1rem;
  margin: 1rem;
}
</style>
