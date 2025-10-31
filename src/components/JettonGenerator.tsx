import { useState } from 'react';
import { Translation } from '../translations/translations';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { Coins, Loader2, ExternalLink, AlertCircle, Info, Upload, Link as LinkIcon } from 'lucide-react';
import { Alert, AlertDescription } from './ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

interface JettonGeneratorProps {
  t: Translation;
  isConnected: boolean;
  networkFee: string;
  currentNetwork?: string;
  userBalance?: string;
  onDeploy: (
    name: string,
    symbol: string,
    supply: string,
    decimals: number,
    logo: string,
    description?: string,
    website?: string,
    twitter?: string,
    telegram?: string
  ) => Promise<{ contractAddress: string; transactionHash: string; explorerUrl: string }>;
}

export const JettonGenerator = ({ 
  t, 
  isConnected, 
  networkFee, 
  currentNetwork,
  userBalance,
  onDeploy 
}: JettonGeneratorProps) => {
  const [formData, setFormData] = useState({
    name: '',
    symbol: '',
    supply: '',
    decimals: '18',
    logo: '',
    description: '',
    website: '',
    twitter: '',
    telegram: '',
  });
  const [logoUploadMethod, setLogoUploadMethod] = useState<'url' | 'file'>('file');
  const [logoPreview, setLogoPreview] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<{
    contractAddress: string;
    transactionHash: string;
    explorerUrl: string;
    tokenName?: string;
    tokenSymbol?: string;
    tokenDecimals?: number;
    tokenLogo?: string;
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
      setFormData({ ...formData, logo: base64String });
      setLogoPreview(base64String);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log('🚀 JettonGenerator: Form submitted');
    console.log('Form data:', formData);
    console.log('Is connected:', isConnected);
    console.log('Current network:', currentNetwork);
    console.log('Network fee:', networkFee);
    
    if (!isConnected) {
      console.error('❌ Wallet not connected');
      alert(t.walletRequired);
      return;
    }

    if (!formData.name || !formData.symbol || !formData.supply) {
      console.error('❌ Invalid input:', { name: formData.name, symbol: formData.symbol, supply: formData.supply });
      alert(t.invalidInput);
      return;
    }

    setIsLoading(true);
    setResult(null);

    try {
      console.log('📡 Calling onDeploy with params:', {
        name: formData.name,
        symbol: formData.symbol,
        supply: formData.supply,
        decimals: parseInt(formData.decimals),
        logo: formData.logo ? 'Yes' : 'No'
      });
      
      const deployResult = await onDeploy(
        formData.name,
        formData.symbol,
        formData.supply,
        parseInt(formData.decimals),
        formData.logo,
        formData.description,
        formData.website,
        formData.twitter,
        formData.telegram
      );
      
      console.log('✅ Deploy successful:', deployResult);
      
      // Save token metadata for "Add to Wallet" button
      setResult({
        ...deployResult,
        tokenName: formData.name,
        tokenSymbol: formData.symbol,
        tokenDecimals: parseInt(formData.decimals),
        tokenLogo: formData.logo,
      });
      
      // Reset form
      setFormData({
        name: '',
        symbol: '',
        supply: '',
        decimals: '18',
        logo: '',
        description: '',
        website: '',
        twitter: '',
        telegram: '',
      });
      setLogoPreview('');
      
      console.log('✅ Token deployed and form reset!');
    } catch (error: any) {
      console.error('❌ Deployment failed:', error);
      console.error('Error details:', {
        message: error.message,
        code: error.code,
        stack: error.stack
      });
      alert(error.message || t.transactionFailed);
    } finally {
      setIsLoading(false);
      console.log('🏁 Deployment process finished (success or fail)');
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-br from-[#0052FF] to-[#00D1FF] rounded-lg flex items-center justify-center">
            <Coins className="w-5 h-5 text-white" />
          </div>
          <div>
            <CardTitle>{t.jettonGenerator}</CardTitle>
            <CardDescription className="text-[#00D1FF]">
              Deploy Fee: <span className="font-semibold">1 USDC Mintara System Fee</span>
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Logo Upload Section + Token Name/Symbol */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left: Logo Upload */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-lg text-[#00D1FF]">LOGO</Label>
                <Tabs value={logoUploadMethod} onValueChange={(v) => setLogoUploadMethod(v as 'url' | 'file')} className="w-auto">
                  <TabsList className="grid w-full grid-cols-2 h-11 bg-gradient-to-r from-[#0052FF]/10 to-[#00D1FF]/10 border border-[#0052FF]/30 rounded-xl p-1.5 backdrop-blur-sm">
                    <TabsTrigger 
                      value="file" 
                      className="text-sm px-5 rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#0052FF] data-[state=active]:to-[#00D1FF] data-[state=active]:text-white data-[state=active]:shadow-xl data-[state=active]:shadow-[#0052FF]/50 data-[state=inactive]:text-gray-400 data-[state=inactive]:hover:text-white transition-all duration-300 font-megaeth"
                    >
                      <Upload className="w-4 h-4 mr-1.5 inline-block" /> Upload
                    </TabsTrigger>
                    <TabsTrigger 
                      value="url" 
                      className="text-sm px-5 rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#0052FF] data-[state=active]:to-[#00D1FF] data-[state=active]:text-white data-[state=active]:shadow-xl data-[state=active]:shadow-[#0052FF]/50 data-[state=inactive]:text-gray-400 data-[state=inactive]:hover:text-white transition-all duration-300 font-megaeth"
                    >
                      <LinkIcon className="w-4 h-4 mr-1.5 inline-block" /> URL
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              {/* Large Upload Area */}
              <div className="relative">
                {logoUploadMethod === 'file' ? (
                  <label
                    htmlFor="logoFile"
                    className="block w-full h-48 border-2 border-dashed border-[#00D1FF]/40 rounded-2xl bg-gradient-to-br from-[#0052FF]/5 via-transparent to-[#00D1FF]/5 hover:from-[#0052FF]/10 hover:to-[#00D1FF]/10 hover:border-[#00D1FF]/70 transition-all duration-300 cursor-pointer backdrop-blur-sm group relative overflow-hidden"
                  >
                    {/* Animated gradient background on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#0052FF]/0 to-[#00D1FF]/0 group-hover:from-[#0052FF]/5 group-hover:to-[#00D1FF]/5 transition-all duration-500"></div>
                    
                    <div className="relative flex flex-col items-center justify-center h-full space-y-3 px-4">
                      {logoPreview ? (
                        <div className="relative">
                          <div className="absolute inset-0 bg-gradient-to-br from-[#0052FF]/20 to-[#00D1FF]/20 rounded-xl blur-xl"></div>
                          <img 
                            src={logoPreview} 
                            alt="Logo preview" 
                            className="relative w-28 h-28 object-contain rounded-xl shadow-lg"
                          />
                          <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-br from-[#0052FF] to-[#00D1FF] rounded-full flex items-center justify-center shadow-lg">
                            <Upload className="w-4 h-4 text-white" />
                          </div>
                        </div>
                      ) : (
                        <>
                          <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-[#0052FF] to-[#00D1FF] rounded-2xl blur-xl opacity-50 group-hover:opacity-70 transition-opacity"></div>
                            <div className="relative w-16 h-16 bg-gradient-to-br from-[#0052FF] to-[#00D1FF] rounded-2xl flex items-center justify-center shadow-xl transform group-hover:scale-110 transition-transform duration-300">
                              <Upload className="w-8 h-8 text-white" />
                            </div>
                          </div>
                          <div className="text-center">
                            <p className="text-[#00D1FF] font-megaeth group-hover:text-white transition-colors">Click to Upload</p>
                            <p className="text-xs text-gray-400 mt-1.5 group-hover:text-gray-300 transition-colors">JPG, PNG, SVG, WEBP • Max 10MB</p>
                          </div>
                        </>
                      )}
                    </div>
                    <input
                      id="logoFile"
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      disabled={isLoading}
                      className="hidden"
                    />
                  </label>
                ) : (
                  <div className="space-y-3">
                    <div className="relative">
                      <Input
                        id="tokenLogoUrl"
                        placeholder="https://example.com/logo.png"
                        value={formData.logo}
                        onChange={(e) => {
                          setFormData({ ...formData, logo: e.target.value });
                          setLogoPreview(e.target.value);
                        }}
                        disabled={isLoading}
                        className="bg-gradient-to-br from-[#0052FF]/5 to-[#00D1FF]/5 border-[#00D1FF]/40 focus:border-[#00D1FF]/70 focus:ring-2 focus:ring-[#0052FF]/20 h-12 pl-4 pr-4 rounded-xl backdrop-blur-sm transition-all duration-300 placeholder:text-gray-500"
                      />
                      <LinkIcon className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#00D1FF]/50 pointer-events-none" />
                    </div>
                    {logoPreview && (
                      <div className="w-full h-40 border-2 border-dashed border-[#00D1FF]/40 rounded-2xl bg-gradient-to-br from-[#0052FF]/5 via-transparent to-[#00D1FF]/5 flex items-center justify-center backdrop-blur-sm">
                        <div className="relative">
                          <div className="absolute inset-0 bg-gradient-to-br from-[#0052FF]/20 to-[#00D1FF]/20 rounded-xl blur-xl"></div>
                          <img 
                            src={logoPreview} 
                            alt="Logo preview" 
                            className="relative w-24 h-24 object-contain rounded-xl shadow-lg"
                            onError={() => setLogoPreview('')}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Right: Token Name + Symbol + Supply + Decimals */}
            <div className="space-y-4">
              {/* Token Name */}
              <div className="space-y-2">
                <Label htmlFor="tokenName" className="text-sm font-megaeth text-gray-300">{t.tokenName}</Label>
                <Input
                  id="tokenName"
                  placeholder="e.g., My Token"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  disabled={isLoading}
                  className="h-12 bg-gradient-to-br from-[#0052FF]/5 to-[#00D1FF]/5 border-[#00D1FF]/30 focus:border-[#00D1FF]/70 focus:ring-2 focus:ring-[#0052FF]/20 rounded-xl backdrop-blur-sm transition-all duration-300"
                />
              </div>

              {/* Token Symbol */}
              <div className="space-y-2">
                <Label htmlFor="tokenSymbol" className="text-sm font-megaeth text-gray-300">{t.tokenSymbol}</Label>
                <Input
                  id="tokenSymbol"
                  placeholder="e.g., MTK"
                  value={formData.symbol}
                  onChange={(e) => setFormData({ ...formData, symbol: e.target.value.toUpperCase() })}
                  disabled={isLoading}
                  className="h-12 bg-gradient-to-br from-[#0052FF]/5 to-[#00D1FF]/5 border-[#00D1FF]/30 focus:border-[#00D1FF]/70 focus:ring-2 focus:ring-[#0052FF]/20 rounded-xl backdrop-blur-sm uppercase transition-all duration-300"
                />
              </div>

              {/* Supply + Decimals */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="initialSupply" className="text-sm font-megaeth text-gray-300">{t.initialSupply}</Label>
                  <Input
                    id="initialSupply"
                    type="number"
                    placeholder="1000000"
                    value={formData.supply}
                    onChange={(e) => setFormData({ ...formData, supply: e.target.value })}
                    disabled={isLoading}
                    className="h-12 bg-gradient-to-br from-[#0052FF]/5 to-[#00D1FF]/5 border-[#00D1FF]/30 focus:border-[#00D1FF]/70 focus:ring-2 focus:ring-[#0052FF]/20 rounded-xl backdrop-blur-sm transition-all duration-300"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="decimals" className="text-sm font-megaeth text-gray-300">{t.decimals}</Label>
                  <Input
                    id="decimals"
                    type="number"
                    placeholder="18"
                    value={formData.decimals}
                    onChange={(e) => setFormData({ ...formData, decimals: e.target.value })}
                    disabled={isLoading}
                    className="h-12 bg-gradient-to-br from-[#0052FF]/5 to-[#00D1FF]/5 border-[#00D1FF]/30 focus:border-[#00D1FF]/70 focus:ring-2 focus:ring-[#0052FF]/20 rounded-xl backdrop-blur-sm transition-all duration-300"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Description (Optional) */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-megaeth text-gray-300">
              {t.description || "Description"} 
              <span className="text-gray-500 text-xs ml-1 font-normal">{t.optional || "(Optional)"}</span>
            </Label>
            <textarea
              id="description"
              placeholder={t.descriptionPlaceholder || "Launch secure, verified smart contracts on Base Network instantly. Build your token empire without writing a single line of code."}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              disabled={isLoading}
              className="w-full min-h-[100px] px-4 py-3 bg-gradient-to-br from-[#0052FF]/5 to-[#00D1FF]/5 border border-[#00D1FF]/30 focus:border-[#00D1FF]/70 focus:ring-2 focus:ring-[#0052FF]/20 rounded-xl backdrop-blur-sm resize-y transition-all duration-300 placeholder:text-gray-500"
              maxLength={500}
            />
            <p className="text-xs text-gray-500">{formData.description.length}/500 characters</p>
          </div>

          {/* Social Links (Optional) */}
          <div className="space-y-4 p-5 border border-[#00D1FF]/30 rounded-2xl bg-gradient-to-br from-[#0052FF]/5 via-transparent to-[#00D1FF]/5 backdrop-blur-sm">
            <div className="flex items-center gap-2.5 mb-2">
              <div className="w-8 h-8 bg-gradient-to-br from-[#0052FF] to-[#00D1FF] rounded-lg flex items-center justify-center">
                <LinkIcon className="w-4 h-4 text-white" />
              </div>
              <span className="font-megaeth text-white">{t.socialLinks || "Social Links"} <span className="text-gray-500 text-sm font-normal">{t.optional || "(Optional)"}</span></span>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="website" className="text-sm font-megaeth text-gray-300">{t.website || "Website"}</Label>
              <Input
                id="website"
                type="url"
                placeholder="https://yourproject.com"
                value={formData.website}
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                disabled={isLoading}
                className="h-11 bg-gradient-to-br from-[#0052FF]/5 to-[#00D1FF]/5 border-[#00D1FF]/30 focus:border-[#00D1FF]/70 focus:ring-2 focus:ring-[#0052FF]/20 rounded-xl backdrop-blur-sm transition-all duration-300"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="twitter" className="text-sm font-megaeth text-gray-300">{t.twitterX || "Twitter / X"}</Label>
              <Input
                id="twitter"
                type="url"
                placeholder="https://x.com/yourproject"
                value={formData.twitter}
                onChange={(e) => setFormData({ ...formData, twitter: e.target.value })}
                disabled={isLoading}
                className="h-11 bg-gradient-to-br from-[#0052FF]/5 to-[#00D1FF]/5 border-[#00D1FF]/30 focus:border-[#00D1FF]/70 focus:ring-2 focus:ring-[#0052FF]/20 rounded-xl backdrop-blur-sm transition-all duration-300"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="telegram" className="text-sm font-megaeth text-gray-300">{t.telegram || "Telegram"}</Label>
              <Input
                id="telegram"
                type="url"
                placeholder="https://t.me/yourproject"
                value={formData.telegram}
                onChange={(e) => setFormData({ ...formData, telegram: e.target.value })}
                disabled={isLoading}
                className="h-11 bg-gradient-to-br from-[#0052FF]/5 to-[#00D1FF]/5 border-[#00D1FF]/30 focus:border-[#00D1FF]/70 focus:ring-2 focus:ring-[#0052FF]/20 rounded-xl backdrop-blur-sm transition-all duration-300"
              />
            </div>
          </div>

          {/* Fee and Balance Information */}
          {isConnected && (
            <Alert className="bg-gradient-to-r from-[#0052FF]/10 to-[#00D1FF]/10 border-[#0052FF]/30">
              <Info className="h-4 w-4 text-[#00D1FF]" />
              <AlertDescription className="text-sm space-y-1 ml-2">
                <div className="flex justify-between items-center">
                  <span className="text-white">🔵 Connected Wallet:</span>
                  <span className="font-semibold text-[#00D1FF]">{userBalance ? userBalance.split(' ')[0] : '0'} ETH</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white">💎 Base Network USDC:</span>
                  <span className="font-semibold text-[#00D1FF]">Used for service fees</span>
                </div>
                <p className="text-xs text-gray-300 mt-2">
                  <AlertCircle className="h-3 w-3 inline mr-1" />
                  Fee handled automatically by Mintara system. Free actions: Token Info & Renounce Ownership.
                </p>
              </AlertDescription>
            </Alert>
          )}

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-[#0052FF] to-[#00D1FF] hover:from-[#0041CC] hover:to-[#00B8E6] text-white py-6 shadow-lg shadow-[#0052FF]/50"
            disabled={isLoading || !isConnected}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                {t.deploying}
              </>
            ) : (
              <>
                <Coins className="w-5 h-5 mr-2" />
                {t.deployToken} — 1 USDC Mintara System Fee
              </>
            )}
          </Button>
          
          {/* Fee Display Below Button */}
          {isConnected && (
            <div className="text-center text-xs text-gray-400 pt-2">
              <span className="inline-flex items-center gap-1">
                💡 Fee handled automatically by Mintara system — no manual transfer required.
              </span>
              {userBalance && (
                <span className="ml-3">
                  Balance: <span className="font-semibold text-gray-700">{userBalance}</span>
                </span>
              )}
            </div>
          )}
        </form>

        {result && (
          <Alert className="mt-4 bg-[#0052FF]/10 border-[#00D1FF]/30">
            <AlertDescription>
              <div className="space-y-3">
                <p className="text-[#00D1FF]">{t.tokenDeployed}</p>
                <div className="space-y-1 text-sm">
                  <p>
                    <strong>{t.contractAddress}:</strong>{' '}
                    <code className="bg-white px-2 py-1 rounded text-xs">
                      {result.contractAddress}
                    </code>
                  </p>
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
                
                {/* Add to Wallet Button */}
                <Button
                  onClick={async () => {
                    try {
                      const ethereum = (window as any).ethereum;
                      if (!ethereum) {
                        alert('MetaMask is not installed!');
                        return;
                      }
                      
                      await ethereum.request({
                        method: 'wallet_watchAsset',
                        params: {
                          type: 'ERC20',
                          options: {
                            address: result.contractAddress,
                            symbol: result.tokenSymbol || 'TOKEN',
                            decimals: result.tokenDecimals || 18,
                            image: result.tokenLogo || '',
                          },
                        },
                      });
                    } catch (error: any) {
                      console.error('Add to wallet error:', error);
                      if (error.code !== 4001) { // User rejected
                        alert('Failed to add token to wallet');
                      }
                    }
                  }}
                  variant="outline"
                  className="w-full border-[#0052FF] text-[#0052FF] hover:bg-[#0052FF]/10"
                >
                  <LinkIcon className="w-4 h-4 mr-2" />
                  Add Token to Wallet
                </Button>
              </div>
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
};
