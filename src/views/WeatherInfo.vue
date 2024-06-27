<script setup lang="ts">
import WeatherCard from '@/components/WeatherCard.vue'
</script>

<template>
  <div class="about">
    <WeatherCard />
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
  }
}
</style>
