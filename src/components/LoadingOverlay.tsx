import { Loader2 } from 'lucide-react';

interface LoadingOverlayProps {
  isLoading: boolean;
  message?: string;
}

export const LoadingOverlay = ({ isLoading, message }: LoadingOverlayProps) => {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center">
      <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-12 shadow-2xl max-w-sm w-full mx-4">
        <div className="flex flex-col items-center gap-6">
          <div className="relative">
            {/* Rotating gradient ring */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#0052FF] via-[#00D1FF] to-[#0052FF] rounded-full blur-xl opacity-50 animate-spin"></div>
            
            {/* Center icon */}
            <div className="relative w-20 h-20 backdrop-blur-xl bg-white/10 rounded-full flex items-center justify-center border border-white/20">
              <Loader2 className="w-10 h-10 text-[#00D1FF] animate-spin" />
            </div>
          </div>
          
          {message && (
            <div className="text-center space-y-2">
              <p className="text-white text-lg font-megaeth">{message}</p>
              <div className="flex items-center justify-center gap-1">
                <div className="w-2 h-2 bg-[#0052FF] rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-[#00D1FF] rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-[#0052FF] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
