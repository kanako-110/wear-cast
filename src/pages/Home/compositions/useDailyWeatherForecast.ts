import axios from "axios";
import { ref } from "vue";

export const useDailyWeatherWeather = () => {
  const todaysWeather = ref({});
  const loaded = ref(false);

  const getDailyWeatherForecast = async (city: string) => {
    const API_KEY = process.env.WEATHERBIT_API_KEY;
    const BASE_URL = "https://api.weatherbit.io/v2.0/forecast/daily";
    try {
      const response = await axios.get(BASE_URL, {
        params: {
          city: city,
          key: API_KEY,
        },
      });
      todaysWeather.value = response.data.data[0];
    } catch (error) {
      // TODO: handle error UI
      console.error(error);
    } finally {
      loaded.value = true;
    }
  };

  return { todaysWeather, loaded, getDailyWeatherForecast };
};
