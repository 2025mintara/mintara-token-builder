import { useState, useMemo } from 'react';
import { Translation } from '../translations/translations';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Send, Loader2, ExternalLink } from 'lucide-react';
import { Alert, AlertDescription } from './ui/alert';
import { Badge } from './ui/badge';

interface MultisenderProps {
  t: Translation;
  isConnected: boolean;
  networkFee: string;
  onMultisend: (
    contractAddress: string,
    recipients: Array<{ address: string; amount: string }>
  ) => Promise<{ transactionHash: string; explorerUrl: string }>;
}

export const Multisender = ({ t, isConnected, networkFee, onMultisend }: MultisenderProps) => {
  const [contractAddress, setContractAddress] = useState('');
  const [recipientsList, setRecipientsList] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<{
    transactionHash: string;
    explorerUrl: string;
  } | null>(null);

  const parsedRecipients = useMemo(() => {
    if (!recipientsList.trim()) return [];

    const lines = recipientsList.split('\n').filter(line => line.trim());
    const recipients: Array<{ address: string; amount: string }> = [];

    for (const line of lines) {
      const parts = line.trim().split(':');
      if (parts.length === 2) {
        const address = parts[0].trim();
        const amount = parts[1].trim();
        if (address && amount) {
          recipients.push({ address, amount });
        }
      }
    }

    return recipients;
  }, [recipientsList]);

  const totalAmount = useMemo(() => {
    return parsedRecipients.reduce((sum, recipient) => {
      return sum + parseFloat(recipient.amount || '0');
    }, 0);
  }, [parsedRecipients]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isConnected) {
      alert(t.walletRequired);
      return;
    }

    if (!contractAddress || parsedRecipients.length === 0) {
      alert(t.invalidInput);
      return;
    }

    setIsLoading(true);
    setResult(null);

    try {
      const multisendResult = await onMultisend(contractAddress, parsedRecipients);
      setResult(multisendResult);
      
      // Reset recipients list
      setRecipientsList('');
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
            <Send className="w-5 h-5 text-white" />
          </div>
          <div>
            <CardTitle>{t.multisender}</CardTitle>
            <CardDescription className="text-[#00D1FF]">
              Multi-Send Fee: <span className="font-semibold">1 USDC Mintara System Fee</span>
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="multisendContractAddress">{t.contractAddress}</Label>
            <Input
              id="multisendContractAddress"
              placeholder="0x..."
              value={contractAddress}
              onChange={(e) => setContractAddress(e.target.value)}
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="recipientsList">{t.recipientsList}</Label>
            <Textarea
              id="recipientsList"
              placeholder={t.recipientPlaceholder}
              value={recipientsList}
              onChange={(e) => setRecipientsList(e.target.value)}
              disabled={isLoading}
              rows={8}
              className="font-mono text-sm"
            />
          </div>

          {parsedRecipients.length > 0 && (
            <div className="flex gap-4 p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm text-gray-600">{t.totalRecipients}</p>
                <Badge variant="secondary" className="mt-1">
                  {parsedRecipients.length}
                </Badge>
              </div>
              <div>
                <p className="text-sm text-gray-600">{t.totalAmount}</p>
                <Badge variant="secondary" className="mt-1">
                  {totalAmount.toLocaleString()}
                </Badge>
              </div>
            </div>
          )}

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-[#0052FF] to-[#00D1FF] hover:from-[#0041CC] hover:to-[#00B8E6] text-white shadow-lg shadow-[#0052FF]/50"
            disabled={isLoading || !isConnected || parsedRecipients.length === 0}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                {t.sending}
              </>
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                {t.sendTokens} — 1 USDC Mintara System Fee
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
                <p className="text-[#00D1FF]">{t.tokensSent}</p>
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
