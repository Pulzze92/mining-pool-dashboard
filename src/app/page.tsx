'use client';
import MiningPoolTable from '@/components/Table/MiningPoolsTable';
import { useMiningPoolsStore } from '@/store/pools';
import { useEffect } from 'react';
import { Box, Typography, Container } from '@mui/material';
import ThemeToggle from '@/components/Theme/ThemeToggle';

import Spinner from '@/components/Spinner/Spinner';
import ErrorToast from '@/components/Toast/ErrorToast/ErrorToast';

export default function Home() {
  const { pools, isLoading, error, fetchPools, clearError } = useMiningPoolsStore();

  useEffect(() => {
    fetchPools();
  }, [fetchPools]);

  if (isLoading) {
    return <Spinner message="Loading..." />;
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ mb: 4, textAlign: 'center', position: 'relative' }}>
        <ThemeToggle />
        <Typography variant="h3" component="h1" gutterBottom color="text.primary" fontWeight="bold">
          Mining Pools Dashboard
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <MiningPoolTable data={pools} />
      </Box>

      <ErrorToast open={!!error} message={error || ''} onClose={clearError} />
    </Container>
  );
}
