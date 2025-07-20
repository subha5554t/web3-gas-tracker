'use client';

import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

declare global {
  interface Window {
    ethereum?: any;
  }
}

export default function WalletConnector() {
  const [account, setAccount] = useState<string | null>(null);
  const [ethBalance, setEthBalance] = useState<string>('0');
  const [arbBalance, setArbBalance] = useState<string>('0');
  const [connecting, setConnecting] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    // Check if already connected
    if (typeof window !== 'undefined' && window.ethereum) {
      window.ethereum.request({ method: 'eth_accounts' })
        .then((accounts: string[]) => {
          if (accounts.length > 0) {
            setAccount(accounts[0]);
          }
        })
        .catch(console.error);
    }
  }, []);

  useEffect(() => {
    if (account && isClient) {
      fetchBalances();
    }
  }, [account, isClient]);

  const connectWallet = async () => {
    if (!isClient || !window.ethereum) {
      alert('Please install MetaMask!');
      return;
    }

    setConnecting(true);
    try {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      });
      setAccount(accounts[0]);
    } catch (error: any) {
      console.error('Connection failed:', error);
      if (error.code === 4001) {
        alert('Connection rejected by user');
      } else {
        alert('Failed to connect wallet');
      }
    } finally {
      setConnecting(false);
    }
  };

  const fetchBalances = async () => {
    if (!account || !window.ethereum) return;

    try {
      // Ethereum balance
      const provider = new ethers.BrowserProvider(window.ethereum);
      const balance = await provider.getBalance(account);
      setEthBalance(parseFloat(ethers.formatEther(balance)).toFixed(4));

      // Arbitrum balance (using public RPC)
      const arbProvider = new ethers.JsonRpcProvider('https://arb1.arbitrum.io/rpc');
      const arbBal = await arbProvider.getBalance(account);
      setArbBalance(parseFloat(ethers.formatEther(arbBal)).toFixed(4));
    } catch (error) {
      console.error('Failed to fetch balances:', error);
    }
  };

  const disconnectWallet = () => {
    setAccount(null);
    setEthBalance('0');
    setArbBalance('0');
  };

  if (!isClient) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Wallet Connection</h2>
      
      {!account ? (
        <button
          onClick={connectWallet}
          disabled={connecting}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-2 rounded-lg font-medium transition-colors"
        >
          {connecting ? 'Connecting...' : 'Connect MetaMask'}
        </button>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Connected Address</p>
              <p className="font-mono text-lg">
                {account.slice(0, 6)}...{account.slice(-4)}
              </p>
            </div>
            <button
              onClick={disconnectWallet}
              className="text-red-600 hover:text-red-800 text-sm"
            >
              Disconnect
            </button>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Ethereum Balance</p>
              <p className="text-xl font-bold">{ethBalance} ETH</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Arbitrum Balance</p>
              <p className="text-xl font-bold">{arbBalance} ETH</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
