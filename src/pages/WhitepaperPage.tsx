import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../hooks/useLanguage';
import { useWallet } from '../hooks/useWallet';
import { useBlockchain } from '../hooks/useBlockchain';
import { Button } from '../components/ui/button';
import { ArrowLeft, FileText, Rocket, Brain, Network, TrendingUp, Shield, Users, Zap, Globe, DollarSign, Lock } from 'lucide-react';
import { SEO } from '../components/SEO';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { toast } from 'sonner';
import { useState } from 'react';
import { WalletConnectModal } from '../components/WalletConnectModal';

export const WhitepaperPage = () => {
  const navigate = useNavigate();
  const { language, setLanguage, t, availableLanguages } = useLanguage();
  const wallet = useWallet();
  const blockchain = useBlockchain(wallet);
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);

  const handleConnectWallet = async (walletId: string) => {
    try {
      await wallet.connectWallet(walletId);
      toast.success(t('success'), {
        description: t('walletConnected'),
      });
      setIsWalletModalOpen(false);
    } catch (error: any) {
      toast.error(t.error, {
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
      toast.success(t.success, {
        description: 'Network switched successfully',
      });
    } catch (error: any) {
      toast.error(t.error, {
        description: error.message,
      });
    }
  };

  return (
    <>
      <SEO
        title="Mintara Whitepaper – Technical Documentation | Base Token Builder"
        description="Read the official Mintara whitepaper. Learn about our no-code token creation platform, Base Network integration, tokenomics, and technical architecture."
        keywords="mintara whitepaper, base network documentation, token builder whitepaper, mintara technical docs, base blockchain whitepaper, erc-20 whitepaper, MINTA token, AI DePIN IVO"
        canonical="https://mintara.xyz/whitepaper"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-[#0A0B0D] via-[#0D1117] to-[#0A0B0D] relative overflow-hidden">
        {/* Animated Background */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#0052FF]/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#00D1FF]/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        {/* Content */}
        <div className="relative z-10">
          {/* Header Navigation */}
          <Header
            t={t}
            language={language}
            setLanguage={setLanguage}
            availableLanguages={availableLanguages}
            walletAddress={wallet.address}
            walletBalance={wallet.balance}
            isConnected={wallet.isConnected}
            onConnect={handleOpenWalletModal}
            onDisconnect={handleDisconnect}
            currentNetwork={blockchain.currentNetwork}
            onNetworkChange={handleNetworkChange}
            onOpenWalletModal={handleOpenWalletModal}
          />

          {/* Page Title Section */}
          <div className="border-b border-white/5 backdrop-blur-xl bg-white/5">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-[#0052FF] to-[#00D1FF] flex items-center justify-center">
                  <FileText className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-megaeth bg-gradient-to-r from-[#0052FF] to-[#00D1FF] bg-clip-text text-transparent">
                    Mintara Token (MINTA)
                  </h1>
                  <p className="text-gray-400 mt-2">
                    Whitepaper Version 3.1 - Base Network | No-Code Token Builder Ecosystem
                  </p>
                  <div className="flex items-center gap-4 mt-3 text-sm">
                    <span className="text-gray-500">Release: November 2025</span>
                    <span className="text-gray-600">•</span>
                    <a 
                      href="https://twitter.com/MintaraToken" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-[#00D1FF] hover:text-[#0052FF] transition-colors"
                    >
                      @MintaraToken
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
            <div className="max-w-5xl mx-auto space-y-12">
              
              {/* Executive Summary */}
              <section className="backdrop-blur-xl bg-white/5 border border-[#0052FF]/30 rounded-3xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#0052FF] to-[#00D1FF] flex items-center justify-center">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-megaeth text-white">1. Executive Summary</h2>
                </div>
                <div className="space-y-4 text-gray-300">
                  <p>
                    <strong className="text-white">Mintara</strong> is a no-code token creation platform built exclusively on the <strong className="text-[#00D1FF]">Base Network</strong>, allowing anyone to deploy secure ERC-20 tokens with a few simple inputs — no coding required.
                  </p>
                  <p>
                    The native utility token <strong className="text-white">MINTA</strong> fuels the platform's operations, covering AI audit credits, transaction fees, staking rewards, and future governance participation.
                  </p>
                  <p>
                    Mintara's mission is to make tokenization <strong className="text-[#00D1FF]">simple, affordable, and reliable</strong>, enabling developers, creators, and communities to launch their own tokens safely on Base.
                  </p>
                </div>
              </section>

              {/* Vision */}
              <section className="backdrop-blur-xl bg-white/5 border border-[#0052FF]/30 rounded-3xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#0052FF] to-[#00D1FF] flex items-center justify-center">
                    <Rocket className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-megaeth text-white">2. Vision</h2>
                </div>
                <div className="space-y-4 text-gray-300">
                  <p className="text-lg">
                    To make <strong className="text-[#00D1FF]">Base Network</strong> the easiest place to launch tokens with AI-assisted smart contract generation and transparent automation tools.
                  </p>
                  <p>
                    Mintara focuses on three goals:
                  </p>
                  <ul className="space-y-2 ml-6">
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-[#00D1FF] rounded-full mt-2"></div>
                      <span><strong className="text-white">Accessibility:</strong> no-code tools for every user.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-[#00D1FF] rounded-full mt-2"></div>
                      <span><strong className="text-white">Security:</strong> automated audits and safe contract templates.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-[#00D1FF] rounded-full mt-2"></div>
                      <span><strong className="text-white">Scalability:</strong> multi-chain compatibility in the future.</span>
                    </li>
                  </ul>
                  <p className="text-sm text-gray-400 mt-4">
                    Artificial Intelligence, DePIN, and IVO features are planned for later integration as the Mintara ecosystem grows.
                  </p>
                </div>
              </section>

              {/* Platform Overview */}
              <section className="backdrop-blur-xl bg-white/5 border border-[#0052FF]/30 rounded-3xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#0052FF] to-[#00D1FF] flex items-center justify-center">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-megaeth text-white">3. Platform Overview</h2>
                </div>
                <div className="space-y-4 text-gray-300">
                  <p>Mintara.xyz currently provides:</p>
                  <ul className="space-y-3 ml-6">
                    <li className="flex items-start gap-2">
                      <Rocket className="w-5 h-5 text-[#00D1FF] mt-0.5 flex-shrink-0" />
                      <div>
                        <strong className="text-white">No-Code Token Builder:</strong> create ERC-20 tokens instantly.
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <Zap className="w-5 h-5 text-[#00D1FF] mt-0.5 flex-shrink-0" />
                      <div>
                        <strong className="text-white">Custom Parameters:</strong> name, symbol, decimals, and supply.
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <Globe className="w-5 h-5 text-[#00D1FF] mt-0.5 flex-shrink-0" />
                      <div>
                        <strong className="text-white">Deployment on Base:</strong> direct contract deployment to Base mainnet.
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <Brain className="w-5 h-5 text-[#00D1FF] mt-0.5 flex-shrink-0" />
                      <div>
                        <strong className="text-white">AI-Assisted Verification (Planned):</strong> automatic gas optimization and smart audit tools.
                      </div>
                    </li>
                  </ul>
                  <p className="text-sm text-gray-400 mt-4">
                    <strong className="text-white">Future Modules:</strong> staking, IVO launchpad, DePIN compute network.
                  </p>
                </div>
              </section>

              {/* Token Information */}
              <section className="backdrop-blur-xl bg-white/5 border border-[#0052FF]/30 rounded-3xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#0052FF] to-[#00D1FF] flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-megaeth text-white">4. Token Information</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div className="backdrop-blur-xl bg-white/5 border border-[#0052FF]/20 rounded-xl p-4">
                    <div className="text-gray-400 mb-1">Token Name</div>
                    <div className="text-white font-megaeth">Mintara Token</div>
                  </div>
                  <div className="backdrop-blur-xl bg-white/5 border border-[#0052FF]/20 rounded-xl p-4">
                    <div className="text-gray-400 mb-1">Symbol</div>
                    <div className="text-white font-megaeth">MINTA</div>
                  </div>
                  <div className="backdrop-blur-xl bg-white/5 border border-[#0052FF]/20 rounded-xl p-4">
                    <div className="text-gray-400 mb-1">Network</div>
                    <div className="text-white font-megaeth">Base</div>
                  </div>
                  <div className="backdrop-blur-xl bg-white/5 border border-[#0052FF]/20 rounded-xl p-4">
                    <div className="text-gray-400 mb-1">Standard</div>
                    <div className="text-white font-megaeth">ERC-20</div>
                  </div>
                  <div className="backdrop-blur-xl bg-white/5 border border-[#0052FF]/20 rounded-xl p-4">
                    <div className="text-gray-400 mb-1">Total Supply</div>
                    <div className="text-white font-megaeth">100,000,000 MINTA</div>
                  </div>
                  <div className="backdrop-blur-xl bg-white/5 border border-[#0052FF]/20 rounded-xl p-4">
                    <div className="text-gray-400 mb-1">Decimals</div>
                    <div className="text-white font-megaeth">18</div>
                  </div>
                  <div className="backdrop-blur-xl bg-white/5 border border-[#0052FF]/20 rounded-xl p-4">
                    <div className="text-gray-400 mb-1">Airdrop Date</div>
                    <div className="text-white font-megaeth">Q1 2026</div>
                  </div>
                  <div className="backdrop-blur-xl bg-white/5 border border-[#0052FF]/20 rounded-xl p-4">
                    <div className="text-gray-400 mb-1">Contract Address</div>
                    <div className="text-white font-megaeth">TBA (post-audit)</div>
                  </div>
                </div>
              </section>

              {/* Tokenomics */}
              <section className="backdrop-blur-xl bg-white/5 border border-[#0052FF]/30 rounded-3xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#0052FF] to-[#00D1FF] flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-megaeth text-white">5. Tokenomics</h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="text-left text-gray-400 pb-3 pr-4">Allocation</th>
                        <th className="text-left text-gray-400 pb-3 pr-4">Percentage</th>
                        <th className="text-left text-gray-400 pb-3 pr-4">Amount (MINTA)</th>
                        <th className="text-left text-gray-400 pb-3">Description</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-300">
                      <tr className="border-b border-white/5">
                        <td className="py-3 pr-4 text-white">Airdrop</td>
                        <td className="py-3 pr-4">25%</td>
                        <td className="py-3 pr-4">25,000,000</td>
                        <td className="py-3">Early Base users and Mintara community airdrop</td>
                      </tr>
                      <tr className="border-b border-white/5">
                        <td className="py-3 pr-4 text-white">Development & Infrastructure</td>
                        <td className="py-3 pr-4">25%</td>
                        <td className="py-3 pr-4">25,000,000</td>
                        <td className="py-3">Platform updates, audits, and AI integration</td>
                      </tr>
                      <tr className="border-b border-white/5">
                        <td className="py-3 pr-4 text-white">Ecosystem Growth</td>
                        <td className="py-3 pr-4">20%</td>
                        <td className="py-3 pr-4">20,000,000</td>
                        <td className="py-3">Partnerships, builder rewards, integrations</td>
                      </tr>
                      <tr className="border-b border-white/5">
                        <td className="py-3 pr-4 text-white">Team & Advisors</td>
                        <td className="py-3 pr-4">15%</td>
                        <td className="py-3 pr-4">15,000,000</td>
                        <td className="py-3">24-month vesting schedule</td>
                      </tr>
                      <tr className="border-b border-white/5">
                        <td className="py-3 pr-4 text-white">Liquidity & Exchange Listings</td>
                        <td className="py-3 pr-4">10%</td>
                        <td className="py-3 pr-4">10,000,000</td>
                        <td className="py-3">BaseDEX liquidity and future CEX listings</td>
                      </tr>
                      <tr>
                        <td className="py-3 pr-4 text-white">Reserve & Treasury</td>
                        <td className="py-3 pr-4">5%</td>
                        <td className="py-3 pr-4">5,000,000</td>
                        <td className="py-3">Future upgrades and operational buffer</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              {/* Utility */}
              <section className="backdrop-blur-xl bg-white/5 border border-[#0052FF]/30 rounded-3xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#0052FF] to-[#00D1FF] flex items-center justify-center">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-megaeth text-white">6. Utility of MINTA Token</h2>
                </div>
                <ul className="space-y-3 ml-6 text-gray-300">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-[#00D1FF] rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">Transaction Fees:</strong> pay for token creation or contract deployment.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-[#00D1FF] rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">Staking (2026):</strong> earn passive rewards by locking MINTA.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-[#00D1FF] rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">Premium Access:</strong> unlock AI audits and advanced builder features.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-[#00D1FF] rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">Governance (Planned):</strong> vote on future Mintara proposals.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-[#00D1FF] rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <strong className="text-white">Reward Distribution:</strong> used for partner incentives and user rewards.
                    </div>
                  </li>
                </ul>
              </section>

              {/* Roadmap */}
              <section className="backdrop-blur-xl bg-white/5 border border-[#0052FF]/30 rounded-3xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#0052FF] to-[#00D1FF] flex items-center justify-center">
                    <Globe className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-megaeth text-white">7. Roadmap</h2>
                </div>
                <div className="space-y-4">
                  <div className="backdrop-blur-xl bg-white/5 border border-[#0052FF]/20 rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-2 h-2 bg-[#00D1FF] rounded-full"></div>
                      <h3 className="text-white font-megaeth">Q4 2025</h3>
                    </div>
                    <p className="text-gray-300 text-sm">Mintara Beta Launch on Base mainnet — live token builder</p>
                  </div>

                  <div className="backdrop-blur-xl bg-white/5 border border-[#0052FF]/20 rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-2 h-2 bg-[#00D1FF] rounded-full"></div>
                      <h3 className="text-white font-megaeth">Q1 2026</h3>
                    </div>
                    <p className="text-gray-300 text-sm">MINTA Airdrop & user growth campaign</p>
                  </div>

                  <div className="backdrop-blur-xl bg-white/5 border border-[#0052FF]/20 rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-2 h-2 bg-[#00D1FF] rounded-full"></div>
                      <h3 className="text-white font-megaeth">Q2 2026</h3>
                    </div>
                    <p className="text-gray-300 text-sm">AI optimization module beta (auto gas tuning, safety checks)</p>
                  </div>

                  <div className="backdrop-blur-xl bg-white/5 border border-[#0052FF]/20 rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-2 h-2 bg-[#00D1FF] rounded-full"></div>
                      <h3 className="text-white font-megaeth">Q3 2026</h3>
                    </div>
                    <p className="text-gray-300 text-sm">Mintara Dashboard — analytics for deployed tokens</p>
                  </div>

                  <div className="backdrop-blur-xl bg-white/5 border border-[#0052FF]/20 rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-2 h-2 bg-[#00D1FF] rounded-full"></div>
                      <h3 className="text-white font-megaeth">Q4 2026</h3>
                    </div>
                    <p className="text-gray-300 text-sm">Staking & reward system for MINTA holders</p>
                  </div>

                  <div className="backdrop-blur-xl bg-white/5 border border-[#0052FF]/20 rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-2 h-2 bg-[#00D1FF] rounded-full"></div>
                      <h3 className="text-white font-megaeth">2027 (Planned)</h3>
                    </div>
                    <p className="text-gray-300 text-sm">Multi-chain expansion (Arbitrum, Optimism) after stability testing</p>
                  </div>
                </div>
              </section>

              {/* Future Development */}
              <section className="backdrop-blur-xl bg-white/5 border border-[#0052FF]/30 rounded-3xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#0052FF] to-[#00D1FF] flex items-center justify-center">
                    <Brain className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-megaeth text-white">8. Future Development (Planned Features)</h2>
                </div>
                <div className="space-y-4">
                  <div className="backdrop-blur-xl bg-white/5 border border-[#0052FF]/20 rounded-xl p-5">
                    <h3 className="text-white font-megaeth mb-2 flex items-center gap-2">
                      <Brain className="w-5 h-5 text-[#00D1FF]" />
                      AI Integration
                    </h3>
                    <p className="text-gray-400 text-sm">Mintara AI will optimize contract gas usage and audit vulnerabilities before deployment.</p>
                  </div>
                  
                  <div className="backdrop-blur-xl bg-white/5 border border-[#0052FF]/20 rounded-xl p-5">
                    <h3 className="text-white font-megaeth mb-2 flex items-center gap-2">
                      <Network className="w-5 h-5 text-[#00D1FF]" />
                      DePIN Network
                    </h3>
                    <p className="text-gray-400 text-sm">Decentralized compute nodes may run lightweight AI inference tasks for small MINTA rewards.</p>
                  </div>
                  
                  <div className="backdrop-blur-xl bg-white/5 border border-[#0052FF]/20 rounded-xl p-5">
                    <h3 className="text-white font-megaeth mb-2 flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-[#00D1FF]" />
                      IVO Launchpad
                    </h3>
                    <p className="text-gray-400 text-sm">Projects built with Mintara will be able to raise funds transparently using MINTA tokens.</p>
                  </div>
                </div>
              </section>

              {/* Security */}
              <section className="backdrop-blur-xl bg-white/5 border border-[#0052FF]/30 rounded-3xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#0052FF] to-[#00D1FF] flex items-center justify-center">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-megaeth text-white">9. Security & Audits</h2>
                </div>
                <div className="space-y-3 text-gray-300">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-[#00D1FF] rounded-full mt-2"></div>
                    <p>Pre-audited Base ERC-20 templates.</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-[#00D1FF] rounded-full mt-2"></div>
                    <p>Optional AI-powered contract scanning.</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-[#00D1FF] rounded-full mt-2"></div>
                    <p>External audit before CEX listing.</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-[#00D1FF] rounded-full mt-2"></div>
                    <p>All verified contracts published on BaseScan.</p>
                  </div>
                </div>
              </section>

              {/* Legal Disclaimer */}
              <section className="backdrop-blur-xl bg-white/5 border border-[#0052FF]/30 rounded-3xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#0052FF] to-[#00D1FF] flex items-center justify-center">
                    <Lock className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-megaeth text-white">10. Legal Disclaimer</h2>
                </div>
                <div className="text-gray-300 space-y-3">
                  <p>
                    This whitepaper is for <strong className="text-white">informational purposes only</strong> and does not constitute investment advice. 
                  </p>
                  <p>
                    Participation in the Mintara ecosystem is voluntary and subject to local regulations.
                  </p>
                </div>
              </section>

              {/* Summary */}
              <section className="backdrop-blur-xl bg-gradient-to-r from-[#0052FF]/10 to-[#00D1FF]/10 border border-[#0052FF]/30 rounded-3xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#0052FF] to-[#00D1FF] flex items-center justify-center">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-megaeth text-white">Summary</h2>
                </div>
                <div className="text-gray-300 space-y-4">
                  <p className="text-lg">
                    <strong className="text-white">Mintara Token (MINTA)</strong> is the native asset powering the first no-code token builder on Base Network, supporting a safer, smarter, and community-driven way to launch digital assets.
                  </p>
                  <p className="text-center text-xl font-megaeth bg-gradient-to-r from-[#0052FF] to-[#00D1FF] bg-clip-text text-transparent mt-6">
                    "Simplify Token Creation — Empower Builders."
                  </p>
                </div>
              </section>

            </div>
          </div>

        </div>
      
        {/* Footer */}
        <Footer language={undefined} t={t} />
      </div>

      {/* Wallet Connect Modal */}
      <WalletConnectModal
        isOpen={isWalletModalOpen}
        onClose={() => setIsWalletModalOpen(false)}
        onConnect={handleConnectWallet}
        currentNetwork={blockchain.currentNetwork}
        t={t}
      />
    </>
  );
};
