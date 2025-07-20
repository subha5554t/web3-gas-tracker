import { create } from 'zustand';

export type GasPoint = {
  timestamp: number;
  baseFee: number;
  priorityFee: number;
  slow: number;
  standard: number;
  fast: number;
};

export type ChainState = {
  baseFee: number;
  priorityFee: number;
  slow: number;
  standard: number;
  fast: number;
  history: GasPoint[];
};

export type Chain = 'ethereum' | 'polygon' | 'arbitrum';

type GasStore = {
  mode: 'live' | 'simulation';
  selectedChain: Chain;
  chains: Record<Chain, ChainState>;
  usdPrice: number;
  isLoading: boolean;
  error: string | null;
  setMode: (mode: 'live' | 'simulation') => void;
  setSelectedChain: (chain: Chain) => void;
  updateGas: (chain: Chain, gasData: Partial<ChainState>) => void;
  setUsdPrice: (price: number) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
};

export const useGasStore = create<GasStore>((set, get) => ({
  mode: 'live',
  selectedChain: 'ethereum',
  chains: {
    ethereum: {
      baseFee: 15000000000,
      priorityFee: 2000000000,
      slow: 13000000000,
      standard: 15000000000,
      fast: 18000000000,
      history: []
    },
    polygon: {
      baseFee: 30000000000,
      priorityFee: 30000000000,
      slow: 30000000000,
      standard: 35000000000,
      fast: 40000000000,
      history: []
    },
    arbitrum: {
      baseFee: 100000000,
      priorityFee: 0,
      slow: 100000000,
      standard: 100000000,
      fast: 100000000,
      history: []
    }
  },
  usdPrice: 3200,
  isLoading: false,
  error: null,
  
  setMode: (mode) => set({ mode }),
  
  setSelectedChain: (chain) => set({ selectedChain: chain }),
  
  updateGas: (chain, gasData) => set((state) => {
    const currentChain = state.chains[chain];
    const updatedChain = { ...currentChain, ...gasData };
    
    // Add to history if we have new data
    if (gasData.baseFee || gasData.standard) {
      const now = Date.now();
      const newPoint: GasPoint = {
        timestamp: now,
        baseFee: updatedChain.baseFee,
        priorityFee: updatedChain.priorityFee,
        slow: updatedChain.slow,
        standard: updatedChain.standard,
        fast: updatedChain.fast
      };
      
      updatedChain.history = [
        ...currentChain.history.slice(-49), // Keep last 49 points
        newPoint
      ];
    }
    
    return {
      chains: {
        ...state.chains,
        [chain]: updatedChain
      }
    };
  }),
  
  setUsdPrice: (price) => set({ usdPrice: price }),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error })
}));
