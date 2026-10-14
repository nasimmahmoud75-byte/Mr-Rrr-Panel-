import React, { useState } from 'react';
import { X, Copy, Check, Wallet, AlertCircle, Clock, CheckCircle2, XCircle } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { PaymentMethod } from '../types';

export const AddFundModal: React.FC = () => {
  const {
    addFundModalOpen,
    setAddFundModalOpen,
    storeSettings,
    currentUser,
    submitFundRequest,
    fundRequests,
    showToast
  } = useStore();

  const [method, setMethod] = useState<PaymentMethod>('bKash');
  const [senderNumber, setSenderNumber] = useState('');
  const [amount, setAmount] = useState<number>(100);
  const [trxId, setTrxId] = useState('');
  const [activeTab, setActiveTab] = useState<'deposit' | 'history'>('deposit');
  const [copiedNumber, setCopiedNumber] = useState(false);

  if (!addFundModalOpen) return null;

  const getMethodConfig = () => {
    if (method === 'bKash') return storeSettings.paymentDetails.bKash;
    if (method === 'Nagad') return storeSettings.paymentDetails.nagad;
    return storeSettings.paymentDetails.rocket;
  };

  const currentConfig = getMethodConfig();

  const handleCopyNumber = () => {
    navigator.clipboard.writeText(currentConfig.number);
    setCopiedNumber(true);
    showToast('নাম্বার কপি হয়েছে!', 'success');
    setTimeout(() => setCopiedNumber(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderNumber || senderNumber.length < 10) {
      showToast('অনুগ্রহ করে সঠিক মোবাইল নম্বর দিন', 'error');
      return;
    }
    if (!trxId || trxId.length < 6) {
      showToast('অনুগ্রহ করে সঠিক TrxID লিখুন', 'error');
      return;
    }
    if (amount <= 0) {
      showToast('টাকার পরিমাণ লিখুন', 'error');
      return;
    }

    submitFundRequest(method, senderNumber, trxId, amount);
    setTrxId('');
    setSenderNumber('');
    setActiveTab('history');
  };

  const myHistory = fundRequests.filter((r) => r.userId === currentUser.id);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-3 sm:p-4">
      <div
        onClick={() => setAddFundModalOpen(false)}
        className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity"
      />

      <div className="relative bg-white rounded-3xl max-w-lg w-full p-5 sm:p-6 shadow-2xl border border-slate-200 z-10 overflow-hidden">
        {/* Top Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-pink-100 text-pink-700 flex items-center justify-center font-bold">
              <Wallet className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-black text-slate-900 text-base sm:text-lg">
                এড ফান্ড (Add Fund)
              </h3>
              <p className="text-xs text-slate-500">
                বর্তমান ব্যালেন্স: <span className="font-extrabold text-emerald-600">{currentUser.balance}৳</span>
              </p>
            </div>
          </div>
          <button
            onClick={() => setAddFundModalOpen(false)}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Switcher: Deposit vs History */}
        <div className="flex items-center gap-2 mt-4 p-1 bg-slate-100 rounded-xl">
          <button
            onClick={() => setActiveTab('deposit')}
            className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
              activeTab === 'deposit'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            টাকা জমা করুন (Deposit)
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'history'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>ডিপোজিট হিস্ট্রি</span>
            {myHistory.length > 0 && (
              <span className="px-1.5 py-0.2 bg-emerald-100 text-emerald-800 rounded-full text-[10px]">
                {myHistory.length}
              </span>
            )}
          </button>
        </div>

        {activeTab === 'deposit' ? (
          <div className="mt-4 space-y-4">
            {/* Payment Method Pills */}
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setMethod('bKash')}
                className={`py-2 px-3 rounded-xl border text-xs font-extrabold flex flex-col items-center gap-1 transition-all ${
                  method === 'bKash'
                    ? 'border-[#e2136e] bg-[#e2136e]/10 text-[#e2136e] ring-2 ring-[#e2136e]/20'
                    : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span className="w-3 h-3 rounded-full bg-[#e2136e]" />
                <span>bKash (বিকাশ)</span>
              </button>

              <button
                type="button"
                onClick={() => setMethod('Nagad')}
                className={`py-2 px-3 rounded-xl border text-xs font-extrabold flex flex-col items-center gap-1 transition-all ${
                  method === 'Nagad'
                    ? 'border-[#f7941d] bg-[#f7941d]/10 text-[#f7941d] ring-2 ring-[#f7941d]/20'
                    : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span className="w-3 h-3 rounded-full bg-[#f7941d]" />
                <span>Nagad (নগদ)</span>
              </button>

              <button
                type="button"
                onClick={() => setMethod('Rocket')}
                className={`py-2 px-3 rounded-xl border text-xs font-extrabold flex flex-col items-center gap-1 transition-all ${
                  method === 'Rocket'
                    ? 'border-[#8c3494] bg-[#8c3494]/10 text-[#8c3494] ring-2 ring-[#8c3494]/20'
                    : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span className="w-3 h-3 rounded-full bg-[#8c3494]" />
                <span>Rocket (রকেট)</span>
              </button>
            </div>

            {/* Account Box & Copy */}
            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
              <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                <span>আমাদের {method} ({currentConfig.type}) নম্বর:</span>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-bold">
                  Send Money Only
                </span>
              </div>
              <div className="flex items-center justify-between gap-2 bg-white p-2.5 rounded-xl border border-slate-200">
                <span className="font-mono font-black text-base sm:text-lg text-slate-800 tracking-wider">
                  {currentConfig.number}
                </span>
                <button
                  type="button"
                  onClick={handleCopyNumber}
                  className="px-3 py-1 bg-slate-900 text-white rounded-lg text-xs font-bold flex items-center gap-1 active:scale-95 transition-all"
                >
                  {copiedNumber ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedNumber ? 'কপি হয়েছে' : 'নম্বর কপি'}</span>
                </button>
              </div>
              <p className="text-[11px] text-slate-600 mt-2 font-['Hind_Siliguri']">
                {currentConfig.instructions}
              </p>
            </div>

            {/* Deposit Form */}
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  টাকার পরিমাণ (Amount ৳):
                </label>
                <input
                  type="number"
                  min="10"
                  max="10000"
                  required
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="কত টাকা পাঠিয়েছেন?"
                />
                {/* Presets */}
                <div className="flex gap-1.5 mt-1.5">
                  {[30, 50, 100, 200, 500].map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setAmount(preset)}
                      className={`px-2.5 py-1 text-xs rounded-lg font-bold border transition-all ${
                        amount === preset
                          ? 'bg-emerald-600 text-white border-emerald-600'
                          : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
                      }`}
                    >
                      {preset}৳
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  আপনার প্রেরক নম্বর (Sender Phone Number):
                </label>
                <input
                  type="text"
                  required
                  value={senderNumber}
                  onChange={(e) => setSenderNumber(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="যে নম্বর থেকে টাকা পাঠিয়েছেন (যেমন: 017XXXXXXXX)"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  ট্রানজেকশন আইডি (TrxID):
                </label>
                <input
                  type="text"
                  required
                  value={trxId}
                  onChange={(e) => setTrxId(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-mono uppercase font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="মেসেজে আসা TrxID (যেমন: BK9A7712XK)"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm tracking-wide shadow-md active:scale-98 transition-all flex items-center justify-center gap-1.5"
              >
                <span>ডিপোজিট রিকোয়েস্ট পাঠান (Submit Deposit)</span>
              </button>
            </form>
          </div>
        ) : (
          /* History Tab */
          <div className="mt-4 space-y-2.5 max-h-72 overflow-y-auto">
            {myHistory.length === 0 ? (
              <div className="p-8 text-center text-slate-400 text-xs">
                কোনো পূর্ববর্তী ডিপোজিট রিকোয়েস্ট নেই।
              </div>
            ) : (
              myHistory.map((item) => (
                <div
                  key={item.id}
                  className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs"
                >
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-slate-900">{item.method}</span>
                      <span className="font-mono text-emerald-600 font-extrabold">{item.amount}৳</span>
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      TrxID: <span className="font-mono font-bold text-slate-700">{item.transactionId}</span>
                    </div>
                    <div className="text-[10px] text-slate-400">{item.createdAt}</div>
                  </div>

                  <div>
                    {item.status === 'approved' && (
                      <span className="px-2 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        <span>অনুমোদিত</span>
                      </span>
                    )}
                    {item.status === 'pending' && (
                      <span className="px-2 py-1 rounded-full bg-amber-100 text-amber-800 font-bold flex items-center gap-1">
                        <Clock className="w-3 h-3 text-amber-600" />
                        <span>পেন্ডিং</span>
                      </span>
                    )}
                    {item.status === 'rejected' && (
                      <span className="px-2 py-1 rounded-full bg-red-100 text-red-800 font-bold flex items-center gap-1">
                        <XCircle className="w-3 h-3 text-red-600" />
                        <span>বাতিল</span>
                      </span>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};
