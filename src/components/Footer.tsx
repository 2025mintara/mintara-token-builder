import { useNavigate } from 'react-router-dom';
import { Github } from 'lucide-react';

interface FooterProps {
  language?: string;
  t?: (key: string) => string;
}

export const Footer = ({ language, t }: FooterProps) => {
  const navigate = useNavigate();

  return (
    <footer className="relative z-10 border-t border-white/5 bg-[#0A0B0D]/50 backdrop-blur-xl">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#0052FF] to-[#00D1FF] flex items-center justify-center">
                <span className="text-xl">🔵</span>
              </div>
              <span className="text-2xl font-megaeth bg-gradient-to-r from-[#0052FF] to-[#00D1FF] bg-clip-text text-transparent">
                Mintara
              </span>
            </div>
            <p className="text-gray-400 text-sm">
              {t?.('footerTagline') || "The easiest way to create tokens on Base Network. No code, no hassle."}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-megaeth mb-4">{t?.('quickLinks') || "Quick Links"}</h3>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => navigate(`/${language || 'en'}/`)} 
                  className="text-gray-400 hover:text-[#00D1FF] transition-colors text-sm text-left"
                >
                  {t?.('home') || "Home"}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigate(`/${language || 'en'}/builder`)} 
                  className="text-gray-400 hover:text-[#00D1FF] transition-colors text-sm text-left"
                >
                  {t?.('tokenBuilder') || "Token Builder"}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigate(`/${language || 'en'}/ai-nft-builder`)} 
                  className="text-gray-400 hover:text-[#00D1FF] transition-colors text-sm text-left"
                >
                  AI NFT Builder
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigate(`/${language || 'en'}/minta-token`)} 
                  className="text-gray-400 hover:text-[#00D1FF] transition-colors text-sm text-left"
                >
                  Minta Token
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigate(`/${language || 'en'}/whitepaper`)} 
                  className="text-gray-400 hover:text-[#00D1FF] transition-colors text-sm text-left"
                >
                  {t?.('whitepaper') || "Whitepaper"}
                </button>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-megaeth mb-4">{t?.('resources') || "Resources"}</h3>
            <ul className="space-y-2">
              <li>
                <a 
                  href="https://basescan.org" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-[#00D1FF] transition-colors text-sm flex items-center gap-1"
                >
                  {t?.('baseScan') || "BaseScan"} <span className="text-xs">↗</span>
                </a>
              </li>
              <li>
                <a 
                  href="https://base.org" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-[#00D1FF] transition-colors text-sm flex items-center gap-1"
                >
                  {t?.('baseNetwork') || "Base Network"} <span className="text-xs">↗</span>
                </a>
              </li>
              <li>
                <a 
                  href="https://docs.base.org" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-[#00D1FF] transition-colors text-sm flex items-center gap-1"
                >
                  {t?.('documentation') || "Documentation"} <span className="text-xs">↗</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="text-white font-megaeth mb-4">{t?.('connect') || "Connect"}</h3>
            <div className="flex gap-4">
              <a 
                href="https://x.com/mintaratoken" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-[#0052FF]/20 border border-[#0052FF]/30 flex items-center justify-center transition-all group"
                aria-label="X (Twitter)"
              >
                <svg className="w-5 h-5 text-gray-400 group-hover:text-[#00D1FF]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a 
                href="https://t.me/mintaraofficial" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-[#0052FF]/20 border border-[#0052FF]/30 flex items-center justify-center transition-all group"
                aria-label="Telegram"
              >
                <svg className="w-5 h-5 text-gray-400 group-hover:text-[#00D1FF]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12a12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472c-.18 1.898-.962 6.502-1.36 8.627c-.168.9-.499 1.201-.82 1.23c-.696.065-1.225-.46-1.9-.902c-1.056-.693-1.653-1.124-2.678-1.8c-1.185-.78-.417-1.21.258-1.91c.177-.184 3.247-2.977 3.307-3.23c.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345c-.48.33-.913.49-1.302.48c-.428-.008-1.252-.241-1.865-.44c-.752-.245-1.349-.374-1.297-.789c.027-.216.325-.437.893-.663c3.498-1.524 5.83-2.529 6.998-3.014c3.332-1.386 4.025-1.627 4.476-1.635z"/>
                </svg>
              </a>
              <a 
                href="https://github.com/2025mintara" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-[#0052FF]/20 border border-[#0052FF]/30 flex items-center justify-center transition-all group"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5 text-gray-400 group-hover:text-[#00D1FF]" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 pt-8 text-center">
          <p className="text-gray-500 text-xs sm:text-sm font-megaeth">
            © 2025 Mintara - Base Network Token & AI NFT Builder
          </p>
        </div>
      </div>
    </footer>
  );
};
