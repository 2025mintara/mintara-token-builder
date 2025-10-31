import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  structuredData?: object;
  enableHreflang?: boolean;
}

export const SEO = ({
  title,
  description,
  keywords,
  canonical = 'https://mintara.xyz',
  ogImage = 'https://mintara.xyz/hero.png',
  ogType = 'website',
  structuredData,
  enableHreflang = true,
}: SEOProps) => {
  const params = useParams<{ lang?: string }>();
  
  useEffect(() => {
    // Update document title
    document.title = title;

    // Helper function to update or create meta tag
    const updateMetaTag = (name: string, content: string, property?: boolean) => {
      const attribute = property ? 'property' : 'name';
      let element = document.querySelector(`meta[${attribute}="${name}"]`);
      
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      
      element.setAttribute('content', content);
    };

    // Update basic meta tags
    updateMetaTag('title', title);
    updateMetaTag('description', description);
    
    if (keywords) {
      updateMetaTag('keywords', keywords);
    }

    // ALWAYS INDEXABLE: Set robots meta tag to allow search engine indexing
    const robotsContent = 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1';
    
    updateMetaTag('robots', robotsContent);
    updateMetaTag('googlebot', robotsContent);
    updateMetaTag('bingbot', robotsContent);

    // Open Graph meta tags
    updateMetaTag('og:type', ogType, true);
    updateMetaTag('og:url', canonical, true);
    updateMetaTag('og:title', title, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:image', ogImage, true);
    updateMetaTag('og:image:width', '1200', true);
    updateMetaTag('og:image:height', '630', true);
    updateMetaTag('og:site_name', 'Mintara', true);

    // Twitter Card meta tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:url', canonical);
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', ogImage);

    // Update canonical link
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.rel = 'canonical';
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.href = canonical;

    // Add structured data (Schema.org)
    if (structuredData) {
      let scriptTag = document.querySelector('script[type="application/ld+json"]');
      if (!scriptTag) {
        scriptTag = document.createElement('script');
        scriptTag.type = 'application/ld+json';
        document.head.appendChild(scriptTag);
      }
      scriptTag.textContent = JSON.stringify(structuredData);
    }

    // Add hreflang tags for multi-language support
    if (enableHreflang) {
      // Remove old hreflang tags
      document.querySelectorAll('link[rel="alternate"][hreflang]').forEach(link => link.remove());
      
      const languages = ['en', 'tr', 'ar', 'fr', 'de', 'es', 'zh', 'hi'];
      const currentPath = canonical.replace('https://mintara.xyz', '').replace(/^\/[a-z]{2}(\/|$)/, '/');
      
      languages.forEach(lang => {
        const link = document.createElement('link');
        link.rel = 'alternate';
        link.hreflang = lang;
        link.href = `https://mintara.xyz/${lang}${currentPath === '/' ? '/' : currentPath}`;
        document.head.appendChild(link);
      });
      
      // Add x-default for international
      const xDefaultLink = document.createElement('link');
      xDefaultLink.rel = 'alternate';
      xDefaultLink.hreflang = 'x-default';
      xDefaultLink.href = `https://mintara.xyz/en${currentPath === '/' ? '/' : currentPath}`;
      document.head.appendChild(xDefaultLink);
    }
    
    // Set HTML lang attribute
    if (params.lang) {
      document.documentElement.lang = params.lang;
    }

    console.log(`✅ SEO: Updated meta tags for: ${title}`);
    console.log(`✅ SEO: Robots directive: ${robotsContent}`);
    if (enableHreflang) {
      console.log(`✅ SEO: Added hreflang tags for 8 languages`);
    }
  }, [title, description, keywords, canonical, ogImage, ogType, structuredData, enableHreflang, params.lang]);

  return null; // This component doesn't render anything
};
