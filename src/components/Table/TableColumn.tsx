import React from 'react';
import { MiningPool } from '@/data/mining-pools';

const getColumns = (data: MiningPool[]) => {
    if (!data.length) return [];

    return Object.keys(data[0]).map((key) => ({
        key,
        label: key.charAt(0).toUpperCase() + key.slice(1),
        render: (value: any) => value,
    }));
}

interface TableColumnProps<T> {
    key: keyof T;
    label: string;
    render: (value: T[keyof T]) => React.ReactNode;
    className?: string;
}

const TableColumn = <T,>({ key, label, render }: TableColumnProps<T>) => {
    return <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-widerr">{label}</th>;
};

export default TableColumn;