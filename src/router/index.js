import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/ProductsList.vue'),
    name: 'ProductsList',
  },
  {
    path: '/cart',
    component: () => import('@/CartView.vue'),
    name: 'CartView',
  },
  {
    path: '/product/:id',
    component: () => import('@/ProductView.vue'),
    name: 'ProductView',
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
