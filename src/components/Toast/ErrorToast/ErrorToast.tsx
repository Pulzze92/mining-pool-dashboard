'use client';

import React from 'react';
import { Snackbar, Alert, AlertTitle } from '@mui/material';

interface ErrorToastProps {
  open: boolean;
  message: string;
  onClose: () => void;
}

export default function ErrorToast({ open, message, onClose }: ErrorToastProps) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={onClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert onClose={onClose} severity="error" variant="filled" sx={{ width: '100%' }}>
        <AlertTitle>Ошибка</AlertTitle>
        {message}
      </Alert>
    </Snackbar>
  );
}
