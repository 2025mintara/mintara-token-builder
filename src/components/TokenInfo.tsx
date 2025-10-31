import { useState } from 'react';
import { Translation } from '../translations/translations';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { Search, ExternalLink, Copy, Check } from 'lucide-react';
import { Badge } from './ui/badge';

interface TokenInfoProps {
  t: Translation;
  isConnected: boolean;
  explorerUrl?: string;
  onGetTokenInfo: (contractAddress: string) => Promise<{
    name: string;
    symbol: string;
    decimals: number;
    totalSupply: string;
    burnedAmount: string;
    owner: string;
    address: string;
  }>;
}

export const TokenInfo = ({ t, isConnected, explorerUrl = 'https://basescan.org', onGetTokenInfo }: TokenInfoProps) => {
  const [contractAddress, setContractAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [tokenInfo, setTokenInfo] = useState<{
    name: string;
    symbol: string;
    decimals: number;
    totalSupply: string;
    burnedAmount: string;
    owner: string;
    address: string;
  } | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isConnected) {
      alert(t.walletRequired);
      return;
    }

    if (!contractAddress || contractAddress.trim() === '') {
      alert('Please enter a contract address');
      return;
    }

    // Basic validation
    if (!contractAddress.startsWith('0x') || contractAddress.length !== 42) {
      alert('Invalid address format. Please enter a valid contract address (42 characters starting with 0x)');
      return;
    }

    setIsLoading(true);
    setTokenInfo(null); // Clear previous results

    try {
      const info = await onGetTokenInfo(contractAddress.trim());
      setTokenInfo(info);
    } catch (error: any) {
      const errorMessage = error.message || 'Failed to fetch token info';
      alert(errorMessage);
      setTokenInfo(null);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 10)}...${address.slice(-8)}`;
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-br from-[#0052FF] to-[#00D1FF] rounded-lg flex items-center justify-center">
            <Search className="w-5 h-5 text-white" />
          </div>
          <div>
            <CardTitle>{t.tokenInfo}</CardTitle>
            <CardDescription className="text-green-400">
              ✨ <span className="font-semibold">Free</span> — Query token information
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="searchContractAddress">{t.contractAddress}</Label>
            <div className="flex gap-2">
              <Input
                id="searchContractAddress"
                placeholder="0x..."
                value={contractAddress}
                onChange={(e) => setContractAddress(e.target.value)}
                disabled={isLoading}
                className="flex-1"
              />
              <Button
                type="submit"
                className="bg-gradient-to-r from-[#0052FF] to-[#00D1FF] hover:from-[#0041CC] hover:to-[#00B8E6]"
                disabled={isLoading || !isConnected}
              >
                <Search className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </form>

        {tokenInfo && (
          <div className="mt-6 space-y-4">
            {/* Token Name & Symbol */}
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-[#0052FF]/10 to-[#00D1FF]/10 rounded-lg border border-[#0052FF]/30">
              <div>
                <p className="text-sm text-gray-600">Token</p>
                <h3 className="text-teal-900">
                  {tokenInfo.name} ({tokenInfo.symbol})
                </h3>
              </div>
              <Badge variant="secondary">
                {tokenInfo.decimals} {t.decimals}
              </Badge>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-white rounded-lg border">
                <p className="text-sm text-gray-600 mb-1">{t.totalSupply}</p>
                <p className="text-lg">
                  {parseFloat(tokenInfo.totalSupply).toLocaleString()} {tokenInfo.symbol}
                </p>
              </div>

              <div className="p-4 bg-white rounded-lg border">
                <p className="text-sm text-gray-600 mb-1">{t.burnedAmount}</p>
                <p className="text-lg text-red-600">
                  {parseFloat(tokenInfo.burnedAmount).toLocaleString()} {tokenInfo.symbol}
                </p>
              </div>
            </div>

            {/* Contract Address */}
            <div className="p-4 bg-white rounded-lg border space-y-2">
              <p className="text-sm text-gray-600">{t.contractAddress}</p>
              <div className="flex items-center gap-2">
                <code className="flex-1 text-sm bg-gray-50 px-3 py-2 rounded">
                  {formatAddress(tokenInfo.address)}
                </code>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => copyToClipboard(tokenInfo.address, 'address')}
                >
                  {copiedField === 'address' ? (
                    <Check className="w-4 h-4 text-[#00D1FF]" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() =>
                    window.open(`${explorerUrl}/address/${tokenInfo.address}`, '_blank')
                  }
                >
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Owner Address */}
            <div className="p-4 bg-white rounded-lg border space-y-2">
              <p className="text-sm text-gray-600">{t.owner}</p>
              <div className="flex items-center gap-2">
                <code className="flex-1 text-sm bg-gray-50 px-3 py-2 rounded">
                  {formatAddress(tokenInfo.owner)}
                </code>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => copyToClipboard(tokenInfo.owner, 'owner')}
                >
                  {copiedField === 'owner' ? (
                    <Check className="w-4 h-4 text-[#00D1FF]" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
