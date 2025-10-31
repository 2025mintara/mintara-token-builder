import { useState, useEffect, useCallback } from 'react';
import { ethers } from 'ethers';

export type WalletType = 'evm';

export interface WalletState {
  address: string | null;
  balance: string;
  chainId: number | null;
  provider: any;
  isConnecting: boolean;
  isConnected: boolean;
  walletType: WalletType;
  walletId: string | null;
}

export const useWallet = () => {
  const [wallet, setWallet] = useState<WalletState>({
    address: null,
    balance: '0',
    chainId: null,
    provider: null,
    isConnecting: false,
    isConnected: false,
    walletType: 'evm',
    walletId: null,
  });

  const updateBalance = useCallback(async (provider: ethers.BrowserProvider, address: string) => {
    try {
      const balance = await provider.getBalance(address);
      setWallet(prev => ({
        ...prev,
        balance: ethers.formatEther(balance),
      }));
    } catch (error) {
      console.error('Error fetching balance:', error);
    }
  }, []);

  // EVM Wallets (MetaMask, Coinbase, Trust, Rabby, Rainbow, etc.)
  const connectEVMWallet = useCallback(async (walletId: string) => {
    setWallet(prev => ({ ...prev, isConnecting: true }));

    try {
      let ethereumProvider;
      const win = window as any;

      // Detect the specific wallet provider
      switch (walletId) {
        case 'metamask':
          if (win.ethereum?.isMetaMask) {
            ethereumProvider = win.ethereum;
          } else {
            throw new Error('MetaMask is not installed. Please install it from metamask.io');
          }
          break;

        case 'coinbase':
          if (win.ethereum?.isCoinbaseWallet || win.coinbaseWalletExtension) {
            ethereumProvider = win.ethereum?.isCoinbaseWallet ? win.ethereum : win.coinbaseWalletExtension;
          } else {
            throw new Error('Coinbase Wallet is not installed. Please install it from coinbase.com/wallet');
          }
          break;

        case 'trust':
          if (win.ethereum?.isTrust || win.trustwallet) {
            ethereumProvider = win.ethereum?.isTrust ? win.ethereum : win.trustwallet;
          } else {
            throw new Error('Trust Wallet is not installed. Please install it from trustwallet.com');
          }
          break;

        case 'rabby':
          if (win.ethereum?.isRabby) {
            ethereumProvider = win.ethereum;
          } else {
            throw new Error('Rabby Wallet is not installed. Please install it from rabby.io');
          }
          break;

        case 'rainbow':
          if (win.ethereum?.isRainbow || win.rainbow) {
            ethereumProvider = win.ethereum?.isRainbow ? win.ethereum : win.rainbow;
          } else {
            throw new Error('Rainbow Wallet is not installed. Please install it from rainbow.me');
          }
          break;

        case 'zerion':
          if (win.ethereum?.isZerion || win.zerionWallet) {
            ethereumProvider = win.ethereum?.isZerion ? win.ethereum : win.zerionWallet;
          } else {
            throw new Error('Zerion Wallet is not installed. Please install it from zerion.io');
          }
          break;

        case 'brave':
          if (win.ethereum?.isBraveWallet) {
            ethereumProvider = win.ethereum;
          } else {
            throw new Error('Brave Wallet is not available. Please use Brave browser.');
          }
          break;

        case 'okx':
          if (win.okxwallet || win.okexchain) {
            ethereumProvider = win.okxwallet || win.okexchain;
          } else {
            throw new Error('OKX Wallet is not installed. Please install it from okx.com/web3');
          }
          break;

        case 'phantom':
          if (win.phantom?.ethereum) {
            ethereumProvider = win.phantom.ethereum;
          } else {
            throw new Error('Phantom Wallet is not installed. Please install it from phantom.app');
          }
          break;

        case 'walletconnect':
          // WalletConnect uses generic ethereum provider
          if (win.ethereum) {
            ethereumProvider = win.ethereum;
          } else {
            throw new Error('No wallet detected. Please install a Web3 wallet.');
          }
          break;

        case '1inch':
          if (win.ethereum?.isOneInchIOSWallet) {
            ethereumProvider = win.ethereum;
          } else {
            throw new Error('1inch Wallet is not installed. Please install it from 1inch.io/wallet');
          }
          break;

        case 'argent':
          if (win.ethereum?.isArgent) {
            ethereumProvider = win.ethereum;
          } else {
            throw new Error('Argent Wallet is not installed. Please install it from argent.xyz');
          }
          break;

        default:
          // Fallback to generic ethereum provider
          if (win.ethereum) {
            ethereumProvider = win.ethereum;
          } else {
            throw new Error('No Ethereum wallet detected. Please install a Web3 wallet.');
          }
      }

      const provider = new ethers.BrowserProvider(ethereumProvider);
      
      // Request account access
      const accounts = await provider.send('eth_requestAccounts', []);
      const address = accounts[0];
      
      if (!address) {
        throw new Error('No account found. Please unlock your wallet.');
      }

      // Get network
      const network = await provider.getNetwork();
      const chainId = Number(network.chainId);

      // Get balance
      const balance = await provider.getBalance(address);

      setWallet({
        address,
        balance: ethers.formatEther(balance),
        chainId,
        provider,
        isConnecting: false,
        isConnected: true,
        walletType: 'evm',
        walletId,
      });

      // Setup listeners
      ethereumProvider.on('accountsChanged', (accounts: string[]) => {
        if (accounts.length === 0) {
          disconnect();
        } else {
          setWallet(prev => ({ ...prev, address: accounts[0] }));
          updateBalance(provider, accounts[0]);
        }
      });

      ethereumProvider.on('chainChanged', () => {
        window.location.reload();
      });

      return address;
    } catch (error: any) {
      setWallet(prev => ({ ...prev, isConnecting: false }));
      throw new Error(error.message || 'Failed to connect wallet');
    }
  }, [updateBalance]);



  const connectMetaMask = useCallback(async () => {
    return connectEVMWallet('metamask');
  }, [connectEVMWallet]);

  const connectCoinbaseWallet = useCallback(async () => {
    return connectEVMWallet('coinbase');
  }, [connectEVMWallet]);

  const connectWallet = useCallback(async (walletId: string) => {
    // All supported EVM wallets for Base Network
    return connectEVMWallet(walletId);
  }, [connectEVMWallet]);

  const disconnect = useCallback(() => {
    // Try to disconnect from the wallet if it has a disconnect method
    try {
      if (wallet.provider?.disconnect) {
        wallet.provider.disconnect();
      }
    } catch (e) {
      console.log('Could not disconnect from wallet provider');
    }

    setWallet({
      address: null,
      balance: '0',
      chainId: null,
      provider: null,
      isConnecting: false,
      isConnected: false,
      walletType: 'evm',
      walletId: null,
    });
  }, [wallet.provider]);

  const switchNetwork = useCallback(async (chainId: number) => {
    // Safe check for window.ethereum
    const ethereum = (window as any).ethereum;
    if (!ethereum || typeof ethereum !== 'object') {
      throw new Error('No wallet connected');
    }

    try {
      await ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: `0x${chainId.toString(16)}` }],
      });
    } catch (error: any) {
      // This error code indicates that the chain has not been added to MetaMask
      if (error.code === 4902) {
        throw new Error('Please add this network to your wallet');
      }
      throw error;
    }
  }, []);

  // Check if already connected
  useEffect(() => {
    const checkConnection = async () => {
      // Safe check for window.ethereum
      const ethereum = (window as any).ethereum;
      if (ethereum && typeof ethereum === 'object') {
        try {
          const provider = new ethers.BrowserProvider(ethereum);
          const accounts = await provider.send('eth_accounts', []);
          
          if (accounts.length > 0) {
            const address = accounts[0];
            const network = await provider.getNetwork();
            const chainId = Number(network.chainId);
            const balance = await provider.getBalance(address);

            setWallet({
              address,
              balance: ethers.formatEther(balance),
              chainId,
              provider,
              isConnecting: false,
              isConnected: true,
              walletType: 'evm',
              walletId: 'metamask',
            });
          }
        } catch (error) {
          console.error('Error checking connection:', error);
        }
      }
    };

    checkConnection();
  }, []);

  return {
    ...wallet,
    connectMetaMask,
    connectWallet,
    connectCoinbaseWallet,
    disconnect,
    switchNetwork,
    updateBalance: () => wallet.provider && wallet.address && wallet.walletType === 'evm' && updateBalance(wallet.provider, wallet.address),
  };
};

// Extend Window interface for EVM wallets only
declare global {
  interface Window {
    ethereum?: any;
    okxwallet?: any;
    okexchain?: any;
    coinbaseWalletExtension?: any;
    trustwallet?: any;
    rainbow?: any;
    zerionWallet?: any;
    phantom?: any;
  }
}
