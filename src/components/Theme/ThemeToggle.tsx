'use client';
import React from 'react';
import { Switch, FormControlLabel, Box, useMediaQuery, useTheme as useMuiTheme } from '@mui/material';
import { useTheme } from './ThemeProvider';

export default function ThemeToggle() {
  const { isDarkMode, toggleTheme } = useTheme();
  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('sm'));

  return (
    <Box
      sx={
        isMobile
          ? { display: 'flex', justifyContent: 'center', mb: 2, position: 'static', top: 'auto', right: 'auto' }
          : { display: 'flex', justifyContent: 'flex-end', mb: 0, position: 'absolute', top: 16, right: 16, zIndex: 1000 }
      }
    >
      <FormControlLabel
        control={<Switch checked={isDarkMode} onChange={toggleTheme} color="primary" />}
        label={isDarkMode ? 'Dark mode' : 'Light mode'}
        sx={{
          '& .MuiFormControlLabel-label': {
            fontSize: '0.875rem',
            fontWeight: 500,
          },
        }}
      />
    </Box>
  );
}
