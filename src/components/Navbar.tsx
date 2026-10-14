import React, { useState } from 'react';
import { Home, Bell, Menu, Shield, Check, Palette, Sparkles, Send } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const Navbar: React.FC = () => {
  const {
    currentView,
    setCurrentView,
    setUserDrawerOpen,
    currentUser,
    currency,
    setCurrency,
    fundRequests,
    orders,
    navigateToAdmin,
    isAdminAuthenticated,
    setSecretAdminPromptOpen,
    siteTheme,
    setSiteTheme,
    storeSettings
  } = useStore();

  const [currencyDropdown, setCurrencyDropdown] = useState(false);
  const [themeDropdown, setThemeDropdown] = useState(false);
  const [showNotificationList, setShowNotificationList] = useState(false);

  const pendingFundsCount = fundRequests.filter((r) => r.status === 'pending').length;

  return (
    <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-cyan-500/20 shadow-lg text-white">
      <div className="max-w-4xl mx-auto px-3 sm:px-4 py-2.5 flex items-center justify-between gap-2">
        {/* Left: Home Icon Button & Brand Logo */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentView('store')}
            aria-label="Home"
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-tr from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white flex items-center justify-center shadow-md shadow-cyan-950/40 transition-transform active:scale-95 cursor-pointer"
          >
            <Home className="w-5 h-5" />
          </button>

          {/* Brand Logo Pill */}
          <button
            onClick={() => setCurrentView('store')}
            className="px-3.5 py-1.5 rounded-full bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white font-black tracking-wider text-sm sm:text-base flex items-center gap-1.5 shadow-md shadow-cyan-900/40 border border-cyan-400/30 transition-all select-none cursor-pointer"
            title={storeSettings.storeName || 'Mr Rrr Panel'}
          >
            <span className="bg-cyan-400 text-slate-950 text-[10px] font-black px-1.5 py-0.5 rounded-full tracking-normal">
              VIP
            </span>
            <span>{storeSettings.storeName || 'Mr Rrr Panel'}</span>
          </button>
        </div>

        {/* Right Action Icons */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Telegram Channel Quick Link */}
          {storeSettings.telegramLink && (
            <a
              href={storeSettings.telegramLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-2.5 py-1.5 rounded-full bg-sky-500/20 hover:bg-sky-500/30 border border-sky-400/30 text-sky-300 text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
              title="টেলিগ্রাম চ্যানেল জয়েন করুন"
            >
              <Send className="w-3.5 h-3.5 text-sky-400" />
              <span className="hidden sm:inline">টেলিগ্রাম</span>
            </a>
          )}
          {/* Theme Selector Pill (কালার পরিবর্তন অপশন) */}
          <div className="relative">
            <button
              onClick={() => {
                setThemeDropdown(!themeDropdown);
                setCurrencyDropdown(false);
                setShowNotificationList(false);
              }}
              title="কালার থিম পরিবর্তন"
              className="px-2.5 py-1.5 rounded-full bg-slate-800 border border-cyan-500/30 text-cyan-300 text-xs font-bold flex items-center gap-1 hover:bg-slate-700 transition-colors cursor-pointer"
            >
              <Palette className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden sm:inline">Color</span>
            </button>

            {themeDropdown && (
              <div className="absolute right-0 mt-1.5 w-52 bg-slate-900 rounded-2xl shadow-2xl border border-cyan-500/30 py-1.5 z-50 text-xs animate-in fade-in slide-in-from-top-2">
                <div className="px-3 py-1 text-[10px] font-bold text-slate-400 border-b border-slate-800 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-cyan-400" />
                  <span>কালার থিম নির্বাচন (Color Presets)</span>
                </div>

                {/* Cyber Cyan - Recommended */}
                <button
                  onClick={() => {
                    setSiteTheme('cyber-cyan');
                    setThemeDropdown(false);
                  }}
                  className={`w-full text-left px-3 py-2 flex items-center justify-between font-bold transition-colors ${
                    siteTheme === 'cyber-cyan'
                      ? 'bg-cyan-500/20 text-cyan-300'
                      : 'text-slate-200 hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-cyan-400 ring-2 ring-blue-500" />
                    <span>⚡ সাইবার সায়ান (সেরা পছন্দ)</span>
                  </div>
                  {siteTheme === 'cyber-cyan' && <Check className="w-3.5 h-3.5 text-cyan-400" />}
                </button>

                {/* Toxic Emerald */}
                <button
                  onClick={() => {
                    setSiteTheme('toxic-emerald');
                    setThemeDropdown(false);
                  }}
                  className={`w-full text-left px-3 py-2 flex items-center justify-between font-bold transition-colors ${
                    siteTheme === 'toxic-emerald'
                      ? 'bg-emerald-500/20 text-emerald-300'
                      : 'text-slate-200 hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-emerald-500 ring-2 ring-teal-500" />
                    <span>🟢 টক্সিক এমারেল্ড ভাইপার</span>
                  </div>
                  {siteTheme === 'toxic-emerald' && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                </button>

                {/* Royal Gold */}
                <button
                  onClick={() => {
                    setSiteTheme('royal-gold');
                    setThemeDropdown(false);
                  }}
                  className={`w-full text-left px-3 py-2 flex items-center justify-between font-bold transition-colors ${
                    siteTheme === 'royal-gold'
                      ? 'bg-amber-500/20 text-amber-300'
                      : 'text-slate-200 hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-amber-400 ring-2 ring-orange-500" />
                    <span>👑 রয়্যাল গোল্ড ও অবসিডিয়ান</span>
                  </div>
                  {siteTheme === 'royal-gold' && <Check className="w-3.5 h-3.5 text-amber-400" />}
                </button>

                {/* Neon Purple */}
                <button
                  onClick={() => {
                    setSiteTheme('neon-purple');
                    setThemeDropdown(false);
                  }}
                  className={`w-full text-left px-3 py-2 flex items-center justify-between font-bold transition-colors ${
                    siteTheme === 'neon-purple'
                      ? 'bg-purple-500/20 text-purple-300'
                      : 'text-slate-200 hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-purple-500 ring-2 ring-pink-500" />
                    <span>🟣 নিয়ন পার্পল ও ম্যাজেন্টা</span>
                  </div>
                  {siteTheme === 'neon-purple' && <Check className="w-3.5 h-3.5 text-purple-400" />}
                </button>
              </div>
            )}
          </div>

          {/* Currency Pill: 🇧🇩 BDT */}
          <div className="relative">
            <button
              onClick={() => {
                setCurrencyDropdown(!currencyDropdown);
                setThemeDropdown(false);
                setShowNotificationList(false);
              }}
              className="px-2.5 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-white text-xs sm:text-sm font-bold flex items-center gap-1 hover:bg-slate-700 transition-colors cursor-pointer"
            >
              <span>🇧🇩 {currency}</span>
              <span className="text-[10px] text-slate-400">▼</span>
            </button>

            {currencyDropdown && (
              <div className="absolute right-0 mt-1.5 w-32 bg-slate-900 rounded-xl shadow-xl border border-slate-700 py-1 z-50 text-xs">
                <button
                  onClick={() => {
                    setCurrency('BDT');
                    setCurrencyDropdown(false);
                  }}
                  className="w-full text-left px-3 py-2 hover:bg-slate-800 flex items-center justify-between font-semibold text-slate-200"
                >
                  <span>🇧🇩 BDT (৳)</span>
                  {currency === 'BDT' && <Check className="w-3.5 h-3.5 text-cyan-400" />}
                </button>
                <button
                  onClick={() => {
                    setCurrency('USD');
                    setCurrencyDropdown(false);
                  }}
                  className="w-full text-left px-3 py-2 hover:bg-slate-800 flex items-center justify-between font-semibold text-slate-200"
                >
                  <span>🇺🇸 USD ($)</span>
                  {currency === 'USD' && <Check className="w-3.5 h-3.5 text-cyan-400" />}
                </button>
              </div>
            )}
          </div>

          {/* Notification Bell */}
          <div className="relative">
            <button
              onClick={() => {
                setShowNotificationList(!showNotificationList);
                setThemeDropdown(false);
                setCurrencyDropdown(false);
              }}
              aria-label="Notifications"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center relative shadow-sm transition-transform active:scale-95 cursor-pointer border border-slate-700"
            >
              <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-slate-200" />
              {pendingFundsCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 border-2 border-slate-900 text-white rounded-full text-[10px] font-bold flex items-center justify-center">
                  {pendingFundsCount}
                </span>
              )}
            </button>

            {showNotificationList && (
              <div className="absolute right-0 mt-1.5 w-72 bg-slate-900 rounded-2xl shadow-2xl border border-cyan-500/30 p-3 z-50 text-xs text-slate-200 animate-in fade-in slide-in-from-top-2">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800 mb-2">
                  <span className="font-bold text-white">নোটিফিকেশন (Notifications)</span>
                  <span className="text-[10px] text-cyan-400 font-semibold">Live</span>
                </div>
                <div className="space-y-2 max-h-56 overflow-y-auto">
                  <div className="p-2 bg-slate-800/80 rounded-xl border border-cyan-500/20 text-cyan-200">
                    <p className="font-semibold text-cyan-300">⚡ ইনস্ট্যান্ট ডেলিভারি সিস্টেম চালু আছে</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">অর্ডার করার সাথে সাথে আপনার লাইসেন্স কি পেয়ে যাবেন।</p>
                  </div>
                  {orders.length > 0 && (
                    <div className="p-2 bg-slate-800/50 rounded-xl border border-slate-700">
                      <p className="font-semibold text-white">সর্বশেষ অর্ডার: #{orders[0].id}</p>
                      <p className="text-[10px] text-slate-400 mt-0.5">{orders[0].productName} - সম্পন্ন হয়েছে</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Hamburger Menu Icon */}
          <button
            onClick={() => setUserDrawerOpen(true)}
            aria-label="Open User Menu"
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-tr from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white flex items-center justify-center shadow-md shadow-cyan-950/40 transition-transform active:scale-95 cursor-pointer"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
};
