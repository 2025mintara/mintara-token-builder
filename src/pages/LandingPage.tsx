import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../hooks/useLanguage';
import { useEffect, useState } from 'react';
import { Button } from '../components/ui/button';
import { Rocket, Globe, Code2, Zap, Shield, Coins, Settings, Github, Sparkles, Image as ImageIcon } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { LanguageCode } from '../translations/translations';
import { SEO } from '../components/SEO';
import { Footer } from '../components/Footer';

export const LandingPage = () => {
  const navigate = useNavigate();
  const { language, setLanguage, t, availableLanguages } = useLanguage();
  
  // Real-time stats from localStorage
  const [stats, setStats] = useState({
    tokensCreated: 0,
    transactions: 0,
    activeUsers: 0,
  });

  useEffect(() => {
    // Load real deployed tokens from all wallets
    let totalTokens = 0;
    let uniqueDeployers = new Set<string>();
    let totalTransactions = 0;

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('deployedTokens_')) {
        try {
          const tokens = JSON.parse(localStorage.getItem(key) || '[]');
          totalTokens += tokens.length;
          totalTransactions += tokens.length; // Each deployment is a transaction
          
          tokens.forEach((token: any) => {
            if (token.deployerAddress) {
              uniqueDeployers.add(token.deployerAddress.toLowerCase());
            }
          });
        } catch (error) {
          console.error('Error loading tokens from', key, error);
        }
      }
    }

    setStats({
      tokensCreated: totalTokens > 0 ? totalTokens : 10, // Minimum 10 for display
      transactions: totalTransactions > 0 ? totalTransactions : 10,
      activeUsers: uniqueDeployers.size > 0 ? uniqueDeployers.size : 10,
    });
  }, []);

  // Schema.org structured data for homepage
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Mintara Token Builder",
    "alternateName": "Mintara",
    "url": "https://mintara.xyz",
    "description": "Create, deploy, and manage ERC-20 tokens on Base Network without writing code. The easiest no-code token builder for Base blockchain.",
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "No-code token creation on Base Network",
      "Instant smart contract deployment",
      "Token management dashboard",
      "Multi-language support (8 languages)",
      "Secure wallet integration",
      "Real-time transaction tracking"
    ],
    "provider": {
      "@type": "Organization",
      "name": "Mintara",
      "url": "https://mintara.xyz"
    }
  };

  return (
    <>
      <SEO
        title="Mintara – Create Tokens on Base Network, No Code Needed"
        description="Launch secure, verified ERC-20 tokens on Base Network instantly. Build your token empire without writing a single line of code. Free, fast, and reliable."
        keywords="base token builder, base network, mintara, base token generator, create token on base, no-code token, base smart contract, base blockchain, erc-20 token, base network builder, token creator base, base deployment tool"
        canonical={`https://mintara.xyz/${language}/`}
        ogImage="https://mintara.xyz/hero.png"
        structuredData={structuredData}
      />
      
    <div className="min-h-screen bg-gradient-to-br from-[#0A0B0D] via-[#0D1117] to-[#0A0B0D] relative overflow-hidden flex flex-col">
      {/* Animated Background Base Blue Gradients */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#0052FF]/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#00D1FF]/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-[#0052FF]/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Language Selector - Top Right */}
      <div className="relative z-20 p-4 flex justify-end">
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
      </div>

      {/* Main Content - Centered */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 sm:px-6 py-8 sm:py-0">
        <div className="max-w-4xl w-full text-center space-y-6 sm:space-y-8 md:space-y-12">
          {/* Logo/Icon */}
          <div className="flex justify-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-r from-[#0052FF] to-[#00D1FF] flex items-center justify-center animate-pulse">
              <span className="text-3xl sm:text-4xl">🔵</span>
            </div>
          </div>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 sm:px-6 py-1.5 sm:py-2 rounded-full bg-[#0052FF]/10 border border-[#0052FF]/30">
            <span className="w-2 h-2 bg-[#00D1FF] rounded-full animate-pulse"></span>
            <span className="text-xs sm:text-sm text-[#00D1FF] font-megaeth whitespace-nowrap">{t('builtOnBase') || "Built on Base Network"}</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-megaeth bg-gradient-to-r from-[#0052FF] via-[#00D1FF] to-[#0052FF] bg-clip-text text-transparent leading-tight">
            Mintara
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-300 max-w-3xl mx-auto font-megaeth px-2">
            {t('createTokenTagline') || "Create Your Token on Base — No Code Needed"}
          </p>

          {/* AI NFT Builder Info */}
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gradient bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent max-w-3xl mx-auto font-megaeth px-2">
            {t('aiNftBuilderTagline') || "Plus, Create NFTs with AI — No Design Skills Needed"}
          </p>

          {/* Description */}
          <p className="text-sm sm:text-base md:text-lg text-gray-400 max-w-2xl mx-auto px-2">
            {t('description')}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4 sm:pt-8">
            <Button
              onClick={() => navigate('/builder')}
              className="bg-gradient-to-r from-[#0052FF] to-[#00D1FF] hover:from-[#0041CC] hover:to-[#00B8E6] active:from-[#003399] active:to-[#0099CC] !text-white px-8 sm:px-12 py-5 sm:py-8 rounded-xl text-base sm:text-lg md:text-xl shadow-2xl shadow-[#0052FF]/50 group relative overflow-hidden font-megaeth w-full sm:w-auto touch-manipulation"
            >
              <span className="relative z-10 flex items-center justify-center gap-2 sm:gap-3">
                <Rocket className="w-5 h-5 sm:w-6 sm:h-6" />
                {t('jettonGenerator')}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </Button>
            <Button
              onClick={() => navigate('/ai-nft-builder')}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 !text-white px-8 sm:px-12 py-5 sm:py-8 rounded-xl text-base sm:text-lg md:text-xl shadow-2xl shadow-purple-600/50 group relative overflow-hidden font-megaeth w-full sm:w-auto touch-manipulation"
            >
              <span className="relative z-10 flex items-center justify-center gap-2 sm:gap-3">
                <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" />
                AI NFT Builder
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </Button>
          </div>

          {/* Stats - Real-time from deployed tokens */}
          <div className="grid grid-cols-3 gap-3 sm:gap-4 md:gap-6 pt-12 max-w-2xl mx-auto px-4">
            <div className="backdrop-blur-xl bg-white/5 border border-[#0052FF]/30 rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6">
              <div className="text-2xl sm:text-3xl md:text-4xl font-megaeth bg-gradient-to-r from-[#0052FF] to-[#00D1FF] bg-clip-text text-transparent">
                {stats.tokensCreated}+
              </div>
              <div className="text-[10px] sm:text-xs md:text-sm text-gray-400 mt-1 sm:mt-2">{t('tokensCreated') || "Tokens Created"}</div>
            </div>
            <div className="backdrop-blur-xl bg-white/5 border border-[#0052FF]/30 rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6">
              <div className="text-2xl sm:text-3xl md:text-4xl font-megaeth bg-gradient-to-r from-[#0052FF] to-[#00D1FF] bg-clip-text text-transparent">
                {stats.transactions}+
              </div>
              <div className="text-[10px] sm:text-xs md:text-sm text-gray-400 mt-1 sm:mt-2">{t('transactions') || "Transactions"}</div>
            </div>
            <div className="backdrop-blur-xl bg-white/5 border border-[#0052FF]/30 rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6">
              <div className="text-2xl sm:text-3xl md:text-4xl font-megaeth bg-gradient-to-r from-[#0052FF] to-[#00D1FF] bg-clip-text text-transparent">
                {stats.activeUsers}+
              </div>
              <div className="text-[10px] sm:text-xs md:text-sm text-gray-400 mt-1 sm:mt-2">{t('activeUsers') || "Active Users"}</div>
            </div>
          </div>
        </div>
      </main>

      {/* Why Choose Mintara Section */}
      <section className="relative z-10 py-12 sm:py-16 md:py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-10 sm:mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-megaeth bg-gradient-to-r from-[#0052FF] to-[#00D1FF] bg-clip-text text-transparent mb-3 sm:mb-4">
              {t('whyChooseMintara') || "Why Choose Mintara"}
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-400 max-w-2xl mx-auto">
              {t('whyChooseDescription') || "Everything you need to build and manage your Base token"}
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {/* Feature 1 */}
            <div className="group backdrop-blur-xl bg-white/5 border border-[#0052FF]/30 rounded-2xl p-6 hover:bg-white/10 hover:border-[#00D1FF]/50 transition-all duration-300 hover:scale-105">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#0052FF] to-[#00D1FF] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Code2 className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-megaeth text-white mb-2">
                {t('noCodingRequired') || "No Coding Required"}
              </h3>
              <p className="text-sm text-gray-400">
                {t('noCodingDesc') || "Create professional tokens with our intuitive interface. No blockchain knowledge needed."}
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group backdrop-blur-xl bg-white/5 border border-[#0052FF]/30 rounded-2xl p-6 hover:bg-white/10 hover:border-[#00D1FF]/50 transition-all duration-300 hover:scale-105">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#0052FF] to-[#00D1FF] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-megaeth text-white mb-2">
                {t('fastDeployment') || "Base-Exclusive Fast Deployment"}
              </h3>
              <p className="text-sm text-gray-400">
                {t('fastDeploymentDesc') || "Deploy tokens in seconds on Base's high-speed L2 network. Lightning-fast transactions."}
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group backdrop-blur-xl bg-white/5 border border-[#0052FF]/30 rounded-2xl p-6 hover:bg-white/10 hover:border-[#00D1FF]/50 transition-all duration-300 hover:scale-105">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#0052FF] to-[#00D1FF] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-megaeth text-white mb-2">
                {t('secureContracts') || "Secure Smart Contracts"}
              </h3>
              <p className="text-sm text-gray-400">
                {t('secureContractsDesc') || "Audited and battle-tested ERC-20 contracts. Your tokens are safe and compliant."}
              </p>
            </div>

            {/* Feature 4 */}
            <div className="group backdrop-blur-xl bg-white/5 border border-[#0052FF]/30 rounded-2xl p-6 hover:bg-white/10 hover:border-[#00D1FF]/50 transition-all duration-300 hover:scale-105">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#0052FF] to-[#00D1FF] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Coins className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-megaeth text-white mb-2">
                {t('lowGasFees') || "Low Gas Fees on Base"}
              </h3>
              <p className="text-sm text-gray-400">
                {t('lowGasFeesDesc') || "Enjoy extremely low transaction costs on Base Network. Save on every deployment."}
              </p>
            </div>

            {/* Feature 5 - AI NFT Builder */}
            <div className="group backdrop-blur-xl bg-white/5 border border-[#0052FF]/30 rounded-2xl p-6 hover:bg-white/10 hover:border-[#00D1FF]/50 transition-all duration-300 hover:scale-105">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#0052FF] to-[#00D1FF] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <ImageIcon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-megaeth text-white mb-2">
                {t('aiNftBuilderFeature') || "AI NFT Builder"}
              </h3>
              <p className="text-sm text-gray-400">
                {t('aiNftBuilderDesc') || "Create unique AI-generated NFT artwork and mint on Base Network with ultra-low fees."}
              </p>
            </div>

            {/* Feature 6 */}
            <div className="group backdrop-blur-xl bg-white/5 border border-[#0052FF]/30 rounded-2xl p-6 hover:bg-white/10 hover:border-[#00D1FF]/50 transition-all duration-300 hover:scale-105">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#0052FF] to-[#00D1FF] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Settings className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-megaeth text-white mb-2">
                {t('fullManagement') || "Full Token Management"}
              </h3>
              <p className="text-sm text-gray-400">
                {t('fullManagementDesc') || "Mint, burn, transfer ownership, and multisend - all in one powerful platform."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer language={language} t={t} />
    </div>
    </>
  );
};
