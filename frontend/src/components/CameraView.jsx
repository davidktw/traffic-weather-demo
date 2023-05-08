import * as React from 'react';
import { Box } from '@mui/material';

export default function CameraView({selectedLocation}) {
  return (
    <Box
      component="img"
      sx={{ width: 1, border: 1, borderRadius: 1, borderColor: 'grey.400' }}
      src={selectedLocation !== "" ? selectedLocation.image : "./missing_image.png"}
    />
  );
}