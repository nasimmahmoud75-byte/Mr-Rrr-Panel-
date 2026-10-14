import React, { useState } from 'react';
import { X, RefreshCw, KeyRound, AlertCircle, Send } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const KeyResetModal: React.FC = () => {
  const { keyResetModalOpen, setKeyResetModalOpen, orders, currentUser, submitKeyResetRequest, showToast } = useStore();
  const [selectedKey, setSelectedKey] = useState('');
  const [productName, setProductName] = useState('');
  const [reason, setReason] = useState('ফোন পরিবর্তন করেছি (Device Changed)');

  if (!keyResetModalOpen) return null;

  const myOrders = orders.filter((o) => o.userId === currentUser.id);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedKey) {
      showToast('অনুগ্রহ করে রিসেট করার জন্য একটি কী নির্বাচন করুন বা লিখুন', 'error');
      return;
    }

    submitKeyResetRequest(selectedKey, productName || 'Gaming Panel', reason);
    setKeyResetModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-3 sm:p-4">
      <div
        onClick={() => setKeyResetModalOpen(false)}
        className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity"
      />

      <div className="relative bg-white rounded-3xl max-w-md w-full p-5 sm:p-6 shadow-2xl border border-slate-200 z-10 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-black text-slate-900 text-base sm:text-lg">
                কী রিসেট (KEY RESET NOW)
              </h3>
              <p className="text-xs text-slate-500">
                HWID বা ডিভাইস আনবাইন্ড রিকোয়েস্ট
              </p>
            </div>
          </div>
          <button
            onClick={() => setKeyResetModalOpen(false)}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-900 text-xs flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <p>
              প্রতিটি কীতে ২৪ ঘণ্টায় ১ বার বিনামূল্যে HWID রিসেট করা যায়। রিসেটের পর নতুন ফোনে কি লগইন করতে পারবেন।
            </p>
          </div>

          {/* Key Selection */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              আপনার লাইসেন্স কী (License Key):
            </label>
            {myOrders.length > 0 ? (
              <select
                value={selectedKey}
                onChange={(e) => {
                  setSelectedKey(e.target.value);
                  const found = myOrders.find((o) => o.key === e.target.value);
                  if (found) setProductName(found.productName);
                }}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-mono font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="">-- কী নির্বাচন করুন --</option>
                {myOrders.map((ord) => (
                  <option key={ord.id} value={ord.key}>
                    {ord.productName} ({ord.key})
                  </option>
                ))}
              </select>
            ) : (
              <input
                type="text"
                required
                value={selectedKey}
                onChange={(e) => setSelectedKey(e.target.value)}
                placeholder="আপনার কী এখানে পেস্ট করুন"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            )}
          </div>

          {/* Reason */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              রিসেটের কারণ:
            </label>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="ফোন পরিবর্তন করেছি (Device Changed)">ফোন পরিবর্তন করেছি (Device Changed)</option>
              <option value="গেম আনইন্সটল করে নতুন করেছি (Reinstalled)">গেম আনইন্সটল করে নতুন করেছি (Reinstalled)</option>
              <option value="HWID Error দেখাচ্ছে (Key Binding Error)">HWID Error দেখাচ্ছে (Key Binding Error)</option>
              <option value="অন্যান্য কারণ (Other)">অন্যান্য কারণ (Other)</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm tracking-wide shadow-md active:scale-98 transition-all flex items-center justify-center gap-1.5"
          >
            <Send className="w-4 h-4" />
            <span>রিসেট রিকোয়েস্ট পাঠান (Submit Reset)</span>
          </button>
        </form>
      </div>
    </div>
  );
};
