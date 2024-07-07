<template>
  <div class="weather">
    <input class="weather-form__input" type="text" v-model="location" @input="validateLocation"
      placeholder="Введите название города" @keypress="handleKeyPress" />
    <span class="error" v-if="locationError">{{ locationError }}</span>
    <div class="buttons-layout">
      <button class="weather-form__btn" @click="fetchWeather(1)" :disabled="disabled">Прогноз на сегодня</button>
      <button class="weather-form__btn" @click="fetchWeather(3)" :disabled="disabled">Прогноз на 3 дня</button>
    </div>
    <div v-if="loading">Загрузка ...</div>
    <div v-if="!loading && weatherData.length && !disabled  ">
      <h1>{{ city }}:</h1>
      <h2>{{ title }}</h2>
      <ul>
        <li v-for="(forecast, index) in weatherData" :key="index">
          {{ forecast.date }}: {{ forecast.day.condition.text }} - {{ forecast.day.avgtemp_c }}°C
        </li>
      </ul>
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

.error {
  color: red;
}
</style>

<script>

import axios from 'axios'
import { ref, computed } from 'vue'

export default {
  setup() {
    const weatherData = ref([])
    const location = ref('')
    const loading = ref('')
    const city = ref('')
    const locationError = ref('')
    const days = ref(1)

    const title = computed(() => {
      switch (days.value) {
        case 1:
          return 'Прогноз на сегодня'
        case 3:
          return 'Прогноз на 3 дня'
        default:
          return ''
      }
    })

    const disabled = computed(() => {
      return locationError.value !== '' || location.value.trim() === ''
    })

    const validateLocation = () => {
      if (location.value.trim() === '') {
        locationError.value = 'Введите название города';
      } else {
        locationError.value = ''
      }
    }


    const fetchWeather = async (daysAmount) => {
      const apiKey = 'd2f70a9b40d0435aab3124151242006'
      days.value = daysAmount


      if (locationError.value !== '') return;
      loading.value = true;
        locationError.value = ''
      
      try {
        const response = await axios.get(`http://api.weatherapi.com/v1/forecast.json?q=${location.value}&days=${days.value}&key=${apiKey}`)
        weatherData.value = response.data.forecast.forecastday
        city.value = response.data.location.name
      } catch (error) {
        if(error.response && error.response.status === 400){
          locationError.value = 'Введите корректное название города'
        }else{
          
        console.error('Ошибка при получении данных о погоде:', error);
        locationError.value = 'Произошла ошибка при получении данных о погоде'
        }
      } finally {
        loading.value = false;
      }
    }

    const handleKeyPress = (event) =>  {
      if (event.key === 'Enter' ) {
        fetchWeather(1);
      }
    }

    return {
      weatherData,
      city,
      days,
      title,
      location,
      locationError,
      disabled,
      validateLocation,
      handleKeyPress,
      loading,
      fetchWeather,
    }
  }


}
</script>

<!-- 
// export default {
//   data() {
//     return {
//       forecastData: [],
//       location: '',
//       temperature: 0,
//       icon: '',
//       description: '',
//       loading: false,
//       error: false,
//       searchQuery: '',
//       days: ''
//     }
//   },
//   computed: {},
//   methods: {
//     weatherSearch() {
//       this.loading = true
//       this.error = false
//       fetch(
//         `http://api.weatherapi.com/v1/forecast.json?q=saint&days=2&key=d2f70a9b40d0435aab3124151242006`
//         // `http://api.weatherapi.com/v1/forecast.json?q=${this.searchQuery}&days=${this.days}&key=d2f70a9b40d0435aab3124151242006`
//       )
//         .then((response) => response.json())
//         .then((data) => {
//           console.log(data.forecast)
//           ;(this.loading = false), (this.location = data.location.name)
//           this.temperature = data.current.temp_c
//           this.description = data.current.condition.text
//           this.icon = data.current.condition.icon
//           this.forecastData = data.forecast.forecastday
//           this.resetSearchQuery()
//         })
//         .catch((error) => {
//           ;(this.loading = false), (this.error = true), console.error(error)
//         })
//     },
//     resetSearchQuery() {
//       this.searchQuery = ''
//       this.days = ''
//     }
//   }
// } -->
