import React from 'react';
import { X, Trophy, Check, Gift, ExternalLink, Sparkles } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const MissionsModal: React.FC = () => {
  const { missionsModalOpen, setMissionsModalOpen, missions, claimMissionReward } = useStore();

  if (!missionsModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-3 sm:p-4">
      <div
        onClick={() => setMissionsModalOpen(false)}
        className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity"
      />

      <div className="relative bg-white rounded-3xl max-w-md w-full p-5 sm:p-6 shadow-2xl border border-slate-200 z-10 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-black text-slate-900 text-base sm:text-lg">
                মিশন ও রিওয়ার্ডস
              </h3>
              <p className="text-xs text-slate-500">
                মিশন শেষ করে ফ্রি ব্যালেন্স এবং স্পিন জিতুন
              </p>
            </div>
          </div>
          <button
            onClick={() => setMissionsModalOpen(false)}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Missions List */}
        <div className="mt-4 space-y-3">
          {missions.map((m) => (
            <div
              key={m.id}
              className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between gap-3"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-slate-900 text-xs sm:text-sm">
                    {m.titleBn}
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-1 text-[11px] text-emerald-700 font-bold">
                  <Gift className="w-3.5 h-3.5" />
                  <span>
                    পুরস্কার: {m.rewardAmount} {m.rewardType === 'balance' ? '৳ ব্যালেন্স' : 'টি ফ্রি স্পিন'}
                  </span>
                </div>
              </div>

              <div>
                {m.isClaimed ? (
                  <span className="px-3 py-1.5 rounded-xl bg-slate-200 text-slate-600 text-xs font-bold flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" />
                    <span>ক্লেইমড</span>
                  </span>
                ) : m.isCompleted ? (
                  <button
                    onClick={() => claimMissionReward(m.id)}
                    className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black shadow-sm active:scale-95 transition-all flex items-center gap-1"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>ক্লেম করুন</span>
                  </button>
                ) : (
                  <a
                    href={m.actionUrl || '#'}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-sm active:scale-95 transition-all flex items-center gap-1"
                  >
                    <span>যান</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
