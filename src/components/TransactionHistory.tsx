import { Transaction } from '../hooks/useTransactionHistory';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ExternalLink, ChevronDown, ChevronUp, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { Translation } from '../translations/translations';
import { getNetworkById } from '../config/networks';
import { getNetworkIcon } from '../utils/networkIcons';

interface TransactionHistoryProps {
  transactions: Transaction[];
  onClear: () => void;
  t: Translation;
}

export const TransactionHistory = ({ transactions, onClear, t }: TransactionHistoryProps) => {
  const [expanded, setExpanded] = useState(false);
  const [showAll, setShowAll] = useState(false);

  const displayedTransactions = showAll ? transactions : transactions.slice(0, 5);

  const getTypeIcon = (type: Transaction['type']) => {
    switch (type) {
      case 'deploy':
        return '🚀';
      case 'mint':
        return '⚡';
      case 'burn':
        return '🔥';
      case 'update':
        return '✏️';
      case 'revoke':
        return '🛡️';
      case 'multisend':
        return '📤';
      default:
        return '📝';
    }
  };

  const getTypeLabel = (type: Transaction['type']) => {
    switch (type) {
      case 'deploy':
        return t.jettonGenerator || 'Token Builder';
      case 'mint':
        return t.mintTokens || 'Mint Tokens';
      case 'burn':
        return t.burnTokens || 'Burn Tokens';
      case 'update':
        return t.updateMetadata || 'Update Metadata';
      case 'revoke':
        return t.revokeOwnership || 'Revoke Ownership';
      case 'multisend':
        return t.multisender || 'Multisend';
      default:
        return type;
    }
  };

  const formatDate = (timestamp: number) => {
    const now = Date.now();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return t.justNow || 'Just now';
    if (minutes < 60) return `${minutes}m ${t.ago || 'ago'}`;
    if (hours < 24) return `${hours}h ${t.ago || 'ago'}`;
    if (days < 7) return `${days}d ${t.ago || 'ago'}`;

    return new Date(timestamp).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  if (transactions.length === 0) {
    return null;
  }

  return (
    <div className="backdrop-blur-xl bg-white/5 border border-[#0052FF]/20 rounded-3xl p-6 md:p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0052FF]/20 to-[#00D1FF]/20 border border-[#0052FF]/30 flex items-center justify-center">
            <span className="text-2xl">📊</span>
          </div>
          <div>
            <h3 className="text-2xl font-megaeth bg-gradient-to-r from-[#0052FF] to-[#00D1FF] bg-clip-text text-transparent">
              {t.transactionHistory || 'Transaction History'}
            </h3>
            <p className="text-sm text-gray-400">
              {transactions.length} {transactions.length === 1 ? 'transaction' : 'transactions'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {transactions.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                if (confirm(t.confirmClearHistory || 'Clear all transaction history?')) {
                  onClear();
                }
              }}
              className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setExpanded(!expanded)}
            className="text-gray-400 hover:text-white"
          >
            {expanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </Button>
        </div>
      </div>

      {/* Transactions List */}
      {expanded && (
        <div className="space-y-2">
          {displayedTransactions.map((tx) => {
            const network = getNetworkById(tx.networkId);
            return (
              <Card
                key={tx.id}
                className="bg-white/5 border-white/10 hover:border-[#00D1FF]/30 transition-all p-4"
              >
                <div className="flex items-center justify-between gap-4">
                  {/* Left: Type & Info */}
                  <div className="flex items-center gap-3 flex-1">
                    <div className="text-2xl">{getTypeIcon(tx.type)}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span className="font-megaeth text-white">{getTypeLabel(tx.type)}</span>
                        <Badge
                          variant="outline"
                          className="border-[#0052FF]/30 text-[#00D1FF] text-xs flex items-center gap-1"
                        >
                          {getNetworkIcon(network, 'h-3 w-3')} {network.name}
                        </Badge>
                      </div>
                      <div className="text-sm text-gray-400">
                        {tx.tokenName} ({tx.tokenSymbol})
                        {tx.amount && (
                          <span className="ml-2">
                            • {parseFloat(tx.amount).toLocaleString()} {tx.tokenSymbol}
                          </span>
                        )}
                      </div>
                      {tx.details && (
                        <div className="text-xs text-gray-500 mt-1">{tx.details}</div>
                      )}
                    </div>
                  </div>

                  {/* Right: Time & Link */}
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-gray-400 whitespace-nowrap">
                      {formatDate(tx.timestamp)}
                    </span>
                    {tx.txHash && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          window.open(`${network.blockExplorer}/tx/${tx.txHash}`, '_blank')
                        }
                        className="text-[#00D1FF] hover:text-[#00B8E6] hover:bg-[#0052FF]/10"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            );
          })}

          {/* Show More/Less Button */}
          {transactions.length > 5 && (
            <Button
              variant="outline"
              className="w-full bg-white/5 border-white/10 text-white hover:bg-white/10 font-megaeth"
              onClick={() => setShowAll(!showAll)}
            >
              {showAll ? (
                <>
                  <ChevronUp className="w-4 h-4 mr-2" />
                  {t.showLess || 'Show Less'}
                </>
              ) : (
                <>
                  <ChevronDown className="w-4 h-4 mr-2" />
                  {t.showMore || `Show ${transactions.length - 5} More`}
                </>
              )}
            </Button>
          )}
        </div>
      )}
    </div>
  );
};
