'use client';

import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Chip,
  Alert,
} from '@mui/material';
import { MiningPool } from '@/types/pool';
import Spinner from '../Spinner/Spinner';
import { useMiningPoolsStore } from '@/store/pools';

interface PoolDetailsModalProps {
  open: boolean;
  onClose: () => void;
  pool: MiningPool | null;
  isLoading: boolean;
  error: string | null;
}

const PoolStatusChip = ({ status }: { status: string }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
        return 'success';
      case 'degraded':
        return 'warning';
      default:
        return 'error';
    }
  };

  return <Chip label={status} color={getStatusColor(status)} size="small" sx={{ mt: 0.5 }} />;
};

const InfoSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <Box>
    <Typography variant="h6" gutterBottom color="primary">
      {title}
    </Typography>
    {children}
  </Box>
);

const InfoField = ({
  label,
  value,
  suffix = '',
}: {
  label: string;
  value: string | number;
  suffix?: string;
}) => (
  <Box>
    <Typography variant="body2" color="textSecondary">
      {label}
    </Typography>
    <Typography variant="body1" fontWeight="bold">
      {value}
      {suffix}
    </Typography>
  </Box>
);

const StatCard = ({ value, label }: { value: string | number; label: string }) => (
  <Box
    textAlign="center"
    sx={{
      p: 2,
      bgcolor: (theme) =>
        theme.palette.mode === 'dark' ? theme.palette.grey[900] : theme.palette.grey[100],
      borderRadius: 1,
    }}
  >
    <Typography variant="h6" color="primary">
      {value}
    </Typography>
    <Typography variant="body2" sx={{ color: (theme) => theme.palette.text.secondary }}>
      {label}
    </Typography>
  </Box>
);

const BasicInfoSection = ({ pool, isMobile }: { pool: MiningPool; isMobile: boolean }) => (
  <InfoSection title="Basic information">
    <Box
      display={isMobile ? 'flex' : 'grid'}
      flexDirection={isMobile ? 'column' : undefined}
      gridTemplateColumns={isMobile ? undefined : 'repeat(3, 1fr)'}
      gap={2}
    >
      <InfoField label="Pool name" value={pool.name} />
      <InfoField label="Location" value={pool.location} />
      <Box>
        <Typography variant="body2" color="textSecondary">
          Status
        </Typography>
        <PoolStatusChip status={pool.status} />
      </Box>
    </Box>
  </InfoSection>
);

const PerformanceSection = ({ pool, isMobile }: { pool: MiningPool; isMobile: boolean }) => (
  <InfoSection title="Performance">
    <Box
      display={isMobile ? 'flex' : 'grid'}
      flexDirection={isMobile ? 'column' : undefined}
      gridTemplateColumns={isMobile ? undefined : 'repeat(3, 1fr)'}
      gap={2}
    >
      <InfoField label="24h revenue (BTC)" value={pool.last24hRevenueBTC} suffix=" BTC" />
      <InfoField label="Uptime" value={pool.uptimePercent} suffix="%" />
      <InfoField label="Fee" value={pool.feePercent} suffix="%" />
    </Box>
  </InfoSection>
);

const StatisticsSection = ({ pool, isMobile }: { pool: MiningPool; isMobile: boolean }) => (
  <InfoSection title="Statistics">
    <Box
      display={isMobile ? 'flex' : 'grid'}
      flexDirection={isMobile ? 'column' : undefined}
      gridTemplateColumns={isMobile ? undefined : 'repeat(4, 1fr)'}
      gap={2}
    >
      <StatCard value={pool.hashrateTHs} label="TH/s" />
      <StatCard value={pool.activeWorkers} label="Workers" />
      <StatCard value={`${(pool.rejectRate * 100).toFixed(2)}%`} label="Reject Rate" />
      <StatCard value={`${pool.uptimePercent}%`} label="Uptime" />
    </Box>
  </InfoSection>
);

const ModalContent = ({
  isLoading,
  error,
  pool,
  isMobile,
}: {
  isLoading: boolean;
  error: string | null;
  pool: MiningPool | null;
  isMobile: boolean;
}) => {
  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" py={4}>
        <Spinner />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mb: 2 }}>
        {error}
      </Alert>
    );
  }

  if (!pool) {
    return null;
  }

  return (
    <Box display="flex" flexDirection="column" gap={4}>
      <BasicInfoSection pool={pool} isMobile={isMobile} />
      <PerformanceSection pool={pool} isMobile={isMobile} />
      <StatisticsSection pool={pool} isMobile={isMobile} />
    </Box>
  );
};

export default function PoolDetailsModal({
  open,
  onClose,
  pool,
  isLoading,
  error,
}: PoolDetailsModalProps) {
  const isMobile = useMiningPoolsStore((s) => s.isMobile);
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={isMobile ? 'xs' : 'md'}
      fullWidth
      PaperProps={{
        sx: { borderRadius: 2 },
      }}
      BackdropProps={{
        sx: {
          backdropFilter: 'blur(8px)',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
      }}
    >
      <DialogTitle sx={{ bgcolor: 'primary.main', color: 'white', textAlign: 'center' }}>
        {pool ? `Pool: ${pool.name}` : 'Loading...'}
      </DialogTitle>
      <DialogContent
        sx={{
          p: isMobile ? 2 : 5,
          mt: isMobile ? 2 : 5,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: isMobile ? '100%' : undefined,
        }}
      >
        <ModalContent isLoading={isLoading} error={error} pool={pool} isMobile={isMobile} />
      </DialogContent>
      <DialogActions sx={{ p: isMobile ? 2 : 3 }}>
        <Button onClick={onClose} variant="contained" color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
