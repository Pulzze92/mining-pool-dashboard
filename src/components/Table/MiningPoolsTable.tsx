import React from 'react';
import { MiningPool } from '@/data/mining-pools';

interface MiningPoolTableProps {
  data: MiningPool[];
}

const MiningPoolTable = ({ data }: MiningPoolTableProps) => {
  const getRejectRate = (rejectRate: number) => {
    return (rejectRate * 100).toFixed(2) + '%';
  };

  const getStatusColor = (status: string) => {
    return status === 'online'
      ? 'bg-green-100 text-green-700'
      : status === 'degraded'
        ? 'bg-yellow-100 text-yellow-700'
        : 'bg-red-100 text-red-700';
  };

  const getColumns = (data: MiningPool[]) => {
    if (!data.length) return [];

    return Object.keys(data[0]).map((key) => ({
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
          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(value)}`}>
            {value}
          </span>
        );
      default:
        return (value: any) => value;
    }
  };

  const columns = getColumns(data);

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
      <table className="min-w-full">
        <thead className="bg-gray-50 border-b-2 border-gray-200">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-widerr"
              >
                <div className="flex justify-center">{column.label}</div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((pool) => (
            <tr key={pool.id} className="border-t hover:bg-gray-50">
              {columns.map((column) => (
                <td key={column.key} className="px-4 py-2 text-gray-900">
                  <div className="flex justify-center">
                    {column.render(pool[column.key as keyof MiningPool] as never)}
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MiningPoolTable;
