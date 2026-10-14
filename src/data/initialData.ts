import { Product, User, Order, AddFundRequest, StoreSettings, Mission, Banner } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'DRIP WIRE EXTERNAL',
    category: 'NON ROOT',
    tag: 'RE EXTERNAL',
    price: 30,
    price1Day: 30,
    price7Days: 120,
    price30Days: 350,
    originalPrice: 60,
    imageUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=400&q=80',
    accentColor: '#a855f7',
    status: 'active',
    description: '100% Safe external drip panel with zero recoil, high headshot rate, no ban risk, instant key delivery.',
    fileUrl: 'https://mediafire.com/file/drip-wire-v3.apk',
    setupVideoUrl: 'https://youtube.com/watch?v=example1',
    setupInstructions: '১. প্রথমে পুরনো APK আনইন্সটল করুন।\n২. নিচে দেওয়া বাটন থেকে নতুন APK ইন্সটল করুন।\n৩. অ্যাপ ওপেন করে আপনার Key পেস্ট করে Login বাটনে ক্লিক করুন।\n৪. পারমিশন allow দিন এবং Floating Icon অন করে গেমে প্রবেশ করুন।',
    stockKeys: [
      'DRIP-WIRE-8834-A782',
      'DRIP-WIRE-9921-X102',
      'DRIP-WIRE-4412-M909',
      'DRIP-WIRE-1188-B554'
    ],
    stockKeys1Day: ['DRIP-1D-8834-A782', 'DRIP-1D-9921-X102'],
    stockKeys7Days: ['DRIP-7D-4412-M909', 'DRIP-7D-1188-B554'],
    stockKeys30Days: ['DRIP-30D-9900-V112', 'DRIP-30D-2211-Z889'],
    features: ['Auto Headshot 95%', 'Zero Recoil ESP', 'Magic Bullet', 'Anti-Blacklist 100%'],
    salesCount: 1420,
    updatedAt: '2026-10-14'
  },
  {
    id: 'prod-2',
    name: 'DRIP CLIENT NON ROOT',
    category: 'NON ROOT',
    tag: 'ENT-NON ROOT',
    price: 35,
    price1Day: 35,
    price7Days: 140,
    price30Days: 400,
    originalPrice: 70,
    imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=400&q=80',
    accentColor: '#ec4899',
    status: 'maintenance',
    description: 'Special non-root drip client panel. Currently updating for the newest game patch.',
    fileUrl: 'https://mediafire.com/file/drip-client-update.apk',
    setupVideoUrl: 'https://youtube.com/watch?v=example2',
    setupInstructions: '১. মেইনটেন্যান্স শেষ হওয়া পর্যন্ত অপেক্ষা করুন।\n২. নতুন ফাইল রিলিজ হলে অটোমেটিক আপডেট পাবেন।\n৩. বিস্তারিত জানতে টেলিগ্রাম গ্রুপে যুক্ত থাকুন।',
    stockKeys: [
      'DRIP-CLT-7721-P001',
      'DRIP-CLT-7722-P002'
    ],
    stockKeys1Day: ['DRIP-CLT-1D-001'],
    stockKeys7Days: ['DRIP-CLT-7D-002'],
    stockKeys30Days: ['DRIP-CLT-30D-003'],
    features: ['Non-Root Support', 'Fast Revive', 'ESP Line & Box', 'Safe Bypass'],
    salesCount: 890,
    updatedAt: '2026-10-14'
  },
  {
    id: 'prod-3',
    name: 'BALA MOD NON ROOT',
    category: 'NON ROOT',
    tag: 'DD NON ROOT',
    price: 25,
    price1Day: 25,
    price7Days: 110,
    price30Days: 300,
    originalPrice: 50,
    imageUrl: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=400&q=80',
    accentColor: '#f97316',
    status: 'active',
    description: 'Top-rated Bala mod menu pro with ESP skeleton, headshot 100%, fast revive and safe memory injection.',
    fileUrl: 'https://mediafire.com/file/bala-mod-v5.apk',
    setupVideoUrl: 'https://youtube.com/watch?v=example3',
    setupInstructions: '১. বালা মড অ্যাপ ডাউনলোড ও ইন্সটল করুন।\n২. ডিসপ্লে ওভার আদার অ্যাপস পারমিশন দিন।\n৩. আপনার ক্রয়কৃত লাইসেন্স কি প্রবেশ করান।\n৪. গেম ওপেন করে নিজের পছন্দের ফিচার অন করুন।',
    stockKeys: [
      'BALA-MOD-5541-Q911',
      'BALA-MOD-6632-W822',
      'BALA-MOD-7711-E733'
    ],
    stockKeys1Day: ['BALA-1D-5541-Q911', 'BALA-1D-6632-W822'],
    stockKeys7Days: ['BALA-7D-7711-E733'],
    stockKeys30Days: ['BALA-30D-8822-M110'],
    features: ['Headshot 100%', 'Headshot 50%', 'ESP Skeleton', 'Fast Revive'],
    salesCount: 2310,
    updatedAt: '2026-10-13'
  },
  {
    id: 'prod-4',
    name: 'VIP INJECTOR PRO',
    category: 'ROOT',
    tag: 'ROOT VIP',
    price: 50,
    price1Day: 50,
    price7Days: 180,
    price30Days: 500,
    originalPrice: 90,
    imageUrl: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=400&q=80',
    accentColor: '#10b981',
    status: 'active',
    description: 'Root level deep injection panel for maximum accuracy and bullet tracking without detection.',
    fileUrl: 'https://mediafire.com/file/vip-injector-root.apk',
    setupVideoUrl: 'https://youtube.com/watch?v=example4',
    setupInstructions: '১. Magisk / KernelSU পারমিশন Grant করুন।\n২. ইনজেক্টর মডিউল রান করে কি অ্যাক্টিভ করুন।\n৩. সরাসরি মেইন আইডিতে খেলার জন্য অপটিমাইজড।',
    stockKeys: [
      'ROOT-VIP-9932-K812',
      'ROOT-VIP-1102-L291'
    ],
    stockKeys1Day: ['ROOT-1D-9932-K812'],
    stockKeys7Days: ['ROOT-7D-1102-L291'],
    stockKeys30Days: ['ROOT-30D-4491-X332'],
    features: ['Root Memory Bypass', '100% Antiban Main ID', 'Bullet Track 360', 'No Crash'],
    salesCount: 640,
    updatedAt: '2026-10-12'
  },
  {
    id: 'prod-5',
    name: 'REGEDIT VIP PC & EMULATOR',
    category: 'PC',
    tag: 'PC REGEDIT',
    price: 90,
    price1Day: 90,
    price7Days: 320,
    price30Days: 850,
    originalPrice: 150,
    imageUrl: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=400&q=80',
    accentColor: '#3b82f6',
    status: 'active',
    description: 'Bluestacks & MSI App Player high DPI smooth registry tweaks for ultimate headshot drag.',
    fileUrl: 'https://mediafire.com/file/regedit-pc-vip.zip',
    setupVideoUrl: 'https://youtube.com/watch?v=example5',
    setupInstructions: '১. জিপ ফাইল এক্সট্রাক্ট করুন।\n২. Run as Administrator দিয়ে ফাইলটি রান করুন।\n৩. আপনার প্রদত্ত কি সাবমিট করে Apply বাটনে চাপ দিন।',
    stockKeys: [
      'REG-PC-3391-Z882',
      'REG-PC-7741-K119'
    ],
    stockKeys1Day: ['REG-1D-3391-Z882'],
    stockKeys7Days: ['REG-7D-7741-K119'],
    stockKeys30Days: ['REG-30D-9911-L404'],
    features: ['BlueStacks 5 Optimization', 'Drag Headshot 100%', 'Zero FPS Drop', 'Lifetime Registry'],
    salesCount: 420,
    updatedAt: '2026-10-10'
  }
];

export const INITIAL_USER: User = {
  id: 'usr-shanto-01',
  name: 'Shanto',
  email: 'nasimmahmud906@gmail.com',
  phone: '01798-234567',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
  balance: 120, // 120 BDT
  role: 'admin', // Start as admin or with quick toggle so owner can test both
  spinTokens: 2,
  joinedAt: '2026-08-15'
};

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ORD-782910',
    userId: 'usr-shanto-01',
    userName: 'Shanto',
    userEmail: 'nasimmahmud906@gmail.com',
    productId: 'prod-1',
    productName: 'DRIP WIRE EXTERNAL',
    productCategory: 'NON ROOT',
    duration: '1_day',
    durationLabel: '১ দিন',
    price: 30,
    key: 'DRIP-WIRE-PREMIUM-7891-XK92',
    fileUrl: 'https://mediafire.com/file/drip-wire-v3.apk',
    setupVideoUrl: 'https://youtube.com/watch?v=example1',
    status: 'completed',
    createdAt: '2026-10-13 18:20'
  },
  {
    id: 'ORD-654128',
    userId: 'usr-shanto-01',
    userName: 'Shanto',
    userEmail: 'nasimmahmud906@gmail.com',
    productId: 'prod-3',
    productName: 'BALA MOD NON ROOT',
    productCategory: 'NON ROOT',
    duration: '7_days',
    durationLabel: '৭ দিন',
    price: 110,
    key: 'BALA-MOD-LIFETIME-5512-ZZ99',
    fileUrl: 'https://mediafire.com/file/bala-mod-v5.apk',
    setupVideoUrl: 'https://youtube.com/watch?v=example3',
    status: 'completed',
    createdAt: '2026-10-12 14:15'
  }
];

export const INITIAL_FUND_REQUESTS: AddFundRequest[] = [
  {
    id: 'DEP-9812',
    userId: 'usr-shanto-01',
    userName: 'Shanto',
    userEmail: 'nasimmahmud906@gmail.com',
    method: 'bKash',
    senderNumber: '01798234567',
    transactionId: 'BK9A7712XK',
    amount: 150,
    status: 'approved',
    createdAt: '2026-10-13 17:40'
  },
  {
    id: 'DEP-9813',
    userId: 'usr-sakib-02',
    userName: 'Sakib Ahmed',
    userEmail: 'sakib.gaming@gmail.com',
    method: 'Nagad',
    senderNumber: '01822334455',
    transactionId: 'NG882100PY',
    amount: 200,
    status: 'pending',
    createdAt: '2026-10-14 06:15'
  }
];

export const INITIAL_STORE_SETTINGS: StoreSettings = {
  storeName: 'Mr Rrr Panel',
  currency: 'BDT',
  marqueeNotice: '🔥 Mr Rrr Panel এ স্বাগতম! এখানে ২৪ ঘন্টায় Panel/Key নিতে পারবেন, ০০.১ সেকেন্ডে ইনস্ট্যান্ট ডেলিভারি! যেকোনো সমস্যায় টেলিগ্রাম ও হোয়াটসঅ্যাপে যোগাযোগ করুন। 🔥',
  marqueeActive: true,
  whatsAppNumber: '+8801798234567',
  telegramLink: 'https://t.me/mrrrr_panel',
  youtubeLink: 'https://youtube.com/@mrrrr_panel',
  adminEmail: 'azihasan237@gmail.com',
  adminPassword: '77889900@gazi',
  siteTheme: 'cyber-cyan',
  paymentDetails: {
    bKash: {
      number: '01798-234567',
      type: 'Personal',
      instructions: 'বিকাশ অ্যাপ থেকে "Send Money" (সেন্ড মানি) করুন। ক্যাশ ইন বা পেমেন্ট প্রযোজ্য নয়। সেন্ড মানি সফল হলে ফিরতি মেসেজের TrxID কপি করে নিচে বসিয়ে দিন।'
    },
    nagad: {
      number: '01812-987654',
      type: 'Personal',
      instructions: 'নগদ অ্যাপ থেকে "Send Money" (সেন্ড মানি) করুন। সফল হওয়ার পর ৮/১০ ডিজিটের TrxID টি নিচে সঠিকভাবে লিখুন।'
    },
    rocket: {
      number: '01912-345678-9',
      type: 'Personal',
      instructions: 'রকেট একাউন্ট থেকে সেন্ড মানি করুন এবং ট্রানজেকশন আইডি প্রদান করুন।'
    }
  }
};

export const INITIAL_BANNERS: Banner[] = [
  {
    id: 'ban-1',
    title: 'প্যানেল কিনেছেন?',
    highlight: 'APK এবং সেটআপ',
    subtitle: 'ভিডিও কোথায় পাবেন?',
    badge: 'APK',
    badgeBg: '#06b6d4',
    imageBg: 'from-cyan-950 via-slate-900 to-indigo-950',
    characterImg: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=400&q=80',
    avatarShape: 'circle',
    avatarSize: 'small',
    avatarMotion: 'gentle',
    glowColor: 'cyan',
    actionText: 'সেটআপ ভিডিও ও APK ডাউনলোড',
    actionLink: '#setup-guide',
    apkLink: 'https://mediafire.com/file/drip-wire-v3.apk',
    videoLink: 'https://youtube.com/watch?v=example1'
  },
  {
    id: 'ban-2',
    title: '১০০% সেইফ ও অ্যান্টি-ব্যান',
    highlight: 'নতুন আপডেট প্যানেল',
    subtitle: '০০.১ সেকেন্ডে ইনস্ট্যান্ট কি ডেলিভারি!',
    badge: 'NEW',
    badgeBg: '#f59e0b',
    imageBg: 'from-indigo-950 via-slate-900 to-purple-950',
    characterImg: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=400&q=80',
    avatarShape: 'circle',
    avatarSize: 'small',
    avatarMotion: 'gentle',
    glowColor: 'amber',
    actionText: 'এখনই কিনুন',
    actionLink: '#products',
    apkLink: 'https://mediafire.com/file/drip-client-update.apk',
    videoLink: 'https://youtube.com/watch?v=example2'
  }
];

export const INITIAL_MISSIONS: Mission[] = [
  {
    id: 'mis-1',
    title: 'Daily Check-in',
    titleBn: 'দৈনিক চেক-ইন করুন',
    rewardType: 'balance',
    rewardAmount: 5,
    isCompleted: true,
    isClaimed: false
  },
  {
    id: 'mis-2',
    title: 'Join Official Telegram',
    titleBn: 'অফিসিয়াল টেলিগ্রাম চ্যানেলে জয়েন করুন',
    rewardType: 'spin',
    rewardAmount: 1,
    isCompleted: false,
    isClaimed: false,
    actionUrl: 'https://t.me/panelsell_store'
  },
  {
    id: 'mis-3',
    title: 'Deposit First 100৳',
    titleBn: 'প্রথম ১০০ টাকা ব্যালেন্স লোড করুন',
    rewardType: 'balance',
    rewardAmount: 15,
    isCompleted: true,
    isClaimed: true
  }
];
