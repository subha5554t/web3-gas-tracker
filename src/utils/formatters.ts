export function formatGwei(weiValue: number): string {
  return (weiValue / 1e9).toFixed(1) + ' Gwei';
}

export function formatUSD(amount: number): string {
  return '$' + amount.toFixed(2);
}

export function formatEther(weiValue: string | number): string {
  const value = typeof weiValue === 'string' ? parseFloat(weiValue) : weiValue;
  return (value / 1e18).toFixed(6) + ' ETH';
}

export function shortenAddress(address: string): string {
  return address.slice(0, 6) + '...' + address.slice(-4);
}
