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
  <Box textAlign="center" sx={{ p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
    <Typography variant="h6" color="primary">
      {value}
    </Typography>
    <Typography variant="body2" color="textSecondary">
      {label}
    </Typography>
  </Box>
);

const BasicInfoSection = ({ pool }: { pool: MiningPool }) => (
  <InfoSection title="Basic information">
    <Box display="grid" gridTemplateColumns="repeat(3, 1fr)" gap={2}>
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

const PerformanceSection = ({ pool }: { pool: MiningPool }) => (
  <InfoSection title="Performance">
    <Box display="grid" gridTemplateColumns="repeat(3, 1fr)" gap={2}>
      <InfoField label="24h revenue (BTC)" value={pool.last24hRevenueBTC} suffix=" BTC" />
      <InfoField label="Uptime" value={pool.uptimePercent} suffix="%" />
      <InfoField label="Fee" value={pool.feePercent} suffix="%" />
    </Box>
  </InfoSection>
);

const StatisticsSection = ({ pool }: { pool: MiningPool }) => (
  <InfoSection title="Statistics">
    <Box display="grid" gridTemplateColumns="repeat(4, 1fr)" gap={2}>
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
}: {
  isLoading: boolean;
  error: string | null;
  pool: MiningPool | null;
}) => {
  const isMobile = useMiningPoolsStore((s) => s.isMobile);

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
    <Box display="grid" gap={4} sx={{ width: isMobile ? '50%' : '100%' }}>
      <BasicInfoSection pool={pool} />
      <PerformanceSection pool={pool} />
      <StatisticsSection pool={pool} />
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
        sx: { borderRadius: 2, minWidth: isMobile ? undefined : 500 },
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
        sx={{ p: isMobile ? 2 : 5, mt: isMobile ? 2 : 5, display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <ModalContent isLoading={isLoading} error={error} pool={pool} />
      </DialogContent>
      <DialogActions sx={{ p: isMobile ? 2 : 3 }}>
        <Button onClick={onClose} variant="contained" color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
