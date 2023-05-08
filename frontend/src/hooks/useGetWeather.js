import { useQuery } from "@tanstack/react-query";
import { WEATHER_FORECAST_URL, WEATHER_FORECAST_KEY } from "utils/Constants";

export const useGetWeather = (selectedDatetime) =>  {
  return useQuery({
    queryKey: [WEATHER_FORECAST_KEY, {selectedDatetime}],
    queryFn: () => fetch(`${WEATHER_FORECAST_URL}?${new URLSearchParams({
        date_time: selectedDatetime
      })}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(res => res.json()),
      staleTime: Infinity,
      cacheTime: Infinity
  })
}