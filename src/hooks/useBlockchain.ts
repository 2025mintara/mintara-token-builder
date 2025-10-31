// ✅ Mintara useBlockchain.ts — fixed for Base Mainnet only (chainId 8453)
// Compatible with ethers v6.x

import { ethers } from "ethers";
import { useEffect, useState } from "react";

export interface BlockchainContext {
  provider: ethers.BrowserProvider | null;
  signer: ethers.Signer | null;
  address: string | null;
  chainId: number | null;
  connectWallet: () => Promise<void>;
}

export function useBlockchain(): BlockchainContext {
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
  const [signer, setSigner] = useState<ethers.Signer | null>(null);
  const [address, setAddress] = useState<string | null>(null);
  const [chainId, setChainId] = useState<number | null>(null);

  // ✅ Base Mainnet RPC fallback (for read-only)
  const baseRpc = "https://mainnet.base.org";

  async function connectWallet() {
    if (typeof window === "undefined" || !window.ethereum) {
      alert("MetaMask not detected. Please install MetaMask.");
      return;
    }

    const browserProvider = new ethers.BrowserProvider(window.ethereum, "any");
    await browserProvider.send("eth_requestAccounts", []);
    const signer = await browserProvider.getSigner();
    const network = await browserProvider.getNetwork();

    // ✅ Check and switch to Base if wrong chain
    if (Number(network.chainId) !== 8453) {
      try {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: "0x2105" }], // Base Mainnet
        });
      } catch (switchError: any) {
        // Eğer ağ ekli değilse, otomatik ekle
        if (switchError.code === 4902) {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: "0x2105",
                chainName: "Base Mainnet",
                nativeCurrency: { name: "Ethereum", symbol: "ETH", decimals: 18 },
                rpcUrls: ["https://mainnet.base.org"],
                blockExplorerUrls: ["https://basescan.org"],
              },
            ],
          });
        } else {
          console.error("Network switch failed:", switchError);
          alert("Please switch MetaMask to Base Network (chain 8453).");
          return;
        }
      }
    }

    const newNetwork = await browserProvider.getNetwork();
    setProvider(browserProvider);
    setSigner(signer);
    setAddress(await signer.getAddress());
    setChainId(Number(newNetwork.chainId));
  }

  // ✅ Handle network/account changes dynamically
  useEffect(() => {
    if (typeof window === "undefined" || !window.ethereum) return;

    const handleChainChanged = (chainIdHex: string) => {
      const newId = parseInt(chainIdHex, 16);
      setChainId(newId);
      if (newId !== 8453) {
        alert("Please switch to Base Mainnet (chain 8453)");
      } else {
        window.location.reload();
      }
    };

    const handleAccountsChanged = async (accounts: string[]) => {
      if (accounts.length === 0) {
        setAddress(null);
        setSigner(null);
      } else if (provider) {
        const newSigner = await provider.getSigner();
        setSigner(newSigner);
        setAddress(accounts[0]);
      }
    };

    window.ethereum.on("chainChanged", handleChainChanged);
    window.ethereum.on("accountsChanged", handleAccountsChanged);

    return () => {
      if (window.ethereum.removeListener) {
        window.ethereum.removeListener("chainChanged", handleChainChanged);
        window.ethereum.removeListener("accountsChanged", handleAccountsChanged);
      }
    };
  }, [provider]);

  // ✅ Fallback provider for read-only access
  useEffect(() => {
    if (!provider) {
      const rpcProvider = new ethers.JsonRpcProvider(baseRpc);
      setProvider(rpcProvider as unknown as ethers.BrowserProvider);
      setChainId(8453);
    }
  }, [provider]);

  return {
    provider,
    signer,
    address,
    chainId,
    connectWallet,
  };
}
