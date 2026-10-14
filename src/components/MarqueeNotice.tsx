import React, { useState } from 'react';
import { Volume2, X } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const MarqueeNotice: React.FC = () => {
  const { storeSettings } = useStore();
  const [dismissed, setDismissed] = useState(false);

  if (!storeSettings.marqueeActive || dismissed) return null;

  return (
    <div className="bg-gradient-to-r from-cyan-950 via-slate-900 to-indigo-950 text-cyan-200 text-xs sm:text-sm font-medium overflow-hidden border-b border-cyan-500/25 shadow-xs relative">
      <div className="max-w-4xl mx-auto px-2.5 py-1.5 flex items-center gap-2">
        {/* Megaphone Badge */}
        <div className="shrink-0 w-6 h-6 rounded-full bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300 shadow-xs">
          <Volume2 className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
        </div>

        {/* Scrolling text marquee */}
        <div className="relative overflow-hidden w-full h-5 flex items-center">
          <div className="animate-marquee whitespace-nowrap font-medium text-cyan-100 tracking-wide text-xs sm:text-[13px] font-['Hind_Siliguri']">
            {storeSettings.marqueeNotice}
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={() => setDismissed(true)}
          className="shrink-0 p-1 hover:bg-slate-800 rounded-full text-slate-400 hover:text-white transition-colors cursor-pointer"
          aria-label="Dismiss notice"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
