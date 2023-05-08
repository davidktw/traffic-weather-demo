import * as React from 'react';
import { Box, Typography, Stack } from '@mui/material';
import { WEATHER_ICONS_PATH } from 'utils/Constants';

export default function WeatherView({selectedLocation}) {

  const availIcons = [
    'Cloudy',
    'Fair (Day)',
    'Fair (Night)',
    'Light Rain',
    'Light Showers',
    'Moderate Rain',
    'Partly Cloud (Day)',
    'Partly Cloudy (Night)',
    'Passing Showers',
    'Showers',
    'Thundery Showers',
    'Heavy Thundery Showers',
    'Heavy Thundery Showers with Gusty Winds',
    'Windy'
  ];

  const weatherIcon = selectedLocation?.area?.forecast && availIcons.indexOf(selectedLocation.area.forecast) > -1
                      ? `${WEATHER_ICONS_PATH}/${selectedLocation.area.forecast}.png`
                      : `${WEATHER_ICONS_PATH}/Cloudy.png`


  return selectedLocation?.area?.forecast ? (
    <Box sx={{ display:"flex", flexDirection: 'column', width: 1, border: 1, borderRadius: 1, borderColor: 'grey.400', padding: 1, alignItems: "center" }}>
      <Typography sx={{fontSize: 20, fontWeight: 'bold'}}>
        <span sx={{border: 1, width: 1, align: 'center', variant: "h2"}}>{selectedLocation.area.name}</span>
      </Typography>
      <Typography sx={{fontSize: 16, fontWeight: 'bold'}}>
        <span sx={{border: 1, width: 1, align: 'center', variant: "h2"}}>{selectedLocation.area.forecast}</span>
      </Typography>
      <Box component="img" sx={{ pt: 0.5, width: 0.4 }} src={weatherIcon} />
    </Box>
  ) : (
    <Box component={Stack} direction="column" justifyContent="center"
         sx={{ width: 1, border: 1, borderRadius: 1, borderColor: 'grey.400', backgroundColor: 'grey.300', height: 1, alignItems: "center"}}>
      <div>
        <Typography variant="h5" component="h3" sx={{ textAlign: "center"}}>NO DATA</Typography>
      </div>
    </Box>
  )
}