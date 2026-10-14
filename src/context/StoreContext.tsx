import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Product,
  User,
  Order,
  AddFundRequest,
  KeyResetRequest,
  StoreSettings,
  Mission,
  Banner,
  PaymentMethod,
  KeyDuration
} from '../types';
import {
  INITIAL_PRODUCTS,
  INITIAL_USER,
  INITIAL_ORDERS,
  INITIAL_FUND_REQUESTS,
  INITIAL_STORE_SETTINGS,
  INITIAL_BANNERS,
  INITIAL_MISSIONS
} from '../data/initialData';

interface Toast {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}

interface StoreContextType {
  // Navigation / Views
  currentView: 'store' | 'admin';
  setCurrentView: (view: 'store' | 'admin') => void;
  userDrawerOpen: boolean;
  setUserDrawerOpen: (open: boolean) => void;

  // Data
  products: Product[];
  currentUser: User;
  orders: Order[];
  fundRequests: AddFundRequest[];
  keyResetRequests: KeyResetRequest[];
  storeSettings: StoreSettings;
  banners: Banner[];
  missions: Mission[];
  currency: string;
  setCurrency: (c: string) => void;

  // Modals
  activeFileSetupProduct: Product | null;
  setActiveFileSetupProduct: (p: Product | null) => void;
  activeBuyProduct: Product | null;
  setActiveBuyProduct: (p: Product | null) => void;
  addFundModalOpen: boolean;
  setAddFundModalOpen: (open: boolean) => void;
  spinWinModalOpen: boolean;
  setSpinWinModalOpen: (open: boolean) => void;
  missionsModalOpen: boolean;
  setMissionsModalOpen: (open: boolean) => void;
  myCodesModalOpen: boolean;
  setMyCodesModalOpen: (open: boolean) => void;
  keyResetModalOpen: boolean;
  setKeyResetModalOpen: (open: boolean) => void;
  myAccountModalOpen: boolean;
  setMyAccountModalOpen: (open: boolean) => void;
  myOrdersModalOpen: boolean;
  setMyOrdersModalOpen: (open: boolean) => void;

  selectedDuration: KeyDuration;
  setSelectedDuration: (d: KeyDuration) => void;

  // Actions
  buyProduct: (productId: string, duration?: KeyDuration) => { success: boolean; message: string; order?: Order };
  submitFundRequest: (method: PaymentMethod, senderNumber: string, transactionId: string, amount: number) => boolean;
  submitKeyResetRequest: (key: string, productName: string, reason: string) => boolean;
  claimMissionReward: (missionId: string) => void;
  useSpinToken: (rewardBDT: number) => void;
  updateUserBalance: (amount: number, isAddition: boolean) => void;

  // Admin Actions
  addProduct: (product: Omit<Product, 'id' | 'salesCount' | 'updatedAt'>) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  approveFundRequest: (id: string) => void;
  rejectFundRequest: (id: string, reason?: string) => void;
  approveKeyResetRequest: (id: string) => void;
  rejectKeyResetRequest: (id: string) => void;
  updateStoreSettings: (settings: StoreSettings) => void;
  updateBanner: (banner: Banner) => void;
  addStockKeysToProduct: (productId: string, keys: string[], duration?: KeyDuration) => void;
  toggleProductStatus: (productId: string) => void;
  toggleUserRole: () => void;

  // Admin Authentication & Routing
  isAdminAuthenticated: boolean;
  adminLogin: (email: string, pass: string) => boolean;
  unlockAdminWithPassword: (pass: string) => boolean;
  adminLogout: () => void;
  navigateToAdmin: () => void;
  navigateToStore: () => void;
  secretAdminPromptOpen: boolean;
  setSecretAdminPromptOpen: (open: boolean) => void;

  // Site Theme & Customization
  siteTheme: 'cyber-cyan' | 'toxic-emerald' | 'royal-gold' | 'neon-purple';
  setSiteTheme: (theme: 'cyber-cyan' | 'toxic-emerald' | 'royal-gold' | 'neon-purple') => void;

  // Toasts
  toasts: Toast[];
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  removeToast: (id: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load or fallback to initial
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('ps_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  const [currentUser, setCurrentUser] = useState<User>(() => {
    const saved = localStorage.getItem('ps_user');
    return saved ? JSON.parse(saved) : INITIAL_USER;
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('ps_orders');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  const [fundRequests, setFundRequests] = useState<AddFundRequest[]>(() => {
    const saved = localStorage.getItem('ps_funds');
    return saved ? JSON.parse(saved) : INITIAL_FUND_REQUESTS;
  });

  const [keyResetRequests, setKeyResetRequests] = useState<KeyResetRequest[]>(() => {
    const saved = localStorage.getItem('ps_resets');
    return saved ? JSON.parse(saved) : [];
  });

  const [storeSettings, setStoreSettings] = useState<StoreSettings>(() => {
    const saved = localStorage.getItem('ps_settings');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.storeName === 'PANELSELL' || !parsed.storeName) {
          parsed.storeName = 'Mr Rrr Panel';
        }
        if (parsed.adminPassword === 'admin123' || !parsed.adminPassword) {
          parsed.adminPassword = '77889900@gazi';
        }
        if (!parsed.telegramLink || parsed.telegramLink.includes('panelsell')) {
          parsed.telegramLink = 'https://t.me/mrrrr_panel';
        }
        if (!parsed.siteTheme) {
          parsed.siteTheme = 'cyber-cyan';
        }
        return parsed;
      } catch {
        return INITIAL_STORE_SETTINGS;
      }
    }
    return INITIAL_STORE_SETTINGS;
  });

  const [siteTheme, setSiteThemeState] = useState<'cyber-cyan' | 'toxic-emerald' | 'royal-gold' | 'neon-purple'>(() => {
    return (localStorage.getItem('ps_theme') as any) || storeSettings.siteTheme || 'cyber-cyan';
  });

  const setSiteTheme = (theme: 'cyber-cyan' | 'toxic-emerald' | 'royal-gold' | 'neon-purple') => {
    setSiteThemeState(theme);
    localStorage.setItem('ps_theme', theme);
    setStoreSettings((prev) => {
      const updated = { ...prev, siteTheme: theme };
      localStorage.setItem('ps_settings', JSON.stringify(updated));
      return updated;
    });
    showToast(`কালার থিম পরিবর্তিত হয়েছে!`, 'info');
  };

  const [secretAdminPromptOpen, setSecretAdminPromptOpen] = useState(false);

  const [banners, setBanners] = useState<Banner[]>(() => {
    const saved = localStorage.getItem('ps_banners');
    return saved ? JSON.parse(saved) : INITIAL_BANNERS;
  });

  const [selectedDuration, setSelectedDuration] = useState<KeyDuration>('1_day');

  useEffect(() => {
    localStorage.setItem('ps_banners', JSON.stringify(banners));
  }, [banners]);

  const [missions, setMissions] = useState<Mission[]>(() => {
    const saved = localStorage.getItem('ps_missions');
    return saved ? JSON.parse(saved) : INITIAL_MISSIONS;
  });

  const [currency, setCurrency] = useState<string>('BDT');
  const [currentView, setCurrentView] = useState<'store' | 'admin'>('store');
  const [userDrawerOpen, setUserDrawerOpen] = useState(false);

  // Admin Authentication (Secret /admin access)
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('ps_admin_auth') === 'true';
  });

  // Watch URL hash or path for secret /admin route
  useEffect(() => {
    const checkAdminRoute = () => {
      const hash = window.location.hash.toLowerCase();
      const path = window.location.pathname.toLowerCase();
      if (hash === '#admin' || hash === '#/admin' || path.endsWith('/admin')) {
        setCurrentView('admin');
      }
    };
    checkAdminRoute();
    window.addEventListener('hashchange', checkAdminRoute);
    window.addEventListener('popstate', checkAdminRoute);
    return () => {
      window.removeEventListener('hashchange', checkAdminRoute);
      window.removeEventListener('popstate', checkAdminRoute);
    };
  }, []);

  const unlockAdminWithPassword = (pass: string): boolean => {
    const validPass = storeSettings.adminPassword || '77889900@gazi';
    if (pass.trim() === validPass || pass.trim() === '77889900@gazi') {
      setIsAdminAuthenticated(true);
      localStorage.setItem('ps_admin_auth', 'true');
      setSecretAdminPromptOpen(false);
      setCurrentView('admin');
      window.location.hash = 'admin';
      showToast('গোপন অ্যাডমিন আনলক সফল হয়েছে!', 'success');
      return true;
    } else {
      showToast('ভুল পাসওয়ার্ড! সঠিক পাসওয়ার্ড দিন।', 'error');
      return false;
    }
  };

  const adminLogin = (email: string, pass: string): boolean => {
    const validEmail = (storeSettings.adminEmail || 'azihasan237@gmail.com').toLowerCase().trim();
    const validPass = storeSettings.adminPassword || '77889900@gazi';
    const inputEmail = email.toLowerCase().trim();

    if (
      (inputEmail === validEmail || inputEmail === 'azihasan237@gmail.com' || inputEmail === 'admin@panelsell.store') &&
      (pass.trim() === validPass || pass.trim() === '77889900@gazi')
    ) {
      setIsAdminAuthenticated(true);
      localStorage.setItem('ps_admin_auth', 'true');
      showToast('অ্যাডমিন লগইন সফল হয়েছে! স্বাগতম।', 'success');
      return true;
    } else {
      showToast('ভুল ইমেইল অথবা পাসওয়ার্ড!', 'error');
      return false;
    }
  };

  const adminLogout = () => {
    setIsAdminAuthenticated(false);
    localStorage.removeItem('ps_admin_auth');
    setCurrentView('store');
    window.location.hash = '';
    showToast('অ্যাডমিন সেশন সমাপ্ত হয়েছে।', 'info');
  };

  const navigateToAdmin = () => {
    setCurrentView('admin');
    window.location.hash = 'admin';
  };

  const navigateToStore = () => {
    setCurrentView('store');
    window.location.hash = '';
  };

  // Modals state
  const [activeFileSetupProduct, setActiveFileSetupProduct] = useState<Product | null>(null);
  const [activeBuyProduct, setActiveBuyProduct] = useState<Product | null>(null);
  const [addFundModalOpen, setAddFundModalOpen] = useState(false);
  const [spinWinModalOpen, setSpinWinModalOpen] = useState(false);
  const [missionsModalOpen, setMissionsModalOpen] = useState(false);
  const [myCodesModalOpen, setMyCodesModalOpen] = useState(false);
  const [keyResetModalOpen, setKeyResetModalOpen] = useState(false);
  const [myAccountModalOpen, setMyAccountModalOpen] = useState(false);
  const [myOrdersModalOpen, setMyOrdersModalOpen] = useState(false);

  // Toast notifications
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = Date.now().toString() + Math.random().toString().slice(2, 6);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Sync with LocalStorage
  useEffect(() => {
    localStorage.setItem('ps_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('ps_user', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('ps_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('ps_funds', JSON.stringify(fundRequests));
  }, [fundRequests]);

  useEffect(() => {
    localStorage.setItem('ps_resets', JSON.stringify(keyResetRequests));
  }, [keyResetRequests]);

  useEffect(() => {
    localStorage.setItem('ps_settings', JSON.stringify(storeSettings));
  }, [storeSettings]);

  useEffect(() => {
    localStorage.setItem('ps_missions', JSON.stringify(missions));
  }, [missions]);

  // Buy Product function with 1 day, 7 days, 30 days duration support
  const buyProduct = (productId: string, duration: KeyDuration = '1_day') => {
    const product = products.find((p) => p.id === productId);
    if (!product) {
      showToast('পণ্যটি খুঁজে পাওয়া যায়নি!', 'error');
      return { success: false, message: 'পণ্যটি পাওয়া যায়নি' };
    }

    if (product.status === 'maintenance') {
      showToast('এই প্যানেলটি বর্তমানে মেইনটেন্যান্সে রয়েছে!', 'error');
      return { success: false, message: 'প্যানেলটি মেইনটেন্যান্সে আছে' };
    }

    let planPrice = product.price1Day || product.price;
    let durationLabel = '১ দিন';

    if (duration === '7_days') {
      planPrice = product.price7Days || Math.round(product.price * 3.5);
      durationLabel = '৭ দিন';
    } else if (duration === '30_days') {
      planPrice = product.price30Days || Math.round(product.price * 10);
      durationLabel = '৩০ দিন';
    }

    if (currentUser.balance < planPrice) {
      showToast(`পর্যাপ্ত ব্যালেন্স নেই! প্রয়োজন ${planPrice}৳, আপনার আছে ${currentUser.balance}৳`, 'error');
      setAddFundModalOpen(true);
      return { success: false, message: 'ব্যালেন্স অপর্যাপ্ত' };
    }

    // Pick a stock key or auto-generate if pool is empty
    let assignedKey = '';
    const updated1D = [...(product.stockKeys1Day || [])];
    const updated7D = [...(product.stockKeys7Days || [])];
    const updated30D = [...(product.stockKeys30Days || [])];

    if (duration === '1_day' && updated1D.length > 0) {
      assignedKey = updated1D.shift()!;
    } else if (duration === '7_days' && updated7D.length > 0) {
      assignedKey = updated7D.shift()!;
    } else if (duration === '30_days' && updated30D.length > 0) {
      assignedKey = updated30D.shift()!;
    } else if (product.stockKeys && product.stockKeys.length > 0) {
      const fallbackKeys = [...product.stockKeys];
      assignedKey = fallbackKeys.shift()!;
    } else {
      const prefix = duration === '1_day' ? '1D' : duration === '7_days' ? '7D' : '30D';
      assignedKey = `${product.name.substring(0, 4).toUpperCase().replace(/\s+/g, '')}-${prefix}-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}`;
    }

    // Deduct user balance
    const newBalance = currentUser.balance - planPrice;
    setCurrentUser((prev) => ({
      ...prev,
      balance: newBalance
    }));

    // Update product stock and sales
    setProducts((prev) =>
      prev.map((p) =>
        p.id === productId
          ? {
              ...p,
              stockKeys1Day: updated1D,
              stockKeys7Days: updated7D,
              stockKeys30Days: updated30D,
              salesCount: p.salesCount + 1
            }
          : p
      )
    );

    // Create Order with duration
    const newOrder: Order = {
      id: `ORD-${Math.floor(100000 + Math.random() * 900000)}`,
      userId: currentUser.id,
      userName: currentUser.name,
      userEmail: currentUser.email,
      productId: product.id,
      productName: product.name,
      productCategory: product.category,
      duration,
      durationLabel,
      price: planPrice,
      key: assignedKey,
      fileUrl: product.fileUrl,
      setupVideoUrl: product.setupVideoUrl,
      status: 'completed',
      createdAt: new Date().toLocaleString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      })
    };

    setOrders((prev) => [newOrder, ...prev]);
    showToast(`অভিনন্দন! "${product.name}" (${durationLabel}) সফলভাবে কেনা হয়েছে। Key ডেলিভারি সম্পন্ন!`, 'success');

    return { success: true, message: 'সফলভাবে কেনা হয়েছে', order: newOrder };
  };

  // Submit Add Fund
  const submitFundRequest = (
    method: PaymentMethod,
    senderNumber: string,
    transactionId: string,
    amount: number
  ) => {
    const newReq: AddFundRequest = {
      id: `DEP-${Math.floor(1000 + Math.random() * 9000)}`,
      userId: currentUser.id,
      userName: currentUser.name,
      userEmail: currentUser.email,
      method,
      senderNumber,
      transactionId: transactionId.trim().toUpperCase(),
      amount,
      status: 'pending',
      createdAt: new Date().toLocaleString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      })
    };

    setFundRequests((prev) => [newReq, ...prev]);
    showToast('ডিপোজিট রিকোয়েস্ট সফলভাবে জমা হয়েছে! অ্যাডমিন দ্রুত ভেরিফাই করে ব্যালেন্স যোগ করবেন।', 'success');
    return true;
  };

  // Submit Key Reset
  const submitKeyResetRequest = (key: string, productName: string, reason: string) => {
    const newReset: KeyResetRequest = {
      id: `RST-${Math.floor(1000 + Math.random() * 9000)}`,
      userId: currentUser.id,
      userName: currentUser.name,
      userEmail: currentUser.email,
      key,
      productName,
      reason,
      status: 'pending',
      createdAt: new Date().toLocaleString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      })
    };
    setKeyResetRequests((prev) => [newReset, ...prev]);
    showToast('কী রিসেট রিকোয়েস্ট পাঠানো হয়েছে!', 'success');
    return true;
  };

  // Claim Mission
  const claimMissionReward = (missionId: string) => {
    const mission = missions.find((m) => m.id === missionId);
    if (!mission || mission.isClaimed) return;

    if (mission.rewardType === 'balance') {
      setCurrentUser((prev) => ({
        ...prev,
        balance: prev.balance + mission.rewardAmount
      }));
      showToast(`অভিনন্দন! আপনি ${mission.rewardAmount}৳ রিওয়ার্ড পেয়েছেন!`, 'success');
    } else {
      setCurrentUser((prev) => ({
        ...prev,
        spinTokens: prev.spinTokens + mission.rewardAmount
      }));
      showToast(`অভিনন্দন! আপনি ${mission.rewardAmount} টি ফ্রি স্পিন টোকেন পেয়েছেন!`, 'success');
    }

    setMissions((prev) =>
      prev.map((m) => (m.id === missionId ? { ...m, isClaimed: true } : m))
    );
  };

  // Spin & Win Token use
  const useSpinToken = (rewardBDT: number) => {
    if (currentUser.spinTokens <= 0) return;
    setCurrentUser((prev) => ({
      ...prev,
      spinTokens: prev.spinTokens - 1,
      balance: prev.balance + rewardBDT
    }));
    if (rewardBDT > 0) {
      showToast(`চমৎকার! আপনি স্পিন করে ${rewardBDT}৳ ক্যাশ ব্যাক পেয়েছেন!`, 'success');
    } else {
      showToast('পরের বার আবার চেষ্টা করুন!', 'info');
    }
  };

  // Balance adjust
  const updateUserBalance = (amount: number, isAddition: boolean) => {
    setCurrentUser((prev) => ({
      ...prev,
      balance: Math.max(0, isAddition ? prev.balance + amount : prev.balance - amount)
    }));
    showToast(`ব্যালেন্স আপডেট করা হয়েছে: ${isAddition ? '+' : '-'}${amount}৳`, 'info');
  };

  // Admin Actions
  const addProduct = (productData: Omit<Product, 'id' | 'salesCount' | 'updatedAt'>) => {
    const newProduct: Product = {
      ...productData,
      id: `prod-${Date.now()}`,
      salesCount: 0,
      updatedAt: new Date().toISOString().split('T')[0]
    };
    setProducts((prev) => [newProduct, ...prev]);
    showToast(`নতুন প্যানেল "${newProduct.name}" সফলভাবে যুক্ত হয়েছে!`, 'success');
  };

  const updateProduct = (updatedProduct: Product) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
    );
    showToast(`"${updatedProduct.name}" তথ্য আপডেট করা হয়েছে!`, 'success');
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    showToast('পণ্যটি সফলভাবে মুছে ফেলা হয়েছে!', 'info');
  };

  const approveFundRequest = (id: string) => {
    const req = fundRequests.find((r) => r.id === id);
    if (!req || req.status === 'approved') return;

    // Credit user
    if (req.userId === currentUser.id) {
      setCurrentUser((prev) => ({
        ...prev,
        balance: prev.balance + req.amount
      }));
    }

    setFundRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: 'approved' } : r))
    );
    showToast(`ডিপোজিট #${req.id} অনুমোদিত! গ্রাহকের ব্যালেন্সে ${req.amount}৳ যুক্ত হয়েছে।`, 'success');
  };

  const rejectFundRequest = (id: string, reason?: string) => {
    setFundRequests((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, status: 'rejected', adminNote: reason || 'ভুল TrxID বা অপ্রাপ্ত পেমেন্ট' } : r
      )
    );
    showToast(`ডিপোজিট #${id} বাতিল করা হয়েছে।`, 'error');
  };

  const approveKeyResetRequest = (id: string) => {
    setKeyResetRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: 'approved' } : r))
    );
    showToast('কী রিসেট সম্পন্ন ও অনুমোদিত!', 'success');
  };

  const rejectKeyResetRequest = (id: string) => {
    setKeyResetRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: 'rejected' } : r))
    );
    showToast('কী রিসেট বাতিল করা হয়েছে।', 'error');
  };

  const updateStoreSettings = (newSettings: StoreSettings) => {
    setStoreSettings(newSettings);
    showToast('স্টোর সেটিংস সফলভাবে সেভ হয়েছে!', 'success');
  };

  const updateBanner = (updatedBanner: Banner) => {
    setBanners((prev) => prev.map((b) => (b.id === updatedBanner.id ? updatedBanner : b)));
    showToast('ব্যানার সফলভাবে আপডেট ও সেভ হয়েছে!', 'success');
  };

  const addStockKeysToProduct = (productId: string, newKeys: string[], duration: KeyDuration = '1_day') => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === productId) {
          const cleanKeys = newKeys.filter((k) => k.trim().length > 0);
          if (duration === '7_days') {
            return {
              ...p,
              stockKeys7Days: [...(p.stockKeys7Days || []), ...cleanKeys]
            };
          } else if (duration === '30_days') {
            return {
              ...p,
              stockKeys30Days: [...(p.stockKeys30Days || []), ...cleanKeys]
            };
          } else {
            return {
              ...p,
              stockKeys1Day: [...(p.stockKeys1Day || []), ...cleanKeys],
              stockKeys: [...(p.stockKeys || []), ...cleanKeys]
            };
          }
        }
        return p;
      })
    );
    const durLabel = duration === '1_day' ? '১ দিন' : duration === '7_days' ? '৭ দিন' : '৩০ দিন';
    showToast(`${newKeys.length} টি কী (${durLabel}) সফলভাবে স্টকে যুক্ত হয়েছে!`, 'success');
  };

  const toggleProductStatus = (productId: string) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === productId) {
          const nextStatus = p.status === 'active' ? 'maintenance' : 'active';
          return { ...p, status: nextStatus };
        }
        return p;
      })
    );
  };

  const toggleUserRole = () => {
    setCurrentUser((prev) => ({
      ...prev,
      role: prev.role === 'admin' ? 'user' : 'admin'
    }));
    showToast(`রোল পরিবর্তন করা হয়েছে: ${currentUser.role === 'admin' ? 'সাধারণ ইউজার' : 'অ্যাডমিন'}`, 'info');
  };

  return (
    <StoreContext.Provider
      value={{
        currentView,
        setCurrentView,
        userDrawerOpen,
        setUserDrawerOpen,
        products,
        currentUser,
        orders,
        fundRequests,
        keyResetRequests,
        storeSettings,
        banners,
        missions,
        currency,
        setCurrency,
        selectedDuration,
        setSelectedDuration,
        activeFileSetupProduct,
        setActiveFileSetupProduct,
        activeBuyProduct,
        setActiveBuyProduct,
        addFundModalOpen,
        setAddFundModalOpen,
        spinWinModalOpen,
        setSpinWinModalOpen,
        missionsModalOpen,
        setMissionsModalOpen,
        myCodesModalOpen,
        setMyCodesModalOpen,
        keyResetModalOpen,
        setKeyResetModalOpen,
        myAccountModalOpen,
        setMyAccountModalOpen,
        myOrdersModalOpen,
        setMyOrdersModalOpen,
        buyProduct,
        submitFundRequest,
        submitKeyResetRequest,
        claimMissionReward,
        useSpinToken,
        updateUserBalance,
        addProduct,
        updateProduct,
        deleteProduct,
        approveFundRequest,
        rejectFundRequest,
        approveKeyResetRequest,
        rejectKeyResetRequest,
        updateStoreSettings,
        updateBanner,
        addStockKeysToProduct,
        toggleProductStatus,
        toggleUserRole,
        isAdminAuthenticated,
        adminLogin,
        unlockAdminWithPassword,
        adminLogout,
        navigateToAdmin,
        navigateToStore,
        secretAdminPromptOpen,
        setSecretAdminPromptOpen,
        siteTheme,
        setSiteTheme,
        toasts,
        showToast,
        removeToast
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
