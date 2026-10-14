import React, { useState } from 'react';
import { Folder, ShoppingCart, Wrench, Shield, CheckCircle2, KeyRound, Clock, Image as ImageIcon } from 'lucide-react';
import { Product, KeyDuration } from '../types';
import { useStore } from '../context/StoreContext';

interface Props {
  product: Product;
}

export const ProductCard: React.FC<Props> = ({ product }) => {
  const { setActiveFileSetupProduct, setActiveBuyProduct, setSelectedDuration } = useStore();
  const [duration, setDuration] = useState<KeyDuration>('1_day');

  const isMaintenance = product.status === 'maintenance';

  // Calculate price based on duration
  const getPrice = () => {
    if (duration === '7_days') {
      return product.price7Days || Math.round(product.price * 3.5);
    }
    if (duration === '30_days') {
      return product.price30Days || Math.round(product.price * 10);
    }
    return product.price1Day || product.price;
  };

  // Get stock keys for selected duration
  const getStockCount = () => {
    if (duration === '7_days') {
      return product.stockKeys7Days?.length || 0;
    }
    if (duration === '30_days') {
      return product.stockKeys30Days?.length || 0;
    }
    return product.stockKeys1Day?.length ?? product.stockKeys?.length ?? 0;
  };

  const currentPrice = getPrice();
  const stockCount = getStockCount();

  const handleBuyClick = () => {
    setSelectedDuration(duration);
    setActiveBuyProduct(product);
  };

  // Render either custom uploaded image or mock gamer GUI
  const renderProductVisual = () => {
    if (product.customImage) {
      return (
        <div className="w-full h-36 sm:h-40 rounded-xl overflow-hidden relative border border-cyan-500/30 bg-slate-950 group shadow-inner">
          <img
            src={product.customImage}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-black/30" />
          <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-cyan-600/90 text-slate-950 font-mono text-[9px] font-black uppercase tracking-wider">
            {product.category}
          </div>
          <div className="absolute bottom-2 left-2 right-2 text-white text-left">
            <span className="text-xs font-black drop-shadow-md truncate block">
              {product.name}
            </span>
          </div>
        </div>
      );
    }

    return (
      <div className="w-full h-36 sm:h-40 bg-gradient-to-b from-slate-950 via-blue-950/40 to-slate-950 rounded-xl p-2.5 flex flex-col justify-between border border-cyan-500/30 relative overflow-hidden group shadow-inner">
        {/* Top bar of cheat menu */}
        <div className="flex items-center justify-between border-b border-cyan-500/20 pb-1.5">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-[11px] font-black text-cyan-200 tracking-wider truncate">
              {product.name}
            </span>
          </div>
          <span className="text-[9px] px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-mono">
            v5.0 VIP
          </span>
        </div>

        {/* Cheat Toggles / ESP representation */}
        <div className="space-y-1.5 py-1 text-[9px] font-mono text-slate-300">
          <div className="flex items-center justify-between px-1.5 py-0.5 rounded bg-slate-900/80 border border-cyan-500/10">
            <span className="flex items-center gap-1">
              <span className="text-cyan-400 font-bold">ON</span> Headshot 100%
            </span>
            <span className="w-5 h-2.5 bg-cyan-500 rounded-full relative inline-block">
              <span className="absolute right-0.5 top-0.5 w-1.5 h-1.5 bg-slate-950 rounded-full" />
            </span>
          </div>

          <div className="flex items-center justify-between px-1.5 py-0.5 rounded bg-slate-900/80 border border-cyan-500/10">
            <span className="flex items-center gap-1">
              <span className="text-cyan-400 font-bold">ON</span> ESP Line & Box
            </span>
            <span className="w-5 h-2.5 bg-cyan-500 rounded-full relative inline-block">
              <span className="absolute right-0.5 top-0.5 w-1.5 h-1.5 bg-slate-950 rounded-full" />
            </span>
          </div>

          <div className="flex items-center justify-between px-1.5 py-0.5 rounded bg-slate-900/80 border border-cyan-500/10">
            <span className="flex items-center gap-1">
              <span className="text-emerald-400 font-bold">ON</span> Fast Revive & Anti-Ban
            </span>
            <span className="w-5 h-2.5 bg-emerald-500 rounded-full relative inline-block">
              <span className="absolute right-0.5 top-0.5 w-1.5 h-1.5 bg-slate-950 rounded-full" />
            </span>
          </div>
        </div>

        {/* Bottom Banner Title in GUI preview */}
        <div className="pt-1 border-t border-cyan-500/20 text-center">
          <div className="text-[11px] font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-300 uppercase truncate">
            {product.name}
          </div>
          <div className="text-[8px] font-extrabold text-cyan-400 tracking-wider">
            {product.category}
          </div>
        </div>

        {/* Glow corner */}
        <div className="absolute -bottom-8 -right-8 w-20 h-20 bg-cyan-500/20 rounded-full blur-xl pointer-events-none" />
      </div>
    );
  };

  return (
    <div className="bg-slate-900/90 backdrop-blur-md rounded-2xl border border-cyan-500/25 hover:border-cyan-400/50 shadow-xl transition-all duration-300 p-3 flex flex-col justify-between group">
      {/* Product Image / Mock Screen */}
      {renderProductVisual()}

      {/* Product Tag / Category Badge */}
      <div className="mt-2.5 flex items-center justify-center">
        <div className="px-3 py-1 rounded-lg bg-slate-950 border border-cyan-500/20 text-cyan-300 text-[10px] font-black tracking-widest uppercase text-center w-full shadow-inner">
          {product.tag}
        </div>
      </div>

      {/* 1 দিন, 7 দিন, 30 দিন Duration Selector Pills */}
      <div className="mt-2.5 grid grid-cols-3 gap-1 p-1 bg-slate-950 rounded-xl border border-slate-800">
        <button
          type="button"
          onClick={() => setDuration('1_day')}
          className={`py-1 rounded-lg text-[10px] font-black transition-all cursor-pointer ${
            duration === '1_day'
              ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 shadow-md font-black'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          ১ দিন
        </button>
        <button
          type="button"
          onClick={() => setDuration('7_days')}
          className={`py-1 rounded-lg text-[10px] font-black transition-all cursor-pointer ${
            duration === '7_days'
              ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 shadow-md font-black'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          ৭ দিন
        </button>
        <button
          type="button"
          onClick={() => setDuration('30_days')}
          className={`py-1 rounded-lg text-[10px] font-black transition-all cursor-pointer ${
            duration === '30_days'
              ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 shadow-md font-black'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          ৩০ দিন
        </button>
      </div>

      {/* Price Tag Pill */}
      <div className="mt-2.5 flex items-center justify-center">
        <div className="px-4 py-1.5 rounded-full bg-cyan-950/70 border border-cyan-500/40 text-cyan-300 text-sm font-black tracking-wide shadow-md flex items-center gap-1">
          <span className="text-base text-white">{currentPrice}</span>
          <span className="text-xs text-cyan-400">৳</span>
          <span className="text-[10px] text-slate-400 font-semibold ml-1">
            ({duration === '1_day' ? '১ দিন' : duration === '7_days' ? '৭ দিন' : '৩০ দিন'})
          </span>
        </div>
      </div>

      {/* Key Stock Indicator for this duration */}
      <div className="mt-1.5 flex items-center justify-center gap-1 text-[10px]">
        <KeyRound className="w-3 h-3 text-cyan-400" />
        {isMaintenance ? (
          <span className="text-amber-400 font-semibold">মেইনটেন্যান্স চলছে</span>
        ) : stockCount > 0 ? (
          <span className="text-emerald-400 font-semibold">স্টক: {stockCount} টি কী রেডি</span>
        ) : (
          <span className="text-cyan-400 font-semibold">ইনস্ট্যান্ট অটো-ডেলিভারি</span>
        )}
      </div>

      {/* Action Buttons */}
      <div className="mt-3 space-y-1.5">
        {/* FILE & SETUP Button */}
        <button
          onClick={() => setActiveFileSetupProduct(product)}
          className="w-full py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-cyan-300 font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm active:scale-98 transition-all cursor-pointer"
        >
          <Folder className="w-4 h-4 text-cyan-400" />
          <span>FILE & SETUP</span>
        </button>

        {/* BUY NOW or MAINTENANCE Button */}
        {isMaintenance ? (
          <button
            disabled
            className="w-full py-2 px-3 rounded-xl bg-red-950 border border-red-700/60 text-red-300 font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm cursor-not-allowed opacity-80"
          >
            <Wrench className="w-4 h-4" />
            <span>MAINTENANCE</span>
          </button>
        ) : (
          <button
            onClick={handleBuyClick}
            className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-slate-950 font-black text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-cyan-950/60 active:scale-98 transition-all cursor-pointer"
          >
            <ShoppingCart className="w-4 h-4 text-slate-950" />
            <span>BUY NOW ({currentPrice}৳)</span>
          </button>
        )}
      </div>
    </div>
  );
};
