import { BrowserRouter as Router, Routes, Route, Navigate, useParams, useLocation, useNavigate } from "react-router-dom";
import { LandingPage } from "./pages/LandingPage";
import { BuilderPage } from "./pages/BuilderPage";
import { MintaTokenPage } from "./pages/MintaTokenPage";
import { WhitepaperPage } from "./pages/WhitepaperPage";
import { AINFTBuilderPage } from "./pages/AINFTBuilderPage";
import { Toaster } from "./components/ui/sonner";
import { useEffect } from "react";
import { LanguageCode } from "./translations/translations";

// SEO Component - Updates meta tags for each page
function SEOUpdater() {
  const location = useLocation();
  const params = useParams<{ lang?: string }>();

  useEffect(() => {
    // CRITICAL: Ensure robots meta is always "index, follow"
    const ensureIndexable = () => {
      const robotsMeta = document.querySelector('meta[name="robots"]');
      if (!robotsMeta) {
        const meta = document.createElement("meta");
        meta.name = "robots";
        meta.content = "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1";
        document.head.appendChild(meta);
        console.log("✅ SEO: Added \"index, follow\" meta tag");
      } else if (robotsMeta.getAttribute("content")?.includes("noindex")) {
        robotsMeta.setAttribute("content", "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1");
        console.warn("⚠️ SEO Alert: Robots meta was \"noindex\" - corrected to \"index, follow\"");
      }
    };

    ensureIndexable();

    const updateMetaTags = () => {
      const path = location.pathname;
      const lang = params.lang || 'en';
      
      // Remove language prefix for path matching
      const pathWithoutLang = path.replace(/^\/[a-z]{2}(\/|$)/, '/');

      // Default meta tags
      let title = "Mintara Token Builder – Create Tokens on Base Network, No Code Needed";
      let description = "Launch secure, verified smart contracts on Base Network instantly. Build your token empire without writing a single line of code.";
      let canonical = `https://mintara.xyz${path}`;

      // Page-specific meta tags
      if (pathWithoutLang.includes("/builder") || pathWithoutLang === "/builder") {
        title = "Token Builder - Create Your Base Token | Mintara";
        description = "Build and deploy ERC-20 tokens on Base Network in minutes. No-code token creation with minting, burning, and ownership management features.";
      } else if (pathWithoutLang.includes("/ai-nft-builder")) {
        title = "AI NFT Builder - Create & Mint NFTs on Base | Mintara";
        description = "Generate AI-powered NFT artwork for free and mint on Base Network. Ultra-low fees (0.1 USDT) for NFT minting. Create unique digital art with AI.";
      } else if (pathWithoutLang.includes("/minta-token")) {
        title = "MINTA Token - Platform Token | Mintara";
        description = "Learn about MINTA, the official token of Mintara platform. Discover tokenomics, utilities, and how MINTA powers the Base token ecosystem.";
      } else if (pathWithoutLang.includes("/whitepaper")) {
        title = "Mintara Whitepaper - Technical Documentation | Mintara";
        description = "Read the official Mintara whitepaper. Learn about our no-code token creation platform, Base Network integration, tokenomics, and technical architecture.";
      }

      // Update title
      document.title = title;

      // Update meta description
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute("content", description);
      }

      // Update canonical URL
      const linkCanonical = document.querySelector('link[rel="canonical"]');
      if (linkCanonical) {
        linkCanonical.setAttribute("href", canonical);
      }

      // Update Open Graph tags
      const ogTitle = document.querySelector('meta[property="og:title"]');
      const ogDescription = document.querySelector('meta[property="og:description"]');
      const ogUrl = document.querySelector('meta[property="og:url"]');

      if (ogTitle) ogTitle.setAttribute("content", title);
      if (ogDescription) ogDescription.setAttribute("content", description);
      if (ogUrl) ogUrl.setAttribute("content", canonical);

      // Update Twitter Card tags
      const twitterTitle = document.querySelector('meta[name="twitter:title"]');
      const twitterDescription = document.querySelector('meta[name="twitter:description"]');
      const twitterUrl = document.querySelector('meta[name="twitter:url"]');

      if (twitterTitle) twitterTitle.setAttribute("content", title);
      if (twitterDescription) twitterDescription.setAttribute("content", description);
      if (twitterUrl) twitterUrl.setAttribute("content", canonical);
    };

    updateMetaTags();

    // Scroll to top on route change for better UX
    window.scrollTo(0, 0);
  }, [location, params.lang]);

  return null;
}

// Language redirect component for root path
function LanguageRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    // Get browser language
    const browserLang = navigator.language.toLowerCase();
    
    // Map browser language to supported languages
    let targetLang: LanguageCode = 'en';
    
    if (browserLang.startsWith('tr')) targetLang = 'tr';
    else if (browserLang.startsWith('ar')) targetLang = 'ar';
    else if (browserLang.startsWith('fr')) targetLang = 'fr';
    else if (browserLang.startsWith('de')) targetLang = 'de';
    else if (browserLang.startsWith('es')) targetLang = 'es';
    else if (browserLang.startsWith('zh')) targetLang = 'zh';
    else if (browserLang.startsWith('hi')) targetLang = 'hi';
    
    // Redirect to language-specific path
    navigate(`/${targetLang}/`, { replace: true });
  }, [navigate]);

  return null;
}

export default function App() {
  return (
    <Router>
      <SEOUpdater />
      <Routes>
        {/* Root redirects to language-specific path */}
        <Route path="/" element={<LanguageRedirect />} />
        
        {/* Multi-language routes */}
        <Route path="/:lang/" element={<LandingPage />} />
        <Route path="/:lang/builder" element={<BuilderPage />} />
        <Route path="/:lang/ai-nft-builder" element={<AINFTBuilderPage />} />
        <Route path="/:lang/minta-token" element={<MintaTokenPage />} />
        <Route path="/:lang/whitepaper" element={<WhitepaperPage />} />
        
        {/* Legacy routes (redirect to English) */}
        <Route path="/builder" element={<Navigate to="/en/builder" replace />} />
        <Route path="/ai-nft-builder" element={<Navigate to="/en/ai-nft-builder" replace />} />
        <Route path="/minta-token" element={<Navigate to="/en/minta-token" replace />} />
        <Route path="/whitepaper" element={<Navigate to="/en/whitepaper" replace />} />
        
        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Toaster position="top-right" richColors />
    </Router>
  );
}
