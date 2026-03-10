import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CheckCircle2, 
  Clock, 
  DollarSign, 
  ExternalLink, 
  Search, 
  Filter,
  Briefcase,
  AlertCircle,
  ChevronRight,
  TrendingUp,
  Users,
  Award,
  MessageCircle,
  Bell,
  Wallet,
  ShieldCheck,
  Zap,
  ArrowRightLeft,
  X
} from 'lucide-react';
import { Job, INITIAL_JOBS } from './types';

const MOROCCAN_FIRST_NAMES = [
  'محمد', 'أمين', 'يوسف', 'حمزة', 'ياسين', 'عثمان', 'أنس', 'وليد', 'إسماعيل', 'بدر',
  'مريم', 'فاطمة', 'خديجة', 'سارة', 'إيمان', 'رانيا', 'ليلى', 'سمية', 'سلمى', 'زينب',
  'كريم', 'ليلى', 'نور', 'هدى', 'سعد', 'يحيى', 'أيوب', 'رضا', 'مهدي', 'جمال'
];

const MOROCCAN_LAST_NAMES = [
  'العلوي', 'الإدريسي', 'بناني', 'التازي', 'الفاسي', 'المنصوري', 'الناصري', 'الودغيري',
  'الشاوي', 'الزايدي', 'المرابط', 'القادري', 'العالمي', 'بنشقرون', 'السقاط', 'الخياري',
  'الوزاني', 'المالكي', 'الصقلي', 'البقالي', 'العمري', 'الحداد', 'الراضي', 'المنيري'
];

const getDynamicPayouts = () => {
  const today = new Date();
  // Use days since epoch to get a consistent daily shift
  const daysSinceEpoch = Math.floor(today.getTime() / (1000 * 60 * 60 * 24));
  
  const payouts = [];
  const times = ['منذ 5 دقائق', 'منذ 12 دقيقة', 'منذ 20 دقيقة', 'منذ ساعة'];
  
  for (let i = 0; i < 4; i++) {
    // Shifting index based on days since epoch
    const index = (daysSinceEpoch + i) % 100; // Large enough modulo
    
    const nameIdx = (index * 7) % MOROCCAN_FIRST_NAMES.length;
    const lastIdx = (index * 13) % MOROCCAN_LAST_NAMES.length;
    // Generate smaller, more realistic amounts between 10 and 120 DH
    const amount = ((index * 23) % 110 + 10).toFixed(2);
    
    payouts.push({
      user: `${MOROCCAN_FIRST_NAMES[nameIdx]} ${MOROCCAN_LAST_NAMES[lastIdx]}`,
      amount,
      time: times[i]
    });
  }
  return payouts;
};

const RECENT_PAYOUTS = getDynamicPayouts();

export default function App() {
  const [jobs, setJobs] = useState<Job[]>(INITIAL_JOBS);
  const [filter, setFilter] = useState<'all' | 'available' | 'completed' | 'claimed' | 'blocked'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [jobInputs, setJobInputs] = useState<Record<string, string>>({});
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [withdrawMethod, setWithdrawMethod] = useState('cih');

  const handleApply = (id: string) => {
    setJobs(prev => prev.map(job => 
      job.id === id ? { ...job, status: 'claimed' } : job
    ));
  };

  const handleComplete = (id: string) => {
    setJobs(prev => prev.map(job => 
      job.id === id ? { ...job, status: 'completed' } : job
    ));
  };

  const parsePayment = (payment: string): number => {
    const numericPart = payment.replace(/[^0-9.]/g, '');
    return parseFloat(numericPart) || 0;
  };

  const totalBalance = jobs
    .filter(j => j.status === 'completed')
    .reduce((sum, job) => sum + parsePayment(job.payment), 0);

  const handleWithdraw = () => {
    const amount = parseFloat(withdrawAmount);
    if (isNaN(amount) || amount < 10 || amount > totalBalance) return;

    const adminPhone = "+212600000000"; // Replace with actual admin phone
    const message = `السلام عليكم، أريد سحب أرباحي من منصة MapsoWorker.
المبلغ: ${amount} درهم
طريقة السحب: ${withdrawMethod.toUpperCase()}
رصيدي الحالي: ${totalBalance} درهم`;
    
    const whatsappUrl = `https://wa.me/${adminPhone}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    setIsWithdrawModalOpen(false);
    setWithdrawAmount('');
  };

  const filteredJobs = jobs.filter(job => {
    const matchesFilter = filter === 'all' || job.status === filter;
    const matchesSearch = job.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          job.platform.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const availableCount = jobs.filter(j => j.status === 'available').length;
  const completedCount = jobs.filter(j => j.status === 'completed').length;

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#1A1A1A] font-sans" dir="rtl">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-[#FF5B00] rounded-lg flex items-center justify-center">
                <Briefcase className="text-white w-6 h-6" />
              </div>
              <h1 className="text-2xl font-bold tracking-tight">
                Mapso<span className="text-[#FF5B00]">Worker</span>
              </h1>
            </div>
            
            <div className="hidden md:flex items-center gap-6">
              <nav className="flex gap-4">
                <a href="#" className="text-sm font-medium text-gray-600 hover:text-[#FF5B00] transition-colors">لوحة التحكم</a>
                <a href="#" className="text-sm font-medium text-gray-600 hover:text-[#FF5B00] transition-colors">مهامي</a>
                <button 
                  onClick={() => setIsWithdrawModalOpen(true)}
                  className="text-sm font-medium text-gray-600 hover:text-[#FF5B00] transition-colors"
                >
                  سحب الأموال
                </button>
              </nav>
              <div className="h-8 w-[1px] bg-gray-200" />
              <div className="flex items-center gap-4">
                <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors">
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                </button>
                <div className="flex items-center gap-3 bg-orange-50 px-4 py-2 rounded-xl border border-orange-100">
                  <div className="text-left">
                    <p className="text-[10px] text-[#FF5B00] font-bold uppercase tracking-wider leading-none mb-1">الرصيد الحالي</p>
                    <p className="text-sm font-black text-[#FF5B00] leading-none">{totalBalance.toFixed(2)} درهم</p>
                  </div>
                  <Wallet className="w-5 h-5 text-[#FF5B00]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="mb-12 bg-[#1A1A1A] rounded-[2rem] p-8 md:p-12 text-white relative overflow-hidden">
          <div className="relative z-10 max-w-2xl">
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-block px-4 py-1.5 bg-[#FF5B00] text-white text-xs font-bold rounded-full mb-6 uppercase tracking-widest"
            >
              مرحباً بك في مستقبل العمل المصغر
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-black mb-6 leading-[1.1]"
            >
              اربح المال بسهولة من <span className="text-[#FF5B00]">هاتفك</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-gray-400 text-lg mb-8 leading-relaxed"
            >
              انضم إلى آلاف المغاربة الذين يربحون يومياً من خلال إكمال مهام بسيطة مثل التقييمات، المتابعات، وتحميل التطبيقات.
            </motion.p>
            <div className="flex flex-wrap gap-4">
              <button className="px-8 py-4 bg-[#FF5B00] text-white font-bold rounded-2xl hover:bg-[#E65200] transition-all shadow-lg shadow-orange-500/20 active:scale-95">
                ابدأ العمل الآن
              </button>
              <button className="px-8 py-4 bg-white/10 text-white font-bold rounded-2xl hover:bg-white/20 transition-all backdrop-blur-md active:scale-95">
                كيف يعمل الموقع؟
              </button>
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-1/2 h-full opacity-20 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#FF5B00] rounded-full blur-[120px]"></div>
          </div>
        </div>

        {/* How it Works */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <h3 className="text-3xl font-black mb-4">كيف تبدأ الربح؟</h3>
            <p className="text-gray-500">ثلاث خطوات بسيطة تفصلك عن أول درهم لك</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Zap, title: 'اختر مهمة', desc: 'تصفح مئات المهام المتاحة يومياً واختر ما يناسبك.', color: 'bg-orange-500' },
              { icon: ShieldCheck, title: 'أكمل العمل', desc: 'اتبع التعليمات البسيطة وأرسل إثبات العمل عبر واتساب.', color: 'bg-blue-500' },
              { icon: ArrowRightLeft, title: 'اسحب أرباحك', desc: 'بمجرد التأكد، ستضاف الأرباح لمحفظتك لتسحبها متى شئت.', color: 'bg-green-500' },
            ].map((step, i) => (
              <div key={i} className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all group">
                <div className={`w-14 h-14 ${step.color} rounded-2xl flex items-center justify-center mb-6 text-white group-hover:scale-110 transition-transform`}>
                  <step.icon className="w-7 h-7" />
                </div>
                <h4 className="text-xl font-bold mb-3">{step.title}</h4>
                <p className="text-gray-500 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            { icon: TrendingUp, label: 'الوظائف المتاحة', value: availableCount, color: 'text-[#FF5B00]', bg: 'bg-orange-50' },
            { icon: CheckCircle2, label: 'المهام المكتملة', value: completedCount, color: 'text-green-600', bg: 'bg-green-50' },
            { icon: Award, label: 'نسبة النجاح', value: '98%', color: 'text-blue-600', bg: 'bg-blue-50' },
          ].map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm flex items-center gap-6"
            >
              <div className={`p-4 ${stat.bg} rounded-2xl`}>
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
              </div>
              <div>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-1">{stat.label}</p>
                <p className="text-3xl font-black">{stat.value}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Recent Activity */}
          <div className="lg:col-span-1 order-2 lg:order-1">
            <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-6 sticky top-24">
              <h4 className="text-lg font-bold mb-6 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-[#FF5B00]" />
                آخر السحوبات
              </h4>
              <div className="space-y-6">
                {RECENT_PAYOUTS.map((payout, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-xs font-bold text-gray-400">
                        {payout.user.split(' ')[0][0]}
                      </div>
                      <div>
                        <p className="text-sm font-bold">{payout.user}</p>
                        <p className="text-[10px] text-gray-400">{payout.time}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-black text-green-600">+{payout.amount} DH</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8 pt-6 border-t border-gray-50">
                <button 
                  onClick={() => setIsWithdrawModalOpen(true)}
                  className="w-full py-4 bg-gray-900 text-white font-bold rounded-2xl hover:bg-black transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                  <Wallet className="w-5 h-5" />
                  اسحب أرباحك الآن
                </button>
              </div>
            </div>
          </div>

          {/* Job Feed */}
          <div className="lg:col-span-3 order-1 lg:order-2">
            {/* Controls */}
            <div className="bg-white p-4 rounded-[2rem] border border-gray-100 shadow-sm mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="relative w-full md:w-96">
                <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="ابحث عن وظائف أو منصات..."
                  className="w-full pr-12 pl-4 py-3 bg-gray-50 border-none rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#FF5B00]/20 transition-all text-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="flex items-center gap-2 bg-gray-50 p-1.5 rounded-2xl w-full md:w-auto">
                {['all', 'available', 'completed', 'blocked'].map((f) => (
                  <button 
                    key={f}
                    onClick={() => setFilter(f as any)}
                    className={`px-6 py-2 rounded-xl text-xs font-bold transition-all ${filter === f ? 'bg-white text-[#FF5B00] shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                  >
                    {f === 'all' ? 'الكل' : f === 'available' ? 'المتاحة' : f === 'completed' ? 'المكتملة' : 'المحظورة'}
                  </button>
                ))}
              </div>
            </div>

            {/* Job Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <AnimatePresence mode="popLayout">
                {filteredJobs.map((job) => (
                  <motion.div 
                    key={job.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className={`bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all relative group ${job.status === 'completed' || job.status === 'blocked' ? 'opacity-60' : ''}`}
                  >
                    <div className="flex justify-between items-start mb-6">
                      <div className="p-3 bg-gray-50 rounded-2xl group-hover:bg-orange-50 transition-colors">
                        <Briefcase className="w-6 h-6 text-gray-400 group-hover:text-[#FF5B00] transition-colors" />
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">المكافأة</p>
                        <p className="text-xl font-black text-[#FF5B00]">{job.payment}</p>
                      </div>
                    </div>

                    <div className="mb-6">
                      <h5 className={`text-lg font-bold mb-2 leading-tight ${job.status === 'completed' || job.status === 'blocked' ? 'line-through text-gray-400' : ''}`}>
                        {job.name}
                      </h5>
                      <div className="flex flex-wrap gap-3">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-gray-50 rounded-lg text-[10px] font-bold text-gray-500">
                          <Filter className="w-3 h-3" /> {job.platform}
                        </span>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-gray-50 rounded-lg text-[10px] font-bold text-gray-500">
                          <Clock className="w-3 h-3" /> {job.time}
                        </span>
                      </div>
                    </div>

                    <p className="text-sm text-gray-500 mb-8 line-clamp-2 leading-relaxed">
                      {job.description}
                    </p>

                    <div className="flex items-center justify-between pt-6 border-t border-gray-50">
                      <div>
                        {job.status === 'available' ? (
                          <span className="text-[10px] font-black text-orange-500 uppercase tracking-widest">متاح الآن</span>
                        ) : job.status === 'claimed' ? (
                          <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest">قيد التنفيذ</span>
                        ) : job.status === 'blocked' ? (
                          <span className="text-[10px] font-black text-red-500 uppercase tracking-widest">محظور</span>
                        ) : (
                          <span className="text-[10px] font-black text-green-500 uppercase tracking-widest">تم بنجاح</span>
                        )}
                      </div>
                      
                      {job.status === 'available' ? (
                        <button 
                          onClick={() => handleApply(job.id)}
                          className="px-6 py-3 bg-[#FF5B00] text-white text-xs font-black rounded-xl hover:bg-[#E65200] transition-all shadow-lg shadow-orange-500/10 active:scale-95 flex items-center gap-2"
                        >
                          ابدأ المهمة <ChevronRight className="w-4 h-4 rotate-180" />
                        </button>
                      ) : job.status === 'claimed' ? (
                        <div className="flex flex-col gap-4 w-full">
                          {job.requiresInput === 'phone' && (
                            <div className="w-full">
                              <label className="block text-[10px] font-bold text-gray-400 mb-2">أدخل رقم هاتفك للتأكيد:</label>
                              <input 
                                type="tel"
                                placeholder="06XXXXXXXX"
                                value={jobInputs[job.id] || ''}
                                onChange={(e) => setJobInputs(prev => ({ ...prev, [job.id]: e.target.value }))}
                                className="w-full px-4 py-2 bg-gray-50 border border-gray-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF5B00]/20"
                              />
                            </div>
                          )}
                          {job.requiresInput === 'text' && (
                            <div className="w-full">
                              <label className="block text-[10px] font-bold text-gray-400 mb-2">أدخل المعلومات المطلوبة:</label>
                              <textarea 
                                placeholder="اكتب هنا..."
                                value={jobInputs[job.id] || ''}
                                onChange={(e) => setJobInputs(prev => ({ ...prev, [job.id]: e.target.value }))}
                                className="w-full px-4 py-2 bg-gray-50 border border-gray-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF5B00]/20 min-h-[80px]"
                              />
                            </div>
                          )}
                          {job.requiresInput === 'emails' && (
                            <div className="w-full">
                              <label className="block text-[10px] font-bold text-gray-400 mb-2">أدخل 20 بريد إلكتروني مع كلمات المرور (مثال: email:password):</label>
                              <textarea 
                                placeholder="1. email@gmail.com : password123&#10;2. email2@gmail.com : password456&#10;..."
                                value={jobInputs[job.id] || ''}
                                onChange={(e) => setJobInputs(prev => ({ ...prev, [job.id]: e.target.value }))}
                                className="w-full px-4 py-2 bg-gray-50 border border-gray-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF5B00]/20 min-h-[150px] font-mono"
                              />
                            </div>
                          )}
                          <div className="flex gap-2 justify-end">
                            <a 
                              href={`https://wa.me/212781214641?text=${encodeURIComponent(`مرحباً، لقد بدأت المهمة: ${job.name}${jobInputs[job.id] ? `\nالمعلومات: ${jobInputs[job.id]}` : ''}`)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-3 bg-[#25D366] text-white rounded-xl hover:bg-[#128C7E] transition-all active:scale-95 flex items-center gap-2"
                              title="إرسال عبر واتساب"
                            >
                              <MessageCircle className="w-5 h-5" />
                              <span className="text-[10px] font-bold">إرسال للتأكيد</span>
                            </a>
                            <button 
                              onClick={() => handleComplete(job.id)}
                              className="px-6 py-3 bg-blue-600 text-white text-xs font-black rounded-xl hover:bg-blue-700 transition-all active:scale-95"
                            >
                              تم الإنجاز
                            </button>
                          </div>
                        </div>
                      ) : (
                        <button disabled className="px-6 py-3 bg-gray-100 text-gray-400 text-xs font-black rounded-xl cursor-not-allowed">
                          {job.status === 'blocked' ? 'غير متاح' : 'مكتمل'}
                        </button>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {filteredJobs.length === 0 && (
              <div className="py-24 flex flex-col items-center justify-center text-center bg-white rounded-[2rem] border border-gray-100">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                  <AlertCircle className="w-10 h-10 text-gray-300" />
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-2">لا توجد وظائف</h3>
                <p className="text-gray-500 max-w-xs mx-auto">
                  حاول تغيير كلمات البحث أو الفلاتر للعثور على مهام جديدة.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Withdraw Modal */}
      <AnimatePresence>
        {isWithdrawModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsWithdrawModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-white w-full max-w-md rounded-[2.5rem] p-8 shadow-2xl overflow-hidden"
            >
              <button 
                onClick={() => setIsWithdrawModalOpen(false)}
                className="absolute top-6 left-6 p-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Wallet className="w-8 h-8 text-[#FF5B00]" />
                </div>
                <h3 className="text-2xl font-black">سحب الأرباح</h3>
                <p className="text-gray-500 text-sm">رصيدك الحالي: {totalBalance.toFixed(2)} درهم</p>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3">طريقة السحب</label>
                  <div className="grid grid-cols-2 gap-3">
                    {['cih', 'attijari', 'bmce', 'cashplus'].map((method) => (
                      <button 
                        key={method}
                        onClick={() => setWithdrawMethod(method)}
                        className={`py-4 rounded-2xl border-2 font-bold transition-all ${withdrawMethod === method ? 'border-[#FF5B00] bg-orange-50 text-[#FF5B00]' : 'border-gray-100 text-gray-400 hover:border-gray-200'}`}
                      >
                        {method.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3">المبلغ المراد سحبه</label>
                  <div className="relative">
                    <input 
                      type="number" 
                      placeholder="0.00"
                      className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#FF5B00]/20 text-xl font-black"
                      value={withdrawAmount}
                      onChange={(e) => setWithdrawAmount(e.target.value)}
                    />
                    <span className="absolute left-6 top-1/2 -translate-y-1/2 font-bold text-gray-400">درهم</span>
                  </div>
                  <p className="mt-2 text-[10px] text-gray-400">الحد الأدنى للسحب هو 10 دراهم</p>
                </div>

                <button 
                  onClick={handleWithdraw}
                  disabled={parseFloat(withdrawAmount) < 10 || parseFloat(withdrawAmount) > totalBalance}
                  className="w-full py-5 bg-[#FF5B00] text-white font-black rounded-2xl hover:bg-[#E65200] transition-all shadow-lg shadow-orange-500/20 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
                >
                  تأكيد طلب السحب
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-12 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-8 bg-[#FF5B00] rounded-lg flex items-center justify-center">
              <Briefcase className="text-white w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold tracking-tight">
              Mapso<span className="text-[#FF5B00]">Worker</span>
            </h2>
          </div>
          <p className="text-sm text-gray-500 mb-6">
            المنصة رقم 1 للمهام الصغيرة في المغرب. اربح المال عن طريق إكمال وظائف بسيطة.
          </p>
          <div className="flex justify-center gap-8 text-sm font-medium text-gray-400">
            <a href="#" className="hover:text-[#FF5B00] transition-colors">شروط الخدمة</a>
            <a href="#" className="hover:text-[#FF5B00] transition-colors">سياسة الخصوصية</a>
            <a 
              href="https://wa.me/+212600000000?text=أريد المساعدة بخصوص منصة MapsoWorker" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-[#FF5B00] transition-colors"
            >
              اتصل بالدعم
            </a>
          </div>
          <p className="text-xs text-gray-400 mt-8">
            &copy; {new Date().getFullYear()} MapsoWorker. جميع الحقوق محفوظة.
          </p>
        </div>
      </footer>
    </div>
  );
}
