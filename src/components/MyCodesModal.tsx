import React, { useState } from 'react';
import { X, QrCode, Copy, Check, RefreshCw, KeyRound, ExternalLink } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const MyCodesModal: React.FC = () => {
  const {
    myCodesModalOpen,
    setMyCodesModalOpen,
    orders,
    currentUser,
    setKeyResetModalOpen,
    showToast
  } = useStore();

  const [copiedId, setCopiedId] = useState<string | null>(null);

  if (!myCodesModalOpen) return null;

  const myOrders = orders.filter((o) => o.userId === currentUser.id);

  const handleCopy = (key: string, id: string) => {
    navigator.clipboard.writeText(key);
    setCopiedId(id);
    showToast('কী কপি হয়েছে!', 'success');
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-3 sm:p-4">
      <div
        onClick={() => setMyCodesModalOpen(false)}
        className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity"
      />

      <div className="relative bg-white rounded-3xl max-w-lg w-full p-5 sm:p-6 shadow-2xl border border-slate-200 z-10 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
              <QrCode className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-black text-slate-900 text-base sm:text-lg">
                মাই কোডস (MY CODES)
              </h3>
              <p className="text-xs text-slate-500">
                আপনার কেনা সকল লাইসেন্স কী এবং প্যানেল কোড
              </p>
            </div>
          </div>
          <button
            onClick={() => setMyCodesModalOpen(false)}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="mt-4 space-y-3 max-h-96 overflow-y-auto">
          {myOrders.length === 0 ? (
            <div className="text-center py-10 text-slate-400 text-xs">
              আপনি এখনো কোনো কোড বা প্যানেল কেনেননি।
            </div>
          ) : (
            myOrders.map((ord) => (
              <div
                key={ord.id}
                className="p-3.5 bg-slate-900 text-white rounded-2xl border border-slate-800 shadow-sm space-y-2.5"
              >
                <div className="flex items-center justify-between text-xs">
                  <div>
                    <span className="font-extrabold text-amber-400 text-sm block">
                      {ord.productName}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      তারিখ: {ord.createdAt} | আইডি: #{ord.id}
                    </span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                    ACTIVE
                  </span>
                </div>

                {/* Key block */}
                <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between gap-2">
                  <span className="font-mono font-bold text-xs sm:text-sm text-emerald-400 select-all truncate">
                    {ord.key}
                  </span>
                  <button
                    onClick={() => handleCopy(ord.key, ord.id)}
                    className="shrink-0 px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold flex items-center gap-1 active:scale-95 transition-all"
                  >
                    {copiedId === ord.id ? (
                      <Check className="w-3.5 h-3.5 text-white" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                    <span>{copiedId === ord.id ? 'কপি হয়েছে' : 'কপি'}</span>
                  </button>
                </div>

                {/* Quick actions for this key */}
                <div className="flex items-center justify-between pt-1 text-xs">
                  <a
                    href={ord.fileUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1"
                  >
                    <ExternalLink className="w-3 h-3" />
                    <span>APK ডাউনলোড লিংক</span>
                  </a>

                  <button
                    onClick={() => {
                      setMyCodesModalOpen(false);
                      setKeyResetModalOpen(true);
                    }}
                    className="text-slate-400 hover:text-white font-medium flex items-center gap-1"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>HWID Reset</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
