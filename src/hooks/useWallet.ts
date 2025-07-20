import { useState, useCallback } from "react";

export function useWallet() {
  const [account, setAccount] = useState<string | null>(null);

  const connectWallet = useCallback(async () => {
    if ((window as any).ethereum) {
      const [acc] = await (window as any).ethereum.request({ method: "eth_requestAccounts" });
      setAccount(acc);
    } else {
      setAccount(null);
    }
  }, []);

  return { account, connectWallet };
}
