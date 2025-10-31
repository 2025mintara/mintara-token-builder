// Wallet detection utilities for checking installed browser wallets

export interface InstalledWallet {
  name: string;
  isInstalled: boolean;
  provider?: any;
}

export const detectInstalledWallets = (): InstalledWallet[] => {
  const wallets: InstalledWallet[] = [];

  // Check for MetaMask
  if (typeof window !== 'undefined' && (window as any).ethereum?.isMetaMask) {
    wallets.push({
      name: 'MetaMask',
      isInstalled: true,
      provider: (window as any).ethereum,
    });
  }

  // Check for Coinbase Wallet
  if (typeof window !== 'undefined' && (window as any).coinbaseWalletExtension) {
    wallets.push({
      name: 'Coinbase Wallet',
      isInstalled: true,
      provider: (window as any).coinbaseWalletExtension,
    });
  }

  // Check for Trust Wallet
  if (typeof window !== 'undefined' && (window as any).trustwallet) {
    wallets.push({
      name: 'Trust Wallet',
      isInstalled: true,
      provider: (window as any).trustwallet,
    });
  }

  // Check for Rainbow Wallet
  if (typeof window !== 'undefined' && (window as any).rainbow) {
    wallets.push({
      name: 'Rainbow',
      isInstalled: true,
      provider: (window as any).rainbow,
    });
  }

  // Check for OKX Wallet
  if (typeof window !== 'undefined' && (window as any).okxwallet) {
    wallets.push({
      name: 'OKX Wallet',
      isInstalled: true,
      provider: (window as any).okxwallet,
    });
  }

  // Check for Phantom
  if (typeof window !== 'undefined' && (window as any).phantom?.ethereum) {
    wallets.push({
      name: 'Phantom',
      isInstalled: true,
      provider: (window as any).phantom.ethereum,
    });
  }

  // Check for Rabby Wallet
  if (typeof window !== 'undefined' && (window as any).ethereum?.isRabby) {
    wallets.push({
      name: 'Rabby Wallet',
      isInstalled: true,
      provider: (window as any).ethereum,
    });
  }

  // Check for Zerion
  if (typeof window !== 'undefined' && ((window as any).ethereum?.isZerion || (window as any).zerionWallet)) {
    wallets.push({
      name: 'Zerion',
      isInstalled: true,
      provider: (window as any).ethereum || (window as any).zerionWallet,
    });
  }

  // Check for Brave Wallet
  if (typeof window !== 'undefined' && (window as any).ethereum?.isBraveWallet) {
    wallets.push({
      name: 'Brave Wallet',
      isInstalled: true,
      provider: (window as any).ethereum,
    });
  }

  // Check for Argent
  if (typeof window !== 'undefined' && (window as any).ethereum?.isArgent) {
    wallets.push({
      name: 'Argent',
      isInstalled: true,
      provider: (window as any).ethereum,
    });
  }

  // Check for 1inch
  if (typeof window !== 'undefined' && (window as any).ethereum?.isOneInchIOSWallet) {
    wallets.push({
      name: '1inch Wallet',
      isInstalled: true,
      provider: (window as any).ethereum,
    });
  }

  return wallets;
};

export const isWalletInstalled = (walletName: string): boolean => {
  const installedWallets = detectInstalledWallets();
  return installedWallets.some(wallet => wallet.name === walletName);
};
