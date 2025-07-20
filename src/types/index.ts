export type Chain = 'ethereum' | 'polygon' | 'arbitrum';

export interface GasData {
  baseFee: number;
  priorityFee: number;
  slow: number;
  standard: number;
  fast: number;
}

export interface WalletState {
  address: string | null;
  balance: string;
  isConnected: boolean;
}

export interface TransactionType {
  id: string;
  name: string;
  gasLimit: number;
}
