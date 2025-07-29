<template>
  <div class="product-container">
    <div v-if="loading" class="loading">Loading product...</div>
    <div v-else class="product-details">
      <div class="product-image">
        <img
          :src="product.image"
          alt="Product Image"
          width="600"
          height="600"
          loading="eager"
          fetchpriority="high"
        />
      </div>
      <div class="product-info">
        <h1>{{ product.title }}</h1>
        <p class="description">{{ product.description }}</p>
        <p class="price">${{ product.price }}</p>
        <p class="category">Category: {{ product.category }}</p>

        <div class="quantity-controls">
          <button @click="decrementQuantity" class="quantity-btn">-</button>
          <span class="quantity">{{ quantity }}</span>
          <button @click="incrementQuantity" class="quantity-btn">+</button>
        </div>

        <button @click="addToCart" class="add-to-cart-btn">Add to Cart</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useCartStore } from '@/stores/cart'

const route = useRoute()
const cartStore = useCartStore()
const product = ref(null)
const loading = ref(true)
const quantity = ref(1)

const incrementQuantity = () => {
  quantity.value++
}

const decrementQuantity = () => {
  if (quantity.value > 1) {
    quantity.value--
  }
}

const addToCart = () => {
  cartStore.addItem(product.value, quantity.value)
  quantity.value = 1
}

onMounted(async () => {
  loading.value = true
  try {
    const response = await fetch('https://fakestoreapi.com/products/' + route.params.id)
    product.value = await response.json()
  } catch (error) {
    console.error('Error fetching product:', error)
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.product-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.product-header {
  color: #2c3e50;
  margin-bottom: 2rem;
  font-size: 2.5rem;
  text-align: center;
}

.loading {
  text-align: center;
  font-size: 1.2rem;
  color: #666;
  padding: 2rem;
}

.product-details {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.product-image {
  display: flex;
  justify-content: center;
  align-items: center;
}

.product-image img {
  max-width: 100%;
  max-height: 400px;
  object-fit: contain;
}

.product-info {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.product-info h2 {
  color: #2c3e50;
  font-size: 1.8rem;
  margin-bottom: 1rem;
}

.description {
  color: #666;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.price {
  font-size: 1.5rem;
  color: #42b983;
  font-weight: bold;
}

.category {
  color: #666;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.quantity-controls {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 1rem 0;
}

.quantity-btn {
  background: #f8f9fa;
  border: 1px solid #dee2e6;
  border-radius: 4px;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
}

.quantity-btn:hover {
  background: #e9ecef;
}

.quantity {
  font-size: 1.1rem;
  font-weight: 500;
  min-width: 40px;
  text-align: center;
}

.add-to-cart-btn {
  background: #42b983;
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 6px;
  font-size: 1.1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.add-to-cart-btn:hover {
  background: #3aa876;
}

@media (max-width: 768px) {
  .product-details {
    grid-template-columns: 1fr;
  }

  .product-image img {
    max-height: 300px;
  }
}
</style>
