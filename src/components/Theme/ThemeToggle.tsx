'use client';
import React from 'react';
import { Switch, FormControlLabel, Box } from '@mui/material';
import { useTheme } from './ThemeProvider';
import { useMiningPoolsStore } from '@/store/pools';

export default function ThemeToggle() {
  const { isDarkMode, toggleTheme } = useTheme();
  const isMobile = useMiningPoolsStore((s) => s.isMobile);

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
