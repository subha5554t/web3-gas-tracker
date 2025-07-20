'use client';

import { useState } from 'react';
import { useGasStore } from '../store/gasStore';

const TRANSACTION_TYPES = [
  { id: 'transfer', name: 'ETH Transfer', gasLimit: 21000 },
  { id: 'erc20', name: 'ERC-20 Transfer', gasLimit: 65000 },
  { id: 'uniswap', name: 'Uniswap Swap', gasLimit: 150000 },
  { id: 'nft', name: 'NFT Transfer', gasLimit: 85000 }
];

export default function SimulationInput() {
  const [selectedType, setSelectedType] = useState('transfer');
  const [amount, setAmount] = useState('0.1');
  const { selectedChain, chains } = useGasStore();
  
  const currentTxType = TRANSACTION_TYPES.find(t => t.id === selectedType);
  const currentChain = chains[selectedChain];
  
  const calculateCosts = () => {
    if (!currentTxType) return { slow: 0, standard: 0, fast: 0 };
    
    return {
      slow: (currentChain.slow * currentTxType.gasLimit) / 1e18,
      standard: (currentChain.standard * currentTxType.gasLimit) / 1e18,
      fast: (currentChain.fast * currentTxType.gasLimit) / 1e18
    };
  };

  const costs = calculateCosts();

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Transaction Simulation</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Transaction Type
          </label>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {TRANSACTION_TYPES.map((type) => (
              <option key={type.id} value={type.id}>
                {type.name} ({type.gasLimit.toLocaleString()} gas)
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Amount (ETH)
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            step="0.01"
            min="0"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="font-medium mb-3">Estimated Gas Costs</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-green-600">Slow:</span>
              <span className="font-medium">{costs.slow.toFixed(6)} ETH</span>
            </div>
            <div className="flex justify-between">
              <span className="text-yellow-600">Standard:</span>
              <span className="font-medium">{costs.standard.toFixed(6)} ETH</span>
            </div>
            <div className="flex justify-between">
              <span className="text-red-600">Fast:</span>
              <span className="font-medium">{costs.fast.toFixed(6)} ETH</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
