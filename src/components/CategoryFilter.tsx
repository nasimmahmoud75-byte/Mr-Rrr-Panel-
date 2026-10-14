import React, { useState } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { ProductCategory } from '../types';

interface Props {
  selectedCategory: ProductCategory;
  onSelectCategory: (cat: ProductCategory) => void;
}

export const CategoryFilter: React.FC<Props> = ({ selectedCategory, onSelectCategory }) => {
  const [moreDropdown, setMoreDropdown] = useState(false);

  const mainCategories: ProductCategory[] = ['ALL', 'NON ROOT', 'ROOT'];

  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 scrollbar-none">
      {/* Primary Categories */}
      {mainCategories.map((cat) => {
        const isActive = selectedCategory === cat;
        return (
          <button
            key={cat}
            onClick={() => onSelectCategory(cat)}
            className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-bold tracking-wide transition-all shrink-0 cursor-pointer ${
              isActive
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-black shadow-md shadow-cyan-500/25 ring-2 ring-cyan-400/40'
                : 'bg-slate-900/80 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
            }`}
          >
            {cat === 'ALL' ? 'All' : cat}
          </button>
        );
      })}

      {/* PC Category */}
      <button
        onClick={() => onSelectCategory('PC')}
        className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold tracking-wide transition-all shrink-0 cursor-pointer ${
          selectedCategory === 'PC'
            ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-black shadow-md shadow-cyan-500/25 ring-2 ring-cyan-400/40'
            : 'bg-slate-900/80 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
        }`}
      >
        PC / Emu
      </button>

      {/* More dropdown */}
      <div className="relative shrink-0">
        <button
          onClick={() => setMoreDropdown(!moreDropdown)}
          className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold tracking-wide transition-all flex items-center gap-1 cursor-pointer ${
            selectedCategory === 'MORE'
              ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-black shadow-md ring-2 ring-cyan-400/40'
              : 'bg-slate-900/80 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
          }`}
        >
          <span>More</span>
          <ChevronDown className="w-3.5 h-3.5 text-cyan-400" />
        </button>

        {moreDropdown && (
          <div className="absolute left-0 mt-2 w-44 bg-slate-900 rounded-2xl shadow-2xl border border-cyan-500/30 py-1.5 z-30 text-xs">
            <button
              onClick={() => {
                onSelectCategory('MORE');
                setMoreDropdown(false);
              }}
              className="w-full text-left px-3.5 py-2 hover:bg-slate-800 text-slate-200 font-semibold flex items-center justify-between"
            >
              <span>More VIP Cheats</span>
              {selectedCategory === 'MORE' && <Check className="w-3.5 h-3.5 text-cyan-400" />}
            </button>
            <button
              onClick={() => {
                onSelectCategory('ALL');
                setMoreDropdown(false);
              }}
              className="w-full text-left px-3.5 py-2 hover:bg-slate-800 text-slate-200 font-semibold"
            >
              <span>সব দেখুন (Show All)</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
