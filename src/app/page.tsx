import MiningPoolTable from '@/components/Table/MiningPoolsTable';
import { miningPools } from '@/data/mining-pools';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Mining Pools Dashboard</h1>
        <div className="flex flex-col gap-4">
          <MiningPoolTable data={miningPools} />
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center"></footer>
    </div>
  );
}
