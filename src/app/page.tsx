// src/app/page.tsx

'use client';

import React from "react";

// Import your components (make sure these files exist)
import WalletConnector from '../components/WalletConnector';
import ChainSelector from "../components/ChainSelector";
import GasPriceWidget from "../components/GasPriceWidget";
import SimulationInput from "../components/SimulationInput";
import ComparisonTable from "../components/ComparisonTable";
import CandlestickChart from "../components/CandlestickChart";





export default function Page() {
  return (
    <div className="space-y-8 p-6">
      <h1 className="text-2xl font-bold">🚀 Gas Tracker Dashboard</h1>

      {/* Render your gas tracker UI */}
      <ChainSelector />
      <GasPriceWidget />
      <SimulationInput />
      <ComparisonTable />
      <CandlestickChart />
    </div>
  );
}
