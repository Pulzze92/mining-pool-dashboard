export interface MiningPool {
  id: string;
  name: string;
  hashrateTHs: number;
  activeWorkers: number;
  rejectRate: number;
  status: 'online' | 'degraded' | 'offline';
  last24hRevenueBTC: number;
  uptimePercent: number;
  location: string;
  feePercent: number;
}
