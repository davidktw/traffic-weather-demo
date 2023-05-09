import * as React from 'react';
import { useState } from 'react';
import {
  Box,
  CssBaseline,
  Button
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker, TimePicker } from '@mui/x-date-pickers'
import dayjs from 'dayjs';
import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query'

import 'App.css';
import CameraView from 'components/CameraView';
import LocationsListView from 'components/LocationsListView';
import WeatherView from 'components/WeatherView';

const queryClient = new QueryClient();

const App = () => {

  const [selectedDatetime, setSelectedDatetime] = useState(dayjs(dayjs().format("YYYY-MM-DDTHH:mm:00")));
  const [selectedLocation, setSelectedLocation] = useState("");

  return (
    <Box sx={{ padding: 1.5, border: 1, borderRadius: 2, borderColor: 'grey.500', margin: 1 }}>
      <CssBaseline />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Grid container spacing={2} justify="center">
          <Grid container xs={8} sm={8}>
            <Grid xs={12} sm={6}>
              <DatePicker
                sx={{ width: 1 }}
                label="Select Date"
                value={selectedDatetime}
                format="DD/MM/YYYY"
                onChange={(value) => {
                  const dt = dayjs(`${dayjs(value).format("YYYY-MM-DD")}T${dayjs(selectedDatetime).format("HH:mm:00")}`)
                  if (dt.toString() !== "Invalid Date")
                    setSelectedDatetime(dt);
                }}
              />
            </Grid>
            <Grid xs={12} sm={6}>
              <TimePicker
                sx={{ width: 1 }}
                label="Select Time"
                value={selectedDatetime}
                ampm={false}
                onChange={(value) => {
                  const dt = dayjs(`${dayjs(selectedDatetime).format("YYYY-MM-DD")}T${dayjs(value).format("HH:mm:00")}`);
                  if (dt.toString() !== "Invalid Date")
                    setSelectedDatetime(dt);
                }}
              />
            </Grid>
          </Grid>
          <Grid xs={4} sm={4}>
            <Button
              sx={{ width: 1, height: 1 }}
              variant="contained"
              onClick={() => {
                  setSelectedDatetime(dayjs());
              }}>VIEW NOW</Button>
          </Grid>
          <Grid xs={12} sm={12}>
            <QueryClientProvider client={queryClient}>
              <LocationsListView
                selectedDatetime={dayjs(selectedDatetime).format()}
                onChange={(camera) => { setSelectedLocation(camera) }}
              />
            </QueryClientProvider>
          </Grid>
          <Grid container xs={12} sm={12} direction="row-reverse">
            <Grid xs={12} sm={4}>
              <WeatherView selectedLocation={selectedLocation}/>
            </Grid>
            <Grid xs={12} sm={8}>
              <CameraView selectedLocation={selectedLocation}/>
            </Grid>
          </Grid>
        </Grid>
      </LocalizationProvider>
    </Box>
  );
};

export default App;