/* eslint-disable react/display-name */
import React, { useState, useMemo } from 'react';
import { MiningPool } from '@/types/pool';
import {
  IconButton,
  Tooltip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import { useMiningPoolsStore } from '@/store/pools';
import InfoIcon from '@mui/icons-material/Info';
import PoolDetailsModal from '../Modal/PoolDetailsModal';

interface MiningPoolTableProps {
  data: MiningPool[];
}

const numericFields: (keyof MiningPool)[] = [
  'id',
  'hashrateTHs',
  'activeWorkers',
  'rejectRate',
  'uptimePercent',
  'feePercent',
  'last24hRevenueBTC',
];

const MiningPoolTable = ({ data }: MiningPoolTableProps) => {
  const [selectedPool, setSelectedPool] = useState<MiningPool | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState<keyof MiningPool>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const { fetchPoolById } = useMiningPoolsStore();

  const handleInfoClick = async (pool: MiningPool) => {
    setSelectedPool(pool);
    setModalOpen(true);
    setIsLoadingDetails(true);

    try {
      const detailedPool = await fetchPoolById(pool.id.toString());
      if (detailedPool) {
        setSelectedPool(detailedPool);
      }
    } catch {
      // error handling
    } finally {
      setIsLoadingDetails(false);
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedPool(null);
  };

  const getRejectRate = (rejectRate: number) => {
    return (rejectRate * 100).toFixed(2) + '%';
  };

  const getStatusColor = (status: string) => {
    return status === 'online' ? 'success' : status === 'degraded' ? 'warning' : 'error';
  };

  const getColumnWidth = (key: string) => {
    const widthMap: Record<string, string> = {
      id: '60px',
      name: '200px',
      hashrateTHs: '120px',
      activeWorkers: '120px',
      rejectRate: '100px',
      status: '90px',
    };
    return widthMap[key] || '100px';
  };

  const getColumns = () => {
    const allowedColumns = ['id', 'name', 'hashrateTHs', 'activeWorkers', 'rejectRate', 'status'];
    return allowedColumns.map((key) => ({
      key,
      label: key.toUpperCase(),
      render: getRenderFunction(key) as (value: string | number) => React.ReactNode,
    }));
  };

  const getRenderFunction = (key: string) => {
    switch (key) {
      case 'rejectRate':
        return (value: number) => getRejectRate(value);
      case 'status':
        return (value: string) => (
          <Chip label={value} color={getStatusColor(value)} size="small" variant="outlined" />
        );
      default:
        return (value: string | number) => value;
    }
  };

  const columns = getColumns();

  const filteredAndSortedData = useMemo(() => {
    const filtered = data.filter(pool => {
      const matchesStatus = statusFilter === 'all' || pool.status === statusFilter;
      return matchesStatus;
    });

    filtered.sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];
      if (numericFields.includes(sortBy)) {
        aValue = Number(aValue);
        bValue = Number(bValue);
      }
      const comparison = aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      return sortOrder === 'asc' ? comparison : -comparison;
    });

    return filtered;
  }, [data, statusFilter, sortBy, sortOrder]);

  const handleSort = (column: keyof MiningPool) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  return (
    <>
      {/* Filters */}
      <Box sx={{ mb: 2, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel>Status</InputLabel>
          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            label="Status"
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="online">Online</MenuItem>
            <MenuItem value="degraded">Degraded</MenuItem>
            <MenuItem value="offline">Offline</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 3 }}>
        <Table sx={{ minWidth: '100%' }}>
          <TableHead>
            <TableRow sx={{ backgroundColor: 'background.default' }}>
              {columns.map((column) => (
                <TableCell
                  key={column.key}
                  onClick={() => handleSort(column.key as keyof MiningPool)}
                  sx={{
                    px: 3,
                    py: 2,
                    textAlign: 'center',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    color: 'text.secondary',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    borderBottom: 2,
                    borderColor: 'grey.200',
                    width: getColumnWidth(column.key),
                    cursor: 'pointer',
                    '&:hover': { backgroundColor: 'action.hover' },
                    position: 'relative',
                  }}
                >
                  {column.label}
                  {sortBy === column.key && (
                    <Box component="span" sx={{ ml: 0.5, fontSize: '0.6rem' }}>
                      {sortOrder === 'asc' ? '↑' : '↓'}
                    </Box>
                  )}
                </TableCell>
              ))}
              <TableCell
                sx={{
                  px: 1.5,
                  py: 2,
                  textAlign: 'center',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  color: 'text.secondary',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  borderBottom: 2,
                  borderColor: 'grey.200',
                  width: '64px',
                }}
              >
                Details
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredAndSortedData.map((pool) => (
              <TableRow
                key={pool.id}
                sx={{
                  '&:hover': { backgroundColor: 'action.hover' },
                  cursor: 'pointer',
                }}
              >
                {columns.map((column) => (
                  <TableCell
                    key={column.key}
                    sx={{
                      px: 2,
                      py: 1.5,
                      textAlign: 'center',
                      color: 'text.primary',
                      borderBottom: 1,
                      borderColor: 'grey.200',
                    }}
                    onClick={() => handleInfoClick(pool)}
                  >
                    {column.render(pool[column.key as keyof MiningPool] as string | number)}
                  </TableCell>
                ))}
                <TableCell
                  sx={{
                    px: 1.5,
                    py: 2,
                    textAlign: 'center',
                    borderBottom: 1,
                    borderColor: 'grey.200',
                  }}
                >
                  <Tooltip title="Details">
                    <IconButton
                      size="small"
                      onClick={() => handleInfoClick(pool)}
                      sx={{ color: 'grey.600' }}
                    >
                      <InfoIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <PoolDetailsModal
        open={modalOpen}
        onClose={handleCloseModal}
        pool={selectedPool}
        isLoading={isLoadingDetails}
        error={null}
      />
    </>
  );
};

export default MiningPoolTable;
