export type ProductCategory = 'ALL' | 'NON ROOT' | 'ROOT' | 'PC' | 'MORE';

export type ProductStatus = 'active' | 'maintenance' | 'out_of_stock';

export type KeyDuration = '1_day' | '7_days' | '30_days';

export interface Product {
  id: string;
  name: string;
  category: 'NON ROOT' | 'ROOT' | 'PC' | 'MORE';
  tag: string; // e.g. "RE EXTERNAL", "ENT-NON ROOT", "DD NON ROOT"
  price: number; // in BDT (fallback / 1 day)
  originalPrice?: number;
  // 1 day, 7 days, 30 days pricing
  price1Day: number;
  price7Days: number;
  price30Days: number;
  // 1 day, 7 days, 30 days stock keys
  stockKeys1Day: string[];
  stockKeys7Days: string[];
  stockKeys30Days: string[];
  imageUrl: string;
  customImage?: string; // Uploaded image data URL / Base64
  accentColor?: string; // neon purple, cyan, orange, green
  status: ProductStatus;
  description: string;
  fileUrl: string;
  setupVideoUrl: string;
  setupInstructions: string;
  stockKeys: string[]; // pool of legacy keys
  features: string[];
  salesCount: number;
  updatedAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  balance: number; // in BDT
  role: 'user' | 'admin';
  spinTokens: number;
  joinedAt: string;
}

export interface Order {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  productId: string;
  productName: string;
  productCategory: string;
  duration: KeyDuration;
  durationLabel: string;
  price: number;
  key: string;
  fileUrl: string;
  setupVideoUrl: string;
  status: 'completed' | 'pending' | 'cancelled';
  createdAt: string;
}

export type PaymentMethod = 'bKash' | 'Nagad' | 'Rocket' | 'Upay';

export interface AddFundRequest {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  method: PaymentMethod;
  senderNumber: string;
  transactionId: string;
  amount: number;
  status: 'pending' | 'approved' | 'rejected';
  adminNote?: string;
  createdAt: string;
}

export interface KeyResetRequest {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  key: string;
  productName: string;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

export interface StoreSettings {
  storeName: string;
  currency: string;
  marqueeNotice: string;
  marqueeActive: boolean;
  whatsAppNumber: string;
  telegramLink: string;
  youtubeLink: string;
  adminEmail: string;
  adminPassword: string;
  paymentDetails: {
    bKash: {
      number: string;
      type: 'Personal' | 'Merchant';
      instructions: string;
    };
    nagad: {
      number: string;
      type: 'Personal' | 'Merchant';
      instructions: string;
    };
    rocket: {
      number: string;
      type: 'Personal' | 'Merchant';
      instructions: string;
    };
  };
  siteTheme?: 'cyber-cyan' | 'toxic-emerald' | 'royal-gold' | 'neon-purple';
}

export interface Mission {
  id: string;
  title: string;
  titleBn: string;
  rewardType: 'balance' | 'spin';
  rewardAmount: number;
  isCompleted: boolean;
  isClaimed: boolean;
  actionUrl?: string;
}

export interface Banner {
  id: string;
  title: string;
  highlight: string;
  subtitle: string;
  badge: string;
  badgeBg: string;
  imageBg: string;
  characterImg: string;
  customImage?: string; // Uploaded banner image base64
  avatarShape?: 'circle' | 'rounded'; // Circle control for circular image
  avatarSize?: 'small' | 'medium' | 'normal'; // Motion & Size control (small is compact & sleek)
  avatarMotion?: 'gentle' | 'pulse' | 'static'; // Motion animation style
  glowColor?: string; // Glowing ring color
  actionText: string;
  actionLink: string;
  apkLink?: string;
  videoLink?: string;
}
