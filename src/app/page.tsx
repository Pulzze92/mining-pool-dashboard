'use client';
import MiningPoolTable from '@/components/Table/MiningPoolsTable';
import { useMiningPoolsStore } from '@/store/pools';
import { useEffect } from 'react';

import Spinner from '@/components/Spinner/Spinner';
import ErrorToast from '@/components/Toast/ErrorToast/ErrorToast';

export default function Home() {
  const { pools, isLoading, error, fetchPools, clearError } = useMiningPoolsStore();

  useEffect(() => {
    fetchPools();
  }, [fetchPools]);

  if (isLoading) {
    return <Spinner message="Загружаем данные..." />;
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1 className="text-4xl font-bold text-gray-200 mb-8 w-full text-center">
          Mining Pools Dashboard
        </h1>
        <div className="flex flex-col gap-4">
          <MiningPoolTable data={pools} />
        </div>
      </main>
      <ErrorToast open={!!error} message={error || ''} onClose={clearError} />
    </div>
  );
}
