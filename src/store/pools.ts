import { create } from 'zustand';
import { MiningPool } from '@/types/pool';

interface PoolsState {
  pools: MiningPool[];
  isLoading: boolean;
  error: string | null;

  fetchPools: () => Promise<void>;
  fetchPoolById: (id: string) => Promise<MiningPool | null>;
  clearError: () => void;
}

export const useMiningPoolsStore = create<PoolsState>((set, get) => ({
  pools: [],
  isLoading: false,
  error: null,

  fetchPools: async () => {
    set({ isLoading: true, error: null });

    try {
      const response = await fetch('/api/mining-pools');

      if (!response.ok) {
        throw new Error(`Ошибка! Статус: ${response.status}`);
      }

      const pools = await response.json();
      set({ pools, isLoading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Ошибка загрузки данных',
        isLoading: false,
      });
    }
  },

  fetchPoolById: async (id: string) => {
    try {
      const response = await fetch(`/api/mining-pools/${id}`);

      if (!response.ok) {
        throw new Error(`Ошибка! Статус: ${response.status}`);
      }

      const pool = await response.json();
      return pool;
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Ошибка загрузки пула',
      });
      return null;
    }
  },

  clearError: () => set({ error: null }),
}));
