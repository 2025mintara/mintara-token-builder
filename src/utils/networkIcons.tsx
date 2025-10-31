import { 
  Coins, 
  Hexagon, 
  Zap, 
  Droplet, 
  Gem, 
  Circle, 
  CircleDot, 
  Mountain, 
  Square, 
  ScrollText, 
  Sparkles, 
  Radio 
} from 'lucide-react';
import { NetworkConfig } from '../config/networks';

// Network-specific icon components with proper colors
const NetworkIcons: Record<string, (props: any) => JSX.Element> = {
  ethereum: (props) => <Coins {...props} style={{ color: '#627EEA' }} />,
  bsc: (props) => <Hexagon {...props} style={{ color: '#F3BA2F' }} />,
  solana: (props) => <Zap {...props} style={{ color: '#14F195' }} />,
  sui: (props) => <Droplet {...props} style={{ color: '#6FBCF0' }} />,
  ton: (props) => <Gem {...props} style={{ color: '#0088CC' }} />,
  base: (props) => <Circle {...props} style={{ color: '#0052FF' }} />,
  optimism: (props) => <CircleDot {...props} style={{ color: '#FF0420' }} />,
  arbitrum: (props) => <Hexagon {...props} style={{ color: '#28A0F0' }} />,
  polygon: (props) => <Hexagon {...props} style={{ color: '#8247E5' }} />,
  avalanche: (props) => <Mountain {...props} style={{ color: '#E84142' }} />,
  linea: (props) => <Square {...props} style={{ color: '#61DFFF' }} />,
  scroll: (props) => <ScrollText {...props} style={{ color: '#EBC28E' }} />,
  zksync: (props) => <Sparkles {...props} style={{ color: '#8C8DFC' }} />,
  sonic: (props) => <Radio {...props} style={{ color: '#1C75BC' }} />,
  megaeth: (props) => <Zap {...props} style={{ color: '#FF6B00' }} />,
};

export const getNetworkIcon = (network: NetworkConfig, className: string = 'h-4 w-4') => {
  const NetworkIcon = NetworkIcons[network.id];
  
  if (NetworkIcon) {
    return <NetworkIcon className={className} />;
  }
  
  // Fallback to emoji logo
  return <span className="text-base leading-none">{network.logo}</span>;
};
