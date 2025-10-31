import { DeployedToken } from '../hooks/useDeployedTokens';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ExternalLink, Copy, Trash2, ChevronDown, ChevronUp, Coins, Wallet } from 'lucide-react';
import { toast } from 'sonner';
import { useState } from 'react';
import { Translation } from '../translations/translations';
import { getNetworkById } from '../config/networks';
import { getNetworkIcon } from '../utils/networkIcons';

interface DeployedTokensListProps {
  tokens: DeployedToken[];
  onRemove: (tokenId: string) => void;
  t: Translation;
}

export const DeployedTokensList = ({ tokens, onRemove, t }: DeployedTokensListProps) => {
  const [expanded, setExpanded] = useState(true);
  const [showAll, setShowAll] = useState(false);

  const displayedTokens = showAll ? tokens : tokens.slice(0, 5);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(t('success'), {
      description: `${label} ${t('copiedToClipboard') || 'copied to clipboard'}`,
    });
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatSupply = (supply: string) => {
    const num = parseFloat(supply);
    if (num >= 1000000000) return `${(num / 1000000000).toFixed(2)}B`;
    if (num >= 1000000) return `${(num / 1000000).toFixed(2)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(2)}K`;
    return num.toLocaleString();
  };

  const addToWallet = async (token: DeployedToken) => {
    try {
      const ethereum = (window as any).ethereum;
      if (!ethereum) {
        toast.error('Error', {
          description: 'MetaMask not detected. Please install MetaMask.',
        });
        return;
      }

      await ethereum.request({
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC20',
          options: {
            address: token.address,
            symbol: token.symbol,
            decimals: token.decimals,
            image: token.logo || '',
          },
        },
      });

      toast.success(t('success'), {
        description: `${token.symbol} added to wallet!`,
      });
    } catch (error: any) {
      console.error('Add to wallet error:', error);
      if (error.code === 4001) {
        toast.info('Cancelled', {
          description: 'Token not added to wallet',
        });
      } else {
        toast.error('Error', {
          description: error.message || 'Failed to add token to wallet',
        });
      }
    }
  };

  if (tokens.length === 0) {
    return null;
  }

  return (
    <div className="backdrop-blur-xl bg-white/5 border border-[#0052FF]/20 rounded-2xl sm:rounded-3xl p-3 sm:p-6 md:p-8 space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-gradient-to-br from-[#0052FF]/20 to-[#00D1FF]/20 border border-[#0052FF]/30 flex items-center justify-center">
            <span className="text-xl sm:text-2xl">📜</span>
          </div>
          <div>
            <h3 className="text-base sm:text-xl md:text-2xl font-megaeth bg-gradient-to-r from-[#0052FF] to-[#00D1FF] bg-clip-text text-transparent">
              {t.myTokens || 'My Tokens'}
            </h3>
            <p className="text-xs sm:text-sm text-gray-400">
              {tokens.length} {tokens.length === 1 ? 'token' : 'tokens'}
            </p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setExpanded(!expanded)}
          className="text-gray-400 hover:text-white"
        >
          {expanded ? <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5" /> : <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5" />}
        </Button>
      </div>

      {/* Tokens List */}
      {expanded && (
        <div className="space-y-2 sm:space-y-3">
          {displayedTokens.map((token) => {
            const network = getNetworkById(token.networkId);
            return (
              <Card
                key={token.id}
                className="bg-white/5 border-white/10 hover:border-[#00D1FF]/30 transition-all p-3 sm:p-4 group"
              >
                <div className="space-y-3">
                  {/* Token Header */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      {token.logo && (
                        <img
                          src={token.logo}
                          alt={token.name}
                          className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-white/20 flex-shrink-0"
                        />
                      )}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-megaeth text-white text-sm sm:text-base md:text-lg truncate">
                          {token.name}
                        </h4>
                        <p className="text-xs sm:text-sm text-gray-400">{token.symbol}</p>
                      </div>
                    </div>
                    
                    {/* Network Badge */}
                    <Badge
                      variant="outline"
                      className="border-[#0052FF]/30 text-[#00D1FF] text-xs flex items-center gap-1 flex-shrink-0"
                    >
                      {getNetworkIcon(network, 'h-3 w-3')} 
                      <span className="hidden sm:inline">{network.name}</span>
                      <span className="sm:hidden">{network.id.toUpperCase().slice(0, 3)}</span>
                    </Badge>
                  </div>

                  {/* Token Details Grid */}
                  <div className="grid grid-cols-2 gap-2 text-xs sm:text-sm">
                    {/* Total Supply */}
                    <div className="bg-black/20 rounded-lg px-2 sm:px-3 py-1.5 sm:py-2">
                      <div className="flex items-center gap-1 mb-1">
                        <Coins className="w-3 h-3 text-[#00D1FF]" />
                        <span className="text-gray-400 text-xs">Total Supply</span>
                      </div>
                      <span className="text-white font-megaeth text-xs sm:text-sm block truncate">
                        {formatSupply(token.totalSupply)}
                      </span>
                    </div>

                    {/* Minted Amount */}
                    <div className="bg-black/20 rounded-lg px-2 sm:px-3 py-1.5 sm:py-2">
                      <div className="flex items-center gap-1 mb-1">
                        <span className="text-[#00D1FF] text-xs">✨</span>
                        <span className="text-gray-400 text-xs">Minted</span>
                      </div>
                      <span className="text-white font-megaeth text-xs sm:text-sm block truncate">
                        {formatSupply(token.totalSupply)}
                      </span>
                    </div>
                  </div>

                  {/* Contract Address */}
                  <div className="bg-black/20 rounded-lg px-2 sm:px-3 py-2 space-y-1">
                    <span className="text-gray-400 text-xs">Contract Address:</span>
                    <div className="flex items-center gap-2">
                      <code className="text-[#00D1FF] text-xs font-mono flex-1 break-all">
                        {token.address}
                      </code>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(token.address, 'Address')}
                        className="h-6 w-6 p-0 hover:bg-white/10 flex-shrink-0"
                      >
                        <Copy className="w-3 h-3 text-gray-400" />
                      </Button>
                    </div>
                  </div>

                  {/* Deploy Date */}
                  <div className="text-xs text-gray-400">
                    <span className="text-gray-500">Deployed:</span> {formatDate(token.timestamp)}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-2 border-t border-white/5">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => addToWallet(token)}
                      className="flex-1 text-green-400 hover:text-green-300 hover:bg-green-500/10 border-green-500/30 text-xs sm:text-sm"
                    >
                      <Wallet className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                      <span className="hidden sm:inline">Add to Wallet</span>
                      <span className="sm:hidden">Add</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        window.open(`${network.blockExplorer}/address/${token.address}`, '_blank')
                      }
                      className="flex-1 text-[#00D1FF] hover:text-[#00B8E6] hover:bg-[#0052FF]/10 border-[#0052FF]/30 text-xs sm:text-sm"
                    >
                      <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                      <span className="hidden sm:inline">Explorer</span>
                      <span className="sm:hidden">View</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        if (confirm(`Remove ${token.name}?`)) {
                          onRemove(token.id);
                          toast.success(t('success'), {
                            description: `${token.name} removed`,
                          });
                        }
                      }}
                      className="text-red-400 hover:text-red-300 hover:bg-red-500/10 border-red-500/30 px-2 sm:px-4"
                    >
                      <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}

          {/* Show More/Less Button */}
          {tokens.length > 5 && (
            <Button
              variant="outline"
              className="w-full bg-white/5 border-white/10 text-white hover:bg-white/10 font-megaeth text-xs sm:text-sm"
              onClick={() => setShowAll(!showAll)}
            >
              {showAll ? (
                <>
                  <ChevronUp className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                  Show Less
                </>
              ) : (
                <>
                  <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                  Show {tokens.length - 5} More
                </>
              )}
            </Button>
          )}
        </div>
      )}
    </div>
  );
};
