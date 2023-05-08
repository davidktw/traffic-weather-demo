import { useQuery } from "@tanstack/react-query";
import { TRAFFIC_IMAGES_URL, TRAFFIC_IMAGES_KEY } from "utils/Constants";
import { calcCoordinatesDists } from "utils/Utils";

export const useGetTrafficImages = (selectedDatetime, weatherData) => {
  return useQuery({
    queryKey: [TRAFFIC_IMAGES_KEY, {selectedDatetime}],
    queryFn: async () => {
      const traffic_res = await fetch(`${TRAFFIC_IMAGES_URL}?${new URLSearchParams({
        date_time: selectedDatetime
      })}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });
      const traffic_json = await traffic_res.json();
      if (traffic_json?.items[0]?.cameras) {
        traffic_json.items[0].cameras.forEach(camera => {
          if (Array.isArray(weatherData?.area_metadata) &&
              weatherData?.area_metadata.length > 0) {
            //find the nearest area 
            camera.area = weatherData.area_metadata.reduce((acc, area) => {
              const accDist = calcCoordinatesDists(acc.label_location, camera.location);
              const areaDist = calcCoordinatesDists(area.label_location, camera.location);
              return areaDist < accDist ? area : acc;
            });
          } else {
            camera.area = {
              name: 'Singapore'
            }
          }
          console.log(camera);
          const forecastData = weatherData?.items[0]?.forecasts?.find((area)=>area.area === camera.area.name);
          camera.area.forecast = forecastData ? forecastData.forecast : "";
        });
        traffic_json.items[0].cameras =
          traffic_json.items[0].cameras.toSorted((a, b) => a.camera_id - b.camera_id);
  
        // return list of cameras
        return traffic_json.items[0];
      }
    },
    enabled: weatherData?.area_metadata !== undefined,
    staleTime: Infinity,
    cacheTime: Infinity,
    retry: 1
  })
} 