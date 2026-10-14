import React from 'react';
import { X, Download, Play, CheckCircle2, Copy, FileText, AlertTriangle, ExternalLink } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const FileSetupModal: React.FC = () => {
  const { activeFileSetupProduct, setActiveFileSetupProduct, showToast } = useStore();

  if (!activeFileSetupProduct) return null;

  const copyFileLink = () => {
    navigator.clipboard.writeText(activeFileSetupProduct.fileUrl);
    showToast('ডাউনলোড লিংক কপি করা হয়েছে!', 'success');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-3 sm:p-4">
      <div
        onClick={() => setActiveFileSetupProduct(null)}
        className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity"
      />

      <div className="relative bg-white rounded-3xl max-w-lg w-full p-5 sm:p-6 shadow-2xl border border-slate-200 z-10 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-base sm:text-lg">
                ফাইল ও সেটআপ গাইড
              </h3>
              <p className="text-xs text-indigo-600 font-bold">
                {activeFileSetupProduct.name} ({activeFileSetupProduct.category})
              </p>
            </div>
          </div>
          <button
            onClick={() => setActiveFileSetupProduct(null)}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="mt-4 space-y-4">
          {/* Action Buttons: Download & Video */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <a
              href={activeFileSetupProduct.fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition-all"
            >
              <Download className="w-4 h-4" />
              <span>APK ডাউনলোড করুন</span>
            </a>

            <a
              href={activeFileSetupProduct.setupVideoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="py-3 px-4 rounded-xl bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition-all"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>সেটআপ ভিডিও দেখুন</span>
            </a>
          </div>

          {/* Download Link with Copy button */}
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between gap-2">
            <div className="truncate text-xs font-mono text-slate-600">
              {activeFileSetupProduct.fileUrl}
            </div>
            <button
              onClick={copyFileLink}
              className="shrink-0 px-2.5 py-1 rounded-lg bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-bold flex items-center gap-1 shadow-2xs"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>কপি</span>
            </button>
          </div>

          {/* Setup Instructions Bengali */}
          <div className="p-4 bg-emerald-50/70 rounded-2xl border border-emerald-200/80">
            <h4 className="text-xs font-black uppercase text-emerald-900 tracking-wider flex items-center gap-1.5 mb-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>ইনস্টলেশন ও ব্যবহার নির্দেশিকা</span>
            </h4>
            <div className="text-xs sm:text-sm text-slate-700 whitespace-pre-line leading-relaxed font-['Hind_Siliguri']">
              {activeFileSetupProduct.setupInstructions ||
                '১. অ্যাপটি ডাউনলোড করে ইন্সটল করুন।\n২. Display over other apps পারমিশন দিন।\n৩. আপনার ক্রয়কৃত Key দিয়ে লগইন করুন।'}
            </div>
          </div>

          {/* Features Tag Pills */}
          <div>
            <div className="text-[11px] font-bold text-slate-500 mb-1.5 uppercase">ফিচারসমূহ:</div>
            <div className="flex flex-wrap gap-1.5">
              {activeFileSetupProduct.features.map((feat, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-xs font-semibold"
                >
                  ✓ {feat}
                </span>
              ))}
            </div>
          </div>

          {/* Safety Notice */}
          <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-900 text-xs flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <p>
              সব সময় অফিশিয়াল লিংক থেকেই ফাইল ডাউনলোড করবেন। যেকোনো সহায়তায় আমাদের হোয়াটসঅ্যাপে মেসেজ দিন।
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
