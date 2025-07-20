'use client';

import { useGasStore } from '../store/gasStore';
import { formatGwei, formatUSD } from '../utils/formatters';

export default function ComparisonTable() {
  const { chains, usdPrice } = useGasStore();
  
  const calculateUSDCost = (gasPrice: number, gasLimit: number = 21000) => {
    const ethCost = (gasPrice * gasLimit) / 1e18;
    return ethCost * usdPrice;
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Cross-Chain Comparison</h2>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-2 font-medium text-gray-700">Network</th>
              <th className="text-right py-3 px-2 font-medium text-gray-700">Standard Gas</th>
              <th className="text-right py-3 px-2 font-medium text-gray-700">USD Cost*</th>
              <th className="text-right py-3 px-2 font-medium text-gray-700">Status</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(chains).map(([chainName, chainData]) => (
              <tr key={chainName} className="border-b border-gray-100">
                <td className="py-3 px-2">
                  <div className="flex items-center">
                    <div className={`w-3 h-3 rounded-full mr-2 ${
                      chainName === 'ethereum' ? 'bg-blue-500' :
                      chainName === 'polygon' ? 'bg-purple-500' : 'bg-cyan-500'
                    }`}></div>
                    <span className="capitalize font-medium">{chainName}</span>
                  </div>
                </td>
                <td className="text-right py-3 px-2 font-mono">
                  {formatGwei(chainData.standard)}
                </td>
                <td className="text-right py-3 px-2">
                  {formatUSD(calculateUSDCost(chainData.standard))}
                </td>
                <td className="text-right py-3 px-2">
                  <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                    calculateUSDCost(chainData.standard) < 1 ? 'bg-green-100 text-green-800' :
                    calculateUSDCost(chainData.standard) < 5 ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {calculateUSDCost(chainData.standard) < 1 ? 'Low' :
                     calculateUSDCost(chainData.standard) < 5 ? 'Medium' : 'High'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <p className="text-xs text-gray-500 mt-3">
        *USD cost calculated for standard ETH transfer (21,000 gas) at ETH price of ${usdPrice.toLocaleString()}
      </p>
    </div>
  );
}
