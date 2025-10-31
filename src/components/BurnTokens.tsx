import { useState } from 'react';
import { Translation } from '../translations/translations';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { Flame, Loader2, ExternalLink } from 'lucide-react';
import { Alert, AlertDescription } from './ui/alert';

interface BurnTokensProps {
  t: Translation;
  isConnected: boolean;
  networkFee: string;
  onBurn: (
    contractAddress: string,
    amount: string
  ) => Promise<{ transactionHash: string; explorerUrl: string }>;
}

export const BurnTokens = ({ t, isConnected, networkFee, onBurn }: BurnTokensProps) => {
  const [formData, setFormData] = useState({
    contractAddress: '',
    amount: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<{
    transactionHash: string;
    explorerUrl: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isConnected) {
      alert(t.walletRequired);
      return;
    }

    if (!formData.contractAddress || !formData.amount) {
      alert(t.invalidInput);
      return;
    }

    setIsLoading(true);
    setResult(null);

    try {
      const burnResult = await onBurn(formData.contractAddress, formData.amount);
      setResult(burnResult);
      
      // Reset amount only
      setFormData({ ...formData, amount: '' });
    } catch (error: any) {
      alert(error.message || t.transactionFailed);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-br from-[#0052FF] to-[#00D1FF] rounded-lg flex items-center justify-center">
            <Flame className="w-5 h-5 text-white" />
          </div>
          <div>
            <CardTitle>{t.burnTokens}</CardTitle>
            <CardDescription className="text-[#00D1FF]">
              Burn Fee: <span className="font-semibold">1 USDC Mintara System Fee</span>
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="burnContractAddress">{t.contractAddress}</Label>
            <Input
              id="burnContractAddress"
              placeholder="0x..."
              value={formData.contractAddress}
              onChange={(e) => setFormData({ ...formData, contractAddress: e.target.value })}
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="burnAmount">{t.amountToBurn}</Label>
            <Input
              id="burnAmount"
              type="number"
              placeholder="e.g., 500"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              disabled={isLoading}
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-[#0052FF] to-[#00D1FF] hover:from-[#0041CC] hover:to-[#00B8E6] text-white shadow-lg shadow-[#0052FF]/50"
            disabled={isLoading || !isConnected}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                {t.burning}
              </>
            ) : (
              <>
                <Flame className="w-4 h-4 mr-2" />
                {t.burn} — 1 USDC Mintara System Fee
              </>
            )}
          </Button>
          
          <p className="text-xs text-gray-400 text-center mt-2">
            💡 Fee handled automatically by Mintara system
          </p>
        </form>

        {result && (
          <Alert className="mt-4 bg-[#0052FF]/10 border-[#00D1FF]/30">
            <AlertDescription>
              <div className="space-y-2">
                <p className="text-[#00D1FF]">{t.tokensBurned}</p>
                <div className="space-y-1 text-sm">
                  <p>
                    <strong>{t.transactionHash}:</strong>{' '}
                    <code className="bg-white px-2 py-1 rounded text-xs">
                      {result.transactionHash}
                    </code>
                  </p>
                  <a
                    href={result.explorerUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline inline-flex items-center gap-1"
                  >
                    {t.viewOnExplorer}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
};
