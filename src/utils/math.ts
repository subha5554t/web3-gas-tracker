import { BigNumber, formatUnits } from "ethers";

export function sqrtPriceX96ToPrice(sqrtPriceX96: bigint) {
  // price = (sqrtPriceX96 ** 2 * 1e12) / 2 ** 192
  // sqrtPriceX96 should be a BigInt (ethers v6: result from event)
  const numerator = sqrtPriceX96 * sqrtPriceX96 * 1_000_000_000_000n; // 1e12
  const denominator = 6277101735386680763835789423207666416102355444464034512896n; // 2 ** 192
  return Number(numerator / denominator) / 1_000_000; // returns price with proper USDC/ETH scaling
}
