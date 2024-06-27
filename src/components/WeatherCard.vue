<script setup></script>

<template>
  <div class="weather">
    <div class="weather-form">
      <input
        class="weather-form__input"
        type="text"
        v-model="searchQuery"
        placeholder="Введите название города"
      />
      <div class="buttons-layout">
        <button class="weather-form__btn" @click="weatherSearch">Поиск</button>
        <button class="weather-form__btn" @click="resetSearchQuery">Очистить</button>
      </div>
    </div>

    <div v-if="loading">Loading...</div>
    <div v-show="!error && location && temperature !== 0 && description">
      <div v-if="error">Error</div>
      <div class="cards-layout">
        <p class="card">{{ location }}</p>
        <p class="card">{{ description }} , {{ temperature }} °C</p>
        <img :src="icon" alt="'icon'" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.weather {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  position: relative;
  overflow: hidden;
}
.weather-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.weather-form__input {
  width: 100%;
  padding: 0.5rem;
  border-radius: 2rem;
  border: 1px solid lightBlue;
}
.weather-form__btn {
  cursor: pointer;
  width: 100%;
  padding: 0.5rem;
  border-radius: 2rem;
  background-color: lightBlue;

  border: none;
}
.buttons-layout {
  display: flex;
  gap: 1rem;
}
.cards-layout {
  display: flex;
  flex-direction: column;

  gap: 1rem;
}
.card {
  font-size: 1rem;
  padding: 0.5rem;
  border-radius: 2rem;
  border: 1px solid lightBlue;
}
</style>

<script>
export default {
  data() {
    return {
      location: '',
      temperature: 0,
      icon: '',
      description: '',
      loading: false,
      error: false,
      searchQuery: ''
    }
  },
  computed: {},
  methods: {
    weatherSearch() {
      this.loading = true
      this.error = false
      fetch(
        `http://api.weatherapi.com/v1/current.json?q=${this.searchQuery}&key=d2f70a9b40d0435aab3124151242006`
      )
        .then((response) => response.json())
        .then((data) => {
          ;(this.loading = false), (this.location = data.location.name)
          this.temperature = data.current.temp_c
          this.description = data.current.condition.text
          this.icon = data.current.condition.icon
          this.resetSearchQuery()
        })
        .catch((error) => {
          ;(this.loading = false), (this.error = true), console.error(error)
        })
    },
    resetSearchQuery() {
      this.searchQuery = ''
    }
  }
}
</script>
