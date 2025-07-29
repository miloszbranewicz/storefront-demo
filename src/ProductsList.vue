<template>
  <div class="products-container">
    <h1 class="products-header">Our Products</h1>

    <div v-if="loading" class="loading">
      <span class="loading-text">Loading products...</span>
    </div>

    <div v-else class="products-grid">
      <RouterLink
        v-for="product in products"
        :key="product.id"
        :to="`/product/${product.id}`"
        class="product-card"
      >
        <img
          :src="product.image"
          :alt="product.title"
          class="product-image"
          loading="eager"
          width="300"
          height="300"
          fetchpriority="high"
        />
        <div class="product-info">
          <h3 class="product-title">{{ product.title }}</h3>
          <p class="product-price">${{ product.price }}</p>
        </div>
      </RouterLink>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
const products = ref([])
const loading = ref(true)

onMounted(async () => {
  loading.value = true
  try {
    const response = await fetch('https://fakestoreapi.com/products')
    products.value = await response.json()
  } catch (error) {
    console.error('Error fetching products:', error)
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.products-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.products-header {
  color: #2c3e50;
  text-align: center;
  margin-bottom: 3rem;
  font-size: 2.5rem;
}

.loading {
  text-align: center;
  padding: 3rem;
}

.loading-text {
  color: #666;
  font-size: 1.2rem;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
  padding: 1rem;
}

.product-card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition:
    transform 0.2s,
    box-shadow 0.2s;
  text-decoration: none;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.product-image {
  width: auto;
  height: 200px;
  object-fit: contain;
  padding: 1rem;
  background: #f8f9fa;
  max-width: 100%;
}

.product-info {
  padding: 1rem;
}

.product-title {
  color: #2c3e50;
  font-size: 1.1rem;
  margin: 0 0 0.5rem 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  line-clamp: 2;
  overflow: hidden;
}

.product-price {
  color: #42b983;
  font-weight: bold;
  font-size: 1.2rem;
  margin: 0;
}

@media (max-width: 768px) {
  .products-container {
    padding: 1rem;
  }

  .products-grid {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1rem;
  }

  .products-header {
    font-size: 2rem;
    margin-bottom: 2rem;
  }
}
</style>
