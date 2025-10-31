import { ArrowRight, LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  onClick: () => void;
}

export const FeatureCard = ({ icon: Icon, title, description, onClick }: FeatureCardProps) => {
  return (
    <button
      onClick={onClick}
      className="group relative backdrop-blur-xl bg-[#0B1120]/90 hover:bg-[#0E1528]/90 border border-[#0052FF]/20 hover:border-[#00D1FF]/40 rounded-2xl p-6 text-left transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-[#0052FF]/30"
    >
      {/* Icon */}
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#0052FF] to-[#00D1FF] flex items-center justify-center group-hover:scale-110 transition-transform">
          <Icon className="w-6 h-6 text-white" />
        </div>
        <ArrowRight className="w-5 h-5 text-gray-500 group-hover:text-[#00D1FF] group-hover:translate-x-1 transition-all" />
      </div>

      {/* Title */}
      <h3 className="text-base sm:text-lg font-megaeth text-white mb-2 group-hover:text-[#00D1FF] transition-colors">
        {title}
      </h3>

      {/* Description */}
      <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
        {description}
      </p>

      {/* Hover border glow effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#0052FF]/0 via-[#00D1FF]/0 to-[#0052FF]/0 group-hover:from-[#0052FF]/10 group-hover:via-[#00D1FF]/10 group-hover:to-[#0052FF]/10 transition-all pointer-events-none"></div>
    </button>
  );
};
