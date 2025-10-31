import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../hooks/useLanguage';
import { useWallet } from '../hooks/useWallet';
import { useBlockchain } from '../hooks/useBlockchain';
import { useStats } from '../hooks/useStats';
import { useDeployedTokens } from '../hooks/useDeployedTokens';
import { useTransactionHistory } from '../hooks/useTransactionHistory';
import { Header } from '../components/Header';
import { JettonGenerator } from '../components/JettonGenerator';
import { MintTokens } from '../components/MintTokens';
import { BurnTokens } from '../components/BurnTokens';
import { RevokeOwnership } from '../components/RevokeOwnership';
import { Multisender } from '../components/Multisender';
import { TokenInfo } from '../components/TokenInfo';
import { LoadingOverlay } from '../components/LoadingOverlay';
import { SettingsModal } from '../components/SettingsModal';
import { DeployedTokensList } from '../components/DeployedTokensList';
import { TransactionHistory } from '../components/TransactionHistory';
import { WalletConnectModal } from '../components/WalletConnectModal';
import { AdminPanel } from '../components/AdminPanel';
import { SEO } from '../components/SEO';
import { toast } from 'sonner';
import { useState } from 'react';
import { Button } from '../components/ui/button';
import { Rocket, Zap, Shield, DollarSign, Palette, Check, Github, ExternalLink, ArrowRight, Flame, Edit, Ban, Send, Info } from 'lucide-react';
import { FeatureCard } from '../components/FeatureCard';
import { Footer } from '../components/Footer';

type ModalType = 'generator' | 'mint' | 'burn' | 'revoke' | 'multisend' | 'info' | null;

export function BuilderPage() {
  const { language, setLanguage, t, availableLanguages } = useLanguage();
  const wallet = useWallet();
  const blockchain = useBlockchain(wallet);
  const { stats, incrementTokensDeployed, incrementTransaction } = useStats();
  const { deployedTokens, addDeployedToken, removeDeployedToken } = useDeployedTokens(wallet.address);
  const { transactions, addTransaction, clearHistory } = useTransactionHistory(wallet.address);
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const navigate = useNavigate();

  // Schema.org structured data for Builder page
  const builderStructuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Mintara Token Builder",
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "ratingCount": "1247"
    },
    "description": "Professional no-code token builder for Base Network. Create, deploy, mint, burn, and manage ERC-20 tokens instantly.",
    "featureList": [
      "No-code token deployment on Base",
      "Instant smart contract creation",
      "Token minting and burning",
      "Metadata updates",
      "Multi-send functionality",
      "Real-time transaction tracking",
      "33 wallet integrations"
    ]
  };

  const handleConnectWallet = async (walletId: string) => {
    try {
      await wallet.connectWallet(walletId);
      toast.success(t('success'), {
        description: t('walletConnected'),
      });
      setIsWalletModalOpen(false);
    } catch (error: any) {
      toast.error(t('error'), {
        description: error.message,
      });
      throw error;
    }
  };

  const handleOpenWalletModal = () => {
    setIsWalletModalOpen(true);
  };

  const handleDisconnect = () => {
    wallet.disconnect();
    toast.info(t('success'), {
      description: t('walletDisconnected') || 'Wallet disconnected',
    });
  };

  const handleNetworkChange = async (networkId: string) => {
    try {
      await blockchain.switchNetwork(networkId);
    } catch (error: any) {
      throw error;
    }
  };

  const handleDeploy = async (
    name: string,
    symbol: string,
    supply: string,
    decimals: number,
    logo: string,
    description?: string,
    website?: string,
    twitter?: string,
    telegram?: string
  ) => {
    try {
      console.log('🚀 Deploying token with metadata:', { name, symbol, description, website, twitter, telegram });
      
      const result = await blockchain.deployToken(name, symbol, supply, decimals, logo);
      
      incrementTokensDeployed();
      
      if (result.contractAddress && wallet.address) {
        addDeployedToken({
          name,
          symbol,
          address: result.contractAddress,
          totalSupply: supply,
          decimals,
          networkId: blockchain.currentNetwork.id,
          networkName: blockchain.currentNetwork.name,
          deployerAddress: wallet.address,
          txHash: result.transactionHash,
          logo,
        });
        
        addTransaction({
          type: 'deploy',
          tokenAddress: result.contractAddress,
          tokenName: name,
          tokenSymbol: symbol,
          networkId: blockchain.currentNetwork.id,
          networkName: blockchain.currentNetwork.name,
          walletAddress: wallet.address,
          txHash: result.transactionHash,
          amount: supply,
        });
      }
      
      toast.success(t.success, {
        description: t.tokenDeployed,
      });
      return result;
    } catch (error: any) {
      toast.error(t.error, {
        description: error.message,
      });
      throw error;
    }
  };

  const handleMint = async (contractAddress: string, recipientAddress: string, amount: string) => {
    try {
      const result = await blockchain.mintTokens(contractAddress, recipientAddress, amount);
      
      incrementTransaction();
      
      if (wallet.address) {
        const tokenInfo = await blockchain.getTokenInfo(contractAddress).catch(() => null);
        addTransaction({
          type: 'mint',
          tokenAddress: contractAddress,
          tokenName: tokenInfo?.name || 'Unknown',
          tokenSymbol: tokenInfo?.symbol || '???',
          networkId: blockchain.currentNetwork.id,
          networkName: blockchain.currentNetwork.name,
          walletAddress: wallet.address,
          txHash: result.transactionHash,
          amount,
          details: `Minted to ${recipientAddress.slice(0, 6)}...${recipientAddress.slice(-4)}`,
        });
      }
      
      toast.success(t.success, {
        description: t.tokensMinted,
      });
      return result;
    } catch (error: any) {
      toast.error(t.error, {
        description: error.message,
      });
      throw error;
    }
  };

  const handleBurn = async (contractAddress: string, amount: string) => {
    try {
      const result = await blockchain.burnTokens(contractAddress, amount);
      
      incrementTransaction();
      
      if (wallet.address) {
        const tokenInfo = await blockchain.getTokenInfo(contractAddress).catch(() => null);
        addTransaction({
          type: 'burn',
          tokenAddress: contractAddress,
          tokenName: tokenInfo?.name || 'Unknown',
          tokenSymbol: tokenInfo?.symbol || '???',
          networkId: blockchain.currentNetwork.id,
          networkName: blockchain.currentNetwork.name,
          walletAddress: wallet.address,
          txHash: result.transactionHash,
          amount,
        });
      }
      
      toast.success(t.success, {
        description: t.tokensBurned,
      });
      return result;
    } catch (error: any) {
      toast.error(t.error, {
        description: error.message,
      });
      throw error;
    }
  };

  const handleRevoke = async (contractAddress: string) => {
    try {
      const result = await blockchain.revokeOwnership(contractAddress);
      
      if (wallet.address) {
        const tokenInfo = await blockchain.getTokenInfo(contractAddress).catch(() => null);
        addTransaction({
          type: 'revoke',
          tokenAddress: contractAddress,
          tokenName: tokenInfo?.name || 'Unknown',
          tokenSymbol: tokenInfo?.symbol || '???',
          networkId: blockchain.currentNetwork.id,
          networkName: blockchain.currentNetwork.name,
          walletAddress: wallet.address,
          txHash: result.transactionHash,
        });
      }
      
      toast.success(t.success, {
        description: t.ownershipRevoked,
      });
      return result;
    } catch (error: any) {
      toast.error(t.error, {
        description: error.message,
      });
      throw error;
    }
  };

  const handleMultisend = async (
    contractAddress: string,
    recipients: Array<{ address: string; amount: string }>
  ) => {
    try {
      const result = await blockchain.multisendTokens(contractAddress, recipients);
      
      if (wallet.address) {
        const tokenInfo = await blockchain.getTokenInfo(contractAddress).catch(() => null);
        const totalAmount = recipients.reduce((sum, r) => sum + parseFloat(r.amount), 0).toString();
        addTransaction({
          type: 'multisend',
          tokenAddress: contractAddress,
          tokenName: tokenInfo?.name || 'Unknown',
          tokenSymbol: tokenInfo?.symbol || '???',
          networkId: blockchain.currentNetwork.id,
          networkName: blockchain.currentNetwork.name,
          walletAddress: wallet.address,
          txHash: result.transactionHash,
          amount: totalAmount,
          details: `Sent to ${recipients.length} recipients`,
        });
      }
      
      toast.success(t.success, {
        description: t.tokensSent,
      });
      return result;
    } catch (error: any) {
      toast.error(t.error, {
        description: error.message,
      });
      throw error;
    }
  };

  const handleGetTokenInfo = async (contractAddress: string) => {
    try {
      return await blockchain.getTokenInfo(contractAddress);
    } catch (error: any) {
      toast.error(t.error, {
        description: error.message,
      });
      throw error;
    }
  };

  const renderModalContent = () => {
    switch (activeModal) {
      case 'generator':
        return (
          <JettonGenerator
            t={t}
            isConnected={wallet.isConnected}
            networkFee={blockchain.currentNetwork.fee}
            currentNetwork={blockchain.currentNetwork.name}
            userBalance={wallet.balance ? `${wallet.balance} ${blockchain.currentNetwork.nativeCurrency.symbol}` : undefined}
            onDeploy={handleDeploy}
          />
        );
      case 'mint':
        return (
          <MintTokens
            t={t}
            isConnected={wallet.isConnected}
            networkFee={blockchain.currentNetwork.fee}
            onMint={handleMint}
          />
        );
      case 'burn':
        return (
          <BurnTokens
            t={t}
            isConnected={wallet.isConnected}
            networkFee={blockchain.currentNetwork.fee}
            onBurn={handleBurn}
          />
        );
      case 'revoke':
        return (
          <RevokeOwnership
            t={t}
            isConnected={wallet.isConnected}
            networkFee={blockchain.currentNetwork.fee}
            onRevoke={handleRevoke}
          />
        );
      case 'multisend':
        return (
          <Multisender
            t={t}
            isConnected={wallet.isConnected}
            networkFee={blockchain.currentNetwork.fee}
            onMultisend={handleMultisend}
          />
        );
      case 'info':
        return (
          <TokenInfo
            t={t}
            isConnected={wallet.isConnected}
            explorerUrl={blockchain.currentNetwork.blockExplorer}
            onGetTokenInfo={handleGetTokenInfo}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <SEO
        title="Token Builder – Create ERC-20 Tokens on Base Network | Mintara"
        description="Professional no-code token builder for Base Network. Deploy, mint, burn, and manage ERC-20 tokens instantly. Free smart contract deployment with 33 wallet integrations."
        keywords="base token builder, create token base, deploy token base network, erc20 token creator, base smart contract, no-code token deployment, mintara builder, base blockchain tool, token factory base, base network deployment"
        canonical="https://mintara.xyz/builder"
        ogImage="https://mintara.xyz/builder-hero.png"
        structuredData={builderStructuredData}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-[#0A0B0D] via-[#0D1117] to-[#0A0B0D] relative overflow-hidden">
        {/* Animated Background Base Blue Gradients */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#0052FF]/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#00D1FF]/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-[#0052FF]/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        <LoadingOverlay isLoading={blockchain.isLoading} message={blockchain.loadingMessage} />
      
      {/* Header */}
      <Header
        t={t}
        language={language}
        setLanguage={setLanguage}
        availableLanguages={availableLanguages}
        walletAddress={wallet.address}
        walletBalance={wallet.balance || '0'}
        isConnected={wallet.isConnected}
        onConnect={handleOpenWalletModal}
        onDisconnect={handleDisconnect}
        currentNetwork={blockchain.currentNetwork}
        onNetworkChange={handleNetworkChange}
        onOpenWalletModal={handleOpenWalletModal}
      />

      <main className="relative z-10">
        {/* Hero Section */}
        <section id="home" className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="max-w-5xl mx-auto text-center space-y-6 sm:space-y-8">
            {/* Main Headline */}
            <div className="space-y-4 sm:space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0052FF]/10 border border-[#0052FF]/30">
                <span className="w-2 h-2 bg-[#00D1FF] rounded-full animate-pulse"></span>
                <span className="text-sm text-[#00D1FF]">{t('builtOnBase') || "Built on Base Network"}</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-megaeth bg-gradient-to-r from-[#0052FF] via-[#00D1FF] to-[#0052FF] bg-clip-text text-transparent leading-tight px-4">
                {t('heroTitle') || "Create Your Token on Base — No Code Needed"}
              </h1>
              
              <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto px-4">
                {t('heroDescription') || "Launch secure, verified smart contracts on Base Network instantly. Build your token empire without writing a single line of code."}
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 px-4">
              <Button
                onClick={() => {
                  const toolsSection = document.getElementById('tools');
                  toolsSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                className="w-full sm:w-auto bg-gradient-to-r from-[#0052FF] to-[#00D1FF] hover:from-[#0041CC] hover:to-[#00B8E6] !text-white px-8 py-6 rounded-xl text-lg shadow-2xl shadow-[#0052FF]/50 group relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <Rocket className="w-5 h-5" />
                  {t('getStarted') || "Get Started"}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shimmer transition-opacity"></div>
              </Button>
              
              <Button
                onClick={() => navigate('/minta-token')}
                variant="outline"
                className="w-full sm:w-auto border-[#0052FF]/50 text-[#00D1FF] hover:!bg-white hover:!text-[#0052FF] hover:!border-white px-8 py-6 rounded-xl text-lg transition-all duration-300"
              >
                MINTA TOKEN
              </Button>
            </div>
          </div>
        </section>



        {/* Feature Cards Section - Interactive Tool Selection */}
        <section id="tools" className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10 sm:mb-12">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-megaeth bg-gradient-to-r from-[#0052FF] to-[#00D1FF] bg-clip-text text-transparent mb-4">
                {t('tokenManagementTools') || "Token Management Tools"}
              </h2>
              <p className="text-gray-300 text-lg">
                {t('chooseToolDescription') || "Choose a tool to get started with your Base token"}
              </p>
            </div>

            {/* Feature Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <FeatureCard
                icon={Rocket}
                title={t('jettonGenerator')}
                description={t('jettonGeneratorDesc')}
                onClick={() => setActiveModal('generator')}
              />
              <FeatureCard
                icon={Zap}
                title={t('mintTokens')}
                description={t('mintTokensDesc')}
                onClick={() => setActiveModal('mint')}
              />
              <FeatureCard
                icon={Flame}
                title={t('burnTokens')}
                description={t('burnTokensDesc')}
                onClick={() => setActiveModal('burn')}
              />
              <FeatureCard
                icon={Ban}
                title={t('revokeOwnership')}
                description={t('revokeOwnershipDesc')}
                onClick={() => setActiveModal('revoke')}
              />
              <FeatureCard
                icon={Send}
                title={t('multisender')}
                description={t('multisenderDesc')}
                onClick={() => setActiveModal('multisend')}
              />
              <FeatureCard
                icon={Info}
                title={t('tokenInfo') || "Token Info"}
                description={t('tokenInfoDesc')}
                onClick={() => setActiveModal('info')}
              />
            </div>
          </div>
        </section>

        {/* Platform Stats */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {/* Tokens Created */}
            <div className="backdrop-blur-xl bg-white/5 border border-[#0052FF]/30 rounded-2xl p-6 text-center hover:bg-white/10 transition-all duration-300">
              <div className="text-3xl sm:text-4xl font-megaeth bg-gradient-to-r from-[#0052FF] to-[#00D1FF] bg-clip-text text-transparent mb-2">
                {stats.totalTokensDeployed}+
              </div>
              <div className="text-sm text-gray-400">{(t as any).tokensCreated || "Tokens Created"}</div>
            </div>

            {/* Transactions */}
            <div className="backdrop-blur-xl bg-white/5 border border-[#0052FF]/30 rounded-2xl p-6 text-center hover:bg-white/10 transition-all duration-300">
              <div className="text-3xl sm:text-4xl font-megaeth bg-gradient-to-r from-[#0052FF] to-[#00D1FF] bg-clip-text text-transparent mb-2">
                {stats.totalTransactions}+
              </div>
              <div className="text-sm text-gray-400">{(t as any).transactions || "Transactions"}</div>
            </div>

            {/* Active Users */}
            <div className="backdrop-blur-xl bg-white/5 border border-[#0052FF]/30 rounded-2xl p-6 text-center hover:bg-white/10 transition-all duration-300">
              <div className="text-3xl sm:text-4xl font-megaeth bg-gradient-to-r from-[#0052FF] to-[#00D1FF] bg-clip-text text-transparent mb-2">
                {stats.activeUsers}+
              </div>
              <div className="text-sm text-gray-400">{(t as any).activeUsers || "Active Users"}</div>
            </div>
          </div>
        </section>

        {/* Deployed Tokens List */}
        {wallet.isConnected && deployedTokens.length > 0 && (
          <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <DeployedTokensList
              tokens={deployedTokens}
              onRemove={removeDeployedToken}
              t={t}
            />
          </section>
        )}

        {/* Admin Panel - Only visible to admin wallet */}
        {wallet.isConnected && wallet.address && (
          <AdminPanel currentWalletAddress={wallet.address} />
        )}

        {/* Transaction History */}
        {wallet.isConnected && transactions.length > 0 && (
          <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <TransactionHistory
              transactions={transactions}
              onClear={clearHistory}
              t={t}
            />
          </section>
        )}
      </main>
      
      {/* Footer */}
      <Footer language={language} t={t} />
      
      
      {/* Settings Modal */}
      <SettingsModal
        isOpen={activeModal !== null}
        onClose={() => setActiveModal(null)}
        title={
          activeModal === 'generator' ? t.jettonGenerator :
          activeModal === 'mint' ? t.mintTokens :
          activeModal === 'burn' ? t.burnTokens :
          activeModal === 'revoke' ? t.revokeOwnership :
          activeModal === 'multisend' ? t.multisender :
          activeModal === 'info' ? ((t as any).tokenInfo || 'Token Info') :
          ''
        }
      >
        {renderModalContent()}
      </SettingsModal>

      {/* Wallet Connect Modal */}
      <WalletConnectModal
        isOpen={isWalletModalOpen}
        onClose={() => setIsWalletModalOpen(false)}
        onConnect={handleConnectWallet}
        currentNetwork={blockchain.currentNetwork}
        t={t}
      />
      
      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        .group:hover .group-hover\\:animate-shimmer {
          animation: shimmer 2s ease-in-out infinite;
        }
      `}</style>
      </div>
    </>
  );
}
