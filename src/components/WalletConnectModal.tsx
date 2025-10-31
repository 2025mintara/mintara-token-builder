import { Translation } from '../translations/translations';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Wallet, AlertCircle, Loader2, ExternalLink, CheckCircle2 } from 'lucide-react';
import { NetworkConfig } from '../config/networks';
import { useState, useEffect } from 'react';
import { getNetworkIcon } from '../utils/networkIcons';
import { detectInstalledWallets } from '../utils/walletDetection';

interface WalletOption {
  id: string;
  name: string;
  icon: string;
  description: string;
  installUrl?: string;
  isPopular?: boolean;
}

const walletOptions: WalletOption[] = [
  {
    id: 'metamask',
    name: 'MetaMask',
    icon: 'M',
    description: 'Most popular Ethereum wallet',
    installUrl: 'https://metamask.io/download/',
    isPopular: true,
  },
  {
    id: 'coinbase',
    name: 'Coinbase Wallet',
    icon: 'C',
    description: '⭐ Recommended for Base Network',
    installUrl: 'https://www.coinbase.com/wallet/downloads',
    isPopular: true,
  },
  {
    id: 'walletconnect',
    name: 'WalletConnect',
    icon: 'W',
    description: 'Connect with QR code',
    isPopular: true,
  },
  {
    id: 'rainbow',
    name: 'Rainbow',
    icon: 'R',
    description: 'Fun and simple Ethereum wallet',
    installUrl: 'https://rainbow.me/',
    isPopular: true,
  },
  {
    id: 'trust',
    name: 'Trust Wallet',
    icon: 'T',
    description: 'Multi-chain crypto wallet',
    installUrl: 'https://trustwallet.com/download',
  },
  {
    id: 'rabby',
    name: 'Rabby Wallet',
    icon: 'R',
    description: 'DeFi-focused browser wallet',
    installUrl: 'https://rabby.io/',
  },
  {
    id: 'zerion',
    name: 'Zerion',
    icon: 'Z',
    description: 'Smart wallet with DeFi tools',
    installUrl: 'https://zerion.io/',
  },
  {
    id: 'brave',
    name: 'Brave Wallet',
    icon: 'B',
    description: 'Built-in Brave browser wallet',
    installUrl: 'https://brave.com/wallet/',
  },
  {
    id: 'okx',
    name: 'OKX Wallet',
    icon: 'O',
    description: 'Multi-chain wallet by OKX',
    installUrl: 'https://www.okx.com/web3',
  },
  {
    id: 'phantom',
    name: 'Phantom',
    icon: 'P',
    description: 'Multi-chain wallet with EVM support',
    installUrl: 'https://phantom.app/',
  },
  {
    id: 'argent',
    name: 'Argent',
    icon: 'A',
    description: 'Smart contract wallet',
    installUrl: 'https://www.argent.xyz/',
  },
  {
    id: '1inch',
    name: '1inch Wallet',
    icon: '1',
    description: 'DeFi aggregator wallet',
    installUrl: 'https://1inch.io/wallet/',
  },
];

interface WalletConnectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConnect: (walletId: string) => Promise<void>;
  currentNetwork: NetworkConfig;
  t: (key: keyof Translation) => string;
}

export const WalletConnectModal = ({
  isOpen,
  onClose,
  onConnect,
  currentNetwork,
  t,
}: WalletConnectModalProps) => {
  const [connectingWallet, setConnectingWallet] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [installedCount, setInstalledCount] = useState(0);

  useEffect(() => {
    if (isOpen) {
      const installed = detectInstalledWallets();
      setInstalledCount(installed.length);
    }
  }, [isOpen]);

  const handleConnect = async (walletId: string) => {
    setError(null);
    setConnectingWallet(walletId);

    try {
      await onConnect(walletId);
      onClose();
    } catch (err: any) {
      // Extract user-friendly error messages
      let errorMessage = err.message || t('walletConnectionError') || 'Failed to connect wallet';
      
      // Check for common error patterns
      if (errorMessage.includes('not installed')) {
        const walletName = walletOptions.find(w => w.id === walletId)?.name || 'This wallet';
        errorMessage = `${walletName} is not installed. Please install it and try again.`;
      } else if (errorMessage.includes('rejected') || errorMessage.includes('cancelled')) {
        errorMessage = 'Connection request was cancelled.';
      }
      
      setError(errorMessage);
    } finally {
      setConnectingWallet(null);
    }
  };

  const popularWallets = walletOptions.filter(w => w.isPopular);
  const otherWallets = walletOptions.filter(w => !w.isPopular);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#1a1d23]/95 backdrop-blur-xl border border-white/10 text-white max-w-2xl max-h-[90vh] overflow-y-auto w-[95vw] sm:w-full p-4 sm:p-6">
        <DialogHeader>
          <DialogTitle className="text-lg sm:text-xl md:text-2xl font-megaeth bg-gradient-to-r from-[#0052FF] to-[#00D1FF] bg-clip-text text-transparent flex items-center gap-2">
            <Wallet className="w-5 h-5 sm:w-6 sm:h-6 text-[#00D1FF] flex-shrink-0" />
            <span className="truncate">{t('connectWallet')}</span>
          </DialogTitle>
          <DialogDescription className="text-gray-400 font-megaeth flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <span className="text-xs sm:text-sm break-words">{t('walletSelectDescription') || `Select a wallet to connect to ${currentNetwork.name}`}</span>
            {installedCount > 0 && (
              <span className="text-[10px] sm:text-xs px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1 whitespace-nowrap flex-shrink-0">
                <CheckCircle2 className="w-3 h-3" />
                {installedCount} installed
              </span>
            )}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 sm:space-y-6 mt-4">
          {/* Network Info */}
          <div className="backdrop-blur-xl bg-white/5 border border-[#0052FF]/30 rounded-xl p-3 sm:p-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${currentNetwork.color}20` }}>
                {getNetworkIcon(currentNetwork, 'h-4 w-4 sm:h-5 sm:w-5')}
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-xs sm:text-sm text-gray-400">{t('selectedNetwork') || 'Selected Network'}</div>
                <div className="font-megaeth text-white text-sm sm:text-base truncate">{currentNetwork.name}</div>
              </div>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="backdrop-blur-xl bg-red-500/10 border border-red-500/30 rounded-xl p-3 sm:p-4 flex items-start gap-2 sm:gap-3">
              <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-400 flex-shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <p className="text-red-400 text-xs sm:text-sm font-megaeth break-words">{error}</p>
              </div>
            </div>
          )}

          {/* Popular Wallets */}
          {popularWallets.length > 0 && (
            <div>
              <h3 className="text-xs sm:text-sm uppercase tracking-wider text-[#00D1FF] font-megaeth mb-2 sm:mb-3 flex items-center gap-2">
                <span className="w-1 h-3 sm:h-4 bg-gradient-to-b from-[#0052FF] to-[#00D1FF] rounded-full"></span>
                {t('popularWallets') || 'Popular Wallets'}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {popularWallets.map((wallet) => (
                  <WalletButton
                    key={wallet.id}
                    wallet={wallet}
                    isConnecting={connectingWallet === wallet.id}
                    onConnect={handleConnect}
                    t={t}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Other Wallets */}
          {otherWallets.length > 0 && (
            <div>
              <h3 className="text-xs sm:text-sm uppercase tracking-wider text-gray-400 font-megaeth mb-2 sm:mb-3 flex items-center gap-2">
                <span className="w-1 h-3 sm:h-4 bg-gray-400/50 rounded-full"></span>
                {t('moreWallets') || 'More Wallets'}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {otherWallets.map((wallet) => (
                  <WalletButton
                    key={wallet.id}
                    wallet={wallet}
                    isConnecting={connectingWallet === wallet.id}
                    onConnect={handleConnect}
                    t={t}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Info Footer */}
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-3 sm:p-4 text-[10px] sm:text-xs text-gray-400 font-megaeth">
            <p className="flex items-start gap-2">
              <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0 mt-0.5" />
              <span className="break-words">{t('walletSecurityNote') || 'Never share your seed phrase or private keys. Mintara will never ask for them.'}</span>
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// Wallet Button Component
interface WalletButtonProps {
  wallet: WalletOption;
  isConnecting: boolean;
  onConnect: (walletId: string) => void;
  t: (key: keyof Translation) => string;
}

const WalletButton = ({ wallet, isConnecting, onConnect, t }: WalletButtonProps) => {
  // Check if wallet is installed
  const isInstalled = (() => {
    if (typeof window === 'undefined') return false;
    
    const win = window as any;
    
    switch (wallet.id) {
      case 'metamask':
        return typeof win.ethereum !== 'undefined' && win.ethereum.isMetaMask;
      case 'coinbase':
        return typeof win.ethereum !== 'undefined' && (win.ethereum.isCoinbaseWallet || win.coinbaseWalletExtension);
      case 'trust':
        return typeof win.ethereum !== 'undefined' && (win.ethereum.isTrust || win.trustwallet);
      case 'rabby':
        return typeof win.ethereum !== 'undefined' && win.ethereum.isRabby;
      case 'walletconnect':
        return typeof win.ethereum !== 'undefined';
      case 'rainbow':
        return typeof win.ethereum !== 'undefined' && (win.ethereum.isRainbow || win.rainbow);
      case 'zerion':
        return typeof win.ethereum !== 'undefined' && (win.ethereum.isZerion || win.zerionWallet);
      case 'brave':
        return typeof win.ethereum !== 'undefined' && win.ethereum.isBraveWallet;
      case 'okx':
        return typeof win.okxwallet !== 'undefined' || typeof win.okexchain !== 'undefined';
      case 'phantom':
        return typeof win.phantom?.ethereum !== 'undefined';
      case '1inch':
        return typeof win.ethereum !== 'undefined' && win.ethereum.isOneInchIOSWallet;
      case 'argent':
        return typeof win.ethereum !== 'undefined' && win.ethereum.isArgent;
      default:
        return false;
    }
  })();
  
  return (
    <button
      onClick={() => onConnect(wallet.id)}
      disabled={isConnecting}
      className={`
        group relative backdrop-blur-xl bg-white/5 hover:bg-white/10 active:bg-white/15
        border border-white/10 hover:border-[#00D1FF]/50 active:border-[#00D1FF]
        rounded-xl p-2 sm:p-2.5 md:p-3 transition-all duration-300
        ${isConnecting ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        touch-manipulation min-h-[60px] sm:min-h-[64px]
      `}
    >
      <div className="flex items-center gap-2 sm:gap-2.5 md:gap-3">
        <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-[#0052FF] to-[#00D1FF] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform overflow-hidden border border-white/10">
          <span className="text-white font-megaeth text-lg sm:text-xl md:text-2xl">{wallet.icon}</span>
        </div>
        <div className="flex-1 text-left min-w-0">
          <div className="flex items-center gap-1 sm:gap-1.5 flex-wrap">
            <h4 className="font-megaeth text-white text-[11px] sm:text-xs md:text-sm truncate">{wallet.name}</h4>
            {isInstalled && (
              <span className="text-[8px] sm:text-[9px] px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 whitespace-nowrap flex-shrink-0">
                ✓
              </span>
            )}
          </div>
          <p className="text-[9px] sm:text-[10px] md:text-xs text-gray-400 mt-0.5 line-clamp-1 leading-tight">{wallet.description}</p>
        </div>
        {isConnecting ? (
          <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 text-[#00D1FF] animate-spin flex-shrink-0" />
        ) : !isInstalled && wallet.installUrl ? (
          <ExternalLink className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-gray-400 group-hover:text-[#00D1FF] flex-shrink-0 opacity-70" />
        ) : null}
      </div>
    </button>
  );
};
