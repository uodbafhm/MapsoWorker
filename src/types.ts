export interface Job {
  id: string;
  name: string;
  platform: string;
  payment: string;
  time: string;
  description: string;
  status: 'available' | 'completed' | 'claimed' | 'blocked';
  url?: string;
  requiresInput?: 'phone' | 'text' | 'emails';
}

export const INITIAL_JOBS: Job[] = [
  {
    id: '1',
    name: 'إنشاء 20 بريد إلكتروني',
    platform: 'Gmail فقط',
    payment: '10 دراهم',
    time: '20 دقيقة',
    description: 'قم بإنشاء 20 حساب Gmail جديد وأدخلهم هنا مع كلمات المرور',
    status: 'available',
    requiresInput: 'emails'
  },
  {
    id: '2',
    name: 'تأكيد الحساب برقم الهاتف',
    platform: 'تأكيد الهاتف',
    payment: '1 درهم',
    time: '2 دقيقة',
    description: 'تأكيد حساب واحد باستخدام رقم هاتفك',
    status: 'available',
    requiresInput: 'phone'
  },
  {
    id: '3',
    name: 'تقييم إيجابي على خرائط جوجل #3',
    platform: 'خرائط جوجل',
    payment: '1 درهم',
    time: '2 دقيقة',
    description: 'ضع 5 نجوم واترك تعليقاً إيجابياً SMMA MAPSO',
    status: 'blocked'
  },
  {
    id: '4',
    name: 'تقييم إيجابي على أمازون',
    platform: 'أمازون',
    payment: '1 درهم',
    time: '2 دقيقة',
    description: 'ضع 5 نجوم واترك تعليقاً إيجابياً',
    status: 'blocked'
  },
  {
    id: '5',
    name: 'تقييم إيجابي على Reviews.io',
    platform: 'Reviews.io',
    payment: '1 درهم',
    time: '2 دقيقة',
    description: 'ضع 5 نجوم واترك تعليقاً إيجابياً',
    status: 'blocked'
  },
  {
    id: '6',
    name: 'تقييم إيجابي على Glassdoor',
    platform: 'Glassdoor',
    payment: '1 درهم',
    time: '2 دقيقة',
    description: 'ضع 5 نجوم واترك تعليقاً إيجابياً',
    status: 'blocked'
  },
  {
    id: '7',
    name: 'تقييم إيجابي على Zomato',
    platform: 'Zomato',
    payment: '1 درهم',
    time: '2 دقيقة',
    description: 'ضع 5 نجوم واترك تعليقاً إيجابياً',
    status: 'blocked'
  },
  {
    id: '8',
    name: 'تقييم إيجابي على Trustpilot',
    platform: 'Trustpilot',
    payment: '1 درهم',
    time: '2 دقيقة',
    description: 'ضع 5 نجوم واترك تعليقاً إيجابياً',
    status: 'blocked'
  },
  {
    id: '9',
    name: 'تقييم إيجابي على Zillow',
    platform: 'Zillow',
    payment: '1 درهم',
    time: '2 دقيقة',
    description: 'ضع 5 نجوم واترك تعليقاً إيجابياً',
    status: 'blocked'
  },
  {
    id: '10',
    name: 'تقييم إيجابي على Sitejabber',
    platform: 'Sitejabber',
    payment: '1 درهم',
    time: '2 دقيقة',
    description: 'ضع 5 نجوم واترك تعليقاً إيجابياً',
    status: 'blocked'
  },
  {
    id: '11',
    name: 'تقييم إيجابي على Tripadvisor',
    platform: 'Tripadvisor',
    payment: '1 درهم',
    time: '2 دقيقة',
    description: 'ضع 5 نجوم واترك تعليقاً إيجابياً',
    status: 'blocked'
  },
  {
    id: '12',
    name: 'تقييم إيجابي على Yelp',
    platform: 'Yelp',
    payment: '1 درهم',
    time: '2 دقيقة',
    description: 'ضع 5 نجوم واترك تعليقاً إيجابياً',
    status: 'blocked'
  },
  {
    id: '13',
    name: 'بيع حساب Gmail قديم',
    platform: 'Gmail',
    payment: '2 درهم',
    time: '1 دقيقة',
    description: 'بع حساب Gmail القديم الخاص بك',
    status: 'blocked',
    url: 'https://gmail.com'
  },
  {
    id: '14',
    name: 'مشاهدة واشتراك في يوتيوب',
    platform: 'يوتيوب',
    payment: '0.5 درهم',
    time: '3 دقيقة',
    description: 'شاهد الفيديو واشترك في القناة',
    status: 'blocked'
  },
  {
    id: '15',
    name: 'متابعة وإعجاب بالمنشورات على إنستغرام',
    platform: 'إنستغرام',
    payment: '0.5 درهم',
    time: '2 دقيقة',
    description: 'تابع الصفحة وأعجب بالمنشورات الأخيرة',
    status: 'blocked'
  },
  {
    id: '16',
    name: 'كتابة تعليق على موقع إلكتروني',
    platform: 'موقع إلكتروني',
    payment: '0.2 درهم',
    time: '2 دقيقة',
    description: 'افتح جوجل وابحث عن website.com واترك تعليقاً',
    status: 'blocked'
  },
  {
    id: '17',
    name: 'تثبيت تطبيق بسيط',
    platform: 'تطبيق',
    payment: '0.5 درهم',
    time: '5 دقيقة',
    description: 'قم بتحميل التطبيق لمدة 3 أيام، مهمة بسيطة جداً.',
    status: 'blocked'
  },
  {
    id: '18',
    name: 'الانضمام إلى مجموعتي على فيسبوك',
    platform: 'فيسبوك',
    payment: '0.2 درهم',
    time: '2 دقيقة',
    description: 'سيتم الدفع بعد 5 أيام من العمل',
    status: 'blocked'
  },
  {
    id: '19',
    name: 'مشاركة ومتابعة على تويتر وفيسبوك',
    platform: 'تويتر + فيسبوك',
    payment: '0.3 درهم',
    time: '5 دقيقة',
    description: 'شارك المنشور وتابعنا على تويتر وفيسبوك',
    status: 'blocked'
  }
];
