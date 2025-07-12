import React, { useState } from 'react';
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
  Typography,
} from '@mui/material';
import { useMiningPoolsStore } from '@/store/pools';
import InfoIcon from '@mui/icons-material/Info';
import PoolDetailsModal from '../Modal/PoolDetailsModal';

interface MiningPoolTableProps {
  data: MiningPool[];
}

const MiningPoolTable = ({ data }: MiningPoolTableProps) => {
  const [selectedPool, setSelectedPool] = useState<MiningPool | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);
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
    } catch (error) {
      console.error('Error fetching pool details:', error);
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

  const getColumns = (data: MiningPool[]) => {
    const allowedColumns = ['id', 'name', 'hashrateTHs', 'activeWorkers', 'rejectRate', 'status'];

    return allowedColumns.map((key) => ({
      key,
      label: key.toUpperCase(),
      render: getRenderFunction(key),
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
        return (value: any) => value;
    }
  };

  const columns = getColumns(data);

  return (
    <>
      <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 3 }}>
        <Table sx={{ minWidth: '100%' }}>
          <TableHead>
            <TableRow sx={{ backgroundColor: 'grey.50' }}>
              {columns.map((column) => (
                <TableCell
                  key={column.key}
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
                  }}
                >
                  {column.label}
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
                Действия
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((pool) => (
              <TableRow
                key={pool.id}
                sx={{
                  '&:hover': { backgroundColor: 'grey.50' },
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
                    {column.render(pool[column.key as keyof MiningPool] as never)}
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
                  <Tooltip title="Подробнее">
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
