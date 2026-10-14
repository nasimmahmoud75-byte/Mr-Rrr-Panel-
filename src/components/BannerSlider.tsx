import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Download, PlayCircle, Sparkles, ExternalLink } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const BannerSlider: React.FC = () => {
  const { banners, products, setActiveFileSetupProduct } = useStore();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [banners.length]);

  const currentBanner = banners[currentIndex] || banners[0];

  const handleBannerAction = () => {
    // Open setup for first product or active product
    if (products.length > 0) {
      setActiveFileSetupProduct(products[0]);
    }
  };

  return (
    <div className="relative w-full rounded-2xl overflow-hidden shadow-lg border border-slate-200 bg-slate-950">
      {/* Background Graphic Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/90 via-slate-900/95 to-slate-950 z-0" />
      <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl" />
      <div className="absolute -left-10 -top-10 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl" />

      {/* Main Banner Content */}
      <div className="relative z-10 px-4 py-5 sm:px-6 sm:py-6 flex items-center justify-between min-h-[175px]">
        {/* Left Side: Gamer Avatar with APK badge (Circle / Rounded control with compact size & subtle motion) */}
        <div className="relative shrink-0 flex items-center justify-center">
          <div
            className={`relative overflow-hidden border-2 shadow-lg bg-slate-900 group transition-all duration-300 ${
              currentBanner.avatarShape === 'rounded' ? 'rounded-2xl' : 'rounded-full'
            } ${
              currentBanner.avatarSize === 'normal'
                ? 'w-24 h-24 sm:w-28 sm:h-28'
                : currentBanner.avatarSize === 'medium'
                ? 'w-20 h-20 sm:w-22 sm:h-22'
                : 'w-16 h-16 sm:w-20 sm:h-20' /* Compact size requested by user */
            } ${
              currentBanner.glowColor === 'cyan'
                ? 'border-cyan-400 shadow-cyan-500/20'
                : currentBanner.glowColor === 'amber'
                ? 'border-amber-400 shadow-amber-500/20'
                : currentBanner.glowColor === 'purple'
                ? 'border-purple-400 shadow-purple-500/20'
                : 'border-cyan-500/60 shadow-cyan-500/20'
            }`}
          >
            {currentBanner.customImage || currentBanner.characterImg ? (
              <img
                src={currentBanner.customImage || currentBanner.characterImg}
                alt={currentBanner.title}
                className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
              />
            ) : (
              /* Gamer character mask illustration */
              <div className="w-full h-full bg-gradient-to-br from-cyan-950/60 via-slate-800 to-slate-950 flex flex-col items-center justify-center relative">
                <span className="text-2xl sm:text-3xl drop-shadow-md select-none">🎭</span>
                <div className="absolute bottom-1 px-1.5 py-0.5 rounded bg-cyan-500/80 text-[8px] font-black tracking-widest text-white uppercase">
                  VIP MOD
                </div>
              </div>
            )}

            {/* Subtle soft glowing ring (Gentle micro-motion) */}
            {currentBanner.avatarMotion !== 'static' && (
              <div
                className={`absolute inset-0 pointer-events-none transition-opacity duration-1000 ${
                  currentBanner.avatarMotion === 'pulse' ? 'animate-pulse opacity-40' : 'opacity-25 hover:opacity-50'
                } ${
                  currentBanner.glowColor === 'cyan'
                    ? 'bg-cyan-400/20 ring-1 ring-cyan-400/40'
                    : currentBanner.glowColor === 'amber'
                    ? 'bg-amber-400/20 ring-1 ring-amber-400/40'
                    : currentBanner.glowColor === 'purple'
                    ? 'bg-purple-400/20 ring-1 ring-purple-400/40'
                    : 'bg-cyan-400/20 ring-1 ring-cyan-400/40'
                }`}
              />
            )}
          </div>

          {/* Compact APK Badge */}
          <div className="absolute -top-1 -right-1 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg px-1.5 py-0.5 flex items-center gap-1 shadow-md border border-white/30 transform hover:scale-105 transition-transform z-10">
            <Download className="w-3 h-3 text-white" />
            <span className="text-[9px] font-black tracking-wider">{currentBanner.badge || 'APK'}</span>
          </div>
        </div>

        {/* Center / Right Content: Bengali Headline & CTA */}
        <div className="flex-1 pl-4 sm:pl-6 text-left">
          <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[11px] font-bold mb-1 border border-emerald-500/30">
            <Sparkles className="w-3 h-3 text-emerald-400" />
            <span>অফিসিয়াল গাইডলাইন</span>
          </div>

          <h2 className="text-white font-extrabold text-base sm:text-xl leading-tight drop-shadow-sm font-['Hind_Siliguri']">
            {currentBanner.title}
          </h2>

          <div className="text-amber-400 font-black text-lg sm:text-2xl tracking-wide uppercase mt-0.5 font-['Hind_Siliguri'] drop-shadow-md">
            {currentBanner.highlight}
          </div>

          <p className="text-cyan-300 font-bold text-xs sm:text-sm mt-0.5 font-['Hind_Siliguri']">
            {currentBanner.subtitle}
          </p>

          <div className="mt-2.5 flex items-center gap-2">
            <button
              onClick={handleBannerAction}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white rounded-full text-xs font-bold shadow-md shadow-emerald-950/40 active:scale-95 transition-all"
            >
              <PlayCircle className="w-3.5 h-3.5" />
              <span>{currentBanner.actionText || 'সেটআপ ভিডিও ও APK ডাউনলোড'}</span>
            </button>
            {currentBanner.apkLink && (
              <a
                href={currentBanner.apkLink}
                target="_blank"
                rel="noreferrer"
                className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold border border-slate-700 transition-colors"
                title="Direct APK Download"
              >
                <Download className="w-3 h-3 text-lime-400" />
                <span>APK</span>
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={() => setCurrentIndex((prev) => (prev === 0 ? banners.length - 1 : prev - 1))}
        aria-label="Previous banner"
        className="absolute left-1.5 top-1/2 -translate-y-1/2 z-20 w-7 h-7 rounded-full bg-slate-900/70 hover:bg-slate-800 text-white/80 hover:text-white flex items-center justify-center border border-white/10 transition-colors"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      <button
        onClick={() => setCurrentIndex((prev) => (prev + 1) % banners.length)}
        aria-label="Next banner"
        className="absolute right-1.5 top-1/2 -translate-y-1/2 z-20 w-7 h-7 rounded-full bg-slate-900/70 hover:bg-slate-800 text-white/80 hover:text-white flex items-center justify-center border border-white/10 transition-colors"
      >
        <ChevronRight className="w-4 h-4" />
      </button>

      {/* Pagination indicators (Screenshot style) */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5">
        {banners.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`transition-all rounded-full ${
              currentIndex === i
                ? 'w-6 h-1.5 bg-emerald-400'
                : 'w-1.5 h-1.5 bg-white/40 hover:bg-white/70'
            }`}
          />
        ))}
      </div>
    </div>
  );
};
