import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useCartStore = defineStore('cart', () => {
  const items = ref([])

  const totalItems = computed(() => items.value.reduce((sum, item) => sum + item.quantity, 0))

  const addItem = (product, quantity) => {
    const existingItem = items.value.find((item) => item.id === product.id)

    if (existingItem) {
      existingItem.quantity += quantity
    } else {
      items.value.push({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        quantity,
      })
    }
  }

  const removeItem = (itemId) => {
    items.value = items.value.filter((item) => item.id !== itemId)
  }

  return { items, totalItems, addItem, removeItem }
})
