import * as React from 'react';
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  useMediaQuery
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useEffect } from 'react';
import { useGetWeather } from 'hooks/useGetWeather';
import { useGetTrafficImages } from 'hooks/useGetTrafficImages';

export default function LocationsListView({selectedDatetime, onChange}) {

  const theme = useTheme();
  const isDesktopWidth = useMediaQuery(theme.breakpoints.up('sm'));

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
  }, [trafficImagesData, setSelectedLocation]);

  function truncateDecimalPlaces(number) {
    const str = number.toString();
    return Number(str.slice(0, str.indexOf(".") + 2));
  }

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
              <MenuItem key={camera.camera_id} value={camera.camera_id}>Cam {camera.camera_id} at {camera.area.name} ({
                isDesktopWidth ? (
                  <Box component="span">{camera.location.latitude}, {camera.location.longitude}</Box>
                ) : (
                  <Box component="span">{truncateDecimalPlaces(camera.location.latitude)},{truncateDecimalPlaces(camera.location.longitude)}</Box>
                )
              })</MenuItem>
            ))
          } 
    )
        </Select>
      </FormControl>
    </Box>
  );
}
