import { useQuery } from "@tanstack/react-query";
import { WEATHER_FORECAST_URL, WEATHER_FORECAST_KEY } from "utils/Constants";
import dayjs from 'dayjs';

export const useGetWeather = (selectedDatetime) =>  {

  const origSelectedDatetime = selectedDatetime;


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
      .then(res => res.json())
      .then(obj => {
        if (origSelectedDatetime !== selectedDatetime) {
          // remove the weather forecast and only retain the area metadata because the weather
          // information are no longer accurate
          obj.items = [];
        }
        if (!(Array.isArray(obj?.area_metadata) && obj.area_metadata.length > 0))
          throw new Error("Missing weather area metadata");
        return obj;
      }),
      staleTime: Infinity,
      cacheTime: Infinity,
      retry: (failureCount, error) => {
        selectedDatetime = dayjs(dayjs(selectedDatetime).subtract(1, 'day')).format("YYYY-MM-DDTHH:mm:ssZ");
        console.log("Retrying for date " + selectedDatetime);
        return failureCount < 12;
      },
      retryDelay: 100
  })
}