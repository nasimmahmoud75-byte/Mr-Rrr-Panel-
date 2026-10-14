/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Navbar } from './components/Navbar';
import { MarqueeNotice } from './components/MarqueeNotice';
import { BannerSlider } from './components/BannerSlider';
import { CategoryFilter } from './components/CategoryFilter';
import { ProductCard } from './components/ProductCard';
import { BottomNav } from './components/BottomNav';
import { UserDrawer } from './components/UserDrawer';
import { SupportWidget } from './components/SupportWidget';
import { FileSetupModal } from './components/FileSetupModal';
import { BuyNowModal } from './components/BuyNowModal';
import { AddFundModal } from './components/AddFundModal';
import { SpinAndWinModal } from './components/SpinAndWinModal';
import { MissionsModal } from './components/MissionsModal';
import { MyCodesModal } from './components/MyCodesModal';
import { KeyResetModal } from './components/KeyResetModal';
import { MyAccountModal } from './components/MyAccountModal';
import { MyOrdersModal } from './components/MyOrdersModal';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { AdminLogin } from './components/admin/AdminLogin';
import { SecretAdminModal } from './components/admin/SecretAdminModal';
import { ToastContainer } from './components/ToastContainer';
import { ProductCategory } from './types';
import { Sparkles, ShieldCheck, Zap, Headphones } from 'lucide-react';

const StorefrontContent: React.FC = () => {
  const {
    currentView,
    products,
    isAdminAuthenticated,
    navigateToAdmin,
    setSecretAdminPromptOpen,
    setActiveFileSetupProduct,
    siteTheme,
    storeSettings
  } = useStore();

  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('ALL');
  const [bottomNavTab, setBottomNavTab] = useState<'home' | 'fund' | 'order' | 'key' | 'account'>('home');

  // Secret shortcut: Alt + A or Ctrl + Shift + A to open secret password prompt
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.altKey && e.key.toLowerCase() === 'a') || (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'a')) {
        e.preventDefault();
        setSecretAdminPromptOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setSecretAdminPromptOpen]);

  if (currentView === 'admin') {
    if (!isAdminAuthenticated) {
      return <AdminLogin />;
    }
    return <AdminDashboard />;
  }

  // Filter products by selected category
  const filteredProducts = products.filter((prod) => {
    if (selectedCategory === 'ALL') return true;
    if (selectedCategory === 'MORE') return prod.category === 'MORE' || prod.category === 'PC';
    return prod.category === selectedCategory;
  });

  // Dynamic Theme Wrapper class based on user choice
  const getThemeClass = () => {
    switch (siteTheme) {
      case 'toxic-emerald':
        return 'bg-[#06120d] text-slate-100 selection:bg-emerald-500 selection:text-white';
      case 'royal-gold':
        return 'bg-[#0d0c07] text-slate-100 selection:bg-amber-500 selection:text-slate-950';
      case 'neon-purple':
        return 'bg-[#0a0614] text-slate-100 selection:bg-purple-500 selection:text-white';
      case 'cyber-cyan':
      default:
        return 'bg-[#070b14] text-slate-100 selection:bg-cyan-500 selection:text-slate-950';
    }
  };

  return (
    <div className={`min-h-screen ${getThemeClass()} pb-24 transition-colors duration-500 font-['Outfit',sans-serif]`}>
      {/* Top Navbar */}
      <Navbar />

      {/* Marquee Announcement Bar */}
      <MarqueeNotice />

      {/* Main Responsive Storefront Container */}
      <main className="max-w-4xl mx-auto px-3 sm:px-4 pt-3 space-y-4">
        {/* Gaming Banner Hero Carousel (With compact avatar size & subtle motion) */}
        <BannerSlider />

        {/* Category Pills (All, NON ROOT, ROOT, More v) */}
        <CategoryFilter
          selectedCategory={selectedCategory}
          onSelectCategory={(cat) => setSelectedCategory(cat)}
        />

        {/* Products Grid */}
        <section aria-label="Products Section" id="products-section" className="pt-1">
          {filteredProducts.length === 0 ? (
            <div className="bg-slate-900/90 rounded-3xl p-10 text-center border border-slate-800">
              <p className="text-slate-400 text-sm font-semibold">
                এই ক্যাটাগরিতে বর্তমানে কোনো প্যানেল নেই।
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-3.5">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </section>

        {/* Trust Badges / Quick Info */}
        <section className="bg-slate-900/80 backdrop-blur-md rounded-2xl p-3.5 border border-cyan-500/20 shadow-lg grid grid-cols-3 gap-2 text-center">
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-500/40 flex items-center justify-center mb-1">
              <Zap className="w-4 h-4" />
            </div>
            <span className="text-[11px] font-bold text-white">০০.১ সেকেন্ড</span>
            <span className="text-[10px] text-slate-400">ইনস্ট্যান্ট ডেলিভারি</span>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-500/40 flex items-center justify-center mb-1">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <span className="text-[11px] font-bold text-white">১০০% অ্যান্টি-ব্যান</span>
            <span className="text-[10px] text-slate-400">নিরাপদ বাইপাস</span>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-500/40 flex items-center justify-center mb-1">
              <Headphones className="w-4 h-4" />
            </div>
            <span className="text-[11px] font-bold text-white">২৪/৭ AI সাপোর্ট</span>
            <span className="text-[10px] text-slate-400">তাত্ক্ষণিক উত্তর</span>
          </div>
        </section>

        {/* Hidden Admin Footer with Skull ☠️ Admin Gateway */}
        <footer className="pt-4 pb-2 text-center text-xs text-slate-500 space-y-2 select-none">
          <div className="flex items-center justify-center gap-3 text-[11px]">
            <a
              href="#setup-guide"
              onClick={(e) => {
                e.preventDefault();
                if (products.length > 0) setActiveFileSetupProduct(products[0]);
              }}
              className="text-cyan-400/80 hover:text-cyan-300 transition-colors"
            >
              সেটআপ গাইড ও টিউটোরিয়াল
            </a>
            {storeSettings.telegramLink && (
              <>
                <span>&bull;</span>
                <a
                  href={storeSettings.telegramLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sky-400/80 hover:text-sky-300 transition-colors"
                >
                  অফিসিয়াল টেলিগ্রাম
                </a>
              </>
            )}
          </div>

          <p className="text-slate-500 text-[11px]">
            &copy; 2026 {storeSettings.storeName || 'Mr Rrr Panel'} &bull; All Rights Reserved
          </p>

          {/* ☠️ Admin Gateway at the bottom: User request: "Admin Vitor jabar jono niche Aita add Kore deo ☠️" */}
          <div className="pt-1 flex flex-col items-center justify-center">
            <button
              onClick={() => {
                if (isAdminAuthenticated) {
                  navigateToAdmin();
                } else {
                  setSecretAdminPromptOpen(true);
                }
              }}
              className="w-10 h-10 rounded-2xl bg-slate-900/90 hover:bg-red-950/40 border border-slate-800 hover:border-red-500/50 flex items-center justify-center text-xl transition-all shadow-md active:scale-90 hover:scale-110 cursor-pointer group"
              title="☠️ Admin Access"
              aria-label="Admin Entrance"
            >
              <span className="group-hover:animate-bounce select-none">☠️</span>
            </button>
          </div>
        </footer>
      </main>

      {/* Floating 24/7 AI Auto Message Reply Widget */}
      <SupportWidget />

      {/* Bottom Navigation Bar */}
      <BottomNav activeTab={bottomNavTab} setActiveTab={setBottomNavTab} />
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <StorefrontContent />

      {/* Modals & Drawers */}
      <SecretAdminModal />
      <UserDrawer />
      <FileSetupModal />
      <BuyNowModal />
      <AddFundModal />
      <SpinAndWinModal />
      <MissionsModal />
      <MyCodesModal />
      <KeyResetModal />
      <MyAccountModal />
      <MyOrdersModal />
      <ToastContainer />
    </StoreProvider>
  );
}
