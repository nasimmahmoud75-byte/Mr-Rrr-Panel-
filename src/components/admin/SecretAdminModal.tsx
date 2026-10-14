import React, { useState } from 'react';
import { Lock, Eye, EyeOff, ShieldCheck, X, KeyRound, AlertTriangle } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const SecretAdminModal: React.FC = () => {
  const {
    secretAdminPromptOpen,
    setSecretAdminPromptOpen,
    unlockAdminWithPassword
  } = useStore();

  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  if (!secretAdminPromptOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setIsVerifying(true);

    setTimeout(() => {
      const success = unlockAdminWithPassword(password);
      setIsVerifying(false);
      if (!success) {
        setErrorMsg('ভুল পাসওয়ার্ড! সঠিক সিক্রেট পাসওয়ার্ড দিয়ে চেষ্টা করুন।');
      } else {
        setPassword('');
      }
    }, 300);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="max-w-sm w-full bg-slate-900 border border-cyan-500/30 rounded-3xl p-6 shadow-2xl relative text-white">
        {/* Close Button */}
        <button
          onClick={() => {
            setSecretAdminPromptOpen(false);
            setErrorMsg('');
            setPassword('');
          }}
          className="absolute top-4 right-4 p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Skull Icon Header */}
        <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-slate-900 via-red-950 to-slate-900 flex items-center justify-center mx-auto mb-4 shadow-xl border border-red-500/40 text-3xl select-none animate-pulse">
          ☠️
        </div>

        <div className="text-center mb-5">
          <h3 className="text-lg font-black tracking-tight font-['Outfit'] text-white flex items-center justify-center gap-1.5">
            <span>☠️ সিকিউরিটি ভেরিফিকেশন</span>
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            মিস্টার ট্রিপল আর প্যানেল (Mr Rrr Panel) অ্যাডমিনে প্রবেশ করতে সিক্রেট পাসওয়ার্ড দিন
          </p>
        </div>

        {errorMsg && (
          <div className="mb-4 p-2.5 rounded-xl bg-red-950/70 border border-red-500/40 text-red-300 text-xs flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0 text-red-400" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">
              সিক্রেট পাসওয়ার্ড (Admin Password):
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                autoFocus
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrorMsg('');
                }}
                placeholder="পাসওয়ার্ড লিখুন..."
                className="w-full pl-3.5 pr-10 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm font-mono tracking-wider focus:outline-none focus:ring-2 focus:ring-red-500/50"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-500 hover:text-slate-300"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isVerifying || !password}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 disabled:opacity-40 text-white font-black text-xs tracking-wide shadow-lg shadow-red-950/50 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
          >
            <span className="text-sm">☠️</span>
            <span>{isVerifying ? 'ভেরিফাই হচ্ছে...' : 'অ্যাডমিন প্যানেলে প্রবেশ করুন'}</span>
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-[10px] text-slate-500">
            Security Protected &bull; Authorized Admin Only
          </p>
        </div>
      </div>
    </div>
  );
};
