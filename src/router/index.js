import { createRouter, createWebHistory } from 'vue-router'
import ShipsView from '../views/ShipsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'ships',
      component: ShipsView
    },
  ]
})

export default router
