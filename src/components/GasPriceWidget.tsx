'use client';

import { useEffect } from 'react';
import { useGasStore } from '../store/gasStore';
import { formatGwei } from '../utils/formatters';

export default function GasPriceWidget() {
  const { chains, selectedChain, updateGas, mode } = useGasStore();
  const currentChain = chains[selectedChain];

  useEffect(() => {
    if (mode === 'live') {
      const interval = setInterval(() => {
        // Simulate gas price updates
        const baseVariation = (Math.random() - 0.5) * 2000000000; // ±2 Gwei
        const priorityVariation = (Math.random() - 0.5) * 1000000000; // ±1 Gwei
        
        updateGas(selectedChain, {
          baseFee: Math.max(1000000000, currentChain.baseFee + baseVariation),
          priorityFee: Math.max(500000000, currentChain.priorityFee + priorityVariation),
          slow: Math.max(1000000000, currentChain.slow + baseVariation * 0.8),
          standard: Math.max(1000000000, currentChain.standard + baseVariation),
          fast: Math.max(1000000000, currentChain.fast + baseVariation * 1.2)
        });
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [mode, selectedChain, currentChain, updateGas]);

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">
        Gas Prices - {selectedChain.charAt(0).toUpperCase() + selectedChain.slice(1)}
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="text-green-800 font-medium">Slow</div>
          <div className="text-2xl font-bold text-green-900">
            {formatGwei(currentChain.slow)}
          </div>
          <div className="text-sm text-green-600">~5+ min</div>
        </div>
        
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="text-yellow-800 font-medium">Standard</div>
          <div className="text-2xl font-bold text-yellow-900">
            {formatGwei(currentChain.standard)}
          </div>
          <div className="text-sm text-yellow-600">~2-3 min</div>
        </div>
        
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="text-red-800 font-medium">Fast</div>
          <div className="text-2xl font-bold text-red-900">
            {formatGwei(currentChain.fast)}
          </div>
          <div className="text-sm text-red-600">~30 sec</div>
        </div>
      </div>
      

      <div className="border-t pt-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-600">Base Fee:</span>
            <span className="ml-2 font-medium">{formatGwei(currentChain.baseFee)}</span>
          </div>
          <div>
            <span className="text-gray-600">Priority Fee:</span>
            <span className="ml-2 font-medium">{formatGwei(currentChain.priorityFee)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
