import { useState } from 'react';
import { Translation } from '../translations/translations';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { Edit, Loader2, ExternalLink, Upload, Link as LinkIcon, AlertTriangle } from 'lucide-react';
import { Alert, AlertDescription } from './ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

interface UpdateMetadataProps {
  t: Translation;
  isConnected: boolean;
  networkFee: string;
  onUpdate: (
    contractAddress: string,
    newName?: string,
    newSymbol?: string,
    newLogo?: string
  ) => Promise<{ transactionHash: string; explorerUrl: string }>;
}

export const UpdateMetadata = ({ t, isConnected, networkFee, onUpdate }: UpdateMetadataProps) => {
  const [formData, setFormData] = useState({
    contractAddress: '',
    newName: '',
    newSymbol: '',
    newLogo: '',
  });
  const [logoUploadMethod, setLogoUploadMethod] = useState<'url' | 'file'>('url');
  const [logoPreview, setLogoPreview] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<{
    transactionHash: string;
    explorerUrl: string;
  } | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file type
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file');
      return;
    }

    // Check file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      alert('File size should be less than 2MB');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      setFormData({ ...formData, newLogo: base64String });
      setLogoPreview(base64String);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isConnected) {
      alert(t.walletRequired);
      return;
    }

    if (!formData.contractAddress) {
      alert(t.invalidInput);
      return;
    }

    if (!formData.newName && !formData.newSymbol && !formData.newLogo) {
      alert(t.invalidInput);
      return;
    }

    setIsLoading(true);
    setResult(null);

    try {
      const updateResult = await onUpdate(
        formData.contractAddress,
        formData.newName || undefined,
        formData.newSymbol || undefined,
        formData.newLogo || undefined
      );
      setResult(updateResult);
      
      // Reset fields except contract address
      setFormData({ ...formData, newName: '', newSymbol: '', newLogo: '' });
      setLogoPreview('');
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
            <Edit className="w-5 h-5 text-white" />
          </div>
          <div>
            <CardTitle>{t.updateMetadata}</CardTitle>
            <CardDescription>Fee: {networkFee}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Alert className="mb-4 border-yellow-200 bg-yellow-50">
          <AlertTriangle className="h-4 w-4 text-yellow-600" />
          <AlertDescription className="text-yellow-800">
            <strong>Important:</strong> ERC20 token name and symbol are immutable on the blockchain. This feature simulates metadata updates for off-chain systems only. The token's on-chain name and symbol cannot be changed.
          </AlertDescription>
        </Alert>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="updateContractAddress">{t.contractAddress}</Label>
            <Input
              id="updateContractAddress"
              placeholder="0x..."
              value={formData.contractAddress}
              onChange={(e) => setFormData({ ...formData, contractAddress: e.target.value })}
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="newName">{t.newTokenName}</Label>
            <Input
              id="newName"
              placeholder="Leave empty to keep current"
              value={formData.newName}
              onChange={(e) => setFormData({ ...formData, newName: e.target.value })}
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="newSymbol">{t.newTokenSymbol}</Label>
            <Input
              id="newSymbol"
              placeholder="Leave empty to keep current"
              value={formData.newSymbol}
              onChange={(e) => setFormData({ ...formData, newSymbol: e.target.value.toUpperCase() })}
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="newLogo">{t.newTokenLogo}</Label>
            <Tabs value={logoUploadMethod} onValueChange={(v) => setLogoUploadMethod(v as 'url' | 'file')} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="url" className="flex items-center gap-1">
                  <LinkIcon className="w-3 h-3" />
                  URL
                </TabsTrigger>
                <TabsTrigger value="file" className="flex items-center gap-1">
                  <Upload className="w-3 h-3" />
                  Upload
                </TabsTrigger>
              </TabsList>
              <TabsContent value="url" className="mt-2">
                <Input
                  id="newLogo"
                  placeholder="Leave empty to keep current"
                  value={logoUploadMethod === 'url' ? formData.newLogo : ''}
                  onChange={(e) => {
                    setFormData({ ...formData, newLogo: e.target.value });
                    setLogoPreview(e.target.value);
                  }}
                  disabled={isLoading}
                />
              </TabsContent>
              <TabsContent value="file" className="mt-2">
                <div className="space-y-2">
                  <Input
                    id="logoFile"
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    disabled={isLoading}
                    className="cursor-pointer"
                  />
                  <p className="text-xs text-gray-500">Max 2MB • PNG, JPG, GIF, WebP</p>
                </div>
              </TabsContent>
            </Tabs>
            
            {/* Logo Preview */}
            {logoPreview && (
              <div className="mt-2 p-3 border rounded-lg bg-gray-50">
                <p className="text-xs text-gray-600 mb-2">Preview:</p>
                <img 
                  src={logoPreview} 
                  alt="Logo preview" 
                  className="w-16 h-16 object-contain rounded border bg-white"
                  onError={() => setLogoPreview('')}
                />
              </div>
            )}
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-[#0052FF] to-[#00D1FF] hover:from-[#0041CC] hover:to-[#00B8E6]"
            disabled={isLoading || !isConnected}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                {t.updating}
              </>
            ) : (
              <>
                <Edit className="w-4 h-4 mr-2" />
                {t.updateMetadataBtn}
              </>
            )}
          </Button>
        </form>

        {result && (
          <Alert className="mt-4 bg-[#0052FF]/10 border-[#00D1FF]/30">
            <AlertDescription>
              <div className="space-y-2">
                <p className="text-[#00D1FF]">{t.metadataUpdated}</p>
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
