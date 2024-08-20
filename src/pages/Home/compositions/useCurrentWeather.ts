import axios from "axios";
import { ref } from "vue";

export type CurrentWeather = {
  temperature_2m?: number;
};

export const useCurrentWeather = () => {
  const currentWeather = ref<CurrentWeather>({});
  const loaded = ref(false);

  const getCurrentWeather = async (city: {
    name: string;
    latitude: number;
    longitude: number;
    timezone: string;
  }) => {
    const BASE_URL = "https://api.open-meteo.com/v1/forecast";

    try {
      const response = await axios.get(BASE_URL, {
        params: {
          latitude: city.latitude,
          longitude: city.longitude,
          current: "temperature_2m",
          timezone: city.timezone,
        },
      });
      currentWeather.value = response.data.current;
    } catch (error) {
      // TODO: handle error UI
      console.error(error);
    } finally {
      loaded.value = true;
    }
  };

  return { currentWeather, loaded, getCurrentWeather };
};
