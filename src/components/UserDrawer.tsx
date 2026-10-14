import React from 'react';
import {
  X,
  User,
  ShoppingBag,
  QrCode,
  Trophy,
  Dices,
  Wallet,
  RefreshCw,
  LogOut,
  Camera,
  Shield,
  PlusCircle,
  ExternalLink
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const UserDrawer: React.FC = () => {
  const {
    userDrawerOpen,
    setUserDrawerOpen,
    currentUser,
    setCurrentView,
    setMyAccountModalOpen,
    setMyOrdersModalOpen,
    setMyCodesModalOpen,
    setMissionsModalOpen,
    setSpinWinModalOpen,
    setAddFundModalOpen,
    setKeyResetModalOpen,
    navigateToAdmin,
    isAdminAuthenticated,
    setSecretAdminPromptOpen,
    showToast
  } = useStore();

  if (!userDrawerOpen) return null;

  const handleAction = (action: () => void) => {
    setUserDrawerOpen(false);
    action();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
      {/* Backdrop */}
      <div
        onClick={() => setUserDrawerOpen(false)}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
      />

      {/* Drawer Panel */}
      <div className="relative w-full max-w-sm bg-[#f0f4f2] h-full shadow-2xl flex flex-col z-10 overflow-y-auto">
        {/* Top Header Section (Green Gradient as in Screenshot 2) */}
        <div className="bg-gradient-to-b from-emerald-600 to-emerald-700 text-white pt-8 pb-6 px-6 relative flex flex-col items-center text-center shadow-md">
          {/* Close Button Top Right */}
          <button
            onClick={() => setUserDrawerOpen(false)}
            aria-label="Close menu"
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-emerald-800/60 hover:bg-emerald-800 text-white flex items-center justify-center transition-colors shadow-xs"
          >
            <X className="w-5 h-5" />
          </button>

          {/* User Avatar with Camera Badge (5-tap secret trigger for admin prompt) */}
          <div
            onClick={() => {
              const taps = Number(sessionStorage.getItem('ps_avatar_taps') || 0) + 1;
              sessionStorage.setItem('ps_avatar_taps', String(taps));
              if (taps >= 5) {
                sessionStorage.removeItem('ps_avatar_taps');
                setUserDrawerOpen(false);
                setSecretAdminPromptOpen(true);
              }
            }}
            className="relative mb-3 cursor-pointer"
            title="User Profile"
          >
            <div className="w-20 h-20 rounded-full border-4 border-cyan-400/80 overflow-hidden bg-slate-900 flex items-center justify-center shadow-lg">
              <User className="w-12 h-12 text-cyan-300" />
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                showToast('প্রোফাইল ছবি পরিবর্তন শীঘ্রই যুক্ত হবে', 'info');
              }}
              aria-label="Change avatar"
              className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-slate-900 border-2 border-cyan-400 text-white flex items-center justify-center shadow-md hover:bg-slate-800 transition-colors"
            >
              <Camera className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Welcome Heading */}
          <h3 className="text-xl font-black text-white flex items-center gap-1.5 tracking-tight font-['Outfit']">
            <span>Welcome back, {currentUser.name}!</span>
            <span className="text-2xl">👋</span>
          </h3>

          {/* Email */}
          <p className="text-emerald-100 text-xs sm:text-sm mt-0.5 font-medium opacity-90">
            {currentUser.email}
          </p>

          {/* User Balance Card */}
          <div className="mt-4 w-full bg-emerald-800/60 backdrop-blur-xs rounded-xl p-3 border border-emerald-500/40 flex items-center justify-between">
            <div className="text-left">
              <span className="text-[11px] uppercase tracking-wider text-emerald-200 font-bold block">
                ওয়ালেট ব্যালেন্স
              </span>
              <span className="text-xl font-black text-white">
                {currentUser.balance} ৳
              </span>
            </div>
            <button
              onClick={() => handleAction(() => setAddFundModalOpen(true))}
              className="px-3 py-1.5 rounded-lg bg-white text-emerald-800 font-bold text-xs flex items-center gap-1 shadow-sm hover:bg-emerald-50 transition-transform active:scale-95"
            >
              <PlusCircle className="w-3.5 h-3.5 text-emerald-600" />
              <span>Add Fund</span>
            </button>
          </div>
        </div>

        {/* Menu Items (White Rounded Pills / Cards matching Screenshot 2) */}
        <div className="p-4 space-y-2.5 flex-1">
          {/* MY ACCOUNT */}
          <button
            onClick={() => handleAction(() => setMyAccountModalOpen(true))}
            className="w-full bg-white hover:bg-emerald-50/50 p-3.5 rounded-2xl border border-slate-200/90 shadow-2xs flex items-center gap-3.5 text-slate-800 font-extrabold text-sm tracking-wide transition-all active:scale-98"
          >
            <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
              <User className="w-4 h-4" />
            </div>
            <span>MY ACCOUNT</span>
          </button>

          {/* MY ORDERS */}
          <button
            onClick={() => handleAction(() => setMyOrdersModalOpen(true))}
            className="w-full bg-white hover:bg-emerald-50/50 p-3.5 rounded-2xl border border-slate-200/90 shadow-2xs flex items-center gap-3.5 text-slate-800 font-extrabold text-sm tracking-wide transition-all active:scale-98"
          >
            <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <span>MY ORDERS</span>
          </button>

          {/* MY CODES */}
          <button
            onClick={() => handleAction(() => setMyCodesModalOpen(true))}
            className="w-full bg-white hover:bg-emerald-50/50 p-3.5 rounded-2xl border border-slate-200/90 shadow-2xs flex items-center gap-3.5 text-slate-800 font-extrabold text-sm tracking-wide transition-all active:scale-98"
          >
            <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
              <QrCode className="w-4 h-4" />
            </div>
            <span>MY CODES</span>
          </button>

          {/* MISSIONS & REWARDS */}
          <button
            onClick={() => handleAction(() => setMissionsModalOpen(true))}
            className="w-full bg-white hover:bg-emerald-50/50 p-3.5 rounded-2xl border border-slate-200/90 shadow-2xs flex items-center justify-between text-slate-800 font-extrabold text-sm tracking-wide transition-all active:scale-98"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                <Trophy className="w-4 h-4" />
              </div>
              <span>MISSIONS & REWARDS</span>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold">
              Bonus
            </span>
          </button>

          {/* Spin & Win */}
          <button
            onClick={() => handleAction(() => setSpinWinModalOpen(true))}
            className="w-full bg-white hover:bg-emerald-50/50 p-3.5 rounded-2xl border border-slate-200/90 shadow-2xs flex items-center justify-between text-slate-800 font-extrabold text-sm tracking-wide transition-all active:scale-98"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                <Dices className="w-4 h-4" />
              </div>
              <span>Spin & Win</span>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
              {currentUser.spinTokens} Spins Left
            </span>
          </button>

          {/* ADD FUND */}
          <button
            onClick={() => handleAction(() => setAddFundModalOpen(true))}
            className="w-full bg-white hover:bg-emerald-50/50 p-3.5 rounded-2xl border border-slate-200/90 shadow-2xs flex items-center gap-3.5 text-slate-800 font-extrabold text-sm tracking-wide transition-all active:scale-98"
          >
            <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
              <Wallet className="w-4 h-4" />
            </div>
            <span>ADD FUND</span>
          </button>

          {/* KEY RESET NOW */}
          <button
            onClick={() => handleAction(() => setKeyResetModalOpen(true))}
            className="w-full bg-white hover:bg-emerald-50/50 p-3.5 rounded-2xl border border-slate-200/90 shadow-2xs flex items-center gap-3.5 text-slate-800 font-extrabold text-sm tracking-wide transition-all active:scale-98"
          >
            <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
              <RefreshCw className="w-4 h-4" />
            </div>
            <span>KEY RESET NOW</span>
          </button>

          {/* ADMIN CONTROL PANEL SHORTCUT (Only visible if owner is authenticated) */}
          {isAdminAuthenticated && (
            <button
              onClick={() => handleAction(() => navigateToAdmin())}
              className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 p-3.5 rounded-2xl shadow-sm flex items-center justify-between font-black text-sm tracking-wide transition-all active:scale-98"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-8 h-8 rounded-full bg-slate-950 text-amber-400 flex items-center justify-center shrink-0">
                  <Shield className="w-4 h-4" />
                </div>
                <span className="text-white">ADMIN CONTROL PANEL</span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-slate-950/20 text-white text-[10px] font-black uppercase">
                /admin
              </span>
            </button>
          )}

          {/* LOGOUT */}
          <button
            onClick={() => {
              setUserDrawerOpen(false);
              showToast('লগআউট সফল হয়েছে (সেশন সংরক্ষিত)', 'info');
            }}
            className="w-full bg-white hover:bg-red-50 p-3.5 rounded-2xl border border-red-100 shadow-2xs flex items-center gap-3.5 text-red-600 font-extrabold text-sm tracking-wide transition-all active:scale-98 mt-3"
          >
            <div className="w-8 h-8 rounded-full bg-red-50 text-red-600 flex items-center justify-center shrink-0">
              <LogOut className="w-4 h-4" />
            </div>
            <span>LOGOUT</span>
          </button>
        </div>
      </div>
    </div>
  );
};
