import axios from "axios";
import { ref } from "vue";

export const useCurrentWeather = () => {
  const currentWeather = ref({});
  const loaded = ref(false);

  const getCurrentWeather = async (city: string) => {
    const API_KEY = process.env.WEATHERBIT_API_KEY;
    const BASE_URL = "https://api.weatherbit.io/v2.0/current";
    try {
      const response = await axios.get(BASE_URL, {
        params: {
          city: city,
          key: API_KEY,
        },
      });
      currentWeather.value = response.data.data[0];
    } catch (error) {
      // TODO: handle error UI
      console.error(error);
    } finally {
      loaded.value = true;
    }
  };

  return { currentWeather, loaded, getCurrentWeather };
};
