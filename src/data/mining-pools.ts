export interface MiningPool {
  id: string;
  name: string;
  hashrateTHs: number;
  activeWorkers: number;
  rejectRate: number;
  status: 'online' | 'degraded' | 'offline';
}

export const miningPools: MiningPool[] = [
  {
    id: 'pool-1',
    name: 'US East Pool',
    hashrateTHs: 830.5,
    activeWorkers: 1240,
    rejectRate: 0.012,
    status: 'online',
  },
  {
    id: 'pool-2',
    name: 'EU Central Pool',
    hashrateTHs: 460.3,
    activeWorkers: 876,
    rejectRate: 0.045,
    status: 'degraded',
  },
];
