import React, { useState } from 'react';
import { X, Dices, Sparkles, Award } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useStore } from '../context/StoreContext';

const PRIZES = [
  { label: '5 ৳', amount: 5, color: '#10b981' },
  { label: 'Try Again', amount: 0, color: '#64748b' },
  { label: '10 ৳', amount: 10, color: '#3b82f6' },
  { label: '2 ৳', amount: 2, color: '#f59e0b' },
  { label: '20 ৳', amount: 20, color: '#ec4899' },
  { label: '50 ৳ 🔥', amount: 50, color: '#8b5cf6' }
];

export const SpinAndWinModal: React.FC = () => {
  const { spinWinModalOpen, setSpinWinModalOpen, currentUser, useSpinToken, showToast } = useStore();
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [wonPrize, setWonPrize] = useState<{ label: string; amount: number } | null>(null);

  if (!spinWinModalOpen) return null;

  const handleSpin = () => {
    if (currentUser.spinTokens <= 0) {
      showToast('আপনার কোনো স্পিন টোকেন বাকি নেই! মিশন সম্পন্ন করে টোকেন অর্জন করুন।', 'error');
      return;
    }
    if (spinning) return;

    setSpinning(true);
    setWonPrize(null);

    // Pick random prize
    const randomIndex = Math.floor(Math.random() * PRIZES.length);
    const selectedPrize = PRIZES[randomIndex];

    // Compute rotation (each segment is 360 / 6 = 60 deg)
    const segmentAngle = 360 / PRIZES.length;
    const extraSpins = 360 * 5; // 5 full rotations
    // The pointer is at top (0 deg). Segment index center angle:
    const targetAngle = extraSpins + (360 - randomIndex * segmentAngle - segmentAngle / 2);

    const nextRotation = rotation + targetAngle;
    setRotation(nextRotation);

    setTimeout(() => {
      setSpinning(false);
      setWonPrize(selectedPrize);
      useSpinToken(selectedPrize.amount);

      if (selectedPrize.amount > 0) {
        try {
          confetti({
            particleCount: 80,
            spread: 60,
            origin: { y: 0.6 }
          });
        } catch (e) {}
      }
    }, 4000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-3 sm:p-4">
      <div
        onClick={() => !spinning && setSpinWinModalOpen(false)}
        className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity"
      />

      <div className="relative bg-slate-950 text-white rounded-3xl max-w-sm w-full p-5 sm:p-6 shadow-2xl border border-emerald-500/30 z-10 overflow-hidden text-center">
        {/* Close Button */}
        <button
          disabled={spinning}
          onClick={() => setSpinWinModalOpen(false)}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-800 text-slate-300 hover:text-white flex items-center justify-center disabled:opacity-50"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Title */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold mb-2 border border-emerald-500/30">
          <Sparkles className="w-3.5 h-3.5" />
          <span>দৈনিক লাকি স্পিন</span>
        </div>

        <h3 className="text-xl font-black text-white font-['Outfit']">
          SPIN & WIN
        </h3>
        <p className="text-xs text-slate-400 mt-1">
          স্পিন করে জিতে নিন ফ্রি ক্যাশব্যাক এবং ওয়ালেট বোনাস!
        </p>

        {/* Tokens Count */}
        <div className="mt-3 inline-block px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-bold text-amber-400">
          বাকি স্পিন: <span className="font-extrabold text-white text-sm">{currentUser.spinTokens}</span> টি
        </div>

        {/* Spinning Wheel Graphic */}
        <div className="relative my-6 flex items-center justify-center">
          {/* Wheel Pointer Triangle at Top */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -mt-3 z-20 w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[20px] border-t-amber-400 drop-shadow-md" />

          {/* Wheel Circle */}
          <div
            style={{
              transform: `rotate(${rotation}deg)`,
              transition: spinning ? 'transform 4s cubic-bezier(0.15, 0.9, 0.2, 1)' : 'none'
            }}
            className="w-56 h-56 rounded-full border-4 border-amber-400 relative overflow-hidden shadow-2xl shadow-emerald-950/60"
          >
            {PRIZES.map((prize, idx) => {
              const rotateDeg = (360 / PRIZES.length) * idx;
              return (
                <div
                  key={idx}
                  style={{
                    transform: `rotate(${rotateDeg}deg)`,
                    backgroundColor: idx % 2 === 0 ? '#064e3b' : '#047857'
                  }}
                  className="absolute inset-0 origin-center flex items-start justify-center pt-3 border-r border-emerald-400/20"
                >
                  <span className="font-black text-xs text-white drop-shadow-sm select-none">
                    {prize.label}
                  </span>
                </div>
              );
            })}

            {/* Center Cap */}
            <div className="absolute inset-0 m-auto w-12 h-12 rounded-full bg-slate-950 border-2 border-amber-400 flex items-center justify-center shadow-lg z-10">
              <Dices className="w-5 h-5 text-amber-400" />
            </div>
          </div>
        </div>

        {/* Won Prize Notification */}
        {wonPrize && (
          <div className="p-3 bg-emerald-900/60 rounded-2xl border border-emerald-500/50 mb-3 animate-bounce">
            <span className="text-xs text-emerald-200 block font-bold">
              {wonPrize.amount > 0 ? '🎉 অভিনন্দন! আপনি জিতেছেন:' : 'ভালো চেষ্টা!'}
            </span>
            <span className="text-xl font-black text-amber-400">
              {wonPrize.label}
            </span>
          </div>
        )}

        {/* Spin CTA */}
        <button
          disabled={spinning || currentUser.spinTokens <= 0}
          onClick={handleSpin}
          className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-sm tracking-wider uppercase shadow-lg shadow-amber-500/20 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
        >
          {spinning ? 'স্পিন হচ্ছে...' : 'এখনই স্পিন করুন (SPIN NOW)'}
        </button>
      </div>
    </div>
  );
};
