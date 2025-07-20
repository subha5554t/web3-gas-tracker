export const CHAIN_INFO = {
  ethereum: {
    name: 'Ethereum',
    symbol: 'ETH',
    decimals: 18,
    rpc: process.env.NEXT_PUBLIC_ETH_MAINNET_RPC || 'https://eth-mainnet.g.alchemy.com/v2/demo',
    chainId: 1
  },
  polygon: {
    name: 'Polygon',
    symbol: 'MATIC',
    decimals: 18,
    rpc: process.env.NEXT_PUBLIC_POLYGON_RPC || 'https://polygon-rpc.com',
    chainId: 137
  },
  arbitrum: {
    name: 'Arbitrum',
    symbol: 'ETH',
    decimals: 18,
    rpc: process.env.NEXT_PUBLIC_ARBITRUM_RPC || 'https://arb1.arbitrum.io/rpc',
    chainId: 42161
  }
};

export const GAS_LIMITS = {
  transfer: 21000,
  erc20: 65000,
  uniswap: 150000,
  nft: 85000
};
