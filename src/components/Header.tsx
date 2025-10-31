import { Translation, LanguageCode } from '../translations/translations';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Wallet, Globe, LogOut } from 'lucide-react';
import { NetworkSelector } from './NetworkSelector';
import { NetworkConfig } from '../config/networks';
import { useNavigate, useLocation } from 'react-router-dom';

interface HeaderProps {
  t: (key: keyof Translation) => string;
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  availableLanguages: Array<{ code: LanguageCode; name: string; flag: string }>;
  walletAddress: string | null;
  walletBalance: string;
  isConnected: boolean;
  onConnect: () => void;
  onDisconnect: () => void;
  currentNetwork: NetworkConfig;
  onNetworkChange: (networkId: string) => Promise<void>;
  onOpenWalletModal?: () => void;
}

export const Header = ({
  t,
  language,
  setLanguage,
  availableLanguages,
  walletAddress,
  walletBalance,
  isConnected,
  onConnect,
  onDisconnect,
  currentNetwork,
  onNetworkChange,
  onOpenWalletModal,
}: HeaderProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  // Navigation items (show only if not on that page)
  const currentPath = location.pathname.replace(/^\/[a-z]{2}(\/|$)/, '/');
  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/builder', label: 'Token Builder' },
    { path: '/ai-nft-builder', label: 'AI NFT Builder' },
    { path: '/minta-token', label: 'Minta Token' },
    { path: '/whitepaper', label: 'Whitepaper' },
  ].filter(item => item.path !== currentPath);

  return (
    <header className="relative z-20 backdrop-blur-xl bg-white/5 border-b border-white/10">
      <div className="container mx-auto px-2 sm:px-4 py-2 sm:py-3">
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          {/* Logo */}
          <button 
            onClick={() => navigate(`/${language}/`)} 
            className="flex items-center gap-2 sm:gap-3 flex-shrink-0 group transition-all hover:scale-105"
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-[#0052FF] to-[#00D1FF] flex items-center justify-center group-hover:shadow-lg group-hover:shadow-[#0052FF]/50 transition-all">
              <span className="text-xl sm:text-2xl">🔵</span>
            </div>
            <span className="hidden sm:block font-megaeth text-lg sm:text-xl md:text-2xl bg-gradient-to-r from-[#0052FF] to-[#00D1FF] bg-clip-text text-transparent">
              Mintara
            </span>
          </button>

          {/* Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => navigate(`/${language}${item.path}`)}
                className="px-3 py-2 text-sm font-megaeth text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-all"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right side - Language, Network & Wallet */}
          <div className="flex items-center gap-1 sm:gap-2 md:gap-3 flex-shrink">
            {/* Language Selector */}
            <div className="backdrop-blur-xl bg-white/5 border border-[#0052FF]/30 rounded-lg">
              <Select value={language} onValueChange={(value) => setLanguage(value as LanguageCode)}>
                <SelectTrigger className="w-[100px] sm:w-[140px] md:w-[160px] border-0 bg-transparent text-white font-megaeth text-xs sm:text-sm">
                  <Globe className="w-3 h-3 sm:w-4 sm:h-4 mr-1 md:mr-2 text-[#00D1FF] flex-shrink-0" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#1a1d23] border-white/10">
                  {availableLanguages.map((lang) => (
                    <SelectItem key={lang.code} value={lang.code} className="text-white hover:bg-white/10 font-megaeth text-xs sm:text-sm">
                      {lang.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Network Selector */}
            <NetworkSelector 
              currentNetwork={currentNetwork}
              onNetworkChange={onNetworkChange}
            />

            {/* Wallet Connection */}
            {isConnected && walletAddress ? (
              <div className="flex items-center gap-1 sm:gap-2">
                <div className="hidden lg:flex flex-col items-end backdrop-blur-xl bg-white/5 border border-[#00D1FF]/30 rounded-lg px-2 sm:px-4 py-1 sm:py-2">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-2 h-2 rounded-full bg-[#00D1FF] animate-pulse"></div>
                    <span className="text-xs text-[#00D1FF] font-megaeth">{parseFloat(walletBalance).toFixed(4)} ETH</span>
                  </div>
                  <span className="text-xs text-gray-400">
                    {formatAddress(walletAddress)}
                  </span>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={onDisconnect}
                  className="bg-white/5 border-[#0052FF]/30 text-white hover:bg-[#0052FF]/10 hover:border-[#00D1FF]/50 font-megaeth text-xs sm:text-sm px-2 sm:px-4"
                >
                  <LogOut className="w-3 h-3 sm:w-4 sm:h-4 sm:mr-2" />
                  <span className="hidden sm:inline">{t('disconnect')}</span>
                </Button>
              </div>
            ) : (
              <Button 
                onClick={onOpenWalletModal || onConnect} 
                className="bg-gradient-to-r from-[#0052FF] to-[#00D1FF] hover:from-[#0041CC] hover:to-[#00B8E6] !text-white border-0 shadow-lg shadow-[#0052FF]/50 font-megaeth text-xs sm:text-sm px-2 sm:px-4"
                size="sm"
              >
                <Wallet className="w-3 h-3 sm:w-4 sm:h-4 sm:mr-2" />
                <span className="hidden sm:inline">{t('connectWallet')}</span>
                <span className="sm:hidden">Connect</span>
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
