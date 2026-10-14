import React, { useState } from 'react';
import { X, Check, Copy, ShoppingCart, KeyRound, AlertCircle, Sparkles, Download, Play } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useStore } from '../context/StoreContext';
import { Order } from '../types';

export const BuyNowModal: React.FC = () => {
  const {
    activeBuyProduct,
    setActiveBuyProduct,
    currentUser,
    buyProduct,
    setAddFundModalOpen,
    setActiveFileSetupProduct,
    selectedDuration,
    setSelectedDuration,
    showToast
  } = useStore();

  const [purchasedOrder, setPurchasedOrder] = useState<Order | null>(null);
  const [copiedKey, setCopiedKey] = useState(false);

  if (!activeBuyProduct) return null;

  // Calculate target price for selected duration
  const getPlanPrice = () => {
    if (selectedDuration === '7_days') {
      return activeBuyProduct.price7Days || Math.round(activeBuyProduct.price * 3.5);
    }
    if (selectedDuration === '30_days') {
      return activeBuyProduct.price30Days || Math.round(activeBuyProduct.price * 10);
    }
    return activeBuyProduct.price1Day || activeBuyProduct.price;
  };

  const planPrice = getPlanPrice();
  const durationLabel = selectedDuration === '1_day' ? '১ দিন (1 Day)' : selectedDuration === '7_days' ? '৭ দিন (7 Days)' : '৩০ দিন (30 Days)';

  const hasEnoughBalance = currentUser.balance >= planPrice;

  const handleConfirmBuy = () => {
    const res = buyProduct(activeBuyProduct.id, selectedDuration);
    if (res.success && res.order) {
      setPurchasedOrder(res.order);
      try {
        confetti({
          particleCount: 90,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // Fallback if canvas confetti fails
      }
    }
  };

  const handleCopyKey = (key: string) => {
    navigator.clipboard.writeText(key);
    setCopiedKey(true);
    showToast('লাইসেন্স কী কপি হয়েছে!', 'success');
    setTimeout(() => setCopiedKey(false), 3000);
  };

  const handleClose = () => {
    setActiveBuyProduct(null);
    setPurchasedOrder(null);
    setCopiedKey(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-3 sm:p-4">
      <div
        onClick={handleClose}
        className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity"
      />

      <div className="relative bg-white rounded-3xl max-w-md w-full p-5 sm:p-6 shadow-2xl border border-slate-200 z-10 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
              <ShoppingCart className="w-5 h-5" />
            </div>
            <h3 className="font-black text-slate-900 text-base sm:text-lg">
              {purchasedOrder ? 'অর্ডার সফল হয়েছে! 🎉' : 'প্যানেল ক্রয় ও কী ডেলিভারি'}
            </h3>
          </div>
          <button
            onClick={handleClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {purchasedOrder ? (
          /* Post-Purchase Delivery View */
          <div className="mt-4 space-y-4">
            <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-center">
              <span className="inline-block p-2 rounded-full bg-emerald-500 text-white shadow-md mb-2">
                <Check className="w-6 h-6" />
              </span>
              <h4 className="font-extrabold text-emerald-950 text-base font-['Hind_Siliguri']">
                ইনস্ট্যান্ট ডেলিভারি সম্পন্ন!
              </h4>
              <p className="text-xs text-emerald-700 mt-0.5">
                অর্ডার আইডি: <span className="font-mono font-bold">{purchasedOrder.id}</span>
              </p>
            </div>

            {/* License Key Box */}
            <div className="bg-slate-900 rounded-2xl p-4 text-white shadow-inner border border-slate-800">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
                <span className="flex items-center gap-1 font-bold text-amber-400">
                  <KeyRound className="w-3.5 h-3.5" /> আপনার লাইসেন্স কী (License Key):
                </span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full font-mono">
                  ACTIVE
                </span>
              </div>

              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex items-center justify-between gap-2">
                <div className="font-mono font-bold text-sm sm:text-base text-emerald-400 tracking-wider truncate select-all">
                  {purchasedOrder.key}
                </div>
                <button
                  onClick={() => handleCopyKey(purchasedOrder.key)}
                  className="shrink-0 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold flex items-center gap-1 transition-all active:scale-95"
                >
                  {copiedKey ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedKey ? 'কপি হয়েছে' : 'কপি করুন'}</span>
                </button>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-2">
              <a
                href={purchasedOrder.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm"
              >
                <Download className="w-4 h-4" />
                <span>APK ডাউনলোড</span>
              </a>

              <a
                href={purchasedOrder.setupVideoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>টিউটোরিয়াল দেখুন</span>
              </a>
            </div>

            <button
              onClick={handleClose}
              className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-extrabold text-xs transition-colors"
            >
              বন্ধ করুন (Close)
            </button>
          </div>
        ) : (
          /* Pre-Purchase Confirmation View */
          <div className="mt-4 space-y-4">
            {/* Duration / Package Selection (1 দিন, 7 দিন, 30 দিন) */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                প্যাকেজের মেয়াদ নির্বাচন করুন (Select Duration):
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedDuration('1_day')}
                  className={`p-2.5 rounded-xl border text-center transition-all ${
                    selectedDuration === '1_day'
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm ring-2 ring-emerald-300'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                  }`}
                >
                  <span className="block text-xs font-bold">১ দিন (1 Day)</span>
                  <span className={`block text-sm font-black mt-0.5 ${
                    selectedDuration === '1_day' ? 'text-white' : 'text-emerald-700'
                  }`}>
                    {activeBuyProduct.price1Day || activeBuyProduct.price}৳
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedDuration('7_days')}
                  className={`p-2.5 rounded-xl border text-center transition-all ${
                    selectedDuration === '7_days'
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm ring-2 ring-emerald-300'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                  }`}
                >
                  <span className="block text-xs font-bold">৭ দিন (7 Days)</span>
                  <span className={`block text-sm font-black mt-0.5 ${
                    selectedDuration === '7_days' ? 'text-white' : 'text-emerald-700'
                  }`}>
                    {activeBuyProduct.price7Days || Math.round(activeBuyProduct.price * 3.5)}৳
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedDuration('30_days')}
                  className={`p-2.5 rounded-xl border text-center transition-all ${
                    selectedDuration === '30_days'
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm ring-2 ring-emerald-300'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                  }`}
                >
                  <span className="block text-xs font-bold">৩০ দিন (30 Days)</span>
                  <span className={`block text-sm font-black mt-0.5 ${
                    selectedDuration === '30_days' ? 'text-white' : 'text-emerald-700'
                  }`}>
                    {activeBuyProduct.price30Days || Math.round(activeBuyProduct.price * 10)}৳
                  </span>
                </button>
              </div>
            </div>

            {/* Product Summary */}
            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
              <div>
                <h4 className="font-black text-slate-900 text-sm">{activeBuyProduct.name}</h4>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="text-[11px] font-bold text-emerald-700 px-2 py-0.5 rounded-full bg-emerald-100">
                    {activeBuyProduct.tag}
                  </span>
                  <span className="text-[11px] font-bold text-indigo-700 px-2 py-0.5 rounded-full bg-indigo-50 border border-indigo-200">
                    প্যাকেজ: {durationLabel}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-2xl font-black text-emerald-700">{planPrice}৳</span>
                <span className="block text-[10px] text-slate-400">ইনস্ট্যান্ট কী ডেলিভারি</span>
              </div>
            </div>

            {/* Wallet Balance Check */}
            <div
              className={`p-3.5 rounded-2xl border flex items-center justify-between ${
                hasEnoughBalance
                  ? 'bg-emerald-50/60 border-emerald-200 text-emerald-950'
                  : 'bg-red-50/80 border-red-200 text-red-950'
              }`}
            >
              <div>
                <span className="text-[11px] font-bold text-slate-500 block uppercase">
                  আপনার বর্তমান ব্যালেন্স
                </span>
                <span className="text-base font-extrabold text-slate-900">
                  {currentUser.balance} ৳
                </span>
              </div>
              <div>
                {hasEnoughBalance ? (
                  <span className="text-xs font-bold text-emerald-700 px-2.5 py-1 rounded-full bg-emerald-100">
                    ব্যালেন্স পর্যাপ্ত ✓
                  </span>
                ) : (
                  <span className="text-xs font-bold text-red-700 px-2.5 py-1 rounded-full bg-red-100">
                    ব্যালেন্স কম আছে
                  </span>
                )}
              </div>
            </div>

            {!hasEnoughBalance && (
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-900 text-xs flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold">আপনার ওয়ালেটে পর্যাপ্ত টাকা নেই!</p>
                  <p className="text-[11px] text-amber-800 mt-0.5">
                    পণ্যটি কিনতে আরও {planPrice - currentUser.balance}৳ প্রয়োজন। বিকাশ বা নগদে এড ফান্ড করুন।
                  </p>
                </div>
              </div>
            )}

            {/* CTA Buttons */}
            {hasEnoughBalance ? (
              <button
                onClick={handleConfirmBuy}
                className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm tracking-wide shadow-md shadow-emerald-700/20 active:scale-98 transition-all flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>কনফার্ম করুন ও কী গ্রহণ করুন ({planPrice}৳ - {durationLabel})</span>
              </button>
            ) : (
              <button
                onClick={() => {
                  setActiveBuyProduct(null);
                  setAddFundModalOpen(true);
                }}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 text-white font-black text-sm tracking-wide shadow-md active:scale-98 transition-all flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>ব্যালেন্স এড করুন (Add Fund Now)</span>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
