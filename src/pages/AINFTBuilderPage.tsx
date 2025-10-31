import { useState, useMemo } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { useWallet } from '../hooks/useWallet';
import { Header } from '../components/Header';
import { WalletConnectModal } from '../components/WalletConnectModal';
import { SEO } from '../components/SEO';
import { Footer } from '../components/Footer';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Card, CardContent } from '../components/ui/card';
import { Sparkles, Image as ImageIcon, Loader2, CheckCircle2, AlertCircle, Wallet } from 'lucide-react';
import { Alert, AlertDescription } from '../components/ui/alert';
import { toast } from 'sonner';
import { NETWORKS, DEFAULT_NETWORK, getNetworkById } from '../config/networks';

type GenerationStatus = 'idle' | 'generating' | 'generated' | 'minting' | 'minted' | 'error';

export function AINFTBuilderPage() {
  const { language, setLanguage, t, availableLanguages } = useLanguage();
  const wallet = useWallet();
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);

  // Get current network from wallet chainId or default to Base
  const currentNetwork = useMemo(() => {
    if (wallet.chainId) {
      // Find network by chainId
      const networkEntry = Object.entries(NETWORKS).find(
        ([_, network]) => network.chainId === wallet.chainId
      );
      return networkEntry ? networkEntry[1] : getNetworkById(DEFAULT_NETWORK);
    }
    return getNetworkById(DEFAULT_NETWORK);
  }, [wallet.chainId]);
  const [prompt, setPrompt] = useState('');
  const [description, setDescription] = useState('');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [status, setStatus] = useState<GenerationStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // NFT Mint Fee Configuration - Mintara System Fee
  const MINT_FEE_USDC = '0.3';
  const MINT_FEE_USDT = '0.1';
  const MINT_FEE_ETH = '0.000025';

  const handleGenerateImage = async () => {
    if (!prompt.trim()) {
      setErrorMessage(t('pleaseEnterPrompt'));
      return;
    }

    setStatus('generating');
    setErrorMessage('');
    
    try {
      // Simulate AI image generation (replace with actual AI API)
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // For demo, use a placeholder image (replace with actual AI-generated image)
      setGeneratedImage('https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=800&auto=format&fit=crop');
      setStatus('generated');
    } catch (error: any) {
      setStatus('error');
      setErrorMessage(error.message || t('failedToGenerateImage'));
    }
  };

  const handleMintNFT = async () => {
    if (!wallet.isConnected || !wallet.address) {
      toast.info(t('connectWallet'), {
        description: t('pleaseConnectWalletToContinue') || 'Please connect your wallet to mint NFT',
      });
      setIsWalletModalOpen(true);
      return;
    }

    if (!generatedImage) {
      setErrorMessage(t('pleaseGenerateImageFirst'));
      toast.error(t('pleaseGenerateImageFirst'));
      return;
    }

    setStatus('minting');
    setErrorMessage('');
    toast.info(t('startingNftMintProcess'));

    try {
      // Simulate NFT minting process (replace with actual minting logic)
      // 1. Charge 0.3 USDC Mintara System Fee (handled automatically)
      // 2. Upload image to IPFS
      // 3. Mint NFT on Base Network
      
      await new Promise(resolve => setTimeout(resolve, 4000));
      
      setStatus('minted');
      toast.success(t('nftMintedSuccessEmoji'));
      
      // Reset after success
      setTimeout(() => {
        setPrompt('');
        setDescription('');
        setGeneratedImage(null);
        setStatus('idle');
      }, 3000);
    } catch (error: any) {
      setStatus('error');
      setErrorMessage(error.message || t('failedToMintNft'));
      toast.error(error.message || t('failedToMintNft'));
    }
  };

  const getStatusMessage = () => {
    switch (status) {
      case 'generating':
        return { icon: <Loader2 className="w-5 h-5 animate-spin" />, text: t('generatingAiArt'), color: 'text-[#00D1FF]' };
      case 'generated':
        return { icon: <CheckCircle2 className="w-5 h-5" />, text: t('imageGeneratedReady'), color: 'text-green-400' };
      case 'minting':
        return { icon: <Loader2 className="w-5 h-5 animate-spin" />, text: t('mintingNftOnBase'), color: 'text-[#00D1FF]' };
      case 'minted':
        return { icon: <CheckCircle2 className="w-5 h-5" />, text: t('nftMintedSuccessCheck'), color: 'text-green-400' };
      case 'error':
        return { icon: <AlertCircle className="w-5 h-5" />, text: errorMessage, color: 'text-red-400' };
      default:
        return null;
    }
  };

  const statusInfo = getStatusMessage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A1628] via-[#0D1B2A] to-[#0A1628]">
      <SEO
        title="AI NFT Builder - Create & Mint NFTs on Base | Mintara"
        description="Generate AI-powered NFT artwork for free and mint on Base Network. Ultra-low fees (0.1 USDT) for NFT minting. Create unique digital art with AI."
        canonical="https://mintara.xyz/ai-nft-builder"
        type="website"
      />

      <Header
        t={t}
        language={language}
        setLanguage={setLanguage}
        availableLanguages={availableLanguages}
        walletAddress={wallet.address}
        walletBalance={wallet.balance}
        isConnected={wallet.isConnected}
        onConnect={() => setIsWalletModalOpen(true)}
        onDisconnect={wallet.disconnect}
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
        onConnect={wallet.connect}
        currentNetwork={currentNetwork}
        t={t}
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(0,82,255,0.15),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(0,209,255,0.15),transparent_50%)]"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#0052FF]/20 to-[#00D1FF]/20 border border-[#0052FF]/30 mb-6">
              <Sparkles className="w-5 h-5 text-[#00D1FF]" />
              <span className="text-sm text-white/90">{t('aiPoweredNftCreation')}</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-megaeth mb-6">
              <span className="bg-gradient-to-r from-[#0052FF] to-[#00D1FF] bg-clip-text text-transparent">
                {t('mintaraAiNftBuilder')}
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-white/70 mb-4">
              {t('createAiMintBase')}
            </p>
            
            <p className="text-sm text-white/50">
              {t('aiGenerationFree')} <span className="text-[#00D1FF] font-semibold">{t('free')}</span> • 
              {t('mintFor')} <span className="text-[#00D1FF] font-semibold">{MINT_FEE_USDC} USDC</span>
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 pb-20">
        <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {/* Left Column - Prompt Input */}
          <div className="space-y-6">
            <Card className="backdrop-blur-xl bg-white/5 border-white/10">
              <CardContent className="p-6 space-y-6">
                <div>
                  <label className="block text-white/90 font-megaeth mb-3 text-sm">
                    {t('enterYourPrompt')}
                  </label>
                  <Textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder={t('describeNftPrompt')}
                    className="min-h-[120px] bg-white/5 border-white/10 text-white placeholder:text-white/30 resize-none"
                    disabled={status === 'generating' || status === 'minting'}
                  />
                  <p className="text-xs text-white/40 mt-2">
                    {t('tipBeSpecific')}
                  </p>
                </div>

                <div>
                  <label className="block text-white/90 font-megaeth mb-3 text-sm">
                    {t('nftDescriptionOptional')}
                  </label>
                  <Input
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder={t('addNftDescription')}
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/30"
                    disabled={status === 'generating' || status === 'minting'}
                  />
                </div>

                <Button
                  onClick={handleGenerateImage}
                  disabled={status === 'generating' || status === 'minting' || !prompt.trim()}
                  className="w-full bg-gradient-to-r from-[#0052FF] to-[#00D1FF] hover:from-[#0041CC] hover:to-[#00B8E6] text-white border-0 shadow-lg shadow-[#0052FF]/50 h-12 text-base font-megaeth disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === 'generating' ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      {t('generating')}
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5 mr-2" />
                      {t('generateNftFree')}
                    </>
                  )}
                </Button>

                <Alert className="bg-[#0052FF]/10 border-[#0052FF]/30 text-white/70">
                  <ImageIcon className="w-4 h-4 text-[#00D1FF]" />
                  <AlertDescription className="text-xs">
                    <strong>{t('aiImageGenerationFree')}</strong> – {t('noWalletNeededYet')}. {t('walletNeededForMint')}
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Preview & Mint */}
          <div className="space-y-6">
            {/* Preview Card */}
            <Card className="backdrop-blur-xl bg-white/5 border-white/10 overflow-hidden">
              <CardContent className="p-6">
                <label className="block text-white/90 font-megaeth mb-4 text-sm">
                  {t('preview')}
                </label>
                
                <div className="relative aspect-square rounded-lg overflow-hidden bg-gradient-to-br from-[#0052FF]/10 to-[#00D1FF]/10 border border-white/10 mb-4">
                  {generatedImage ? (
                    <img 
                      src={generatedImage} 
                      alt="Generated NFT" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white/30">
                      <ImageIcon className="w-16 h-16 mb-4" />
                      <p className="text-sm">{t('yourArtWillAppear')}</p>
                    </div>
                  )}
                </div>

                {description && generatedImage && (
                  <p className="text-sm text-white/60 italic">
                    "{description}"
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Mint Section */}
            <Card className="backdrop-blur-xl bg-white/5 border-white/10">
              <CardContent className="p-6 space-y-4">
                <div className="text-center">
                  <p className="text-2xl font-megaeth text-white mb-2">
                    {t('mintOnBaseNetwork')}
                  </p>
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-[#0052FF]/20 to-[#00D1FF]/20 border border-[#0052FF]/30">
                    <span className="text-lg text-[#00D1FF] font-megaeth">
                      {MINT_FEE_USDC} USDC
                    </span>
                    <span className="text-sm text-white/70">
                      {t('mintaraSystemFee')}
                    </span>
                  </div>
                </div>

                <Button
                  onClick={handleMintNFT}
                  disabled={!generatedImage || status === 'generating' || status === 'minting'}
                  className="w-full bg-gradient-to-r from-[#0052FF] to-[#00D1FF] hover:from-[#0041CC] hover:to-[#00B8E6] text-white border-0 shadow-lg shadow-[#0052FF]/50 h-14 text-lg font-megaeth disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#00D1FF]/0 via-white/20 to-[#00D1FF]/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                  <span className="relative z-10 flex items-center justify-center">
                    {status === 'minting' ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        {t('minting')}
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-5 h-5 mr-2" />
                        {t('mintNftNow')}
                      </>
                    )}
                  </span>
                </Button>

                <Alert className="bg-[#00D1FF]/5 border-[#00D1FF]/30 text-white/70">
                  <AlertCircle className="w-4 h-4 text-[#00D1FF]" />
                  <AlertDescription className="text-xs">
                    💡 <strong>{t('mintingFee')}</strong> {MINT_FEE_USDC} USDC {t('mintaraSystemFee')} — {t('handledAutomatically')}. {t('generateAiFreePayMint')}
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>

            {/* Status Bar */}
            {statusInfo && (
              <Card className="backdrop-blur-xl bg-white/5 border-white/10">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className={statusInfo.color}>
                      {statusInfo.icon}
                    </div>
                    <p className={`text-sm font-megaeth ${statusInfo.color}`}>
                      {statusInfo.text}
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="backdrop-blur-xl bg-white/5 border-white/10 hover:border-[#0052FF]/50 transition-all group">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#0052FF] to-[#00D1FF] flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-megaeth text-white mb-2">
                  {t('aiPowered')}
                </h3>
                <p className="text-sm text-white/60">
                  {t('generateUniqueNft')} <span className="text-green-400">{t('freeGenerationFeature')}</span>
                </p>
              </CardContent>
            </Card>

            <Card className="backdrop-blur-xl bg-white/5 border-white/10 hover:border-[#0052FF]/50 transition-all group">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#0052FF] to-[#00D1FF] flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <ImageIcon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-megaeth text-white mb-2">
                  {t('freeGeneration')}
                </h3>
                <p className="text-sm text-white/60">
                  {t('createUnlimitedAiFree')}
                </p>
              </CardContent>
            </Card>

            <Card className="backdrop-blur-xl bg-white/5 border-white/10 hover:border-[#0052FF]/50 transition-all group">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#0052FF] to-[#00D1FF] flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <CheckCircle2 className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-megaeth text-white mb-2">
                  {t('baseNetworkNft')}
                </h3>
                <p className="text-sm text-white/60">
                  {t('mintNftsBaseLowFee')}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer language={language} t={t} />
    </div>
  );
};
