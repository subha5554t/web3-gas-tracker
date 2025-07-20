import { useEffect, useRef } from "react";
import { ethers } from "ethers";

// Usage: const wsProvider = useWebSocketProvider(process.env.YOUR_RPC!);
export function useWebSocketProvider(rpcUrl: string) {
  const providerRef = useRef<ethers.WebSocketProvider | null>(null);

  useEffect(() => {
    providerRef.current = new ethers.WebSocketProvider(rpcUrl);
    return () => {
      if (providerRef.current) {
        providerRef.current.destroy();
      }
    };
  }, [rpcUrl]);

  return providerRef.current;
}
