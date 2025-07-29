<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const breadcrumbs = computed(() => {
  const pathArray = route.path.split('/').filter((segment) => segment)
  let path = ''

  return pathArray.map((segment) => {
    path += `/${segment}`
    return {
      name: segment.charAt(0).toUpperCase() + segment.slice(1),
      path: path,
    }
  })
})
</script>

<template>
  <nav v-if="breadcrumbs.length" aria-label="Breadcrumb" class="breadcrumbs">
    <RouterLink to="/" class="breadcrumb-item">Home</RouterLink>
    <span v-for="(crumb, index) in breadcrumbs" :key="crumb.path" class="breadcrumb-item">
      <span class="separator">/</span>
      <RouterLink :to="crumb.path" :class="{ active: index === breadcrumbs.length - 1 }">
        {{ crumb.name }}
      </RouterLink>
    </span>
  </nav>
</template>

<style scoped>
.breadcrumbs {
  max-width: 1200px;
  margin: 1rem auto;
  padding: 0.5rem 2rem;
  font-size: 0.9rem;
}

.breadcrumb-item {
  color: #666;
  text-decoration: none;
}

.breadcrumb-item a {
  color: #42b983;
  text-decoration: none;
  transition: color 0.2s ease;
}

.breadcrumb-item a:hover {
  color: #3aa876;
}

.breadcrumb-item a.active {
  color: #2c3e50;
  pointer-events: none;
}

.separator {
  margin: 0 0.5rem;
  color: #999;
}

@media (max-width: 768px) {
  .breadcrumbs {
    padding: 0.5rem 1rem;
    font-size: 0.8rem;
  }
}
</style>
