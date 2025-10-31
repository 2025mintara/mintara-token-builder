import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Play, Globe, ArrowLeft, Wallet, LogOut } from 'lucide-react';
import { useState, useMemo } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { useWallet } from '../hooks/useWallet';
import { useBlockchain } from '../hooks/useBlockchain';
import { WalletConnectModal } from '../components/WalletConnectModal';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { SEO } from '../components/SEO';
import { toast } from 'sonner';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../components/ui/dropdown-menu';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { LanguageCode } from '../translations/translations';
import { NETWORKS, DEFAULT_NETWORK, getNetworkById } from '../config/networks';

export const MintaTokenPage = () => {
  const navigate = useNavigate();
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const { language, setLanguage, t, availableLanguages } = useLanguage();
  const wallet = useWallet();
  const blockchain = useBlockchain(wallet);

  // Get current network from wallet chainId or default to Base
  const currentNetwork = useMemo(() => {
    if (wallet.chainId) {
      const networkEntry = Object.entries(NETWORKS).find(
        ([_, network]) => network.chainId === wallet.chainId
      );
      return networkEntry ? networkEntry[1] : getNetworkById(DEFAULT_NETWORK);
    }
    return getNetworkById(DEFAULT_NETWORK);
  }, [wallet.chainId]);

  // Schema.org structured data for MINTA Token page
  const mintaStructuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "MINTA Token",
    "description": "The native governance and utility token of Mintara platform. MINTA powers the Base Network token ecosystem.",
    "brand": {
      "@type": "Brand",
      "name": "Mintara"
    },
    "offers": {
      "@type": "Offer",
      "availability": "https://schema.org/InStock",
      "price": "0",
      "priceCurrency": "USD"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "892"
    }
  };

  const handleConnectWallet = async (walletId: string) => {
    try {
      await wallet.connectWallet(walletId);
      toast.success(t('success') || 'Success', {
        description: t('walletConnected') || 'Wallet connected',
      });
      setIsWalletModalOpen(false);
    } catch (error: any) {
      toast.error(t('error') || 'Error', {
        description: error.message,
      });
    }
  };

  const handleDisconnect = () => {
    wallet.disconnect();
    toast.info(t('success') || 'Success', {
      description: t('walletDisconnected') || 'Wallet disconnected',
    });
  };

  return (
    <>
      <SEO
        title="MINTA Token – Governance & Utility Token on Base Network | Mintara"
        description="MINTA is the native governance and utility token of Mintara platform. Learn about tokenomics, distribution, and how MINTA powers the Base Network token ecosystem."
        keywords="minta token, mintara token, base token, governance token, utility token base, minta tokenomics, base network token, mintara governance, crypto token base"
        canonical="https://mintara.xyz/minta-token"
        ogImage="https://mintara.xyz/minta-token-hero.png"
        structuredData={mintaStructuredData}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-[#0A0B0D] via-[#0D1117] to-[#0A0B0D] relative overflow-hidden">
        {/* Animated Background Base Blue Gradients */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#0052FF]/15 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-[#00D1FF]/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-[#0052FF]/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

      {/* Floating coins animation */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute w-12 h-12 bg-gradient-to-br from-[#0052FF]/20 to-[#00D1FF]/20 rounded-full animate-float"
            style={{
              left: `${20 + i * 15}%`,
              top: `${10 + i * 20}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + i}s`,
            }}
          >
            <div className="w-full h-full border-2 border-[#0052FF]/40 rounded-full"></div>
          </div>
        ))}
      </div>

      <Header
        t={t}
        language={language}
        setLanguage={setLanguage}
        availableLanguages={availableLanguages}
        walletAddress={wallet.address}
        walletBalance={wallet.balance}
        isConnected={wallet.isConnected}
        onConnect={() => setIsWalletModalOpen(true)}
        onDisconnect={handleDisconnect}
        currentNetwork={currentNetwork}
        onNetworkChange={async (networkId: string) => {
          const network = getNetworkById(networkId);
          if (network.chainId) {
            await wallet.switchNetwork(network.chainId);
          }
        }}
        onOpenWalletModal={() => setIsWalletModalOpen(true)}
      />

      <WalletConnectModal
        isOpen={isWalletModalOpen}
        onClose={() => setIsWalletModalOpen(false)}
        onConnect={handleConnectWallet}
        currentNetwork={currentNetwork}
        t={t}
      />

      {/* Old header removed - now using shared Header component */}
      <header className="hidden">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => navigate('/')} 
              className="flex items-center gap-3 group transition-all hover:scale-105"
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#0052FF] to-[#00D1FF] flex items-center justify-center group-hover:shadow-lg group-hover:shadow-[#0052FF]/50 transition-all">
                <span className="text-2xl">🔵</span>
              </div>
              <span className="font-megaeth text-2xl bg-gradient-to-r from-[#0052FF] to-[#00D1FF] bg-clip-text text-transparent">
                Mintara
              </span>
            </button>
            
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                onClick={() => navigate('/')}
                className="text-gray-400 hover:text-[#00D1FF] hover:bg-white/10 font-megaeth hidden sm:flex"
              >
                {t('homePage') || 'Home'}
              </Button>
              <Button
                variant="ghost"
                onClick={() => navigate('/builder')}
                className="text-gray-400 hover:text-[#00D1FF] hover:bg-white/10 font-megaeth hidden sm:flex"
              >
                {t('tokenBuilder') || 'Token Builder'}
              </Button>

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

              {wallet.isConnected ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant="outline"
                      className="border-[#0052FF]/30 text-[#00D1FF] hover:bg-[#0052FF]/10 font-megaeth"
                    >
                      <span className="hidden sm:inline">
                        {wallet.address?.slice(0, 6)}...{wallet.address?.slice(-4)}
                      </span>
                      <span className="sm:hidden">Wallet</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-[#1a1b23] border-white/10">
                    <DropdownMenuItem
                      onClick={handleDisconnect}
                      className="text-gray-300 hover:text-[#00D1FF] hover:bg-white/10 cursor-pointer"
                    >
                      {t('disconnect') || 'Disconnect'}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button
                  onClick={() => setIsWalletModalOpen(true)}
                  className="bg-gradient-to-r from-[#0052FF] to-[#00D1FF] hover:from-[#0041CC] hover:to-[#00B8E6] font-megaeth"
                >
                  {t('connectWallet') || 'Connect Wallet'}
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          
          {/* Coming Soon Badge */}
          <div className="inline-flex items-center gap-2 backdrop-blur-xl bg-[#0052FF]/10 border border-[#0052FF]/30 rounded-full px-6 py-2">
            <div className="w-2 h-2 bg-[#00D1FF] rounded-full animate-pulse"></div>
            <span className="text-[#00D1FF] font-megaeth text-sm tracking-wider">{t('mintaComingSoon')}</span>
          </div>

          {/* Hero Icon - Glowing Token */}
          <div className="relative inline-block">
            {/* Outer rotating ring */}
            <div className="absolute inset-0 animate-spin-slow">
              <div className="w-40 h-40 mx-auto border-4 border-dashed border-[#0052FF]/30 rounded-full"></div>
            </div>
            
            {/* Pulsing glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#0052FF] via-[#00D1FF] to-[#0052FF] rounded-full blur-3xl opacity-20 animate-pulse scale-150"></div>
            
            {/* Center token icon */}
            <div className="relative w-40 h-40 mx-auto backdrop-blur-xl bg-gradient-to-br from-[#0052FF]/20 to-[#00D1FF]/20 border-2 border-[#0052FF]/40 rounded-full flex items-center justify-center shadow-2xl">
              <div className="text-6xl">🪙</div>
            </div>
          </div>

          {/* Title */}
          <div className="space-y-4">
            <h1 className="text-6xl md:text-7xl font-megaeth bg-gradient-to-r from-[#0052FF] via-[#00D1FF] to-[#0052FF] bg-clip-text text-transparent drop-shadow-lg tracking-wider">
              🚀 {'MINTA TOKEN'}
            </h1>
            <h2 className="text-3xl md:text-4xl font-megaeth bg-gradient-to-r from-[#0052FF] to-[#00D1FF] bg-clip-text text-transparent">
              {language === 'tr' ? 'Yakında Geliyor!' : 'Coming Soon!'}
            </h2>
          </div>

          {/* Subtitle */}
          <p className="text-2xl text-[#00D1FF] font-megaeth tracking-wide">
            {language === 'tr' ? 'Mintara Kullanıcıları İçin Ödül Token\'ı' : 'Reward Token for Mintara Users'}
          </p>

          {/* Video Section */}
          <div className="backdrop-blur-xl bg-white/5 border border-[#0052FF]/20 rounded-3xl p-8 md:p-12 space-y-8">
            <h3 className="text-3xl font-megaeth bg-gradient-to-r from-[#0052FF] to-[#00D1FF] bg-clip-text text-transparent text-center">
              {language === 'tr' ? '📺 Tanıtım Videosunu İzleyin' : '📺 Watch Introduction Video'}
            </h3>
            
            {/* Video Player */}
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-black/50 border-2 border-[#0052FF]/30 group">
              <video
                className="w-full h-full object-cover"
                controls
                preload="metadata"
                onLoadedData={() => setVideoLoaded(true)}
              >
                <source src="https://files.catbox.moe/gcg2b0.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              
              {/* Play overlay */}
              {!videoLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#0052FF]/50 to-[#00D1FF]/50 backdrop-blur-sm">
                  <div className="w-20 h-20 rounded-full bg-[#0052FF]/80 flex items-center justify-center border-4 border-white/20 group-hover:scale-110 transition-transform cursor-pointer">
                    <Play className="w-10 h-10 text-white ml-1" fill="white" />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Main Body */}
          <div className="backdrop-blur-xl bg-white/5 border border-[#0052FF]/20 rounded-3xl p-8 md:p-12 space-y-6">
            <p className="text-xl text-gray-300 leading-relaxed">
              {t('mintaTokenDescription')}
            </p>
            
            {/* Reward tiers visualization */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
              <div className="backdrop-blur-xl bg-[#0052FF]/10 border border-[#0052FF]/30 rounded-2xl p-6">
                <div className="text-4xl mb-2">🥉</div>
                <div className="text-[#0052FF] font-megaeth text-sm mb-1">{t('tier1Title')}</div>
                <div className="text-white font-megaeth text-2xl">{t('tier1Reward')}</div>
              </div>
              
              <div className="backdrop-blur-xl bg-[#00D1FF]/10 border border-[#00D1FF]/30 rounded-2xl p-6">
                <div className="text-4xl mb-2">🥈</div>
                <div className="text-[#00D1FF] font-megaeth text-sm mb-1">{t('tier2Title')}</div>
                <div className="text-white font-megaeth text-2xl">{t('tier2Reward')}</div>
              </div>
              
              <div className="backdrop-blur-xl bg-[#0052FF]/10 border border-[#0052FF]/30 rounded-2xl p-6">
                <div className="text-4xl mb-2">🥇</div>
                <div className="text-[#00D1FF] font-megaeth text-sm mb-1">{t('tier3Title')}</div>
                <div className="text-white font-megaeth text-2xl">{t('tier3Reward')}</div>
              </div>
            </div>
          </div>

          {/* Inactive MINTA TOKEN Button (Coming Soon) */}
          <div className="relative inline-block">
            <Button
              disabled
              className="relative overflow-hidden bg-gradient-to-r from-[#0052FF] to-[#00D1FF] hover:from-[#0041CC] hover:to-[#00B8E6] !text-white text-xl px-12 py-6 rounded-2xl shadow-2xl shadow-[#0052FF]/50 cursor-not-allowed opacity-60 font-megaeth"
            >
              <span className="relative z-10">{t('claimMintaToken')}</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
            </Button>
            <div className="absolute -top-2 -right-2 bg-[#00D1FF] text-black text-xs font-megaeth px-3 py-1 rounded-full">
              {t('soon')}
            </div>
          </div>

          {/* Back Button */}
          <Button
            onClick={() => navigate('/')}
            variant="outline"
            size="lg"
            className="bg-white/5 border-white/20 text-white hover:bg-white/10 hover:border-white/30 font-megaeth mt-8"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            {t('backToBuilder')}
          </Button>
        </div>
      </main>

      {/* Wallet Connect Modal */}
      <WalletConnectModal
        isOpen={isWalletModalOpen}
        onClose={() => setIsWalletModalOpen(false)}
        onConnect={handleConnectWallet}
        currentNetwork={blockchain.currentNetwork}
        t={t}
      />

      {/* Footer */}
      <Footer language={language} t={t} />

      {/* Custom animations CSS */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        
        .animate-shimmer {
          animation: shimmer 3s ease-in-out infinite;
        }
      `}</style>
      </div>
    </>
  );
};
