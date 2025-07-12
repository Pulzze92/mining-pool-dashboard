import { create } from 'zustand';
import { MiningPool } from '@/types/pool';

interface PoolsState {
  pools: MiningPool[];
  isLoading: boolean;
  error: string | null;
  isMobile: boolean;
  setIsMobile: (value: boolean) => void;

  fetchPools: () => Promise<void>;
  fetchPoolById: (id: string) => Promise<MiningPool | null>;
  clearError: () => void;
}

export const useMiningPoolsStore = create<PoolsState>((set) => ({
  pools: [],
  isLoading: false,
  error: null,
  isMobile: false,
  setIsMobile: (value) => set({ isMobile: value }),

  fetchPools: async () => {
    set({ isLoading: true, error: null });

    try {
      const response = await fetch('/api/mining-pools');

      if (!response.ok) {
        throw new Error(`Error! Status: ${response.status}`);
      }

      const pools = await response.json();
      set({ pools, isLoading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to load data',
        isLoading: false,
      });
    }
  },

  fetchPoolById: async (id: string) => {
    try {
      const response = await fetch(`/api/mining-pools/${id}`);

      if (!response.ok) {
        throw new Error(`Error! Status: ${response.status}`);
      }

      const pool = await response.json();
      return pool;
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to load pool',
      });
      return null;
    }
  },

  clearError: () => set({ error: null }),
}));
