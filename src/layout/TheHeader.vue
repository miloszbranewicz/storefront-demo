<script setup>
import { RouterLink } from 'vue-router'
import { useCartStore } from '../stores/cart'
import { computed } from 'vue'
import TheBreadcrumbs from './TheBreadcrumbs.vue'
const cart = useCartStore()
const totalItems = computed(() => cart.totalItems)
</script>

<template>
  <header class="header">
    <nav class="nav-container">
      <RouterLink :to="{ name: 'ProductsList' }" class="nav-link">
        <span class="nav-text">Products</span>
      </RouterLink>
      <RouterLink :to="{ name: 'CartView' }" class="nav-link">
        <span class="nav-text">Cart </span>
        <span class="nav-badge">({{ totalItems }})</span>
      </RouterLink>
    </nav>
  </header>
  <TheBreadcrumbs />
</template>

<style scoped>
.header {
  background-color: #ffffff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  gap: 2rem;
  align-items: center;
}

.nav-link {
  text-decoration: none;
  color: #2c3e50;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  transition: all 0.2s ease;
}

.nav-link:hover {
  background-color: #f8f9fa;
  color: #42b983;
}

.nav-link.router-link-active {
  color: #42b983;
  background-color: #e8f5ef;
}

.nav-text {
  font-size: 1.1rem;
}

@media (max-width: 768px) {
  .nav-container {
    padding: 1rem;
  }
}
</style>
