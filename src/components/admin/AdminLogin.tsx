import React, { useState } from 'react';
import { Lock, Mail, Key, Eye, EyeOff, Shield, ArrowLeft } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const AdminLogin: React.FC = () => {
  const { adminLogin, navigateToStore, storeSettings } = useStore();
  const [email, setEmail] = useState('azihasan237@gmail.com');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      adminLogin(email, password);
      setLoading(false);
    }, 400);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between p-4 relative overflow-hidden font-['Outfit',sans-serif]">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header with Back to Store */}
      <div className="max-w-md w-full mx-auto flex items-center justify-between z-10 pt-2">
        <button
          onClick={navigateToStore}
          className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>ওয়েবসাইটে ফিরে যান (Storefront)</span>
        </button>

        <span className="text-[11px] font-mono text-cyan-400 bg-cyan-950/60 border border-cyan-500/30 px-2.5 py-0.5 rounded-full">
          /admin
        </span>
      </div>

      {/* Main Login Card */}
      <div className="max-w-md w-full mx-auto my-auto z-10 py-6">
        <div className="bg-slate-900/90 backdrop-blur-xl rounded-3xl border border-cyan-500/30 p-6 sm:p-8 shadow-2xl relative">
          {/* Lock Icon Badge */}
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white flex items-center justify-center mx-auto mb-4 shadow-lg shadow-cyan-900/40 border border-cyan-400/40">
            <Shield className="w-8 h-8" />
          </div>

          <div className="text-center mb-6">
            <h2 className="text-2xl font-black text-white tracking-tight">
              PANELSELL ADMIN
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              গোপন অ্যাডমিন প্যানেলে লগইন করুন
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                অ্যাডমিন ইমেইল (Admin Email):
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@panelsell.store"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-slate-300">
                  পাসওয়ার্ড (Password):
                </label>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <Key className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm font-mono font-bold focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-500 hover:text-slate-300 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || !password}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black text-sm tracking-wide shadow-lg shadow-cyan-950/50 active:scale-98 transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
            >
              <Lock className="w-4 h-4" />
              <span>{loading ? 'ভেরিফাই হচ্ছে...' : 'লগইন করুন (Secure Access)'}</span>
            </button>
          </form>

          {/* Security Notice */}
          <div className="mt-5 p-3 rounded-2xl bg-slate-950/80 border border-slate-800 text-center">
            <span className="text-[11px] text-cyan-400 font-bold block">
              🔒 হাই সিকিউরিটি এনক্রিপশন সক্রিয়
            </span>
            <p className="text-[10px] text-slate-500 mt-1">
              শুধুমাত্র অনুমোদিত অ্যাডমিন এই প্যানেল এক্সেস করতে পারবেন।
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="max-w-md w-full mx-auto text-center text-[11px] text-slate-600 z-10 pb-2">
        PanelSell Security System &bull; Authorized Personnel Only
      </div>
    </div>
  );
};
