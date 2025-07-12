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

interface PoolDetailsModalProps {
  open: boolean;
  onClose: () => void;
  pool: MiningPool | null;
  isLoading: boolean;
  error: string | null;
}

// Компонент для отображения статуса пула
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
  <InfoSection title="Основная информация">
    <Box display="grid" gridTemplateColumns="repeat(3, 1fr)" gap={2}>
      <InfoField label="Название пула" value={pool.name} />
      <InfoField label="Локация" value={pool.location} />
      <Box>
        <Typography variant="body2" color="textSecondary">
          Статус
        </Typography>
        <PoolStatusChip status={pool.status} />
      </Box>
    </Box>
  </InfoSection>
);

const PerformanceSection = ({ pool }: { pool: MiningPool }) => (
  <InfoSection title="Производительность">
    <Box display="grid" gridTemplateColumns="repeat(3, 1fr)" gap={2}>
      <InfoField label="Доходы за 24ч (BTC)" value={pool.last24hRevenueBTC} suffix=" BTC" />
      <InfoField label="Время работы" value={pool.uptimePercent} suffix="%" />
      <InfoField label="Комиссия" value={pool.feePercent} suffix="%" />
    </Box>
  </InfoSection>
);

const StatisticsSection = ({ pool }: { pool: MiningPool }) => (
  <InfoSection title="Статистика">
    <Box display="grid" gridTemplateColumns="repeat(4, 1fr)" gap={2}>
      <StatCard value={pool.hashrateTHs} label="TH/s" />
      <StatCard value={pool.activeWorkers} label="Воркеры" />
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
    <Box display="grid" gap={4}>
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
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: { borderRadius: 2 },
      }}
    >
      <DialogTitle sx={{ bgcolor: 'gray', color: 'white', textAlign: 'center' }}>
        {pool ? `Детали пула: ${pool.name}` : 'Загрузка...'}
      </DialogTitle>

      <DialogContent
        sx={{ p: 5, mt: 5, display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <ModalContent isLoading={isLoading} error={error} pool={pool} />
      </DialogContent>

      <DialogActions sx={{ p: 3 }}>
        <Button onClick={onClose} variant="contained" color="primary">
          Закрыть
        </Button>
      </DialogActions>
    </Dialog>
  );
}
