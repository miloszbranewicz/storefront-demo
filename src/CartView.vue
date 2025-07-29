<template>
  <div class="cart-container">
    <h1 class="cart-header">Shopping Cart</h1>

    <div v-if="cart.items.length === 0" class="empty-cart">
      <p>Your cart is empty</p>
      <RouterLink to="/" class="continue-shopping">Continue Shopping</RouterLink>
    </div>

    <div v-else class="cart-content">
      <div class="cart-items">
        <div v-for="item in cart.items" :key="item.id" class="cart-item">
          <img :src="item.image" :alt="item.title" class="item-image" />
          <div class="item-details">
            <h3>{{ item.title }}</h3>
            <p class="item-price">${{ (item.price * item.quantity).toFixed(2) }}</p>
            <div class="quantity-controls">
              <button @click="updateQuantity(item, -1)" class="quantity-btn">-</button>
              <span class="quantity">{{ item.quantity }}</span>
              <button @click="updateQuantity(item, 1)" class="quantity-btn">+</button>
            </div>
          </div>
          <button @click="removeItem(item.id)" class="remove-btn">Remove</button>
        </div>
      </div>

      <div class="cart-summary">
        <h2>Order Summary</h2>
        <div class="summary-details">
          <p>Total Items: {{ cart.totalItems }}</p>
          <p class="total-price">
            Total: ${{
              cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)
            }}
          </p>
        </div>
        <button class="checkout-btn">Proceed to Checkout</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from '@/stores/cart'
import { RouterLink } from 'vue-router'

const cart = useCartStore()

const removeItem = (itemId) => {
  cart.removeItem(itemId)
}

const updateQuantity = (item, change) => {
  const newQuantity = item.quantity + change
  if (newQuantity > 0) {
    item.quantity = newQuantity
  } else {
    removeItem(item.id)
  }
}
</script>

<style scoped>
.cart-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.cart-header {
  color: #2c3e50;
  margin-bottom: 2rem;
  font-size: 2.5rem;
  text-align: center;
}

.empty-cart {
  text-align: center;
  padding: 3rem;
  color: #666;
}

.continue-shopping {
  display: inline-block;
  margin-top: 1rem;
  padding: 0.8rem 1.5rem;
  background: #42b983;
  color: white;
  text-decoration: none;
  border-radius: 6px;
  transition: background-color 0.2s;
}

.continue-shopping:hover {
  background: #3aa876;
}

.cart-content {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
}

.cart-items {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  padding: 1rem;
}

.cart-item {
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 1rem;
  padding: 1rem;
  border-bottom: 1px solid #eee;
}

.item-image {
  width: 100px;
  height: 100px;
  object-fit: contain;
}

.item-details {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.item-details h3 {
  margin: 0;
  color: #2c3e50;
  font-size: 1.1rem;
}

.item-price {
  color: #42b983;
  font-weight: bold;
  font-size: 1.1rem;
}

.quantity-controls {
  display: flex;
  align-items: center;
  gap: 1rem;
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
  transition: all 0.2s;
}

.quantity-btn:hover {
  background: #e9ecef;
}

.quantity {
  min-width: 40px;
  text-align: center;
}

.remove-btn {
  color: #dc3545;
  border: none;
  background: none;
  cursor: pointer;
  font-size: 0.9rem;
  padding: 0.5rem;
}

.remove-btn:hover {
  text-decoration: underline;
}

.cart-summary {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  height: fit-content;
}

.summary-details {
  margin: 1rem 0;
}

.total-price {
  font-size: 1.5rem;
  color: #2c3e50;
  font-weight: bold;
  margin-top: 1rem;
}

.checkout-btn {
  width: 100%;
  background: #42b983;
  color: white;
  border: none;
  padding: 1rem;
  border-radius: 6px;
  font-size: 1.1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}

.checkout-btn:hover {
  background: #3aa876;
}

@media (max-width: 768px) {
  .cart-content {
    grid-template-columns: 1fr;
  }

  .cart-item {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .item-image {
    margin: 0 auto;
  }
}
</style>
