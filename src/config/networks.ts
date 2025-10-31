export interface NetworkConfig {
  id: string;
  name: string;
  chainId: number;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
  rpcUrl: string;
  blockExplorer: string;
  fee: string;
  feeAmount: string;
  paymentWallet: string;
  isEVM: boolean;
  logo: string;
  icon: string;
  color: string;
}

export const NETWORKS: Record<string, NetworkConfig> = {
  base: {
    id: 'base',
    name: 'Base Mainnet',
    chainId: 8453,
    nativeCurrency: {
      name: 'Ethereum',
      symbol: 'ETH',
      decimals: 18,
    },
    rpcUrl: 'https://mainnet.base.org', // Public RPC - users can override with their own
    blockExplorer: 'https://basescan.org',
    fee: '0.00002 ETH + Gas',
    feeAmount: '0.00002',
    paymentWallet: '0x59B16A1c411536241390484C4Da404b365336b45',
    isEVM: true,
    logo: '🔵',
    icon: 'Circle',
    color: '#0052FF',
  },
};

export const DEFAULT_NETWORK = 'base';

export const getNetworkById = (id: string): NetworkConfig => {
  return NETWORKS[id] || NETWORKS[DEFAULT_NETWORK];
};

export const getEVMNetworks = (): NetworkConfig[] => {
  return Object.values(NETWORKS).filter(network => network.isEVM);
};

export const getAllNetworks = (): NetworkConfig[] => {
  return Object.values(NETWORKS);
};
