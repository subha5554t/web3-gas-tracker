'use client';

import { useGasStore, Chain } from '../store/gasStore';

const CHAINS = [
  { id: 'ethereum' as Chain, name: 'Ethereum', color: 'bg-blue-500' },
  { id: 'polygon' as Chain, name: 'Polygon', color: 'bg-purple-500' },
  { id: 'arbitrum' as Chain, name: 'Arbitrum', color: 'bg-cyan-500' }
];

export default function ChainSelector() {
  const { selectedChain, mode, setSelectedChain, setMode } = useGasStore();

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold mb-2">Network Selection</h2>
          <div className="flex flex-wrap gap-2">
            {CHAINS.map((chain) => (
              <button
                key={chain.id}
                onClick={() => setSelectedChain(chain.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedChain === chain.id
                    ? `${chain.color} text-white`
                    : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                }`}
              >
                {chain.name}
              </button>
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="text-sm font-medium text-gray-600 mb-2">Mode</h3>
          <div className="flex bg-gray-200 rounded-lg p-1">
            <button
              onClick={() => setMode('live')}
              className={`px-4 py-1 rounded-md text-sm font-medium transition-colors ${
                mode === 'live'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600'
              }`}
            >
              Live
            </button>
            <button
              onClick={() => setMode('simulation')}
              className={`px-4 py-1 rounded-md text-sm font-medium transition-colors ${
                mode === 'simulation'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600'
              }`}
            >
              Simulation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
