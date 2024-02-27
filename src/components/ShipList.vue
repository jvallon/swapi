<script setup>
import ShipItem from './ShipItem.vue'
import { ref } from 'vue';

async function getJson(url = '') {
  const request = new Request(url, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    mode: 'cors'
  })

  const json = await fetch(request).then((response) => {
    if (response.status == 200) {
      return response.json()
    } else {
      console.debug(response)
      throw new Error('Error getting response.' + response.Error)
    }
  })
  return json
}

async function getShips(url = '') {
  let json = await getJson(url)
  let ships = [...json.results]

  while (json.next != null) {
    json = await getJson(json.next)
    ships.push(...json.results)
  }
  return ships
}

const ships = await getShips('https://swapi.dev/api/starships')
ships.sort((a,b) => {
  const nameA = a.name.toLowerCase();
  const nameB = b.name.toLowerCase();
  if(nameA < nameB) return -1;
  if(nameA > nameB) return 1;
  return 0;
})


// pagination
const currentPage = ref(1);
const perPage = 6;

function displayedShips(){
  const startIndex = perPage * (currentPage.value - 1);
  const endIndex = startIndex + perPage;
  let displayedShips = ships;
  if(search.value.length > 0){
    displayedShips = filterShipsByName(displayedShips, search.value);
  }

  return displayedShips.slice(startIndex, endIndex);
}

function handlePageUp(){
  if((currentPage.value * perPage) + perPage <= ships.length){
    currentPage.value++;
  }
}

function handlePageDown(){
  if(currentPage.value > 1){
    currentPage.value--;
  }
}

// search
const search = ref("");

function filterShipsByName(ships, name){
  return ships.filter((ship) => ship.name.toLowerCase().includes(name.toLowerCase()));
}
</script>

<template>
  <VTextField v-model="search" placeholder="Search..."></VTextField>
  <div class="shiplist">
    <ShipItem
      v-for="(ship, index) of displayedShips()"
      :key="index"
      :name="ship.name"
      :model="ship.model"
      :cost_in_credits="ship.cost_in_credits"
    />
  </div>
  <VDivider></VDivider>
  <div class="pagination">
    <VBtn :onclick="handlePageDown">Previous</VBtn>
    <div style="flex-grow: 1"></div>
    <VBtn :onclick="handlePageUp">Next</VBtn>
  </div>
</template>

<style scoped>
.shiplist {
  display: flex;
  flex-wrap: wrap;
  padding: 1rem;
}
.pagination {
  padding: 1rem;
  display: flex;
  flex-direction: row;
}
</style>
