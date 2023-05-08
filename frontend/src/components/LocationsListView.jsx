import * as React from 'react';
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select
} from '@mui/material';
import { useEffect } from 'react';
import { useGetWeather } from 'hooks/useGetWeather';
import { useGetTrafficImages } from 'hooks/useGetTrafficImages';

export default function LocationsListView({selectedDatetime, onChange}) {

  const [selectedLocation, setSelectedLocation] = React.useState("");

  const {
    data: weatherData
  } = useGetWeather(selectedDatetime);
  const {
    isLoading,
    isError,
    error,
    data: trafficImagesData
  } = useGetTrafficImages(selectedDatetime, weatherData);

  useEffect(() => {
    if (!isLoading) {
      const foundcam = trafficImagesData?.cameras?.find((c) => c.camera_id === selectedLocation) || "";
      typeof onChange === 'function' && onChange(foundcam);
    }
  });

  return (
    <Box>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{ isLoading || isError ? "Status" : "Select Location"}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={ isLoading ? "loading" :
                  isError ? "error" :
                  Array.isArray(trafficImagesData.cameras) && trafficImagesData.cameras.find((c) => c.camera_id === selectedLocation) ? selectedLocation : ""}
          displayEmpty
          label={ isLoading || isError ? "Status" : "Select Location"}
          onChange={(event)=>{
              setSelectedLocation(event.target.value);
              typeof onChange === 'function' && Array.isArray(trafficImagesData.cameras) && onChange(trafficImagesData.cameras.find((c) => c.camera_id === event.target.value));
            }
          }>
          { isLoading ? (
              <MenuItem key="loading" value="loading">Loading...</MenuItem>
            ) : isError ? (
              <MenuItem key="error" value="error">Error: {error.message}</MenuItem>
            ) : Array.isArray(trafficImagesData.cameras) && trafficImagesData.cameras.map((camera) => (
              <MenuItem key={camera.camera_id} value={camera.camera_id}>Camera {camera.camera_id} at {camera.area.name} ({camera.location.latitude}, {camera.location.longitude})</MenuItem>
            ))
          } 
    )
        </Select>
      </FormControl>
    </Box>
  );
}
