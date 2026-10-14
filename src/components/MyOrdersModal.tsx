import React from 'react';
import { X, ShoppingBag, CheckCircle2, Clock, Calendar, Hash, ArrowUpRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const MyOrdersModal: React.FC = () => {
  const { myOrdersModalOpen, setMyOrdersModalOpen, orders, currentUser, setMyCodesModalOpen } = useStore();

  if (!myOrdersModalOpen) return null;

  const myOrders = orders.filter((o) => o.userId === currentUser.id);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-3 sm:p-4">
      <div
        onClick={() => setMyOrdersModalOpen(false)}
        className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity"
      />

      <div className="relative bg-white rounded-3xl max-w-lg w-full p-5 sm:p-6 shadow-2xl border border-slate-200 z-10 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-black text-slate-900 text-base sm:text-lg">
                আমার অর্ডারসমূহ (MY ORDERS)
              </h3>
              <p className="text-xs text-slate-500">
                সর্বমোট অর্ডার: {myOrders.length} টি
              </p>
            </div>
          </div>
          <button
            onClick={() => setMyOrdersModalOpen(false)}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Orders List */}
        <div className="mt-4 space-y-3 max-h-96 overflow-y-auto">
          {myOrders.length === 0 ? (
            <div className="text-center py-10 text-slate-400 text-xs">
              এখনো কোনো অর্ডার পাওয়া যায়নি।
            </div>
          ) : (
            myOrders.map((ord) => (
              <div
                key={ord.id}
                className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-slate-900 text-sm">
                    {ord.productName}
                  </span>
                  <span className="text-emerald-700 font-black text-sm">
                    {ord.price} ৳
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="flex items-center gap-1 font-mono">
                    <Hash className="w-3.5 h-3.5 text-slate-400" />
                    {ord.id}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    {ord.createdAt}
                  </span>
                </div>

                <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>ডেলিভারি সম্পন্ন</span>
                  </span>

                  <button
                    onClick={() => {
                      setMyOrdersModalOpen(false);
                      setMyCodesModalOpen(true);
                    }}
                    className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1 transition-all active:scale-95"
                  >
                    <span>কী দেখুন</span>
                    <ArrowUpRight className="w-3 h-3" />
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
