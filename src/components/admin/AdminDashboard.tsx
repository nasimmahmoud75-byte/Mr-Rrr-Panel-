import React, { useState } from 'react';
import {
  Shield,
  ArrowLeft,
  Package,
  Wallet,
  ShoppingBag,
  Users,
  Settings,
  Plus,
  Edit2,
  Trash2,
  CheckCircle2,
  XCircle,
  KeyRound,
  RefreshCw,
  TrendingUp,
  Save,
  LogOut,
  Image as ImageIcon,
  Upload,
  Sparkles,
  Download,
  PlayCircle,
  Clock,
  Eye,
  Check
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { Product, ProductCategory, ProductStatus, StoreSettings, KeyDuration, Banner } from '../../types';
import { INITIAL_BANNERS } from '../../data/initialData';

export const AdminDashboard: React.FC = () => {
  const {
    setCurrentView,
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    toggleProductStatus,
    addStockKeysToProduct,
    fundRequests,
    approveFundRequest,
    rejectFundRequest,
    orders,
    keyResetRequests,
    approveKeyResetRequest,
    rejectKeyResetRequest,
    currentUser,
    updateUserBalance,
    storeSettings,
    updateStoreSettings,
    banners,
    updateBanner,
    adminLogout,
    showToast
  } = useStore();

  const [activeTab, setActiveTab] = useState<
    'overview' | 'products' | 'banner' | 'deposits' | 'orders' | 'users' | 'resets' | 'settings'
  >('overview');

  // Hero Banner / Circle Image Form State
  const [bannerForm, setBannerForm] = useState<Banner>(() => {
    return banners && banners.length > 0 ? banners[0] : INITIAL_BANNERS[0];
  });

  // Product Add / Edit modal state
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [productForm, setProductForm] = useState({
    name: '',
    category: 'NON ROOT' as 'NON ROOT' | 'ROOT' | 'PC' | 'MORE',
    tag: 'NEW RELEASE',
    price: 30,
    price1Day: 30,
    price7Days: 120,
    price30Days: 350,
    originalPrice: 60,
    imageUrl: '',
    customImage: '',
    status: 'active' as ProductStatus,
    description: '',
    fileUrl: 'https://mediafire.com/file/download.apk',
    setupVideoUrl: 'https://youtube.com/watch?v=example',
    setupInstructions: '১. পুরনো APK ডিলিট করুন।\n২. নতুন APK ইন্সটল করে ওপেন করুন।\n৩. আপনার ক্রয়কৃত কি পেস্ট করে লগইন করুন।',
    features: 'Auto Headshot, Zero Recoil, ESP Line, Safe 100%',
    stockKeys1DayInput: 'KEY-1D-001\nKEY-1D-002',
    stockKeys7DaysInput: 'KEY-7D-001\nKEY-7D-002',
    stockKeys30DaysInput: 'KEY-30D-001\nKEY-30D-002'
  });

  // Stock Keys Replenishment Modal
  const [keyModalProduct, setKeyModalProduct] = useState<Product | null>(null);
  const [stockKeyDuration, setStockKeyDuration] = useState<KeyDuration>('1_day');
  const [newKeysText, setNewKeysText] = useState('');

  // Settings State
  const [tempSettings, setTempSettings] = useState<StoreSettings>(storeSettings);

  // User Balance Adjust State
  const [balanceAmount, setBalanceAmount] = useState<number>(50);

  // Filter state for deposits
  const [depositFilter, setDepositFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');

  // Stats
  const totalRevenue = orders.reduce((sum, o) => sum + o.price, 0);
  const pendingDeposits = fundRequests.filter((f) => f.status === 'pending');
  const pendingResets = keyResetRequests.filter((r) => r.status === 'pending');

  // Handle local image file upload for Product
  const handleProductImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      showToast('ছবির সাইজ ২ মেগাবাইট বা তার কম হতে হবে!', 'error');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      setProductForm((prev) => ({ ...prev, customImage: base64 }));
      showToast('পণ্য ছবি সফলভাবে লোড হয়েছে!', 'success');
    };
    reader.readAsDataURL(file);
  };

  // Handle local image file upload for Banner & Circle Avatar
  const handleBannerImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      showToast('ছবির সাইজ ২ মেগাবাইট বা তার কম হতে হবে!', 'error');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      setBannerForm((prev) => ({ ...prev, customImage: base64, characterImg: base64 }));
      showToast('ব্যানার/গোল ছবি সফলভাবে আপলোড হয়েছে!', 'success');
    };
    reader.readAsDataURL(file);
  };

  const handleOpenAddProduct = () => {
    setEditingProduct(null);
    setProductForm({
      name: '',
      category: 'NON ROOT',
      tag: 'NEW UPDATE',
      price: 30,
      price1Day: 30,
      price7Days: 120,
      price30Days: 350,
      originalPrice: 60,
      imageUrl: '',
      customImage: '',
      status: 'active',
      description: '১০০% সেইফ এক্সটার্নাল ড্রিপ প্যানেল, নো রিকয়েল, হাই হেডশট রেট।',
      fileUrl: 'https://mediafire.com/file/download.apk',
      setupVideoUrl: 'https://youtube.com/watch?v=tutorial',
      setupInstructions: '১. পুরনো ফাইল আনইন্সটল করুন।\n২. নতুন APK ইন্সটল করে ওপেন করুন।\n৩. আপনার ক্রয়কৃত কি দিন।',
      features: 'Auto Headshot, Zero Recoil, ESP Line, Safe 100%',
      stockKeys1DayInput: 'VIP-1D-101\nVIP-1D-102',
      stockKeys7DaysInput: 'VIP-7D-201\nVIP-7D-202',
      stockKeys30DaysInput: 'VIP-30D-301\nVIP-30D-302'
    });
    setIsAddingProduct(true);
  };

  const handleOpenEditProduct = (prod: Product) => {
    setEditingProduct(prod);
    setProductForm({
      name: prod.name,
      category: prod.category,
      tag: prod.tag,
      price: prod.price1Day || prod.price,
      price1Day: prod.price1Day || prod.price,
      price7Days: prod.price7Days || Math.round(prod.price * 3.5),
      price30Days: prod.price30Days || Math.round(prod.price * 10),
      originalPrice: prod.originalPrice || prod.price * 2,
      imageUrl: prod.imageUrl || '',
      customImage: prod.customImage || '',
      status: prod.status,
      description: prod.description,
      fileUrl: prod.fileUrl,
      setupVideoUrl: prod.setupVideoUrl,
      setupInstructions: prod.setupInstructions,
      features: prod.features.join(', '),
      stockKeys1DayInput: (prod.stockKeys1Day || []).join('\n'),
      stockKeys7DaysInput: (prod.stockKeys7Days || []).join('\n'),
      stockKeys30DaysInput: (prod.stockKeys30Days || []).join('\n')
    });
    setIsAddingProduct(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const featList = productForm.features
      .split(',')
      .map((f) => f.trim())
      .filter(Boolean);
    const keys1D = productForm.stockKeys1DayInput
      .split('\n')
      .map((k) => k.trim())
      .filter(Boolean);
    const keys7D = productForm.stockKeys7DaysInput
      .split('\n')
      .map((k) => k.trim())
      .filter(Boolean);
    const keys30D = productForm.stockKeys30DaysInput
      .split('\n')
      .map((k) => k.trim())
      .filter(Boolean);

    const price1D = Number(productForm.price1Day) || Number(productForm.price) || 30;
    const price7D = Number(productForm.price7Days) || Math.round(price1D * 3.5);
    const price30D = Number(productForm.price30Days) || Math.round(price1D * 10);

    if (editingProduct) {
      updateProduct({
        ...editingProduct,
        name: productForm.name,
        category: productForm.category,
        tag: productForm.tag,
        price: price1D,
        price1Day: price1D,
        price7Days: price7D,
        price30Days: price30D,
        originalPrice: Number(productForm.originalPrice),
        imageUrl: productForm.imageUrl || editingProduct.imageUrl,
        customImage: productForm.customImage,
        status: productForm.status,
        description: productForm.description,
        fileUrl: productForm.fileUrl,
        setupVideoUrl: productForm.setupVideoUrl,
        setupInstructions: productForm.setupInstructions,
        features: featList,
        stockKeys1Day: keys1D,
        stockKeys7Days: keys7D,
        stockKeys30Days: keys30D,
        stockKeys: [...keys1D, ...keys7D, ...keys30D],
        updatedAt: new Date().toISOString().split('T')[0]
      });
    } else {
      addProduct({
        name: productForm.name,
        category: productForm.category,
        tag: productForm.tag,
        price: price1D,
        price1Day: price1D,
        price7Days: price7D,
        price30Days: price30D,
        originalPrice: Number(productForm.originalPrice),
        imageUrl:
          productForm.imageUrl ||
          'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=400&q=80',
        customImage: productForm.customImage,
        status: productForm.status,
        description: productForm.description,
        fileUrl: productForm.fileUrl,
        setupVideoUrl: productForm.setupVideoUrl,
        setupInstructions: productForm.setupInstructions,
        features: featList,
        stockKeys1Day: keys1D,
        stockKeys7Days: keys7D,
        stockKeys30Days: keys30D,
        stockKeys: [...keys1D, ...keys7D, ...keys30D]
      });
    }
    setIsAddingProduct(false);
  };

  const handleAddStockKeys = (e: React.FormEvent) => {
    e.preventDefault();
    if (!keyModalProduct) return;
    const keys = newKeysText
      .split('\n')
      .map((k) => k.trim())
      .filter(Boolean);
    if (keys.length > 0) {
      addStockKeysToProduct(keyModalProduct.id, keys, stockKeyDuration);
      setKeyModalProduct(null);
      setNewKeysText('');
      showToast(
        `${
          stockKeyDuration === '1_day' ? '১ দিন' : stockKeyDuration === '7_days' ? '৭ দিন' : '৩০ দিন'
        } প্যাকেজের জন্য ${keys.length} টি নতুন কী যুক্ত হয়েছে!`,
        'success'
      );
    }
  };

  const handleSaveBanner = (e: React.FormEvent) => {
    e.preventDefault();
    updateBanner(bannerForm);
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateStoreSettings(tempSettings);
  };

  const filteredDeposits = fundRequests.filter((f) => {
    if (depositFilter === 'all') return true;
    return f.status === depositFilter;
  });

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 pb-20">
      {/* Top Admin Bar */}
      <div className="bg-slate-950 border-b border-slate-800 sticky top-0 z-30 shadow-md">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setCurrentView('store')}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors flex items-center gap-1.5 text-xs font-bold"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>ওয়েবসাইটে ফিরে যান (Back to Store)</span>
            </button>

            <div className="hidden sm:flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-bold text-slate-400">অ্যাডমিন মোড সক্রিয়</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <span className="text-[10px] text-slate-400 block font-medium">লগইনকৃত অ্যাডমিন:</span>
              <span className="text-xs font-black text-amber-400">{currentUser.name}</span>
            </div>
            <div className="w-8 h-8 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center font-black text-xs shadow-sm">
              ADM
            </div>
            <button
              onClick={adminLogout}
              className="px-2.5 py-1.5 rounded-xl bg-red-950/80 border border-red-500/40 text-red-300 hover:bg-red-900 text-xs font-bold flex items-center gap-1 transition-all"
              title="Logout and Lock Admin"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden xs:inline">লগআউট ও লক</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Admin Content Container */}
      <div className="max-w-6xl mx-auto px-3 sm:px-4 pt-5">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none border-b border-slate-800">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 shrink-0 transition-all ${
              activeTab === 'overview'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>ওভারভিউ (Overview)</span>
          </button>

          <button
            onClick={() => setActiveTab('products')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 shrink-0 transition-all ${
              activeTab === 'products'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>পণ্য ও দাম প্যাকেজ ({products.length})</span>
          </button>

          {/* Banner & Circle Image Control Tab */}
          <button
            onClick={() => setActiveTab('banner')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 shrink-0 transition-all ${
              activeTab === 'banner'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <ImageIcon className="w-4 h-4 text-emerald-400" />
            <span>ব্যানার ও গোল ইমেজ কন্ট্রোল</span>
          </button>

          <button
            onClick={() => setActiveTab('deposits')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 shrink-0 transition-all relative ${
              activeTab === 'deposits'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <Wallet className="w-4 h-4" />
            <span>ডিপোজিট রিকোয়েস্ট</span>
            {pendingDeposits.length > 0 && (
              <span className="px-1.5 py-0.2 rounded-full bg-red-500 text-white text-[10px] font-black">
                {pendingDeposits.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 shrink-0 transition-all ${
              activeTab === 'orders'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>বিক্রিত অর্ডার ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('users')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 shrink-0 transition-all ${
              activeTab === 'users'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>গ্রাহক ব্যালেন্স কন্ট্রোল</span>
          </button>

          <button
            onClick={() => setActiveTab('resets')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 shrink-0 transition-all relative ${
              activeTab === 'resets'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <RefreshCw className="w-4 h-4" />
            <span>HWID কী রিসেট</span>
            {pendingResets.length > 0 && (
              <span className="px-1.5 py-0.2 rounded-full bg-amber-500 text-slate-950 text-[10px] font-black">
                {pendingResets.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 shrink-0 transition-all ${
              activeTab === 'settings'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>সাইট ও পেমেন্ট সেটিংস</span>
          </button>
        </div>

        {/* ================= TAB 1: OVERVIEW ================= */}
        {activeTab === 'overview' && (
          <div className="pt-5 space-y-6">
            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 shadow-md">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  মোট বিক্রয় (Revenue)
                </span>
                <div className="text-2xl font-black text-emerald-400 mt-1">
                  {totalRevenue} ৳
                </div>
                <span className="text-[10px] text-slate-500 mt-0.5 block">সর্বমোট অর্ডার থেকে আয়</span>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 shadow-md">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  পেন্ডিং ডিপোজিট
                </span>
                <div className="text-2xl font-black text-amber-400 mt-1">
                  {pendingDeposits.length} টি
                </div>
                <button
                  onClick={() => setActiveTab('deposits')}
                  className="text-[11px] text-amber-300 hover:underline mt-0.5 block"
                >
                  এখনই অনুমোদন করুন →
                </button>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 shadow-md">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  মোট অর্ডার ডেলিভারি
                </span>
                <div className="text-2xl font-black text-cyan-400 mt-1">
                  {orders.length} টি
                </div>
                <span className="text-[10px] text-slate-500 mt-0.5 block">১০০% সফল ডেলিভারি</span>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 shadow-md">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  সক্রিয় প্যানেল সংখ্যা
                </span>
                <div className="text-2xl font-black text-purple-400 mt-1">
                  {products.length} টি
                </div>
                <span className="text-[10px] text-slate-500 mt-0.5 block">স্টোরে প্রদর্শিত হচ্ছে</span>
              </div>
            </div>

            {/* Quick Shortcuts */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                onClick={handleOpenAddProduct}
                className="p-4 rounded-2xl bg-gradient-to-r from-emerald-900/50 to-teal-900/50 border border-emerald-500/30 text-left hover:border-emerald-500/60 transition-colors"
              >
                <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center mb-2">
                  <Plus className="w-5 h-5" />
                </div>
                <h5 className="font-bold text-white text-sm">নতুন প্যানেল যোগ করুন</h5>
                <p className="text-xs text-slate-400 mt-0.5">ছবি আপলোড, ১ দিন/৭ দিন/৩০ দিন দাম ও কী যুক্ত করুন</p>
              </button>

              <button
                onClick={() => setActiveTab('banner')}
                className="p-4 rounded-2xl bg-gradient-to-r from-cyan-900/50 to-blue-900/50 border border-cyan-500/30 text-left hover:border-cyan-500/60 transition-colors"
              >
                <div className="w-9 h-9 rounded-xl bg-cyan-600 text-white flex items-center justify-center mb-2">
                  <ImageIcon className="w-5 h-5" />
                </div>
                <h5 className="font-bold text-white text-sm">ব্যানার ও গোল ইমেজ কন্ট্রোল</h5>
                <p className="text-xs text-slate-400 mt-0.5">হেডলাইন, বৃত্তাকার ছবি এবং APK লিঙ্ক পরিবর্তন করুন</p>
              </button>

              <button
                onClick={() => setActiveTab('deposits')}
                className="p-4 rounded-2xl bg-gradient-to-r from-amber-900/50 to-orange-900/50 border border-amber-500/30 text-left hover:border-amber-500/60 transition-colors"
              >
                <div className="w-9 h-9 rounded-xl bg-amber-600 text-white flex items-center justify-center mb-2">
                  <Wallet className="w-5 h-5" />
                </div>
                <h5 className="font-bold text-white text-sm">ডিপোজিট অনুমোদন ({pendingDeposits.length})</h5>
                <p className="text-xs text-slate-400 mt-0.5">বিকাশ ও নগদ ট্রানজেকশন যাচাই করে টাকা যোগ করুন</p>
              </button>
            </div>
          </div>
        )}

        {/* ================= TAB 2: PRODUCTS MANAGER ================= */}
        {activeTab === 'products' && (
          <div className="pt-5 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-lg font-black text-white">পণ্য, দাম প্যাকেজ ও ছবি ম্যানেজমেন্ট</h3>
                <p className="text-xs text-slate-400">
                  প্রতিটি প্যানেলের ১ দিন, ৭ দিন, ৩০ দিনের আলাদা দাম, ইমেজ আপলোড ও লাইসেন্স কী স্টক কন্ট্রোল করুন
                </p>
              </div>
              <button
                onClick={handleOpenAddProduct}
                className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-bold flex items-center gap-1.5 shadow-md active:scale-95 transition-all self-start sm:self-auto"
              >
                <Plus className="w-4 h-4" />
                <span>+ নতুন প্যানেল যোগ করুন</span>
              </button>
            </div>

            {/* Products Table / Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {products.map((p) => {
                const p1 = p.price1Day || p.price;
                const p7 = p.price7Days || Math.round(p.price * 3.5);
                const p30 = p.price30Days || Math.round(p.price * 10);

                const k1 = p.stockKeys1Day?.length ?? 0;
                const k7 = p.stockKeys7Days?.length ?? 0;
                const k30 = p.stockKeys30Days?.length ?? 0;

                return (
                  <div
                    key={p.id}
                    className="bg-slate-950 rounded-2xl border border-slate-800 p-4 flex flex-col justify-between space-y-3 relative overflow-hidden"
                  >
                    <div>
                      {/* Product Thumbnail / Custom Image */}
                      <div className="w-full h-32 rounded-xl overflow-hidden bg-slate-900 border border-slate-800 relative mb-2.5">
                        {p.customImage || p.imageUrl ? (
                          <img
                            src={p.customImage || p.imageUrl}
                            alt={p.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-950/60 to-slate-950 text-purple-400 text-xs font-mono">
                            <span>🎮 {p.name} GUI</span>
                          </div>
                        )}
                        <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-emerald-600/90 text-white font-mono text-[10px] font-bold">
                          {p.category}
                        </span>
                        <span className="absolute top-2 right-2 px-2 py-0.5 rounded-md bg-amber-500/90 text-slate-950 font-black text-[10px]">
                          {p.tag}
                        </span>
                      </div>

                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h4 className="text-sm font-black text-white">{p.name}</h4>
                          <span className="text-[11px] text-slate-400 line-clamp-1">{p.description}</span>
                        </div>
                      </div>

                      {/* 1 দিন, 7 দিন, 30 দিন Pricing Breakdown */}
                      <div className="mt-2.5 grid grid-cols-3 gap-1 p-2 bg-slate-900/90 rounded-xl border border-slate-800 text-center">
                        <div>
                          <span className="block text-[10px] text-slate-400">১ দিন</span>
                          <span className="block text-xs font-black text-emerald-400">{p1}৳</span>
                        </div>
                        <div className="border-x border-slate-800">
                          <span className="block text-[10px] text-slate-400">৭ দিন</span>
                          <span className="block text-xs font-black text-emerald-400">{p7}৳</span>
                        </div>
                        <div>
                          <span className="block text-[10px] text-slate-400">৩০ দিন</span>
                          <span className="block text-xs font-black text-emerald-400">{p30}৳</span>
                        </div>
                      </div>

                      {/* 1 দিন, 7 দিন, 30 দিন Stock Keys Breakdown */}
                      <div className="mt-2 p-2 bg-slate-900/50 rounded-xl border border-slate-800/80 flex items-center justify-between text-[11px]">
                        <span className="text-slate-400 flex items-center gap-1 font-semibold">
                          <KeyRound className="w-3.5 h-3.5 text-amber-400" />
                          কী স্টক:
                        </span>
                        <div className="flex items-center gap-1.5 font-mono font-bold text-[10px]">
                          <span className="px-1.5 py-0.5 rounded bg-slate-800 text-amber-300">1D: {k1}</span>
                          <span className="px-1.5 py-0.5 rounded bg-slate-800 text-amber-300">7D: {k7}</span>
                          <span className="px-1.5 py-0.5 rounded bg-slate-800 text-amber-300">30D: {k30}</span>
                        </div>
                      </div>

                      {/* Status Toggle */}
                      <div className="mt-2 flex items-center justify-between text-xs">
                        <span className="text-slate-500">স্ট্যাটাস:</span>
                        <button
                          onClick={() => toggleProductStatus(p.id)}
                          className={`px-2 py-0.5 rounded-md font-bold text-[10px] transition-colors ${
                            p.status === 'active'
                              ? 'bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30'
                              : 'bg-red-500/20 text-red-400 hover:bg-red-500/30'
                          }`}
                        >
                          {p.status === 'active' ? 'ACTIVE (সক্রিয়)' : 'MAINTENANCE (মেইনটেন্যান্স)'}
                        </button>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="grid grid-cols-3 gap-1.5 pt-2 border-t border-slate-800 text-xs">
                      <button
                        onClick={() => {
                          setKeyModalProduct(p);
                          setStockKeyDuration('1_day');
                          setNewKeysText('');
                        }}
                        className="py-1.5 px-2 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 font-bold flex items-center justify-center gap-1 text-[11px]"
                        title="Add Stock Keys per package"
                      >
                        <KeyRound className="w-3 h-3" />
                        <span>+কী যোগ</span>
                      </button>

                      <button
                        onClick={() => handleOpenEditProduct(p)}
                        className="py-1.5 px-2 rounded-lg bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 font-bold flex items-center justify-center gap-1 text-[11px]"
                      >
                        <Edit2 className="w-3 h-3" />
                        <span>এডিট</span>
                      </button>

                      <button
                        onClick={() => {
                          if (confirm(`আপনি কি "${p.name}" ডিলিট করতে চান?`)) {
                            deleteProduct(p.id);
                          }
                        }}
                        className="py-1.5 px-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-300 font-bold flex items-center justify-center gap-1 text-[11px]"
                      >
                        <Trash2 className="w-3 h-3" />
                        <span>ডিলিট</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ================= TAB 3: BANNER & CIRCLE IMAGE CONTROL ================= */}
        {activeTab === 'banner' && (
          <div className="pt-5 space-y-6">
            <div>
              <h3 className="text-lg font-black text-white flex items-center gap-2">
                <span>🖼️ হোমপেজ ব্যানার ও গোল ইমেজ কন্ট্রোল</span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-400 font-bold px-2 py-0.5 rounded-full">
                  LIVE CONTROL
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                স্ক্রিনশটে লাল বৃত্তে চিহ্নিত হিরো ব্যানার এবং বৃত্তাকার (Circle) ইমেজ, লেখা ও লিঙ্ক পরিবর্তন করুন
              </p>
            </div>

            {/* Live Interactive Preview Box */}
            <div className="bg-slate-950 p-4 sm:p-5 rounded-2xl border border-slate-800">
              <span className="text-xs font-bold text-slate-400 block mb-2 uppercase tracking-wider">
                লাইভ প্রিভিউ (ওয়েবসাইটে যেমন দেখাবে):
              </span>

              {/* Exact Banner Container Replicated */}
              <div className="relative w-full rounded-2xl overflow-hidden border border-emerald-500/40 bg-slate-950 shadow-xl p-4 sm:p-6 flex items-center justify-between">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/90 via-slate-900/95 to-slate-950 z-0" />

                {/* Left Side: Gamer Avatar with Circle / Rounded control */}
                <div className="relative shrink-0 flex items-center justify-center z-10">
                  <div
                    className={`relative w-24 h-24 sm:w-28 sm:h-28 overflow-hidden border-2 shadow-xl bg-slate-900 group transition-all duration-300 ${
                      bannerForm.avatarShape === 'rounded' ? 'rounded-2xl' : 'rounded-full'
                    } ${
                      bannerForm.glowColor === 'cyan'
                        ? 'border-cyan-400 shadow-cyan-500/40'
                        : bannerForm.glowColor === 'amber'
                        ? 'border-amber-400 shadow-amber-500/40'
                        : bannerForm.glowColor === 'purple'
                        ? 'border-purple-400 shadow-purple-500/40'
                        : 'border-emerald-500/80 shadow-emerald-500/40'
                    }`}
                  >
                    {bannerForm.customImage || bannerForm.characterImg ? (
                      <img
                        src={bannerForm.customImage || bannerForm.characterImg}
                        alt="Banner Avatar"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-slate-900 flex flex-col items-center justify-center">
                        <span className="text-4xl">🎭</span>
                      </div>
                    )}

                    {/* Glowing ring overlay */}
                    <div
                      className={`absolute inset-0 opacity-70 animate-pulse pointer-events-none ${
                        bannerForm.glowColor === 'cyan'
                          ? 'bg-cyan-400/20'
                          : bannerForm.glowColor === 'amber'
                          ? 'bg-amber-400/20'
                          : bannerForm.glowColor === 'purple'
                          ? 'bg-purple-400/20'
                          : 'bg-emerald-400/20'
                      }`}
                    />
                  </div>

                  {/* Green APK Badge */}
                  <div className="absolute -top-1.5 -right-2 bg-gradient-to-r from-lime-500 to-emerald-500 text-white rounded-xl px-2 py-1 flex items-center gap-1 shadow-lg border border-white/30 z-20">
                    <Download className="w-3.5 h-3.5 text-white" />
                    <span className="text-[11px] font-black tracking-wider">{bannerForm.badge || 'APK'}</span>
                  </div>
                </div>

                {/* Right Banner Content */}
                <div className="flex-1 pl-4 sm:pl-6 text-left z-10">
                  <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[11px] font-bold mb-1 border border-emerald-500/30">
                    <Sparkles className="w-3 h-3 text-emerald-400" />
                    <span>অফিসিয়াল গাইডলাইন</span>
                  </div>

                  <h2 className="text-white font-extrabold text-base sm:text-xl leading-tight font-['Hind_Siliguri']">
                    {bannerForm.title}
                  </h2>

                  <div className="text-amber-400 font-black text-lg sm:text-2xl tracking-wide uppercase mt-0.5 font-['Hind_Siliguri']">
                    {bannerForm.highlight}
                  </div>

                  <p className="text-cyan-300 font-bold text-xs sm:text-sm mt-0.5 font-['Hind_Siliguri']">
                    {bannerForm.subtitle}
                  </p>

                  <div className="mt-2.5 flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-gradient-to-r from-emerald-600 to-teal-500 text-white rounded-full text-xs font-bold shadow-md">
                      <PlayCircle className="w-3.5 h-3.5" />
                      <span>{bannerForm.actionText || 'সেটআপ ভিডিও ও APK ডাউনলোড'}</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Banner & Circle Image Edit Form */}
            <form onSubmit={handleSaveBanner} className="space-y-4 max-w-2xl bg-slate-950 p-5 rounded-2xl border border-slate-800">
              {/* Image Upload for Circle / Rounded Avatar */}
              <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-3">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
                  🎯 বৃত্তাকার (Circle) ছবি আপলোড ও নিয়ন্ত্রণ:
                </span>

                <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                  <label className="cursor-pointer px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all">
                    <Upload className="w-4 h-4" />
                    <span>ডিভাইস থেকে ছবি আপলোড করুন</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleBannerImageUpload}
                      className="hidden"
                    />
                  </label>

                  <span className="text-xs text-slate-500 text-center sm:text-left">অথবা অনলাইন লিঙ্ক দিন</span>
                </div>

                <div>
                  <input
                    type="url"
                    value={bannerForm.customImage || bannerForm.characterImg}
                    onChange={(e) => setBannerForm({ ...bannerForm, customImage: e.target.value, characterImg: e.target.value })}
                    placeholder="https://example.com/character-avatar.jpg"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs font-mono"
                  />
                </div>

                {/* Shape & Size & Motion Controls */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 mb-1">ইমেজের আকার (Shape):</label>
                    <select
                      value={bannerForm.avatarShape || 'circle'}
                      onChange={(e) => setBannerForm({ ...bannerForm, avatarShape: e.target.value as any })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs font-bold"
                    >
                      <option value="circle">গোল বৃত্তাকার (Circular Ring)</option>
                      <option value="rounded">রাউন্ডেড কর্নার (Rounded Box)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 mb-1">ইমেজ সাইজ (Size - ছোট/কমপ্যাক্ট):</label>
                    <select
                      value={bannerForm.avatarSize || 'small'}
                      onChange={(e) => setBannerForm({ ...bannerForm, avatarSize: e.target.value as any })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs font-bold"
                    >
                      <option value="small">ছোট / কমপ্যাক্ট (64px - রিকমেন্ডেড)</option>
                      <option value="medium">মাঝারি (76px)</option>
                      <option value="normal">বড় সাইজ (96px)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 mb-1">মোশন এনিমেশন (Motion Style):</label>
                    <select
                      value={bannerForm.avatarMotion || 'gentle'}
                      onChange={(e) => setBannerForm({ ...bannerForm, avatarMotion: e.target.value as any })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs font-bold"
                    >
                      <option value="gentle">স্মুথ ও স্লো মোশন (Gentle & Sleek - রিকমেন্ডেড)</option>
                      <option value="pulse">পালসিং গ্লো (Pulse Glow)</option>
                      <option value="static">স্থির / কোনো মোশন নেই (Static)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 mb-1">গ্লোয়িং রিং কালার (Glow Color):</label>
                    <select
                      value={bannerForm.glowColor || 'cyan'}
                      onChange={(e) => setBannerForm({ ...bannerForm, glowColor: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs font-bold"
                    >
                      <option value="cyan">নিয়ন সায়ান (Neon Cyan)</option>
                      <option value="emerald">সবুজ (Emerald Green)</option>
                      <option value="amber">গোল্ডেন অ্যাম্বার (Golden Amber)</option>
                      <option value="purple">নিয়ন পার্পল (Neon Purple)</option>
                    </select>
                  </div>
                </div>

                {/* Badge text */}
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 mb-1">ছবির ওপরের ব্যাজ লেখা:</label>
                    <input
                      type="text"
                      value={bannerForm.badge}
                      onChange={(e) => setBannerForm({ ...bannerForm, badge: e.target.value })}
                      placeholder="APK"
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs font-black"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 mb-1">বাটন টেক্সট:</label>
                    <input
                      type="text"
                      value={bannerForm.actionText}
                      onChange={(e) => setBannerForm({ ...bannerForm, actionText: e.target.value })}
                      placeholder="সেটআপ ভিডিও ও APK ডাউনলোড"
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs font-bold"
                    />
                  </div>
                </div>
              </div>

              {/* Text Fields */}
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">ব্যানার হেডিং (Title):</label>
                  <input
                    type="text"
                    required
                    value={bannerForm.title}
                    onChange={(e) => setBannerForm({ ...bannerForm, title: e.target.value })}
                    placeholder="প্যানেল কিনেছেন?"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-bold font-['Hind_Siliguri']"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-amber-400 mb-1">হাইলাইট টেক্সট (Highlight - গোল্ডেন কালার):</label>
                  <input
                    type="text"
                    required
                    value={bannerForm.highlight}
                    onChange={(e) => setBannerForm({ ...bannerForm, highlight: e.target.value })}
                    placeholder="APK এবং সেটআপ"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-amber-300 text-xs font-black font-['Hind_Siliguri']"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-cyan-400 mb-1">সাবটাইটেল (Subtitle - সায়ান কালার):</label>
                  <input
                    type="text"
                    required
                    value={bannerForm.subtitle}
                    onChange={(e) => setBannerForm({ ...bannerForm, subtitle: e.target.value })}
                    placeholder="ভিডিও কোথায় পাবেন?"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-cyan-300 text-xs font-bold font-['Hind_Siliguri']"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">APK ফাইল ডাউনলোড লিঙ্ক:</label>
                    <input
                      type="url"
                      value={bannerForm.apkLink || ''}
                      onChange={(e) => setBannerForm({ ...bannerForm, apkLink: e.target.value })}
                      placeholder="https://mediafire.com/file/download.apk"
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">ইউটিউব টিউটোরিয়াল লিঙ্ক:</label>
                    <input
                      type="url"
                      value={bannerForm.videoLink || ''}
                      onChange={(e) => setBannerForm({ ...bannerForm, videoLink: e.target.value })}
                      placeholder="https://youtube.com/watch?v=..."
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-mono"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md active:scale-98 transition-all mt-4"
              >
                <Save className="w-4 h-4" />
                <span>ব্যানার ও গোল ইমেজ সংরক্ষণ করুন (Save Banner & Circle Image)</span>
              </button>
            </form>
          </div>
        )}

        {/* ================= TAB 4: DEPOSITS ================= */}
        {activeTab === 'deposits' && (
          <div className="pt-5 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-lg font-black text-white">ডিপোজিট রিকোয়েস্ট ({fundRequests.length})</h3>
                <p className="text-xs text-slate-400">গ্রাহকদের বিকাশ, নগদ ও রকেট পেমেন্ট যাচাই করে ব্যালেন্স অনুমোদন দিন</p>
              </div>

              <div className="flex items-center gap-1.5 self-start sm:self-auto">
                <button
                  onClick={() => setDepositFilter('all')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold ${
                    depositFilter === 'all' ? 'bg-slate-700 text-white' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  সব ({fundRequests.length})
                </button>
                <button
                  onClick={() => setDepositFilter('pending')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold ${
                    depositFilter === 'pending' ? 'bg-amber-600 text-white' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  পেন্ডিং ({pendingDeposits.length})
                </button>
              </div>
            </div>

            <div className="space-y-2.5">
              {filteredDeposits.length === 0 ? (
                <div className="bg-slate-950 p-8 rounded-2xl text-center border border-slate-800 text-slate-500 text-xs font-medium">
                  কোনো ডিপোজিট রিকোয়েস্ট পাওয়া যায়নি।
                </div>
              ) : (
                filteredDeposits.map((dep) => (
                  <div
                    key={dep.id}
                    className="p-4 bg-slate-950 rounded-2xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-xs font-black ${
                            dep.method === 'bKash'
                              ? 'bg-pink-600 text-white'
                              : dep.method === 'Nagad'
                              ? 'bg-orange-600 text-white'
                              : 'bg-purple-600 text-white'
                          }`}
                        >
                          {dep.method}
                        </span>
                        <span className="font-extrabold text-emerald-400 text-base">
                          {dep.amount} ৳
                        </span>
                        <span className="text-[10px] text-slate-500">#{dep.id}</span>
                      </div>

                      <div className="text-xs text-slate-300">
                        প্রেরক নম্বর: <span className="font-bold text-white">{dep.senderNumber}</span> ({dep.userName})
                      </div>

                      <div className="text-xs text-amber-300 font-mono">
                        TrxID: <span className="font-black text-sm select-all">{dep.transactionId}</span>
                      </div>

                      <div className="text-[11px] text-slate-500">সময়: {dep.createdAt}</div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-center">
                      {dep.status === 'pending' ? (
                        <>
                          <button
                            onClick={() => approveFundRequest(dep.id)}
                            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md active:scale-95 transition-all"
                          >
                            <CheckCircle2 className="w-4 h-4" />
                            <span>অনুমোদন করুন (Approve)</span>
                          </button>
                          <button
                            onClick={() => rejectFundRequest(dep.id)}
                            className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-red-900/60 text-red-300 font-bold text-xs flex items-center gap-1.5 transition-all"
                          >
                            <XCircle className="w-4 h-4" />
                            <span>বাতিল (Reject)</span>
                          </button>
                        </>
                      ) : dep.status === 'approved' ? (
                        <span className="px-3 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-300 text-xs font-bold flex items-center gap-1">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>অনুমোদিত ও ব্যালেন্স যোগ হয়েছে</span>
                        </span>
                      ) : (
                        <span className="px-3 py-1.5 rounded-xl bg-red-500/20 text-red-300 text-xs font-bold flex items-center gap-1">
                          <XCircle className="w-4 h-4" />
                          <span>বাতিলকৃত</span>
                        </span>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* ================= TAB 5: ORDERS ================= */}
        {activeTab === 'orders' && (
          <div className="pt-5 space-y-4">
            <div>
              <h3 className="text-lg font-black text-white">গ্রাহক অর্ডার লগ ({orders.length})</h3>
              <p className="text-xs text-slate-400">সকল সফলভাবে সম্পন্ন হওয়া প্যানেল ক্রয়ের হিস্ট্রি, মেয়াদ ও ডেলিভারিকৃত কী</p>
            </div>

            <div className="space-y-2.5">
              {orders.map((ord) => (
                <div
                  key={ord.id}
                  className="p-4 bg-slate-950 rounded-2xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-white text-sm">{ord.productName}</span>
                      <span className="px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-bold text-[10px]">
                        মেয়াদ: {ord.durationLabel || ord.duration || '১ দিন'}
                      </span>
                      <span className="font-mono text-emerald-400 font-black">{ord.price} ৳</span>
                      <span className="text-[10px] text-slate-500">#{ord.id}</span>
                    </div>

                    <div className="text-slate-400">
                      গ্রাহক: <span className="font-bold text-slate-200">{ord.userName}</span> ({ord.userEmail})
                    </div>

                    <div className="p-2 bg-slate-900 rounded-lg border border-slate-800 text-slate-300 font-mono text-[11px] select-all">
                      <span className="text-amber-400 font-bold">ডেলিভারিকৃত কী: </span> {ord.key}
                    </div>

                    <div className="text-[10px] text-slate-500">তারিখ ও সময়: {ord.createdAt}</div>
                  </div>

                  <div className="self-end sm:self-center">
                    <span className="px-3 py-1.5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-xs flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Completed</span>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= TAB 6: USERS ================= */}
        {activeTab === 'users' && (
          <div className="pt-5 space-y-4">
            <div>
              <h3 className="text-lg font-black text-white">গ্রাহক ব্যালেন্স কন্ট্রোল</h3>
              <p className="text-xs text-slate-400">গ্রাহকের অ্যাকাউন্টে সরাসরি টাকা যোগ বা বিয়োগ করুন</p>
            </div>

            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 max-w-xl space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-bold text-lg">
                  {currentUser.name[0]}
                </div>
                <div>
                  <h4 className="font-black text-white text-base">{currentUser.name}</h4>
                  <p className="text-xs text-slate-400">{currentUser.email}</p>
                </div>
              </div>

              <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400">বর্তমান ওয়ালেট ব্যালেন্স:</span>
                <span className="text-2xl font-black text-emerald-400">{currentUser.balance} ৳</span>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">টাকার পরিমাণ (BDT ৳):</label>
                <input
                  type="number"
                  min="1"
                  value={balanceAmount}
                  onChange={(e) => setBalanceAmount(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm font-bold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  onClick={() => updateUserBalance(balanceAmount, true)}
                  className="py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition-all"
                >
                  <Plus className="w-4 h-4" />
                  <span>+{balanceAmount}৳ যোগ করুন</span>
                </button>

                <button
                  onClick={() => updateUserBalance(balanceAmount, false)}
                  className="py-2.5 rounded-xl bg-red-600/80 hover:bg-red-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition-all"
                >
                  <span>-{balanceAmount}৳ বিয়োগ করুন</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 7: RESETS ================= */}
        {activeTab === 'resets' && (
          <div className="pt-5 space-y-4">
            <div>
              <h3 className="text-lg font-black text-white">HWID কী রিসেট রিকোয়েস্ট ({keyResetRequests.length})</h3>
              <p className="text-xs text-slate-400">গ্রাহকদের ডিভাইস পরিবর্তন বা কী রিসেট আবেদন যাচাই ও অনুমোদন দিন</p>
            </div>

            <div className="space-y-2.5">
              {keyResetRequests.length === 0 ? (
                <div className="bg-slate-950 p-8 rounded-2xl text-center border border-slate-800 text-slate-500 text-xs">
                  কোনো পেন্ডিং কী রিসেট রিকোয়েস্ট নেই।
                </div>
              ) : (
                keyResetRequests.map((r) => (
                  <div
                    key={r.id}
                    className="p-4 bg-slate-950 rounded-2xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white text-sm">{r.productName}</span>
                        <span className="text-[10px] text-slate-500">#{r.id}</span>
                      </div>
                      <div className="font-mono text-amber-400 select-all">কী: {r.key}</div>
                      <div className="text-slate-400">
                        গ্রাহক: <span className="font-bold text-slate-200">{r.userName}</span>
                      </div>
                      <div className="text-slate-300">কারণ: {r.reason}</div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-center">
                      {r.status === 'pending' ? (
                        <>
                          <button
                            onClick={() => approveKeyResetRequest(r.id)}
                            className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs"
                          >
                            Reset & Approve
                          </button>
                          <button
                            onClick={() => rejectKeyResetRequest(r.id)}
                            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-red-900/60 text-red-300 font-bold text-xs"
                          >
                            Reject
                          </button>
                        </>
                      ) : (
                        <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-400 font-bold text-xs">
                          {r.status}
                        </span>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* ================= TAB 8: SETTINGS ================= */}
        {activeTab === 'settings' && (
          <div className="pt-5 space-y-4">
            <div>
              <h3 className="text-lg font-black text-white">স্টোর ও সিকিউরিটি সেটিংস</h3>
              <p className="text-xs text-slate-400">মারকুই নোটিশ, বিকাশ/নগদ অ্যাকাউন্ট নম্বর ও গোপন অ্যাডমিন পাসওয়ার্ড</p>
            </div>

            <form onSubmit={handleSaveSettings} className="space-y-4 max-w-2xl bg-slate-950 p-5 rounded-2xl border border-slate-800">
              {/* Store Name & Branding */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pb-3 border-b border-slate-800">
                <div>
                  <label className="block text-xs font-bold text-cyan-400 mb-1">
                    🏷️ স্টোরের নাম (Store Name / Branding):
                  </label>
                  <input
                    type="text"
                    value={tempSettings.storeName || 'Mr Rrr Panel'}
                    onChange={(e) => setTempSettings({ ...tempSettings, storeName: e.target.value })}
                    placeholder="Mr Rrr Panel"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-black tracking-wide focus:ring-2 focus:ring-cyan-500"
                  />
                  <span className="text-[10px] text-slate-500 mt-1 block">হেডার, ফুটার ও নোটিফিকেশনে এই নাম প্রদর্শিত হবে।</span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-sky-400 mb-1">
                    ✈️ টেলিগ্রাম চ্যানেল / গ্রুপ লিংক (Telegram Link):
                  </label>
                  <div className="flex gap-1.5">
                    <input
                      type="text"
                      value={tempSettings.telegramLink || ''}
                      onChange={(e) => {
                        let val = e.target.value.trim();
                        setTempSettings({ ...tempSettings, telegramLink: val });
                      }}
                      placeholder="https://t.me/mrrrr_panel"
                      className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-mono focus:ring-2 focus:ring-sky-500"
                    />
                    {tempSettings.telegramLink && (
                      <a
                        href={tempSettings.telegramLink.startsWith('http') ? tempSettings.telegramLink : `https://t.me/${tempSettings.telegramLink.replace('@', '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-2 rounded-xl bg-sky-600/30 hover:bg-sky-600 border border-sky-400/40 text-sky-200 text-xs font-bold flex items-center justify-center shrink-0 transition-colors"
                        title="টেলিগ্রাম লিংক টেস্ট করুন"
                      >
                        টেস্ট 🚀
                      </a>
                    )}
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <button
                      type="button"
                      onClick={() => {
                        const cur = tempSettings.telegramLink || '';
                        if (cur && !cur.startsWith('http')) {
                          setTempSettings({
                            ...tempSettings,
                            telegramLink: `https://t.me/${cur.replace('@', '')}`
                          });
                        }
                      }}
                      className="text-[10px] text-sky-400 hover:underline cursor-pointer"
                    >
                      t.me ফরম্যাটে কনভার্ট করুন
                    </button>
                    <span className="text-[10px] text-slate-500">&bull; ভিজিটররা সরাসরি যুক্ত হতে পারবে</span>
                  </div>
                </div>
              </div>

              {/* Marquee Notice */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  📢 স্ক্রোলিং নোটিশ (Marquee Announcement):
                </label>
                <textarea
                  rows={2}
                  value={tempSettings.marqueeNotice}
                  onChange={(e) => setTempSettings({ ...tempSettings, marqueeNotice: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-medium focus:ring-2 focus:ring-emerald-500 font-['Hind_Siliguri']"
                />
              </div>

              {/* Payment Numbers & Channels */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div>
                  <label className="block text-xs font-bold text-pink-400 mb-1">বিকাশ (bKash) নম্বর:</label>
                  <input
                    type="text"
                    value={tempSettings.paymentDetails.bKash.number}
                    onChange={(e) =>
                      setTempSettings({
                        ...tempSettings,
                        paymentDetails: {
                          ...tempSettings.paymentDetails,
                          bKash: { ...tempSettings.paymentDetails.bKash, number: e.target.value }
                        }
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-mono font-bold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-orange-400 mb-1">নগদ (Nagad) নম্বর:</label>
                  <input
                    type="text"
                    value={tempSettings.paymentDetails.nagad.number}
                    onChange={(e) =>
                      setTempSettings({
                        ...tempSettings,
                        paymentDetails: {
                          ...tempSettings.paymentDetails,
                          nagad: { ...tempSettings.paymentDetails.nagad, number: e.target.value }
                        }
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-mono font-bold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-purple-400 mb-1">রকেট (Rocket) নম্বর:</label>
                  <input
                    type="text"
                    value={tempSettings.paymentDetails.rocket.number}
                    onChange={(e) =>
                      setTempSettings({
                        ...tempSettings,
                        paymentDetails: {
                          ...tempSettings.paymentDetails,
                          rocket: { ...tempSettings.paymentDetails.rocket, number: e.target.value }
                        }
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-mono font-bold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-emerald-400 mb-1">WhatsApp হেল্পলাইন নম্বর:</label>
                  <input
                    type="text"
                    value={tempSettings.whatsAppNumber}
                    onChange={(e) => setTempSettings({ ...tempSettings, whatsAppNumber: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-mono font-bold"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-red-400 mb-1">ইউটিউব টিউটোরিয়াল চ্যানেল / ভিডিও লিংক:</label>
                  <input
                    type="text"
                    value={tempSettings.youtubeLink || ''}
                    onChange={(e) => setTempSettings({ ...tempSettings, youtubeLink: e.target.value })}
                    placeholder="https://youtube.com/@mrrrr_panel"
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-mono"
                  />
                </div>
              </div>

              {/* Site Theme Selection */}
              <div className="pt-3 border-t border-slate-800">
                <span className="text-xs font-black text-cyan-400 uppercase tracking-wider block mb-2">
                  🎨 সাইটের কালার থিম সাজেস্ট (Color Theme Suggestion):
                </span>
                <div>
                  <label className="block text-[11px] font-bold text-slate-300 mb-1">ডিফল্ট কালার থিম নির্বাচন করুন:</label>
                  <select
                    value={tempSettings.siteTheme || 'cyber-cyan'}
                    onChange={(e) => setTempSettings({ ...tempSettings, siteTheme: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-bold"
                  >
                    <option value="cyber-cyan">⚡ সাইবার সায়ান ও নিয়ন ব্লু (সেরা পরামর্শ / Recommended)</option>
                    <option value="toxic-emerald">🟢 টক্সিক এমারেল্ড ভাইপার (Toxic Emerald)</option>
                    <option value="royal-gold">👑 রয়্যাল গোল্ড ও অবসিডিয়ান (Royal Gold)</option>
                    <option value="neon-purple">🟣 নিয়ন পার্পল ও ম্যাজেন্টা (Neon Purple)</option>
                  </select>
                </div>
              </div>

              {/* Admin Security Settings */}
              <div className="pt-3 border-t border-slate-800">
                <span className="text-xs font-black text-amber-400 uppercase tracking-wider block mb-2">
                  🔒 গোপন অ্যাডমিন লগইন সিকিউরিটি (/admin Access):
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 mb-1">অ্যাডমিন ইমেইল:</label>
                    <input
                      type="email"
                      value={tempSettings.adminEmail || 'azihasan237@gmail.com'}
                      onChange={(e) => setTempSettings({ ...tempSettings, adminEmail: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-semibold"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 mb-1">অ্যাডমিন পাসওয়ার্ড:</label>
                    <input
                      type="text"
                      value={tempSettings.adminPassword || '77889900@gazi'}
                      onChange={(e) => setTempSettings({ ...tempSettings, adminPassword: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-amber-400 font-mono text-xs font-bold"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all mt-4"
              >
                <Save className="w-4 h-4" />
                <span>সেটিংস সেভ করুন (Save Store Settings)</span>
              </button>
            </form>
          </div>
        )}
      </div>

      {/* ================= MODAL: ADD / EDIT PRODUCT ================= */}
      {isAddingProduct && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-3 sm:p-4">
          <div onClick={() => setIsAddingProduct(false)} className="fixed inset-0 bg-black/80 backdrop-blur-xs" />

          <div className="relative bg-slate-950 text-white rounded-3xl max-w-xl w-full p-5 sm:p-6 shadow-2xl border border-slate-800 z-10 overflow-hidden max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="font-black text-white text-base">
                {editingProduct ? 'প্যানেল ও দাম প্যাকেজ এডিট করুন' : 'নতুন প্যানেল বা মড APK যোগ করুন'}
              </h3>
              <button
                onClick={() => setIsAddingProduct(false)}
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="mt-4 space-y-4 text-xs">
              {/* Product Image Upload Section */}
              <div className="p-3.5 bg-slate-900 rounded-2xl border border-slate-800 space-y-2.5">
                <label className="block font-bold text-emerald-400 uppercase text-[11px] tracking-wider">
                  📷 পণ্যের ছবি আপলোড (Product Image Upload):
                </label>

                {/* Preview Thumbnail if selected */}
                {productForm.customImage || productForm.imageUrl ? (
                  <div className="relative w-full h-36 rounded-xl overflow-hidden border border-emerald-500/50 bg-slate-950 group">
                    <img
                      src={productForm.customImage || productForm.imageUrl}
                      alt="Product preview"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => setProductForm({ ...productForm, customImage: '', imageUrl: '' })}
                      className="absolute top-2 right-2 px-2.5 py-1 rounded-lg bg-red-600/90 hover:bg-red-600 text-white text-[10px] font-bold shadow-md transition-all"
                    >
                      ছবি সরান ✕
                    </button>
                  </div>
                ) : null}

                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <label className="cursor-pointer px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all">
                    <Upload className="w-3.5 h-3.5" />
                    <span>ডিভাইস থেকে ছবি আপলোড করুন</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleProductImageUpload}
                      className="hidden"
                    />
                  </label>
                  <span className="text-[11px] text-slate-500 text-center sm:text-left">অথবা অনলাইন ইমেজ লিংক দিন:</span>
                </div>

                <input
                  type="url"
                  value={productForm.imageUrl}
                  onChange={(e) => setProductForm({ ...productForm, imageUrl: e.target.value })}
                  placeholder="https://images.unsplash.com/photo-example.jpg"
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs font-mono"
                />
              </div>

              {/* Product Basic Info */}
              <div>
                <label className="block font-bold text-slate-300 mb-1">পণ্যের নাম (Product Name):</label>
                <input
                  type="text"
                  required
                  value={productForm.name}
                  onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                  placeholder="যেমন: DRIP WIRE EXTERNAL"
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-bold"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-300 mb-1">ক্যাটাগরি:</label>
                  <select
                    value={productForm.category}
                    onChange={(e) => setProductForm({ ...productForm, category: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-bold"
                  >
                    <option value="NON ROOT">NON ROOT</option>
                    <option value="ROOT">ROOT</option>
                    <option value="PC">PC / EMULATOR</option>
                    <option value="MORE">MORE / IOS</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-300 mb-1">ট্যাগ (Tag Badge):</label>
                  <input
                    type="text"
                    required
                    value={productForm.tag}
                    onChange={(e) => setProductForm({ ...productForm, tag: e.target.value })}
                    placeholder="যেমন: RE EXTERNAL"
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-bold"
                  />
                </div>
              </div>

              {/* 1 দিন, 7 দিন, 30 দিন দাম (PRICING SYSTEM) */}
              <div className="p-3.5 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-2">
                <span className="block font-black text-amber-400 uppercase text-[11px] tracking-wider">
                  💰 ১ দিন, ৭ দিন, ৩০ দিনের আলাদা বিক্রয় মূল্য (Pricing):
                </span>

                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="block font-bold text-slate-300 mb-1">১ দিনের মূল্য (৳):</label>
                    <input
                      type="number"
                      required
                      min="1"
                      value={productForm.price1Day}
                      onChange={(e) => setProductForm({ ...productForm, price1Day: Number(e.target.value) })}
                      placeholder="30"
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-emerald-400 text-xs font-black"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-300 mb-1">৭ দিনের মূল্য (৳):</label>
                    <input
                      type="number"
                      required
                      min="1"
                      value={productForm.price7Days}
                      onChange={(e) => setProductForm({ ...productForm, price7Days: Number(e.target.value) })}
                      placeholder="120"
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-emerald-400 text-xs font-black"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-300 mb-1">৩০ দিনের মূল্য (৳):</label>
                    <input
                      type="number"
                      required
                      min="1"
                      value={productForm.price30Days}
                      onChange={(e) => setProductForm({ ...productForm, price30Days: Number(e.target.value) })}
                      placeholder="350"
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-emerald-400 text-xs font-black"
                    />
                  </div>
                </div>
              </div>

              {/* 1 দিন, 7 দিন, 30 দিন লাইসেন্স কী স্টক (LICENSE KEYS POOL) */}
              <div className="p-3.5 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-2.5">
                <span className="block font-black text-amber-400 uppercase text-[11px] tracking-wider">
                  🔑 লাইসেন্স কী স্টক (প্রতি লাইনে ১টি কী দিন):
                </span>

                <div className="space-y-2">
                  <div>
                    <label className="block font-bold text-slate-300 mb-0.5">১ দিনের লাইসেন্স কীসমূহ (1 Day Keys):</label>
                    <textarea
                      rows={2}
                      value={productForm.stockKeys1DayInput}
                      onChange={(e) => setProductForm({ ...productForm, stockKeys1DayInput: e.target.value })}
                      placeholder="KEY-1D-001&#10;KEY-1D-002"
                      className="w-full px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-700 text-amber-300 font-mono text-xs"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-300 mb-0.5">৭ দিনের লাইসেন্স কীসমূহ (7 Days Keys):</label>
                    <textarea
                      rows={2}
                      value={productForm.stockKeys7DaysInput}
                      onChange={(e) => setProductForm({ ...productForm, stockKeys7DaysInput: e.target.value })}
                      placeholder="KEY-7D-001&#10;KEY-7D-002"
                      className="w-full px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-700 text-amber-300 font-mono text-xs"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-300 mb-0.5">৩০ দিনের লাইসেন্স কীসমূহ (30 Days Keys):</label>
                    <textarea
                      rows={2}
                      value={productForm.stockKeys30DaysInput}
                      onChange={(e) => setProductForm({ ...productForm, stockKeys30DaysInput: e.target.value })}
                      placeholder="KEY-30D-001&#10;KEY-30D-002"
                      className="w-full px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-700 text-amber-300 font-mono text-xs"
                    />
                  </div>
                </div>
              </div>

              {/* Links & Setup Instructions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-300 mb-1">APK ফাইল ডাউনলোড লিংক:</label>
                  <input
                    type="url"
                    required
                    value={productForm.fileUrl}
                    onChange={(e) => setProductForm({ ...productForm, fileUrl: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-mono"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-300 mb-1">টিউটোরিয়াল ভিডিও লিংক (YouTube):</label>
                  <input
                    type="url"
                    value={productForm.setupVideoUrl}
                    onChange={(e) => setProductForm({ ...productForm, setupVideoUrl: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">ফিচারসমূহ (কমা দিয়ে লিখুন):</label>
                <input
                  type="text"
                  value={productForm.features}
                  onChange={(e) => setProductForm({ ...productForm, features: e.target.value })}
                  placeholder="Auto Headshot, Zero Recoil, ESP Line, Anti-Ban"
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">সেটআপ নির্দেশিকা:</label>
                <textarea
                  rows={2}
                  value={productForm.setupInstructions}
                  onChange={(e) => setProductForm({ ...productForm, setupInstructions: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-['Hind_Siliguri']"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs sm:text-sm tracking-wide shadow-md active:scale-98 transition-all"
              >
                {editingProduct ? 'আপডেট সম্পন্ন করুন' : 'প্যানেল যোগ করুন (Add Product)'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL: ADD STOCK KEYS PER DURATION ================= */}
      {keyModalProduct && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-3 sm:p-4">
          <div onClick={() => setKeyModalProduct(null)} className="fixed inset-0 bg-black/80 backdrop-blur-xs" />

          <div className="relative bg-slate-950 text-white rounded-3xl max-w-md w-full p-5 sm:p-6 shadow-2xl border border-slate-800 z-10 overflow-hidden">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <h3 className="font-black text-white text-sm">স্টক কী যোগ করুন</h3>
                <span className="text-xs text-amber-400 font-bold">{keyModalProduct.name}</span>
              </div>
              <button
                onClick={() => setKeyModalProduct(null)}
                className="w-8 h-8 rounded-full bg-slate-800 text-slate-300 flex items-center justify-center"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddStockKeys} className="mt-4 space-y-3.5 text-xs">
              {/* Duration selector for keys */}
              <div>
                <label className="block font-bold text-slate-300 mb-1.5">কোন মেয়াদের কী যুক্ত করবেন?</label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setStockKeyDuration('1_day')}
                    className={`py-2 px-1 rounded-xl text-center border font-bold transition-all ${
                      stockKeyDuration === '1_day'
                        ? 'bg-emerald-600 text-white border-emerald-500 shadow-sm'
                        : 'bg-slate-900 text-slate-400 border-slate-800'
                    }`}
                  >
                    ১ দিন ({keyModalProduct.stockKeys1Day?.length || 0})
                  </button>

                  <button
                    type="button"
                    onClick={() => setStockKeyDuration('7_days')}
                    className={`py-2 px-1 rounded-xl text-center border font-bold transition-all ${
                      stockKeyDuration === '7_days'
                        ? 'bg-emerald-600 text-white border-emerald-500 shadow-sm'
                        : 'bg-slate-900 text-slate-400 border-slate-800'
                    }`}
                  >
                    ৭ দিন ({keyModalProduct.stockKeys7Days?.length || 0})
                  </button>

                  <button
                    type="button"
                    onClick={() => setStockKeyDuration('30_days')}
                    className={`py-2 px-1 rounded-xl text-center border font-bold transition-all ${
                      stockKeyDuration === '30_days'
                        ? 'bg-emerald-600 text-white border-emerald-500 shadow-sm'
                        : 'bg-slate-900 text-slate-400 border-slate-800'
                    }`}
                  >
                    ৩০ দিন ({keyModalProduct.stockKeys30Days?.length || 0})
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  নতুন কীসমূহ পেস্ট করুন (প্রতি লাইনে একটি কী):
                </label>
                <textarea
                  rows={5}
                  required
                  value={newKeysText}
                  onChange={(e) => setNewKeysText(e.target.value)}
                  placeholder="DRIP-1D-001&#10;DRIP-1D-002&#10;DRIP-1D-003"
                  className="w-full p-3 rounded-xl bg-slate-900 border border-slate-700 text-amber-300 font-mono text-xs focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all active:scale-98"
              >
                স্টকে যুক্ত করুন (Add to Stock)
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
