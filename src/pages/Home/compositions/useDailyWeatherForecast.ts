import axios from "axios";
import { ref } from "vue";

export type TodaysWeather = {
  precipitation_probability_mean?: number;
  temperature_2m_max?: number;
  temperature_2m_min?: number;
  time?: string;
};

type Response = {
  precipitation_probability_mean: number[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  time: string[];
};

export const useDailyWeatherWeather = () => {
  const todaysWeather = ref<TodaysWeather>({});
  const loaded = ref(false);

  const getDailyWeatherForecast = async (city: {
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
          daily: [
            "temperature_2m_max",
            "temperature_2m_min",
            "precipitation_probability_mean",
          ],
          timezone: city.timezone,
        },
      });
      const dailyForecastResponse: Response = response.data.daily;

      const keys = Object.keys(dailyForecastResponse) as (keyof Response)[];
      for (const key of keys) {
        if (Array.isArray(dailyForecastResponse[key])) {
          (todaysWeather.value as any)[key] = dailyForecastResponse[key][0];
        }
      }
    } catch (error) {
      // TODO: handle error UI
      console.error(error);
    } finally {
      loaded.value = true;
    }
  };

  return { todaysWeather, loaded, getDailyWeatherForecast };
};
