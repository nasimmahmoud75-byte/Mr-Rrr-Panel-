import React from 'react';
import { Home, Wallet, ShoppingBag, QrCode, User as UserIcon } from 'lucide-react';
import { useStore } from '../context/StoreContext';

interface Props {
  activeTab: 'home' | 'fund' | 'order' | 'key' | 'account';
  setActiveTab: (tab: 'home' | 'fund' | 'order' | 'key' | 'account') => void;
}

export const BottomNav: React.FC<Props> = ({ activeTab, setActiveTab }) => {
  const {
    setCurrentView,
    setAddFundModalOpen,
    setMyOrdersModalOpen,
    setMyCodesModalOpen,
    setUserDrawerOpen
  } = useStore();

  const handleNavClick = (tab: 'home' | 'fund' | 'order' | 'key' | 'account') => {
    setActiveTab(tab);
    setCurrentView('store');

    if (tab === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (tab === 'fund') {
      setAddFundModalOpen(true);
    } else if (tab === 'order') {
      setMyOrdersModalOpen(true);
    } else if (tab === 'key') {
      setMyCodesModalOpen(true);
    } else if (tab === 'account') {
      setUserDrawerOpen(true);
    }
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 backdrop-blur-md border-t border-cyan-500/20 shadow-[0_-4px_24px_rgba(0,0,0,0.5)]">
      <div className="max-w-md mx-auto px-2 py-1.5 flex items-center justify-around">
        {/* Home */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex flex-col items-center justify-center py-1 px-3 transition-all group cursor-pointer"
        >
          <div
            className={`px-4 py-1 rounded-full transition-all flex items-center justify-center ${
              activeTab === 'home'
                ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Home className={`w-5 h-5 ${activeTab === 'home' ? 'text-cyan-400' : ''}`} />
          </div>
          <span
            className={`text-[11px] mt-0.5 tracking-tight ${
              activeTab === 'home' ? 'font-bold text-cyan-300' : 'text-slate-400 font-medium'
            }`}
          >
            Home
          </span>
        </button>

        {/* Add Fund */}
        <button
          onClick={() => handleNavClick('fund')}
          className="flex flex-col items-center justify-center py-1 px-3 transition-all group cursor-pointer"
        >
          <div
            className={`px-4 py-1 rounded-full transition-all flex items-center justify-center ${
              activeTab === 'fund'
                ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Wallet className={`w-5 h-5 ${activeTab === 'fund' ? 'text-cyan-400' : ''}`} />
          </div>
          <span
            className={`text-[11px] mt-0.5 tracking-tight ${
              activeTab === 'fund' ? 'font-bold text-cyan-300' : 'text-slate-400 font-medium'
            }`}
          >
            Add Fund
          </span>
        </button>

        {/* Order */}
        <button
          onClick={() => handleNavClick('order')}
          className="flex flex-col items-center justify-center py-1 px-3 transition-all group cursor-pointer"
        >
          <div
            className={`px-4 py-1 rounded-full transition-all flex items-center justify-center ${
              activeTab === 'order'
                ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <ShoppingBag className={`w-5 h-5 ${activeTab === 'order' ? 'text-cyan-400' : ''}`} />
          </div>
          <span
            className={`text-[11px] mt-0.5 tracking-tight ${
              activeTab === 'order' ? 'font-bold text-cyan-300' : 'text-slate-400 font-medium'
            }`}
          >
            My Orders
          </span>
        </button>

        {/* My Codes */}
        <button
          onClick={() => handleNavClick('key')}
          className="flex flex-col items-center justify-center py-1 px-3 transition-all group cursor-pointer"
        >
          <div
            className={`px-4 py-1 rounded-full transition-all flex items-center justify-center ${
              activeTab === 'key'
                ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <QrCode className={`w-5 h-5 ${activeTab === 'key' ? 'text-cyan-400' : ''}`} />
          </div>
          <span
            className={`text-[11px] mt-0.5 tracking-tight ${
              activeTab === 'key' ? 'font-bold text-cyan-300' : 'text-slate-400 font-medium'
            }`}
          >
            My Codes
          </span>
        </button>

        {/* Account / User Menu */}
        <button
          onClick={() => handleNavClick('account')}
          className="flex flex-col items-center justify-center py-1 px-3 transition-all group cursor-pointer"
        >
          <div
            className={`px-4 py-1 rounded-full transition-all flex items-center justify-center ${
              activeTab === 'account'
                ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <UserIcon className={`w-5 h-5 ${activeTab === 'account' ? 'text-cyan-400' : ''}`} />
          </div>
          <span
            className={`text-[11px] mt-0.5 tracking-tight ${
              activeTab === 'account' ? 'font-bold text-cyan-300' : 'text-slate-400 font-medium'
            }`}
          >
            Account
          </span>
        </button>
      </div>
    </nav>
  );
};
