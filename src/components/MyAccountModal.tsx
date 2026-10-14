import React from 'react';
import { X, User, Shield, Wallet, ShoppingBag, QrCode, Phone, Mail, Calendar } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const MyAccountModal: React.FC = () => {
  const {
    myAccountModalOpen,
    setMyAccountModalOpen,
    currentUser,
    orders,
    fundRequests,
    setAddFundModalOpen,
    setCurrentView
  } = useStore();

  if (!myAccountModalOpen) return null;

  const totalSpent = orders
    .filter((o) => o.userId === currentUser.id)
    .reduce((acc, curr) => acc + curr.price, 0);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-3 sm:p-4">
      <div
        onClick={() => setMyAccountModalOpen(false)}
        className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity"
      />

      <div className="relative bg-white rounded-3xl max-w-md w-full p-5 sm:p-6 shadow-2xl border border-slate-200 z-10 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-black text-slate-900 text-base sm:text-lg">
                মাই একাউন্ট (MY ACCOUNT)
              </h3>
              <p className="text-xs text-slate-500">প্রোফাইল ও ব্যালেন্স বিবরণী</p>
            </div>
          </div>
          <button
            onClick={() => setMyAccountModalOpen(false)}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Profile Card */}
        <div className="mt-4 p-4 bg-gradient-to-br from-emerald-600 to-emerald-800 rounded-2xl text-white shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-full border-2 border-white/60 bg-emerald-950 flex items-center justify-center overflow-hidden">
              <User className="w-8 h-8 text-white/90" />
            </div>
            <div>
              <h4 className="text-base font-extrabold flex items-center gap-1.5">
                <span>{currentUser.name}</span>
                <span className="px-2 py-0.5 rounded-full bg-white/20 text-[10px] uppercase font-bold tracking-wider">
                  {currentUser.role}
                </span>
              </h4>
              <p className="text-xs text-emerald-100">{currentUser.email}</p>
              <p className="text-[11px] text-emerald-200">{currentUser.phone}</p>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2 pt-3 border-t border-emerald-500/40">
            <div>
              <span className="text-[10px] uppercase font-bold text-emerald-200">বর্তমান ব্যালেন্স</span>
              <div className="text-lg font-black">{currentUser.balance} ৳</div>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-emerald-200">মোট খরচ</span>
              <div className="text-lg font-black">{totalSpent} ৳</div>
            </div>
          </div>
        </div>

        {/* Action Shortcuts */}
        <div className="mt-4 space-y-2">
          <button
            onClick={() => {
              setMyAccountModalOpen(false);
              setAddFundModalOpen(true);
            }}
            className="w-full py-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-bold flex items-center justify-center gap-2"
          >
            <Wallet className="w-4 h-4" />
            <span>এড ফান্ড করুন (Add Fund)</span>
          </button>

          <button
            onClick={() => {
              setMyAccountModalOpen(false);
              setCurrentView('admin');
            }}
            className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-black flex items-center justify-center gap-2"
          >
            <Shield className="w-4 h-4" />
            <span>অ্যাডমিন প্যানেলে যান (Admin Control Panel)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
