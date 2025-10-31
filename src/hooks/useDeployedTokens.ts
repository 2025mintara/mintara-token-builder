import { useState, useEffect } from 'react';

export interface DeployedToken {
  id: string;
  name: string;
  symbol: string;
  address: string;
  totalSupply: string;
  decimals: number;
  networkId: string;
  networkName: string;
  deployerAddress: string;
  timestamp: number;
  txHash?: string;
  logo?: string;
}

const STORAGE_KEY = 'mintara_deployed_tokens';

export const useDeployedTokens = (walletAddress: string | null) => {
  const [deployedTokens, setDeployedTokens] = useState<DeployedToken[]>([]);

  // Load tokens from localStorage
  useEffect(() => {
    if (!walletAddress) {
      setDeployedTokens([]);
      return;
    }

    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const allTokens: DeployedToken[] = JSON.parse(stored);
        // Filter tokens by current wallet address
        const userTokens = allTokens.filter(
          token => token.deployerAddress.toLowerCase() === walletAddress.toLowerCase()
        );
        setDeployedTokens(userTokens.sort((a, b) => b.timestamp - a.timestamp));
      }
    } catch (error) {
      console.error('Error loading deployed tokens:', error);
    }
  }, [walletAddress]);

  const addDeployedToken = (token: Omit<DeployedToken, 'id' | 'timestamp'>) => {
    try {
      const newToken: DeployedToken = {
        ...token,
        id: `${token.address}_${Date.now()}`,
        timestamp: Date.now(),
      };

      const stored = localStorage.getItem(STORAGE_KEY);
      const allTokens: DeployedToken[] = stored ? JSON.parse(stored) : [];
      allTokens.push(newToken);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(allTokens));

      if (token.deployerAddress.toLowerCase() === walletAddress?.toLowerCase()) {
        setDeployedTokens(prev => [newToken, ...prev]);
      }
    } catch (error) {
      console.error('Error saving deployed token:', error);
    }
  };

  const removeDeployedToken = (tokenId: string) => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const allTokens: DeployedToken[] = JSON.parse(stored);
        const filtered = allTokens.filter(t => t.id !== tokenId);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
        setDeployedTokens(prev => prev.filter(t => t.id !== tokenId));
      }
    } catch (error) {
      console.error('Error removing deployed token:', error);
    }
  };

  return {
    deployedTokens,
    addDeployedToken,
    removeDeployedToken,
  };
};
