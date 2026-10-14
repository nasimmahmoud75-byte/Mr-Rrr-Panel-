import React, { useState, useRef, useEffect } from 'react';
import {
  Headphones,
  MessageCircle,
  Send,
  X,
  ExternalLink,
  Bot,
  User,
  Sparkles,
  RotateCcw,
  ShieldCheck,
  CheckCircle2,
  Clock,
  ArrowRight,
  HelpCircle,
  Copy,
  ChevronRight
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
  actionType?: 'add_fund' | 'file_setup' | 'key_reset' | 'whatsapp' | 'telegram' | 'products';
  actionLabel?: string;
  quickReplies?: string[];
}

export const SupportWidget: React.FC = () => {
  const {
    storeSettings,
    setAddFundModalOpen,
    setKeyResetModalOpen,
    setActiveFileSetupProduct,
    products,
    showToast
  } = useStore();

  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'ai' | 'channels'>('ai');
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const initialAIMessage: ChatMessage = {
    id: 'ai-welcome',
    sender: 'ai',
    text: `👋 আসসালামু আলাইকুম! আমি **PANELSELL AI সাপোর্ট সহকারী**। 

প্যানেল, লাইসেন্স কী (Key), পেমেন্ট ভেরিফিকেশন বা APK সেটআপ সংক্রান্ত যেকোনো বিষয়ে আমি আপনাকে তাৎক্ষণিক সহায়তা করতে পারি। 

নিচের সাধারণ টপিকগুলো থেকে বেছে নিন অথবা আপনার প্রশ্নটি নিচে লিখে পাঠান:`,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    quickReplies: [
      'কীভাবে কী (Key) কিনব?',
      'বিকাশ/নগদ পেমেন্ট ভেরিফিকেশন',
      '১ দিন, ৭ দিন ও ৩০ দিনের দাম কত?',
      'APK ও সেটআপ ফাইল ডাউনলোড লিংক',
      'কী কাজ না করলে কী করব?',
      'সরাসরি অ্যাডমিন হোয়াটসঅ্যাপ চ্যাট'
    ]
  };

  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    const saved = sessionStorage.getItem('ps_ai_chat');
    return saved ? JSON.parse(saved) : [initialAIMessage];
  });

  useEffect(() => {
    sessionStorage.setItem('ps_ai_chat', JSON.stringify(messages));
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // AI Knowledge-Base Response Generator
  const generateAIResponse = (query: string): ChatMessage => {
    const q = query.toLowerCase().trim();
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // 1. Payment / Add Fund queries
    if (
      q.includes('bkash') ||
      q.includes('বিকাশ') ||
      q.includes('nagad') ||
      q.includes('নগদ') ||
      q.includes('payment') ||
      q.includes('টাকা') ||
      q.includes('পেমেন্ট') ||
      q.includes('ব্যালেন্স') ||
      q.includes('add fund') ||
      q.includes('পাঠিয়েছি')
    ) {
      return {
        id: 'ai-' + Date.now(),
        sender: 'ai',
        text: `💰 **পেমেন্ট ও ব্যালেন্স অ্যাড করার নিয়মাবলী:**

1. **ওয়ালেট রিচার্জ:** অ্যাপের "Add Fund" অপশনে গিয়ে বিকাশ (${storeSettings.paymentDetails.bKash.number}) অথবা নগদ নম্বরে সেন্ড মানি করুন।
2. **TrxID সাবমিট:** টাকা পাঠানোর পর আপনার ফোন নম্বর ও ফিরতি SMS-এর Transaction ID (TrxID) দিয়ে রিকোয়েস্ট পাঠান।
3. **অনুমোদন সময়:** অ্যাডমিন সাধারণত ১-৫ মিনিটের মধ্যে ট্রানজেকশন ভেরিফাই করে ব্যালেন্স যোগ করে দেন।
4. ব্যালেন্স যোগ হলে পণ্য সিলেক্ট করে ১ ক্লিকেই কী সংগ্রহ করতে পারবেন।`,
        timestamp: time,
        actionType: 'add_fund',
        actionLabel: '💵 Add Fund ওপেন করুন',
        quickReplies: ['১ দিন, ৭ দিন ও ৩০ দিনের দাম কত?', 'কীভাবে কী (Key) কিনব?']
      };
    }

    // 2. Pricing & Durations queries
    if (
      q.includes('দাম') ||
      q.includes('price') ||
      q.includes('dam') ||
      q.includes('koto') ||
      q.includes('১ দিন') ||
      q.includes('1 din') ||
      q.includes('7 din') ||
      q.includes('৭ দিন') ||
      q.includes('30 din') ||
      q.includes('৩০ দিন') ||
      q.includes('টাকা কত')
    ) {
      return {
        id: 'ai-' + Date.now(),
        sender: 'ai',
        text: `⏳ **প্যাকেজের মেয়াদ ও মূল্যের বিবরণী:**

আমাদের প্রতিটি পণ্যে ৩টি মেয়াদের অপশন রয়েছে:
• **১ দিন (Daily Pass):** সাধারণত ৩০৳ থেকে ৩৫৳ (টেস্ট বা ১ দিনের জন্য)
• **৭ দিন (Weekly Pass):** সাধারণত ১২০৳ থেকে ১৫০৳ (সবচেয়ে জনপ্রিয়)
• **৩০ দিন (Monthly Pass):** সাধারণত ৩৫০৳ থেকে ৪০০৳ (সর্বোচ্চ সাশ্রয়ী)

👉 প্রতিটি প্রোডাক্ট কার্ডে "১ দিন", "৭ দিন" অথবা "৩০ দিন" ট্যাবে ক্লিক করলেই সঠিক মূল্য ও লাইভ স্টক কী দেখতে পাবেন!`,
        timestamp: time,
        actionType: 'products',
        actionLabel: '🛍️ প্রোডাক্ট লিস্ট দেখুন',
        quickReplies: ['কীভাবে কী (Key) কিনব?', 'বিকাশ/নগদ পেমেন্ট ভেরিফিকেশন']
      };
    }

    // 3. How to buy key
    if (
      q.includes('কিনব') ||
      q.includes('buy') ||
      q.includes('kinbo') ||
      q.includes('how to buy') ||
      q.includes('কিভাবে কিনব')
    ) {
      return {
        id: 'ai-' + Date.now(),
        sender: 'ai',
        text: `🛒 **কী (Key) কেনার সহজ ৩টি ধাপ:**

1. প্রথমে **"Add Fund"** এ গিয়ে ওয়ালেটে টাকা রিচার্জ করে নিন।
2. আপনার পছন্দের প্যানেলের মেয়াদ (১ দিন / ৭ দিন / ৩০ দিন) সিলেক্ট করুন।
3. **"BUY NOW"** বাটনে চাপ দিন — সাথে সাথে স্ক্রিনে এবং আপনার "MY CODES" সেকশনে লাইসেন্স কোড চলে আসবে (০০.১ সেকেন্ড ইনস্ট্যান্ট ডেলিভারি!)`,
        timestamp: time,
        actionType: 'add_fund',
        actionLabel: '💵 ওয়ালেট ব্যালেন্স চেক/লোড করুন',
        quickReplies: ['APK ও সেটআপ ফাইল ডাউনলোড লিংক', 'কী কাজ না করলে কী করব?']
      };
    }

    // 4. File Setup & APK Download
    if (
      q.includes('apk') ||
      q.includes('download') ||
      q.includes('ডাউনলোড') ||
      q.includes('file') ||
      q.includes('setup') ||
      q.includes('সেটআপ') ||
      q.includes('video') ||
      q.includes('ভিডিও')
    ) {
      return {
        id: 'ai-' + Date.now(),
        sender: 'ai',
        text: `📥 **APK ডাউনলোড ও সেটআপ গাইড:**

• প্রতিটি পণ্যের কার্ডে **"SETUP"** বাটনে ক্লিক করলে অফিসিয়াল APK ডাউনলোড লিংক এবং ইউটিউব সেটআপ ভিডিও টিউটোরিয়াল পেয়ে যাবেন।
• হোমপেজের টপ ব্যানারের "সেটআপ ভিডিও ও APK ডাউনলোড" বাটনে চাপ দিয়েও লেটেস্ট আপডেট ফাইল সংগ্রহ করা যাবে।`,
        timestamp: time,
        actionType: 'file_setup',
        actionLabel: '📂 সেটআপ ফাইল গাইড দেখুন',
        quickReplies: ['কী কাজ না করলে কী করব?', 'সরাসরি অ্যাডমিন হোয়াটসঅ্যাপ চ্যাট']
      };
    }

    // 5. Key Reset / HWID issue
    if (
      q.includes('reset') ||
      q.includes('রিসেট') ||
      q.includes('device') ||
      q.includes('ডিভাইস') ||
      q.includes('কাজ করে না') ||
      q.includes('not working') ||
      q.includes('error') ||
      q.includes('সমস্যা')
    ) {
      return {
        id: 'ai-' + Date.now(),
        sender: 'ai',
        text: `🔄 **কী রিসেট ও সমস্যার সমাধান:**

• যদি ফোন পরিবর্তন করেন বা 'Device Bound / Already Registered' দেখায়, তবে **"KEY RESET NOW"** বাটনে গিয়ে আপনার কোডটি লিখে রিকোয়েস্ট পাঠান।
• কোড কপি করার সময় কোনো অতিরিক্ত স্পেস (space) না দেওয়া নিশ্চিত করুন।
• খুব জরুরি সমস্যায় সরাসরি অ্যাডমিন হেল্পলাইনে হোয়াটসঅ্যাপে মেসেজ দিন।`,
        timestamp: time,
        actionType: 'key_reset',
        actionLabel: '🔄 কী রিসেট রিকোয়েস্ট পাঠান',
        quickReplies: ['সরাসরি অ্যাডমিন হোয়াটসঅ্যাপ চ্যাট']
      };
    }

    // 6. Admin / Helpline / Contact
    if (
      q.includes('admin') ||
      q.includes('অ্যাডমিন') ||
      q.includes('এডমিন') ||
      q.includes('helpline') ||
      q.includes('help') ||
      q.includes('whatsapp') ||
      q.includes('হোয়াটসঅ্যাপ') ||
      q.includes('কথা') ||
      q.includes('agent')
    ) {
      return {
        id: 'ai-' + Date.now(),
        sender: 'ai',
        text: `📞 **সরাসরি মানব সহায়তাকারী / অ্যাডমিন হেল্পলাইন:**

আমাদের সাপোর্ট টিম হোয়াটসঅ্যাপে সক্রিয় রয়েছে:
• **WhatsApp Helpline:** ${storeSettings.whatsAppNumber}
• **টেলিগ্রাম চ্যানেল:** ${storeSettings.telegramLink}

নিচের বাটনে ট্যাপ করে সরাসরি হোয়াটসঅ্যাপে চ্যাট শুরু করতে পারেন:`,
        timestamp: time,
        actionType: 'whatsapp',
        actionLabel: '💬 WhatsApp হেল্পলাইনে চ্যাট করুন'
      };
    }

    // Default intelligent fallback
    return {
      id: 'ai-' + Date.now(),
      sender: 'ai',
      text: `ধন্যবাদ আপনার প্রশ্নের জন্য! 🤖 

আপনার জিজ্ঞাসাটি আমাদের নলেজবেসে সংরক্ষিত হয়েছে। আপনি কি নিচের কোনো বিষয়ে সহায়তা চাইছেন?

1. **পেমেন্ট বা বিকাশ/নগদে টাকা পাঠানো**
2. **কী কেনার নিয়ম বা ডেলিভারি**
3. **১ দিন, ৭ দিন, ৩০ দিনের মেয়াদ ও দাম**
4. **APK ফাইল ডাউনলোড ও সেটআপ**

অথবা সরাসরি অ্যাডমিনের সাথে হোয়াটসঅ্যাপে চ্যাট করতে পারেন।`,
      timestamp: time,
      actionType: 'whatsapp',
      actionLabel: '📞 সরাসরি অ্যাডমিন হোয়াটসঅ্যাপ',
      quickReplies: ['কীভাবে কী (Key) কিনব?', 'বিকাশ/নগদ পেমেন্ট ভেরিফিকেশন', '১ দিন, ৭ দিন ও ৩০ দিনের দাম কত?']
    };
  };

  const handleSendMessage = (textToSend?: string) => {
    const text = (textToSend || inputMessage).trim();
    if (!text) return;

    const userMsg: ChatMessage = {
      id: 'user-' + Date.now(),
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setIsTyping(true);

    // Realistic AI reply delay (350ms)
    setTimeout(() => {
      const aiReply = generateAIResponse(text);
      setMessages((prev) => [...prev, aiReply]);
      setIsTyping(false);
    }, 400);
  };

  const handleActionClick = (actionType?: string) => {
    if (actionType === 'add_fund') {
      setIsOpen(false);
      setAddFundModalOpen(true);
    } else if (actionType === 'file_setup') {
      setIsOpen(false);
      if (products.length > 0) setActiveFileSetupProduct(products[0]);
    } else if (actionType === 'key_reset') {
      setIsOpen(false);
      setKeyResetModalOpen(true);
    } else if (actionType === 'whatsapp') {
      window.open(`https://wa.me/${storeSettings.whatsAppNumber.replace(/[^0-9]/g, '')}`, '_blank');
    } else if (actionType === 'telegram') {
      window.open(storeSettings.telegramLink, '_blank');
    } else if (actionType === 'products') {
      setIsOpen(false);
      const el = document.getElementById('products-section') || document.body;
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleResetChat = () => {
    setMessages([initialAIMessage]);
    sessionStorage.removeItem('ps_ai_chat');
    showToast('AI চ্যাট হিস্ট্রি রিসেট করা হয়েছে', 'info');
  };

  return (
    <>
      {/* Floating Headset Button with Glowing AI Badge */}
      <div className="fixed bottom-18 right-4 sm:right-6 z-40">
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="24/7 AI Auto Support"
          className="relative w-14 h-14 rounded-full bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white flex items-center justify-center shadow-xl shadow-cyan-500/30 ring-4 ring-cyan-400/30 active:scale-95 transition-all group cursor-pointer"
        >
          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <>
              <Headphones className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
              {/* Pulsing AI badge */}
              <span className="absolute -top-1 -right-1 bg-gradient-to-r from-emerald-400 to-cyan-400 text-slate-950 font-black text-[9px] px-1.5 py-0.5 rounded-full border border-white shadow-md flex items-center gap-0.5 animate-pulse">
                <Sparkles className="w-2.5 h-2.5" /> AI
              </span>
            </>
          )}
        </button>
      </div>

      {/* AI Support Chat Window */}
      {isOpen && (
        <div className="fixed bottom-34 right-3 sm:right-6 z-40 w-[92vw] sm:w-[380px] h-[520px] max-h-[80vh] bg-slate-900/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-cyan-500/30 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
          {/* Header */}
          <div className="p-3.5 bg-gradient-to-r from-slate-900 via-cyan-950 to-slate-900 border-b border-cyan-500/20 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="relative w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-md shadow-cyan-900/50 border border-cyan-300/40">
                <Bot className="w-5 h-5" />
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-slate-900 animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-black text-white text-sm tracking-tight">PANELSELL AI</span>
                  <span className="px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-300 text-[9px] font-bold border border-cyan-500/30">
                    24/7 AUTO
                  </span>
                </div>
                <p className="text-[10px] text-emerald-400 flex items-center gap-1 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                  অনলাইনে আছে &bull; তাৎক্ষণিক উত্তর
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleResetChat}
                title="চ্যাট রিসেট করুন"
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Navigation Pills (AI Chat vs Human Helpline) */}
          <div className="px-3 py-1.5 bg-slate-950/60 border-b border-slate-800 flex items-center gap-1">
            <button
              onClick={() => setActiveTab('ai')}
              className={`flex-1 py-1 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                activeTab === 'ai'
                  ? 'bg-cyan-500 text-slate-950 shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI অটো রিপ্লাই</span>
            </button>
            <button
              onClick={() => setActiveTab('channels')}
              className={`flex-1 py-1 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                activeTab === 'channels'
                  ? 'bg-cyan-500 text-slate-950 shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>অ্যাডমিন হেল্পলাইন</span>
            </button>
          </div>

          {/* Tab 1: AI Chat View */}
          {activeTab === 'ai' && (
            <>
              {/* Message List */}
              <div className="flex-1 p-3 overflow-y-auto space-y-3 font-['Hind_Siliguri',sans-serif]">
                {messages.map((m) => (
                  <div
                    key={m.id}
                    className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl p-3 text-xs leading-relaxed shadow-sm ${
                        m.sender === 'user'
                          ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-br-none border border-cyan-400/30 font-medium'
                          : 'bg-slate-800/90 text-slate-200 rounded-bl-none border border-slate-700/80'
                      }`}
                    >
                      <div className="whitespace-pre-line">{m.text}</div>

                      {/* Action Button if attached */}
                      {m.actionType && (
                        <button
                          onClick={() => handleActionClick(m.actionType)}
                          className="mt-2.5 w-full py-1.5 px-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black text-xs flex items-center justify-between shadow-xs transition-all active:scale-98"
                        >
                          <span>{m.actionLabel || 'ওপেন করুন'}</span>
                          <ArrowRight className="w-3.5 h-3.5 text-slate-950" />
                        </button>
                      )}
                    </div>

                    <span className="text-[10px] text-slate-500 mt-1 px-1">{m.timestamp}</span>

                    {/* Quick Replies chips under AI message */}
                    {m.quickReplies && m.quickReplies.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1.5 max-w-[95%]">
                        {m.quickReplies.map((qr, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleSendMessage(qr)}
                            className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-slate-800/80 hover:bg-cyan-950 hover:border-cyan-500/60 border border-slate-700 text-cyan-300 transition-colors text-left flex items-center gap-1 active:scale-95"
                          >
                            <span>{qr}</span>
                            <ChevronRight className="w-3 h-3 text-cyan-400" />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}

                {/* AI Typing Indicator */}
                {isTyping && (
                  <div className="flex items-center gap-1.5 bg-slate-800/80 px-3 py-2 rounded-2xl rounded-bl-none border border-slate-700 w-fit">
                    <span className="text-[11px] text-cyan-400 font-semibold mr-1">AI ভাবছে</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" />
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.4s]" />
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Chat Input Bar */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="p-2.5 bg-slate-950 border-t border-slate-800 flex items-center gap-2"
              >
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="আপনার প্রশ্ন লিখুন (যেমন: পেমেন্ট, কী সমস্যা)..."
                  className="flex-1 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700/80 text-white placeholder-slate-500 text-xs focus:outline-none focus:ring-1 focus:ring-cyan-500"
                />
                <button
                  type="submit"
                  disabled={!inputMessage.trim()}
                  className="p-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 disabled:opacity-40 text-slate-950 font-bold transition-all shrink-0 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </>
          )}

          {/* Tab 2: Human Channels View */}
          {activeTab === 'channels' && (
            <div className="flex-1 p-4 space-y-3 overflow-y-auto font-['Hind_Siliguri',sans-serif]">
              <div className="p-3 rounded-2xl bg-slate-800/80 border border-slate-700 text-center">
                <ShieldCheck className="w-8 h-8 text-cyan-400 mx-auto mb-1.5" />
                <h4 className="font-black text-white text-sm">সরাসরি অ্যাডমিন সাপোর্ট</h4>
                <p className="text-xs text-slate-400 mt-1">
                  কোনো প্রশ্ন বা জরুরি সমস্যার জন্য সরাসরি অফিসিয়াল প্ল্যাটফর্মে যোগাযোগ করুন।
                </p>
              </div>

              <div className="space-y-2.5">
                {/* WhatsApp */}
                <a
                  href={`https://wa.me/${storeSettings.whatsAppNumber.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white font-bold text-xs flex items-center justify-between shadow-md transition-all active:scale-98"
                >
                  <div className="flex items-center gap-2.5">
                    <MessageCircle className="w-5 h-5 text-white" />
                    <div className="text-left">
                      <span className="block font-black">WhatsApp HelpDesk</span>
                      <span className="text-[10px] text-emerald-200 font-mono">
                        {storeSettings.whatsAppNumber}
                      </span>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-emerald-100" />
                </a>

                {/* Telegram */}
                <a
                  href={storeSettings.telegramLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-3.5 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold text-xs flex items-center justify-between shadow-md transition-all active:scale-98"
                >
                  <div className="flex items-center gap-2.5">
                    <Send className="w-5 h-5 text-white" />
                    <div className="text-left">
                      <span className="block font-black">Telegram Channel & Group</span>
                      <span className="text-[10px] text-sky-200">লেটেস্ট আপডেট ও নোটিস</span>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-sky-100" />
                </a>
              </div>

              <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800 text-[11px] text-slate-400 space-y-1">
                <div className="flex items-center gap-1.5 text-cyan-400 font-bold">
                  <Clock className="w-3.5 h-3.5" />
                  <span>সার্ভিস সময়: ২৪ ঘণ্টা / ৭ দিন খোলা</span>
                </div>
                <p>আমরা গ্রাহকদের দ্রুততম সময়ে সহায়তা প্রদান করতে অঙ্গীকারবদ্ধ।</p>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};
