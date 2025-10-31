import { useState } from 'react';
import { Translation } from '../translations/translations';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { ShieldOff, Loader2, ExternalLink, AlertTriangle } from 'lucide-react';
import { Alert, AlertDescription } from './ui/alert';
import { Checkbox } from './ui/checkbox';

interface RevokeOwnershipProps {
  t: Translation;
  isConnected: boolean;
  networkFee: string;
  onRevoke: (
    contractAddress: string
  ) => Promise<{ transactionHash: string; explorerUrl: string }>;
}

export const RevokeOwnership = ({ t, isConnected, networkFee, onRevoke }: RevokeOwnershipProps) => {
  const [contractAddress, setContractAddress] = useState('');
  const [confirmed, setConfirmed] = useState(false);
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

    if (!contractAddress) {
      alert(t.invalidInput);
      return;
    }

    if (!confirmed) {
      alert(t.pleaseConfirmIrreversible);
      return;
    }

    setIsLoading(true);
    setResult(null);

    try {
      const revokeResult = await onRevoke(contractAddress);
      setResult(revokeResult);
      
      // Reset form
      setContractAddress('');
      setConfirmed(false);
    } catch (error: any) {
      alert(error.message || t.transactionFailed);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="border-red-200">
      <CardHeader>
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-pink-500 rounded-lg flex items-center justify-center">
            <ShieldOff className="w-5 h-5 text-white" />
          </div>
          <div>
            <CardTitle className="text-red-600">{t.revokeOwnership}</CardTitle>
            <CardDescription className="text-green-600 font-semibold">{t.freeNoFeeRequired}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Alert className="mb-4 border-yellow-200 bg-yellow-50">
          <AlertTriangle className="h-4 w-4 text-yellow-600" />
          <AlertDescription className="text-yellow-800">
            {t.revokeWarning}
          </AlertDescription>
        </Alert>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="revokeContractAddress">{t.contractAddress}</Label>
            <Input
              id="revokeContractAddress"
              placeholder="0x..."
              value={contractAddress}
              onChange={(e) => setContractAddress(e.target.value)}
              disabled={isLoading}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="confirmRevoke"
              checked={confirmed}
              onCheckedChange={(checked) => setConfirmed(checked as boolean)}
              disabled={isLoading}
            />
            <label
              htmlFor="confirmRevoke"
              className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {t.confirmRevoke}
            </label>
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-red-600 to-pink-600"
            disabled={isLoading || !isConnected || !confirmed}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                {t.revoking}
              </>
            ) : (
              <>
                <ShieldOff className="w-4 h-4 mr-2" />
                {t.revokeOwnershipBtn}
              </>
            )}
          </Button>
        </form>

        {result && (
          <Alert className="mt-4 bg-[#0052FF]/10 border-[#00D1FF]/30">
            <AlertDescription>
              <div className="space-y-2">
                <p className="text-[#00D1FF]">{t.ownershipRevoked}</p>
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
