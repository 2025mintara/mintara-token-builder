import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { Shield, Copy, ExternalLink, Calendar, Search, Loader2 } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { toast } from 'sonner';

interface TokenData {
  name: string;
  symbol: string;
  address: string;
  totalSupply: string;
  decimals: number;
  networkId: string;
  networkName: string;
  deployerAddress: string;
  txHash: string;
  logo?: string;
  timestamp?: number;
}

interface AdminPanelProps {
  currentWalletAddress: string;
}

const ADMIN_WALLET = '0x59B16A1c411536241390484C4Da404b365336b45';

export const AdminPanel = ({ currentWalletAddress }: AdminPanelProps) => {
  const [allTokens, setAllTokens] = useState<TokenData[]>([]);
  const [searchAddress, setSearchAddress] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [baseScanTxs, setBaseScanTxs] = useState<any[]>([]);

  useEffect(() => {
    // Load all deployed tokens from all wallets
    const loadAllTokens = () => {
      const tokens: TokenData[] = [];
      
      // Scan localStorage for all deployed token keys
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('deployedTokens_')) {
          try {
            const walletTokens = JSON.parse(localStorage.getItem(key) || '[]');
            tokens.push(...walletTokens);
          } catch (error) {
            console.error('Error loading tokens from', key, error);
          }
        }
      }

      // Sort by timestamp (newest first)
      tokens.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
      setAllTokens(tokens);
    };

    loadAllTokens();
  }, []);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied!', {
      description: `${label} copied to clipboard`,
    });
  };

  const formatDate = (timestamp?: number) => {
    if (!timestamp) return 'Unknown';
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  // BaseScan API - Fetch transaction history for airdrop calculation
  const fetchBaseScanTransactions = async (address: string) => {
    if (!address || address.length !== 42) {
      toast.error('Invalid address format');
      return;
    }

    setIsSearching(true);
    try {
      // BaseScan API endpoint (free tier - no API key needed for basic queries)
      // For production, get API key from https://basescan.org/apis
      const BASESCAN_API_KEY = 'YourApiKeyToken'; // Replace with real API key
      const response = await fetch(
        `https://api.basescan.org/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&sort=desc&apikey=${BASESCAN_API_KEY}`
      );
      
      const data = await response.json();
      
      if (data.status === '1' && data.result) {
        // Filter only transactions to ADMIN_WALLET (fee payments)
        const feeTransactions = data.result.filter((tx: any) => 
          tx.to && tx.to.toLowerCase() === ADMIN_WALLET.toLowerCase() && tx.value !== '0'
        );
        
        setBaseScanTxs(feeTransactions);
        
        // Calculate $MINTA rewards
        // Note: Fees are now 1 USDC per operation (paid to admin wallet)
        const deployCount = feeTransactions.filter((tx: any) => 
          tx.value === '1000000' // 1 USDC in USDC decimals (deploy fee)
        ).length;
        
        const otherOpsCount = feeTransactions.filter((tx: any) => 
          tx.value === '1000000' // 1 USDC (mint/burn/multisend)
        ).length;
        
        const totalMinta = (deployCount * 100) + (otherOpsCount * 50);
        
        toast.success('BaseScan data loaded!', {
          description: `Found ${feeTransactions.length} transactions. Estimated: ${totalMinta} $MINTA`,
        });
      } else {
        toast.error('No transactions found', {
          description: data.message || 'BaseScan API error',
        });
        setBaseScanTxs([]);
      }
    } catch (error) {
      console.error('BaseScan API error:', error);
      toast.error('Failed to fetch data', {
        description: 'Check console for details',
      });
      setBaseScanTxs([]);
    } finally {
      setIsSearching(false);
    }
  };

  // Check if current wallet is admin
  if (currentWalletAddress.toLowerCase() !== ADMIN_WALLET.toLowerCase()) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/30 shadow-xl">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <CardTitle className="text-2xl bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Admin Dashboard
              </CardTitle>
              <CardDescription className="text-gray-400 space-y-1">
                <div>Monitoring all deployed tokens across all wallets</div>
                <div className="flex items-center gap-2 text-xs text-[#00D1FF]">
                  💰 <span className="font-semibold">All fees collected by Mintara System</span>
                </div>
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="text-sm text-gray-400">Total Tokens Deployed</div>
              <div className="text-3xl font-megaeth text-purple-400 mt-1">{allTokens.length}</div>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="text-sm text-gray-400">Unique Deployers</div>
              <div className="text-3xl font-megaeth text-pink-400 mt-1">
                {new Set(allTokens.map(t => t.deployerAddress.toLowerCase())).size}
              </div>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="text-sm text-gray-400">Networks Used</div>
              <div className="text-3xl font-megaeth text-blue-400 mt-1">
                {new Set(allTokens.map(t => t.networkId)).size}
              </div>
            </div>
            <div className="p-4 rounded-xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30">
              <div className="text-sm text-gray-400">Estimated Revenue (Deploy Only)</div>
              <div className="text-3xl font-megaeth text-green-400 mt-1">
                {allTokens.length} USDC
              </div>
              <div className="text-xs text-green-300 mt-1">
                ≈ ${allTokens.length.toLocaleString()} USD (1 USDC per deploy)
              </div>
            </div>
          </div>

          {/* $MINTA Airdrop Rewards (Manual Distribution) */}
          <Card className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border-yellow-500/30">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <span className="text-2xl">🪙</span>
                <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                  $MINTA Airdrop Calculator
                </span>
                <Badge variant="outline" className="border-yellow-500/30 text-yellow-400 text-xs">
                  Manual Distribution
                </Badge>
              </CardTitle>
              <CardDescription className="text-gray-400">
                Track potential $MINTA rewards for users (to be distributed manually when token launches)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-white/5 border border-yellow-500/20">
                  <div className="text-sm text-gray-400">Token Deployments</div>
                  <div className="text-2xl font-megaeth text-yellow-400 mt-1">
                    {allTokens.length} × 100 = {allTokens.length * 100} $MINTA
                  </div>
                  <div className="text-xs text-gray-500 mt-1">100 $MINTA per deploy</div>
                </div>
                
                <div className="p-4 rounded-xl bg-white/5 border border-orange-500/20">
                  <div className="text-sm text-gray-400">Other Paid Operations</div>
                  <div className="text-2xl font-megaeth text-orange-400 mt-1">
                    TBD × 50 $MINTA
                  </div>
                  <div className="text-xs text-gray-500 mt-1">50 $MINTA per mint/burn/etc</div>
                </div>

                <div className="p-4 rounded-xl bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border border-yellow-500/40">
                  <div className="text-sm text-gray-400">Total Estimated</div>
                  <div className="text-2xl font-megaeth text-yellow-300 mt-1">
                    {allTokens.length * 100} $MINTA
                  </div>
                  <div className="text-xs text-yellow-200 mt-1">Deploy rewards only (for now)</div>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-yellow-500/5 border border-yellow-500/20">
                <div className="flex items-start gap-3">
                  <span className="text-xl">ℹ️</span>
                  <div className="text-sm text-gray-300 space-y-1">
                    <p className="font-medium text-yellow-300">$MINTA Token Status: Coming Soon</p>
                    <p>• Token has not been created yet</p>
                    <p>• Will be distributed manually based on transaction volume</p>
                    <p>• Rewards calculated: Deploy (100 $MINTA), Other ops (50 $MINTA)</p>
                    <p>• Use BaseScan API to verify wallet transactions for accurate distribution</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* BaseScan Transaction Lookup for Airdrop */}
          <Card className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/30">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Search className="w-5 h-5 text-blue-400" />
                <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  BaseScan Airdrop Lookup
                </span>
              </CardTitle>
              <CardDescription className="text-gray-400">
                Check any wallet's transactions to calculate $MINTA airdrop eligibility
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-3">
                <Input
                  placeholder="Enter wallet address (0x...)"
                  value={searchAddress}
                  onChange={(e) => setSearchAddress(e.target.value)}
                  className="font-mono bg-[#0A0B0D] border-blue-500/30"
                />
                <Button
                  onClick={() => fetchBaseScanTransactions(searchAddress)}
                  disabled={isSearching || !searchAddress}
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 !text-white"
                >
                  {isSearching ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Searching...
                    </>
                  ) : (
                    <>
                      <Search className="w-4 h-4 mr-2" />
                      Lookup
                    </>
                  )}
                </Button>
              </div>

              {baseScanTxs.length > 0 && (
                <div className="space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="p-3 rounded-lg bg-white/5 border border-blue-500/20">
                      <div className="text-xs text-gray-400">Total Fee Transactions</div>
                      <div className="text-xl font-megaeth text-blue-400 mt-1">
                        {baseScanTxs.length}
                      </div>
                    </div>
                    <div className="p-3 rounded-lg bg-white/5 border border-cyan-500/20">
                      <div className="text-xs text-gray-400">Total Fees Paid</div>
                      <div className="text-xl font-megaeth text-cyan-400 mt-1">
                        {(baseScanTxs.reduce((sum, tx) => sum + parseFloat(tx.value), 0) / 1e18).toFixed(5)} ETH
                      </div>
                    </div>
                    <div className="p-3 rounded-lg bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border border-yellow-500/30">
                      <div className="text-xs text-gray-400">Estimated $MINTA</div>
                      <div className="text-xl font-megaeth text-yellow-400 mt-1">
                        {baseScanTxs.length * 100} $MINTA
                      </div>
                      <div className="text-xs text-yellow-300">Assuming all deploys (100 each)</div>
                    </div>
                  </div>

                  <ScrollArea className="h-[300px] rounded-lg border border-blue-500/20 bg-white/5">
                    <div className="p-3 space-y-2">
                      {baseScanTxs.map((tx, index) => (
                        <div key={index} className="p-3 rounded-lg bg-white/5 border border-white/10 text-sm">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-mono text-gray-400">{formatAddress(tx.hash)}</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 px-2"
                              onClick={() => window.open(`https://basescan.org/tx/${tx.hash}`, '_blank')}
                            >
                              <ExternalLink className="w-3 h-3" />
                            </Button>
                          </div>
                          <div className="grid grid-cols-3 gap-2 text-xs text-gray-500">
                            <div>
                              <span className="text-gray-600">Value:</span>
                              <span className="text-cyan-400 ml-1">{(parseFloat(tx.value) / 1e18).toFixed(5)} ETH</span>
                            </div>
                            <div>
                              <span className="text-gray-600">Block:</span>
                              <span className="text-gray-400 ml-1">{tx.blockNumber}</span>
                            </div>
                            <div>
                              <span className="text-gray-600">Time:</span>
                              <span className="text-gray-400 ml-1">
                                {new Date(parseInt(tx.timeStamp) * 1000).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
              )}

              <div className="p-3 rounded-lg bg-blue-500/5 border border-blue-500/20 text-xs text-gray-400">
                <p><strong className="text-blue-300">How it works:</strong></p>
                <p className="mt-1">• Enter any wallet address to check their transaction history</p>
                <p>• System queries BaseScan API for all Mintara System Fee transactions</p>
                <p>• Calculates $MINTA rewards: Deploy (100), Mint/Burn (50)</p>
                <p className="mt-2 text-yellow-300"><strong>Note:</strong> Requires BaseScan API key for production use</p>
              </div>
            </CardContent>
          </Card>

          {/* Tokens List */}
          <div>
            <h3 className="text-lg font-megaeth text-white mb-4 flex items-center gap-2">
              <span>All Deployed Tokens</span>
              <Badge variant="secondary" className="bg-purple-500/20 text-purple-300">
                {allTokens.length}
              </Badge>
            </h3>
            
            <ScrollArea className="h-[600px] rounded-xl border border-white/10 bg-white/5">
              <div className="p-4 space-y-3">
                {allTokens.length === 0 ? (
                  <div className="text-center py-12 text-gray-400">
                    No tokens deployed yet
                  </div>
                ) : (
                  allTokens.map((token, index) => (
                    <div
                      key={`${token.address}-${index}`}
                      className="p-4 rounded-lg bg-gradient-to-r from-white/5 to-white/10 border border-white/10 hover:border-purple-500/30 transition-all group"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 space-y-3">
                          {/* Token Name & Symbol */}
                          <div className="flex items-center gap-3">
                            {token.logo && (
                              <img 
                                src={token.logo} 
                                alt={token.name}
                                className="w-10 h-10 rounded-full bg-white/10"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).style.display = 'none';
                                }}
                              />
                            )}
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-megaeth text-white">{token.name}</span>
                                <Badge variant="outline" className="border-[#0052FF]/30 text-[#00D1FF]">
                                  {token.symbol}
                                </Badge>
                              </div>
                              <div className="text-xs text-gray-500 flex items-center gap-2 mt-1">
                                <Calendar className="w-3 h-3" />
                                {formatDate(token.timestamp)}
                              </div>
                            </div>
                          </div>

                          {/* Token Details Grid */}
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 text-sm">
                            <div>
                              <div className="text-gray-500 text-xs">Contract Address</div>
                              <div className="flex items-center gap-1 text-gray-300">
                                <span className="font-mono">{formatAddress(token.address)}</span>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-5 w-5 p-0 hover:bg-white/10"
                                  onClick={() => copyToClipboard(token.address, 'Contract address')}
                                >
                                  <Copy className="w-3 h-3" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-5 w-5 p-0 hover:bg-white/10"
                                  onClick={() => window.open(`https://basescan.org/address/${token.address}`, '_blank')}
                                >
                                  <ExternalLink className="w-3 h-3 text-purple-400" />
                                </Button>
                              </div>
                            </div>

                            <div>
                              <div className="text-gray-500 text-xs">Deployer Wallet</div>
                              <div className="flex items-center gap-1 text-gray-300">
                                <span className="font-mono">{formatAddress(token.deployerAddress)}</span>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-5 w-5 p-0 hover:bg-white/10"
                                  onClick={() => copyToClipboard(token.deployerAddress, 'Deployer address')}
                                >
                                  <Copy className="w-3 h-3" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-5 w-5 p-0 hover:bg-white/10"
                                  onClick={() => window.open(`https://basescan.org/address/${token.deployerAddress}`, '_blank')}
                                >
                                  <ExternalLink className="w-3 h-3 text-pink-400" />
                                </Button>
                              </div>
                            </div>

                            <div>
                              <div className="text-gray-500 text-xs">Total Supply</div>
                              <div className="text-gray-300 font-mono">
                                {parseFloat(token.totalSupply).toLocaleString()}
                              </div>
                            </div>

                            <div>
                              <div className="text-gray-500 text-xs">Network</div>
                              <div className="text-gray-300">
                                <Badge variant="secondary" className="bg-[#0052FF]/20 text-[#00D1FF] text-xs">
                                  {token.networkName}
                                </Badge>
                              </div>
                            </div>
                          </div>

                          {/* Transaction Hash */}
                          <div className="flex items-center gap-2 text-xs">
                            <span className="text-gray-500">TX:</span>
                            <span className="font-mono text-gray-400">{formatAddress(token.txHash)}</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-5 w-5 p-0 hover:bg-white/10"
                              onClick={() => {
                                // Import getNetworkById at top of file to get proper explorer URL
                                const explorerUrl = token.networkId === 'base' 
                                  ? `https://basescan.org/tx/${token.txHash}`
                                  : `https://basescan.org/tx/${token.txHash}`; // Base is default
                                window.open(explorerUrl, '_blank');
                              }}
                            >
                              <ExternalLink className="w-3 h-3 text-gray-400" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </ScrollArea>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
