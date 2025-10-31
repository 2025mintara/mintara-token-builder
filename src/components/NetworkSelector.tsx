import { getNetworkIcon } from '../utils/networkIcons';
import { NetworkConfig } from '../config/networks';

interface NetworkSelectorProps {
  currentNetwork: NetworkConfig;
  onNetworkChange?: (networkId: string) => Promise<void>;
}

export const NetworkSelector = ({ currentNetwork }: NetworkSelectorProps) => {
  // Kısa network ismi oluştur (mobil için)
  const getShortName = (name: string) => {
    if (name.includes('Base')) return 'Base';
    return name.split(' ')[0]; // İlk kelimeyi al
  };

  return (
    <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-lg px-2 sm:px-4 py-1.5 sm:py-2 flex items-center gap-1 sm:gap-2">
      <span>{getNetworkIcon(currentNetwork, 'h-3 w-3 sm:h-4 sm:w-4')}</span>
      <span className="hidden sm:inline text-white font-megaeth text-xs sm:text-sm">{currentNetwork.name}</span>
      <span className="sm:hidden text-white font-megaeth text-xs">{getShortName(currentNetwork.name)}</span>
    </div>
  );
};
