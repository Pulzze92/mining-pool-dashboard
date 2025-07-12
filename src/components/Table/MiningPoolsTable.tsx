import React from 'react';
import { MiningPool } from '@/data/mining-pools';

interface MiningPoolTableProps {
  data: MiningPool[];
}

const MiningPoolTable = ({ data }: MiningPoolTableProps) => {
  const rejectRateCalc = (rejectRate: number) => {
    return (rejectRate * 100).toFixed(2) + '%';
  };

  const statusView = (status: string) => {
    return status === 'online'
      ? 'bg-green-100 text-green-700'
      : status === 'degraded'
        ? 'bg-yellow-100 text-yellow-700'
        : 'bg-red-100 text-red-700';
  };

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
      <table className="min-w-full">
        <thead className="bg-gray-50 border-b-2 border-gray-200">
          <tr>
            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-widerr">
              <div className="flex justify-center">ID</div>
            </th>
            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-widerr">
              <div className="flex justify-center">Name</div>
            </th>
            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-widerr">
              <div className="flex justify-center">Hashrate (TH/s)</div>
            </th>
            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-widerr">
              <div className="flex justify-center">Active Workers</div>
            </th>
            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-widerr">
              <div className="flex justify-center">Reject Rate</div>
            </th>
            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-widerr">
              <div className="flex justify-center">Status</div>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((pool) => (
            <tr key={pool.id} className="border-t hover:bg-gray-50">
              <td className="px-4 py-2 text-gray-900 justify-center">
                <div className="flex justify-center">{pool.id}</div>
              </td>
              <td className="px-4 py-2 text-gray-900 justify-center">
                <div className="flex justify-center">{pool.name}</div>
              </td>
              <td className="px-4 py-2 text-gray-900 justify-center">
                <div className="flex justify-center">{pool.hashrateTHs}</div>
              </td>
              <td className="px-4 py-2 text-gray-900 justify-center">
                <div className="flex justify-center">{pool.activeWorkers}</div>
              </td>
              <td className="px-4 py-2 text-gray-900 justify-center">
                <div className="flex justify-center">{rejectRateCalc(pool.rejectRate)}</div>
              </td>
              <td className="px-4 py-2 text-gray-900 justify-center">
                <div
                  className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${statusView(pool.status)}`}
                >
                  <div className="flex justify-center">{pool.status}</div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MiningPoolTable;
