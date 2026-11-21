/* =====================================================
   Leyla Store — script.js
   متجر ثنائي اللغة والوضع، بدون باك إند (البيانات في localStorage).
   الأماكن اللي هتعدل فيها بياناتك: CONFIG و CATEGORIES و PRODUCT_SEED
   ===================================================== */
'use strict';
(() => {

/* ---------------------------------------------------
   1) الإعدادات
--------------------------------------------------- */
const CONFIG = {
  storeName: 'Leyla Store',
  email: 'info@leylastore.com',
  phone: '+20 000 000 0000',
  tiktok: '#', instagram: '#', facebook: '#',
  depositRate: 0.24,        // العربون 24%
  shippingFee: 60,          // رسوم الشحن (جنيه)
  freeShippingFrom: 1500,   // شحن مجاني فوق المبلغ ده (0 = بدون شحن مجاني)
  pageSize: 20,
  // الدفع هنا تجريبي (بدون Paymob حقيقي). للدفع الحقيقي لازم تربط Paymob من سيرفر
  // وتحوّل العميل لصفحة Paymob الرسمية، ومتخزنش بيانات الكروت في موقعك أبدًا.
  demoPayment: true
};

/* ---------------------------------------------------
   2) النصوص (عربي / إنجليزي)
--------------------------------------------------- */
const T = {
  en: {
    navigation:'Navigation', home:'Home', signIn:'Sign In', categories:'Categories', account:'Account', myAccount:'My Account',
    cart:'Cart', myOrders:'My Orders', language:'Language', mode:'Light/Dark Mode', searchPh:'Search for products', cancel:'Cancel',
    browseAll:'Browse all products', heroTitle:'Self-love Starts Here', heroText:'Beauty. Care. Confidence you can feel.',
    shopNow:'Shop Now', shopFavorite:'Shop Your Favorite Corner 💕', shopAll:'Shop All', newArrivals:'New Arrivals', viewMore:'View More',
    discounts:'Discounts', bestSellers:'Best Sellers', reviewsTitle:'What Our Customers Say', shareExp:'Share Your Experience',
    name:'Name', phone:'Phone Number', phoneHidden:'(will not be displayed)', rating:'Rating', review:'Review', optional:'(optional)',
    photos:'Photos (up to 3 — PNG, JPG, WebP — max 1MB each)', addPhotos:'Add photos', submitReview:'Share Review', shop:'Shop',
    filters:'Filters', loadMore:'Load more', total:'Total',
    spDelivery:'Standard delivery:', spDeliveryTxt:'7-10 business days.', spFees:'Fees:',
    spFeesTxt:'Shipping fees are calculated at checkout. Free shipping may apply above a certain amount.',
    spPack:'Packaging:', spPackTxt:'Every order is carefully packed to arrive safely.', spReq:'Delivery requirements:',
    spReqTxt:'Please provide an accurate address and an active phone number.', spTrack:'Tracking & notifications:',
    spTrackTxt:'You will be notified at every stage of your order.', spCancel:'Cancellation & changes:',
    spCancelTxt:'Within 24 hours of ordering. No cancellation after shipping.', spReturn:'Returns:',
    spReturnTxt:'Within 7 days of delivery, according to the refund policy.',
    yourCart:'Your Cart', cartActions:'Cart Actions', shareCart:'Share Cart', exportCart:'Export Cart', importCart:'Import Cart',
    cartEmpty:'Your cart is empty', continueShopping:'Continue Shopping', orderSummary:'Order Summary', subtotal:'Subtotal',
    shippingAtCheckout:'Shipping is calculated at checkout.', checkout:'Checkout', signInTab:'Sign in', signUpTab:'Sign up',
    continueGoogle:'Continue with Google', or:'or', email:'Email', password:'Password', forgot:'Forgot password?',
    signInBtn:'Sign in', signUpBtn:'Create account', signOut:'Sign out', stepShipping:'Shipping Info', stepReview:'Review & Payment',
    shippingAddress:'Shipping Address', fullName:'Full Name', area:'Area', district:'District', street:'Street', building:'Building',
    floor:'Floor', apartment:'Apartment', governorate:'Governorate', country:'Country', contactInfo:'Contact Information',
    fulfillment:'Fulfillment', delivery:'Delivery', pickup:'Pick up', continueToPayment:'Continue to payment',
    backToShipping:'Back to Shipping Info', paymentMethod:'Payment Method', onlinePayment:'Online Payment (cards or e-wallets)',
    cod:'Cash on Delivery', paymentOption:'Payment Option', payDeposit:'Pay Deposit', payFull:'Pay Full Amount', iAgree:'I agree to the',
    privacy:'Privacy Policy', terms:'Terms of Service', refund:'Refund Policy', shippingPolicy:'Shipping Policy', addons:'Add-ons',
    shipping:'Shipping', depositAmount:'Deposit amount', securePay:'Secure payment', viewOrderDetails:'View order details',
    card:'Card', wallet:'Wallet', cardNumber:'Card number', expiry:'MM / YY', instantRefund:'Enable instant refund',
    walletNumber:'Wallet number', walletNetworks:'Accepted: Vodafone Cash, WE Pay, Meezah, Orange Cash, Etisalat Cash',
    thanksTitle:'Thank you for your order!', orderNumber:'Order number', thanksText:'We will contact you shortly to confirm your order.',
    noOrders:'You have no orders yet', orderFilters:'Order Filters', sortBy:'Sort by', sortNewest:'Newest', sortPriceAsc:'Price: low to high',
    sortPriceDesc:'Price: high to low', sortName:'Name A-Z', category:'Category', priceRange:'Price range', inStockOnly:'In stock only',
    onSaleOnly:'On sale only', newOnly:'New arrivals only', resetAll:'Reset All', applyFilters:'Apply Filters',
    footerTag:'Beauty. Care. Confidence you can feel.', contactUs:'Contact Us', locations:'LOCATIONS', onlineOnly:'ONLINE STORE',
    // رسائل ديناميكية
    added:'Added to cart 💕', soldOut:'SOLD OUT', selectOptions:'Select Options', addCartBtn:'Add to Cart', off:'OFF', newBadge:'NEW',
    showing:'Showing', of:'of', pageSize:'Page size', inStock:'In stock, ready to ship', outStock:'Out of stock', pickOpts:'Please choose all options',
    fillReq:'Please fill in all required fields', badPhone:'Please enter a valid phone number', rateReq:'Please choose a rating',
    photoMax:'You can add up to 3 photos', photoType:'Only PNG, JPG or WebP images are allowed', photoSize:'Each photo must be 1MB or less',
    reviewThanks:'Thank you for sharing your experience 💕', passMin:'Password must be at least 6 characters', userExists:'This email is already registered',
    badCreds:'Wrong email or password', signedIn:'Signed in successfully', signedOut:'Signed out', googleSoon:'Google sign-in needs a backend (e.g. Firebase) to be connected',
    forgotSoon:'Password reset needs a backend (e.g. Firebase) to be connected', linkCopied:'Link copied', cartImported:'Cart imported', cartImportErr:'Could not read the cart file',
    payDepositBtn:'Pay Deposit EGP', payFullBtn:'Pay Full Amount EGP', placeOrder:'Place Order (Cash on Delivery)', rest:'the rest is paid on delivery',
    agreeAll:'Please accept all policies to continue', customer:'Customer', deliveryAddress:'Delivery Address', call:'Call', view:'View',
    items:'items', noResults:'No results found', expected:'Expected delivery', payStatus:'Payment', method:'Method', date:'Date', status:'Status',
    cancelConfirm:'Cancel this order?', orderCancelled:'Order cancelled', cannotCancel:'This order can no longer be cancelled',
    badCard:'Please check the card details', badWallet:'Please enter a valid wallet number', pay:'Pay', egp:'EGP', free:'Free', cartEmptyToast:'Your cart is empty',
    allCats:'All', cat:'Category', filterEmpty:'No products match your filters', details:'Details', orderN:'Order', fav:'Added to favorites',
    unfav:'Removed from favorites', shared:'Shared', mustAcceptPrivacy:'Please accept the policies'
  },
  ar: {
    navigation:'التنقل', home:'الرئيسية', signIn:'تسجيل الدخول', categories:'الأقسام', account:'الحساب', myAccount:'حسابي',
    cart:'السلة', myOrders:'طلباتي', language:'اللغة', mode:'الوضع الفاتح/الداكن', searchPh:'ابحثي عن المنتجات', cancel:'إلغاء',
    browseAll:'تصفح كل المنتجات', heroTitle:'حب نفسك يبدأ من هنا', heroText:'الجمال. العناية. الثقة التي يمكنك الشعور بها',
    shopNow:'تسوقي الآن', shopFavorite:'تسوقي زاويتك المفضلة 💕', shopAll:'تسوقي الجميع', newArrivals:'وصل حديثًا', viewMore:'عرض المزيد',
    discounts:'الخصومات', bestSellers:'الأكثر مبيعًا', reviewsTitle:'آراء عملائنا', shareExp:'شاركي تجربتك',
    name:'الاسم', phone:'رقم الهاتف', phoneHidden:'(لن يتم عرضه)', rating:'التقييم', review:'المراجعة', optional:'(اختياري)',
    photos:'صور (حتى 3 — PNG أو JPG أو WebP — بحد أقصى 1 ميجا للصورة)', addPhotos:'إضافة صور', submitReview:'مشاركة المراجعة', shop:'المتجر',
    filters:'الفلاتر', loadMore:'عرض المزيد', total:'الإجمالي',
    spDelivery:'التوصيل العادي:', spDeliveryTxt:'من 7 إلى 10 أيام عمل.', spFees:'الرسوم:',
    spFeesTxt:'تُحسب رسوم الشحن عند الدفع، وقد يتوفر شحن مجاني فوق مبلغ معين.',
    spPack:'التغليف:', spPackTxt:'يتم تغليف كل طلب بعناية ليصلك بأمان.', spReq:'متطلبات التوصيل:',
    spReqTxt:'برجاء كتابة عنوان دقيق ورقم هاتف شغال.', spTrack:'التتبع والإشعارات:',
    spTrackTxt:'سيتم إشعارك في كل مرحلة من مراحل طلبك.', spCancel:'الإلغاء والتعديل:',
    spCancelTxt:'خلال 24 ساعة من الطلب، ولا يمكن الإلغاء بعد الشحن.', spReturn:'الإرجاع:',
    spReturnTxt:'خلال 7 أيام من الاستلام حسب سياسة الاسترداد.',
    yourCart:'سلتك', cartActions:'إجراءات السلة', shareCart:'مشاركة السلة', exportCart:'تصدير السلة', importCart:'استيراد سلة',
    cartEmpty:'سلتك فاضية', continueShopping:'متابعة التسوق', orderSummary:'ملخص الطلب', subtotal:'المجموع الفرعي',
    shippingAtCheckout:'يتم حساب الشحن عند إتمام الطلب.', checkout:'إتمام الطلب', signInTab:'تسجيل الدخول', signUpTab:'حساب جديد',
    continueGoogle:'المتابعة بحساب Google', or:'أو', email:'البريد الإلكتروني', password:'كلمة المرور', forgot:'نسيت كلمة المرور؟',
    signInBtn:'تسجيل الدخول', signUpBtn:'إنشاء حساب', signOut:'تسجيل الخروج', stepShipping:'معلومات الشحن', stepReview:'مراجعة الطلب والدفع',
    shippingAddress:'عنوان الشحن', fullName:'الاسم بالكامل', area:'المنطقة', district:'الحي', street:'الشارع', building:'المبنى',
    floor:'الدور', apartment:'الشقة', governorate:'المحافظة', country:'الدولة', contactInfo:'بيانات التواصل',
    fulfillment:'طريقة الاستلام', delivery:'توصيل', pickup:'استلام من المتجر', continueToPayment:'المتابعة للدفع',
    backToShipping:'رجوع لمعلومات الشحن', paymentMethod:'طريقة الدفع', onlinePayment:'دفع أونلاين (كروت أو محافظ إلكترونية)',
    cod:'الدفع عند الاستلام', paymentOption:'خيار الدفع', payDeposit:'دفع عربون', payFull:'دفع المبلغ كامل', iAgree:'أوافق على',
    privacy:'سياسة الخصوصية', terms:'شروط الخدمة', refund:'سياسة الاسترداد', shippingPolicy:'سياسة الشحن', addons:'الإضافات',
    shipping:'الشحن', depositAmount:'مبلغ العربون', securePay:'دفع آمن', viewOrderDetails:'عرض تفاصيل الطلب',
    card:'بطاقة', wallet:'محفظة', cardNumber:'رقم الكارت', expiry:'شهر / سنة', instantRefund:'تفعيل الاسترداد الفوري',
    walletNumber:'رقم المحفظة', walletNetworks:'الشبكات المقبولة: فودافون كاش، WE Pay، ميزة، أورنج كاش، اتصالات كاش',
    thanksTitle:'شكرًا على طلبك!', orderNumber:'رقم الطلب', thanksText:'هنتواصل معاكي قريبًا لتأكيد الطلب.',
    noOrders:'مفيش طلبات لحد دلوقتي', orderFilters:'فلاتر الطلبات', sortBy:'ترتيب حسب', sortNewest:'الأحدث', sortPriceAsc:'السعر: الأقل للأعلى',
    sortPriceDesc:'السعر: الأعلى للأقل', sortName:'الاسم أ-ي', category:'القسم', priceRange:'نطاق السعر', inStockOnly:'المتوفر فقط',
    onSaleOnly:'المخفّض فقط', newOnly:'الوصول الحديث فقط', resetAll:'إعادة ضبط', applyFilters:'تطبيق الفلاتر',
    footerTag:'الجمال. العناية. الثقة التي يمكنك الشعور بها.', contactUs:'اتصلي بنا', locations:'المواقع', onlineOnly:'متجر أونلاين فقط',
    added:'تمت الإضافة إلى السلة 💕', soldOut:'نفد', selectOptions:'اختاري الخيارات', addCartBtn:'إضافة إلى السلة', off:'خصم', newBadge:'جديد',
    showing:'عرض', of:'من', pageSize:'حجم الصفحة', inStock:'متوفر، جاهز للشحن', outStock:'غير متوفر', pickOpts:'من فضلك اختاري كل الخيارات',
    fillReq:'من فضلك املئي كل الحقول المطلوبة', badPhone:'من فضلك اكتبي رقم هاتف صحيح', rateReq:'من فضلك اختاري التقييم',
    photoMax:'تقدري تضيفي لحد 3 صور', photoType:'مسموح فقط بصور PNG أو JPG أو WebP', photoSize:'حجم كل صورة لازم يكون 1 ميجا أو أقل',
    reviewThanks:'شكرًا لمشاركتك تجربتك 💕', passMin:'كلمة المرور لازم تكون 6 حروف على الأقل', userExists:'الإيميل ده مسجل قبل كده',
    badCreds:'الإيميل أو كلمة المرور غلط', signedIn:'تم تسجيل الدخول', signedOut:'تم تسجيل الخروج', googleSoon:'تسجيل Google محتاج ربط باك إند (زي Firebase)',
    forgotSoon:'استعادة كلمة المرور محتاجة ربط باك إند (زي Firebase)', linkCopied:'تم نسخ الرابط', cartImported:'تم استيراد السلة', cartImportErr:'مقدرناش نقرا ملف السلة',
    payDepositBtn:'ادفعي العربون', payFullBtn:'ادفعي المبلغ كامل', placeOrder:'تأكيد الطلب (الدفع عند الاستلام)', rest:'والباقي عند التسليم',
    agreeAll:'من فضلك وافقي على كل السياسات للمتابعة', customer:'العميل', deliveryAddress:'عنوان التوصيل', call:'اتصال', view:'عرض',
    items:'منتجات', noResults:'مفيش نتايج', expected:'موعد التسليم المتوقع', payStatus:'الدفع', method:'الطريقة', date:'التاريخ', status:'الحالة',
    cancelConfirm:'تأكيد إلغاء الطلب؟', orderCancelled:'تم إلغاء الطلب', cannotCancel:'مينفعش إلغاء الطلب ده دلوقتي',
    badCard:'راجعي بيانات الكارت', badWallet:'اكتبي رقم محفظة صحيح', pay:'ادفعي', egp:'جنيه', free:'مجاني', cartEmptyToast:'سلتك فاضية',
    allCats:'الكل', cat:'القسم', filterEmpty:'مفيش منتجات مطابقة للفلاتر', details:'التفاصيل', orderN:'طلب', fav:'تمت الإضافة للمفضلة',
    unfav:'تم الحذف من المفضلة', shared:'تمت المشاركة', mustAcceptPrivacy:'من فضلك وافقي على السياسات'
  }
};

const ORDER_STATUS = {
  pending:{en:'Pending',ar:'قيد الانتظار'}, processing:{en:'Processing',ar:'قيد التجهيز'}, confirmed:{en:'Confirmed',ar:'تم التأكيد'},
  shipped:{en:'Shipped',ar:'تم الشحن'}, out_for_delivery:{en:'Out for Delivery',ar:'خرج للتوصيل'}, delivered:{en:'Delivered',ar:'تم التسليم'},
  ready_for_pickup:{en:'Ready for Pick Up',ar:'جاهز للاستلام'}, cancelled:{en:'Cancelled',ar:'ملغي'}, refunded:{en:'Refunded',ar:'تم الاسترداد'}
};
const PAY_STATUS = {
  pending:{en:'Pending',ar:'قيد الانتظار'}, partial:{en:'Deposit Paid',ar:'تم دفع العربون'}, completed:{en:'Completed',ar:'مكتمل'},
  cancelled:{en:'Cancelled',ar:'ملغي'}, refunded:{en:'Refunded',ar:'تم الاسترداد'}
};
const TRACK = ['processing','confirmed','shipped','out_for_delivery','delivered'];

const GOVERNORATES = [
  ['Cairo','القاهرة'],['Giza','الجيزة'],['Alexandria','الإسكندرية'],['Dakahlia','الدقهلية'],['Red Sea','البحر الأحمر'],['Beheira','البحيرة'],
  ['Fayoum','الفيوم'],['Gharbia','الغربية'],['Ismailia','الإسماعيلية'],['Monufia','المنوفية'],['Minya','المنيا'],['Qalyubia','القليوبية'],
  ['New Valley','الوادي الجديد'],['Suez','السويس'],['Aswan','أسوان'],['Assiut','أسيوط'],['Beni Suef','بني سويف'],['Port Said','بورسعيد'],
  ['Damietta','دمياط'],['Sharqia','الشرقية'],['South Sinai','جنوب سيناء'],['Kafr El Sheikh','كفر الشيخ'],['Matrouh','مطروح'],
  ['Luxor','الأقصر'],['Qena','قنا'],['North Sinai','شمال سيناء'],['Sohag','سوهاج']
];

/* ---------------------------------------------------
   3) الأقسام والمنتجات (بيانات تجريبية — بدّلها ببياناتك)
--------------------------------------------------- */
const CATEGORIES = [
  { id:'boxes', en:'Boxes', ar:'بوكسات' },
  { id:'makeup', en:'Makeup', ar:'مكياج', subs:[
    {id:'all',en:'All Makeup',ar:'كل المكياج'},{id:'face',en:'Face',ar:'الوجه'},{id:'eyes',en:'Eyes',ar:'العيون'},
    {id:'lips',en:'Lips',ar:'الشفايف'},{id:'tools',en:'Tools & Brushes',ar:'أدوات وفرش'} ] },
  { id:'splash-lotion', en:'Splash & Lotion', ar:'سبلاش ولوشن' },
  { id:'body-care', en:'Body Care', ar:'العناية بالجسم' },
  { id:'perfumes', en:'Perfumes', ar:'عطور', subs:[
    {id:'all',en:'All Perfumes',ar:'كل العطور'},{id:'mini',en:'Mini Size',ar:'مقاس صغير'},{id:'tester-turkey',en:'Tester Turkey',ar:'تستر تركي'},
    {id:'mirror-original',en:'Mirror Original',ar:'ميرور أوريجينال'},{id:'emarat',en:'Emarat Edition',ar:'إصدار الإمارات'} ] },
  { id:'nails', en:'Nails', ar:'أظافر' },
  { id:'hair-care', en:'Hair Care', ar:'العناية بالشعر' },
  { id:'offers', en:'Offers', ar:'عروض' },
  { id:'skin-care', en:'Skin Care', ar:'العناية بالبشرة' },
  { id:'accessories', en:'Accessories', ar:'إكسسوارات' }
];

// [قسم, فرع, اسم EN, اسم AR, سعر, سعر قديم, علامات: n=جديد b=أكثر مبيعًا s=نفد o=ليه اختيارات]
const PRODUCT_SEED = [
  ['boxes','','Glow Gift Box','بوكس الجلو',450,0,'nb'],
  ['boxes','','Self-Care Box','بوكس العناية',380,0,'b'],
  ['boxes','','Romantic Box','بوكس رومانسي',520,600,''],
  ['makeup','face','Velvet Foundation','فاونديشن مخملي',320,0,'bo'],
  ['makeup','face','Rose Blush','بلاشر وردي',180,0,'n'],
  ['makeup','face','Setting Powder','بودرة تثبيت',210,250,''],
  ['makeup','eyes','Volume Mascara','ماسكارا كثافة',160,0,'b'],
  ['makeup','eyes','Nude Eyeshadow Palette','باليت ظلال نيود',290,0,'n'],
  ['makeup','lips','Matte Lipstick','روج مات',140,0,'bo'],
  ['makeup','lips','Glossy Lip Oil','زيت شفايف لامع',120,150,''],
  ['makeup','tools','Brush Set (10 pcs)','طقم فرش (10 قطع)',350,0,'n'],
  ['splash-lotion','','Vanilla Body Splash','سبلاش فانيليا',199,0,'b'],
  ['splash-lotion','','Cherry Blossom Lotion','لوشن زهر الكرز',175,0,''],
  ['splash-lotion','','Coconut Splash','سبلاش جوز الهند',199,0,'n'],
  ['body-care','','Shea Body Butter','زبدة الشيا للجسم',230,0,'b'],
  ['body-care','','Rose Body Scrub','سكراب الورد',160,200,''],
  ['body-care','','Shower Gel','شاور جل',110,0,''],
  ['perfumes','mini','Mini Floral Perfume','عطر زهري ميني',150,0,'n'],
  ['perfumes','mini','Mini Oud Perfume','عطر عود ميني',170,0,''],
  ['perfumes','tester-turkey','Tester Musk Perfume','تستر مسك',420,0,''],
  ['perfumes','mirror-original','Mirror Original Amber','ميرور أوريجينال عنبر',650,0,'b'],
  ['perfumes','emarat','Emarat Edition Oud','إصدار الإمارات عود',780,900,'s'],
  ['perfumes','emarat','Emarat Edition Rose','إصدار الإمارات ورد',760,0,'n'],
  ['nails','','Gel Nail Polish','أكريلك جل',90,0,'bo'],
  ['nails','','Press-on Nails','أظافر لصق',130,0,'n'],
  ['nails','','Nail Care Kit','طقم عناية بالأظافر',150,0,''],
  ['hair-care','','Argan Hair Oil','زيت أرجان للشعر',210,0,'b'],
  ['hair-care','','Silk Hair Mask','ماسك الشعر الحريري',240,280,''],
  ['hair-care','','Scalp Serum','سيروم فروة الرأس',260,0,'n'],
  ['skin-care','','Vitamin C Serum','سيروم فيتامين سي',340,0,'b'],
  ['skin-care','','Hydrating Cleanser','غسول مرطب',190,0,''],
  ['skin-care','','Sunscreen SPF50','واقي شمس SPF50',250,0,'n'],
  ['skin-care','','Night Cream','كريم ليلي',310,380,''],
  ['accessories','','Pearl Hair Clip','كليب لؤلؤ',60,0,'n'],
  ['accessories','','Makeup Bag','شنطة مكياج',140,0,''],
  ['accessories','','Gold Hoop Earrings','حلق دهبي',95,0,'b']
];

const OPTION_SETS = {
  makeup: [{k:'shade',en:'Shade',ar:'الدرجة',values:[['Rose','وردي'],['Nude','نيود'],['Berry','توتي']]}],
  nails:  [{k:'color',en:'Color',ar:'اللون',values:[['Pink','وردي'],['Red','أحمر'],['Nude','نيود']]}]
};

const ph = (label, i) => {
  const h = (i * 47 + 340) % 360;
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='600' height='600'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='hsl(${h},45%,90%)'/><stop offset='1' stop-color='hsl(${(h + 25) % 360},40%,74%)'/></linearGradient></defs><rect width='600' height='600' fill='url(#g)'/><circle cx='300' cy='300' r='130' fill='rgba(255,255,255,.5)'/><text x='300' y='350' font-size='130' text-anchor='middle' fill='#a76a72' font-family='Georgia,serif'>${label}</text></svg>`;
  return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
};

const PRODUCTS = PRODUCT_SEED.map((r, i) => {
  const [cat, sub, en, ar, price, old, f] = r;
  return {
    id: 'p' + (i + 1), sku: 'LY-' + String(1000 + i), order: i,
    cat, sub, en, ar, price, old: old || 0,
    isNew: f.includes('n'), best: f.includes('b'), soldout: f.includes('s'),
    options: f.includes('o') ? OPTION_SETS[cat] : null,
    imgs: [ph(en[0], i), ph(en[0], i + 3), ph(en[0], i + 6)],
    desc: {
      en: `${en} from ${CONFIG.storeName}. Carefully selected to bring out your natural beauty. Replace this text with your real product description.`,
      ar: `${ar} من ${CONFIG.storeName}. مختارة بعناية لتبرز جمالك الطبيعي. بدّلي النص ده بوصف المنتج الحقيقي.`
    }
  };
});

const INFO_PAGES = {
  about:   { t:{en:'About Leyla Store',ar:'عن ليلى ستور'}, b:{en:'<p>Leyla Store is an online beauty and personal care store. We bring you carefully selected products to help you feel confident every day.</p>',ar:'<p>ليلى ستور متجر أونلاين للجمال والعناية الشخصية. بنقدملك منتجات مختارة بعناية علشان تحسي بالثقة كل يوم.</p>'} },
  linkhub: { t:{en:'Link Hub',ar:'روابطنا'}, b:{en:'<p>Find all our links here.</p>',ar:'<p>كل روابطنا في مكان واحد.</p>'} },
  contact: { t:{en:'Contact Us',ar:'اتصلي بنا'}, b:{en:`<p>Email: ${CONFIG.email}</p><p dir="ltr">Phone: ${CONFIG.phone}</p>`,ar:`<p>الإيميل: ${CONFIG.email}</p><p>الهاتف: <span dir="ltr">${CONFIG.phone}</span></p>`} },
  faqs:    { t:{en:'FAQs',ar:'الأسئلة الشائعة'}, b:{en:'<h2>How long does delivery take?</h2><p>7-10 business days.</p><h2>Can I cancel my order?</h2><p>Yes, within 24 hours and before shipping.</p><h2>Can I return a product?</h2><p>Within 7 days of delivery, per our refund policy.</p>',ar:'<h2>التوصيل بياخد قد إيه؟</h2><p>من 7 إلى 10 أيام عمل.</p><h2>أقدر ألغي الطلب؟</h2><p>أيوه، خلال 24 ساعة وقبل الشحن.</p><h2>أقدر أرجّع المنتج؟</h2><p>خلال 7 أيام من الاستلام حسب سياسة الاسترداد.</p>'} },
  posts:   { t:{en:'Posts',ar:'المنشورات'}, b:{en:'<p>No posts yet.</p>',ar:'<p>لا توجد منشورات بعد.</p>'} },
  privacy: { t:{en:'Privacy Policy',ar:'سياسة الخصوصية'}, b:{en:'<p>Write your privacy policy here.</p>',ar:'<p>اكتبي سياسة الخصوصية هنا.</p>'} },
  terms:   { t:{en:'Terms of Service',ar:'شروط الخدمة'}, b:{en:'<p>Write your terms of service here.</p>',ar:'<p>اكتبي شروط الخدمة هنا.</p>'} },
  refund:  { t:{en:'Refund Policy',ar:'سياسة الاسترداد'}, b:{en:'<p>Returns are accepted within 7 days of delivery. Write the full policy here.</p>',ar:'<p>الإرجاع متاح خلال 7 أيام من الاستلام. اكتبي السياسة كاملة هنا.</p>'} },
  shipping:{ t:{en:'Shipping Policy',ar:'سياسة الشحن'}, b:{en:'<p>Standard delivery takes 7-10 business days. Write the full policy here.</p>',ar:'<p>التوصيل العادي من 7 إلى 10 أيام عمل. اكتبي السياسة كاملة هنا.</p>'} },
  cancel:  { t:{en:'Cancel an Order',ar:'إلغاء طلب'}, b:{en:'<p>Orders can be cancelled within 24 hours of placing them, before shipping. Open My Orders and use the settings icon on the order.</p>',ar:'<p>ممكن تلغي الطلب خلال 24 ساعة من تقديمه وقبل الشحن. افتحي طلباتي واستخدمي أيقونة الإعدادات على الطلب.</p>'} }
};

/* ---------------------------------------------------
   4) أدوات مساعدة
--------------------------------------------------- */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[c]));
const store = {
  get(k, d) { try { const v = localStorage.getItem('leyla_' + k); return v ? JSON.parse(v) : d; } catch { return d; } },
  set(k, v) { try { localStorage.setItem('leyla_' + k, JSON.stringify(v)); return true; } catch { return false; } }
};
const norm = s => String(s || '').toLowerCase().replace(/[أإآ]/g, 'ا').replace(/ة/g, 'ه').replace(/ى/g, 'ي');
const el = id => document.getElementById(id);

let lang = store.get('lang', 'ar');
let theme = store.get('theme', 'light');
const t = k => (T[lang] && T[lang][k]) || T.en[k] || k;
const L = o => o[lang] || o.en;
const pname = p => (lang === 'ar' ? p.ar : p.en);
const catById = id => CATEGORIES.find(c => c.id === id);
const prodById = id => PRODUCTS.find(p => p.id === id);
const fmt = n => (lang === 'ar' ? `${Number(n).toLocaleString('en-US')} جنيه` : `EGP ${Number(n).toLocaleString('en-US')}`);
const fmtDate = (d, withTime) => new Date(d).toLocaleString(lang === 'ar' ? 'ar-EG' : 'en-GB',
  withTime ? { dateStyle: 'medium', timeStyle: 'short' } : { dateStyle: 'medium' });
const salePct = p => (p.old ? Math.round((1 - p.price / p.old) * 100) : 0);

let toastTimer;
function toast(msg) {
  const x = el('toast'); x.textContent = msg; x.classList.add('show');
  clearTimeout(toastTimer); toastTimer = setTimeout(() => x.classList.remove('show'), 2600);
}

async function sha(s) {
  try {
    if (crypto && crypto.subtle) {
      const b = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(s));
      return [...new Uint8Array(b)].map(x => x.toString(16).padStart(2, '0')).join('');
    }
  } catch {}
  return btoa(unescape(encodeURIComponent(s)));
}

/* ---------------------------------------------------
   5) الحالة العامة
--------------------------------------------------- */
let cart = store.get('cart', []);
let user = store.get('user', null);
let favs = store.get('favs', []);
let orders = store.get('orders', []);
let ordersView = store.get('ordersView', 'large');
let pendingOrder = null;
try { pendingOrder = JSON.parse(sessionStorage.getItem('leyla_pending') || 'null'); } catch {}

const SEED_REVIEWS = [
  { name:'Sara M.', date:'2026-09-12', rating:5, text:'المنتجات جميلة جدًا والتغليف شيك! Everything arrived perfectly.', photos:[] },
  { name:'Nour A.', date:'2026-10-03', rating:5, text:'أحلى سيروم جربته، والتوصيل كان سريع.', photos:[] },
  { name:'Habiba K.', date:'2026-10-21', rating:4, text:'Loved the perfume, long lasting and elegant.', photos:[] }
];
let reviews = store.get('reviews', []);

/* ---------------------------------------------------
   6) اللغة والثيم
--------------------------------------------------- */
function applyLang() {
  const h = document.documentElement;
  h.lang = lang; h.dir = lang === 'ar' ? 'rtl' : 'ltr';
  $$('[data-i18n]').forEach(n => { const v = T[lang][n.dataset.i18n]; if (v) n.textContent = v; });
  $$('[data-i18n-ph]').forEach(n => { const v = T[lang][n.dataset.i18nPh]; if (v) n.placeholder = v; });
  $$('[data-lang]').forEach(b => b.classList.toggle('active', b.dataset.lang === lang));
  document.title = lang === 'ar' ? 'ليلى ستور | Leyla Store' : 'Leyla Store | ليلى ستور';
  el('year').textContent = new Date().getFullYear();
  el('footEmail').textContent = CONFIG.email; el('footEmail').href = 'mailto:' + CONFIG.email;
  el('footPhone').textContent = CONFIG.phone; el('footPhone').href = 'tel:' + CONFIG.phone.replace(/\s/g, '');
  el('socTiktok').href = CONFIG.tiktok; el('socInsta').href = CONFIG.instagram; el('socFb').href = CONFIG.facebook;
}
function applyTheme() { document.documentElement.dataset.theme = theme; }
function setLang(l) { lang = l; store.set('lang', l); applyLang(); renderStatic(); route(); }
function toggleTheme() { theme = theme === 'dark' ? 'light' : 'dark'; store.set('theme', theme); applyTheme(); }

/* ---------------------------------------------------
   7) الطبقات (قائمة / بحث / دروار / مودال)
--------------------------------------------------- */
const overlay = el('overlay');
function openLayer(node, useOverlay = true) {
  closeLayers();
  node.classList.add('open'); node.setAttribute('aria-hidden', 'false');
  if (useOverlay) overlay.classList.add('open');
  document.body.classList.add('no-scroll');
}
function closeLayers() {
  ['sideMenu', 'searchScreen', 'filtersDrawer', 'orderFiltersDrawer', 'optionsModal'].forEach(id => {
    const n = el(id); n.classList.remove('open'); n.setAttribute('aria-hidden', 'true');
  });
  overlay.classList.remove('open'); document.body.classList.remove('no-scroll');
}
overlay.addEventListener('click', closeLayers);
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLayers(); });

/* ---------------------------------------------------
   8) رسم الكروت
--------------------------------------------------- */
function cardHTML(p) {
  const sale = salePct(p);
  const badges = [
    p.soldout ? `<span class="badge soldout">${t('soldOut')}</span>` : '',
    p.isNew ? `<span class="badge new">${t('newBadge')}</span>` : '',
    sale ? `<span class="badge sale">${lang === 'ar' ? `خصم ${sale}%` : `${sale}% ${t('off')}`}</span>` : ''
  ].join('');
  let btn;
  if (p.soldout) btn = `<button class="btn btn-outline pc-btn" disabled>${t('soldOut')}</button>`;
  else if (p.options) btn = `<button class="btn btn-outline pc-btn" data-opts="${p.id}">${t('selectOptions')}</button>`;
  else btn = `<button class="btn btn-primary pc-btn" data-add="${p.id}">${t('addCartBtn')}</button>`;
  return `<article class="product-card${p.soldout ? ' soldout' : ''}">
    <a class="pc-img" href="#/product/${p.id}"><img src="${p.imgs[0]}" alt="${esc(pname(p))}" loading="lazy"><div class="pc-badges">${badges}</div></a>
    <div class="pc-body"><a class="pc-name" href="#/product/${p.id}">${esc(pname(p))}</a>
      <div class="pc-price"><span class="price">${fmt(p.price)}</span>${p.old ? `<span class="old-price">${fmt(p.old)}</span>` : ''}</div>${btn}</div></article>`;
}
function catCardHTML(c) {
  const n = c.subs ? c.subs.length - 1 : 0;
  const i = CATEGORIES.indexOf(c);
  return `<a class="cat-card" href="#/shop?category=${c.id}"><img class="cat-img" src="${ph(c.en[0], i)}" alt="${esc(c.en)}">
    ${n ? `<span class="cat-count">${n}</span>` : ''}<span class="cat-name">${esc(lang === 'ar' ? c.ar : c.en)}<span class="cat-name-ar">${esc(lang === 'ar' ? c.en : c.ar)}</span></span></a>`;
}
const fill = (id, html) => { const n = el(id); if (n) n.innerHTML = html; };

/* ---------------------------------------------------
   9) العناصر الثابتة (قائمة جانبية، بحث، فلاتر، محافظات)
--------------------------------------------------- */
function renderStatic() {
  fill('sideCategories', CATEGORIES.map(c => {
    const name = esc(L(c));
    if (!c.subs) return `<li><a href="#/shop?category=${c.id}">${name}</a></li>`;
    return `<li class="side-item"><button class="side-item-head" data-toggle-sub>${name}<span class="arrow">›</span></button>
      <div class="side-sub">${c.subs.map(s => `<a href="#/shop?category=${c.id}${s.id === 'all' ? '' : '&sub=' + s.id}">${esc(L(s))}</a>`).join('')}</div></li>`;
  }).join(''));
  fill('searchCats', CATEGORIES.map((c, i) => `<a class="search-cat" href="#/shop?category=${c.id}"><img src="${ph(c.en[0], i)}" alt="">${esc(L(c))}</a>`).join(''));
  fill('fCategories', CATEGORIES.map(c => `<label class="chip-check"><input type="checkbox" value="${c.id}"><span>${esc(L(c))}</span></label>`).join(''));
  const govOpts = GOVERNORATES.map(g => `<option value="${g[0]}">${lang === 'ar' ? g[1] : g[0]}</option>`).join('');
  const cur = el('shGov').value; fill('shGov', govOpts); if (cur) el('shGov').value = cur;
  const curF = el('ofGov').value; fill('ofGov', `<option value="">${t('allCats')}</option>` + govOpts); el('ofGov').value = curF;
  el('signInLink').hidden = !!user;
}

/* ---------------------------------------------------
   10) السلة
--------------------------------------------------- */
function saveCart() { store.set('cart', cart); updateCartUI(); }
function cartCount() { return cart.reduce((s, i) => s + i.qty, 0); }
function updateCartUI() {
  const n = cartCount();
  ['cartCount', 'cartCountSide'].forEach(id => { el(id).textContent = n; el(id).hidden = n === 0; });
}
function addToCart(id, qty = 1, opts = {}) {
  const p = prodById(id); if (!p || p.soldout) return;
  const key = id + '|' + JSON.stringify(opts);
  const it = cart.find(i => i.key === key);
  if (it) it.qty += qty; else cart.push({ key, id, qty, opts });
  saveCart(); toast(t('added'));
}
function cartLines() { return cart.map(i => ({ ...i, p: prodById(i.id) })).filter(i => i.p); }
function cartSubtotal() { return cartLines().reduce((s, i) => s + i.p.price * i.qty, 0); }
function optsText(p, opts) {
  if (!p.options) return '';
  return p.options.map(g => {
    const v = opts[g.k]; if (!v) return '';
    const pair = g.values.find(x => x[0] === v);
    return `${L(g)}: ${pair ? (lang === 'ar' ? pair[1] : pair[0]) : v}`;
  }).filter(Boolean).join(' • ');
}

function renderCart() {
  const lines = cartLines();
  el('cartItemsCount').textContent = `(${cartCount()})`;
  el('cartEmpty').hidden = lines.length > 0; el('cartFull').hidden = lines.length === 0;
  fill('cartItems', lines.map((i, idx) => `<div class="cart-item">
    <a href="#/product/${i.p.id}"><img src="${i.p.imgs[0]}" alt=""></a>
    <div><a class="ci-name" href="#/product/${i.p.id}">${esc(pname(i.p))}</a><div class="ci-opt">${esc(optsText(i.p, i.opts))}</div><div class="price">${fmt(i.p.price * i.qty)}</div></div>
    <div class="ci-side"><div class="qty"><button data-ci-dec="${idx}">−</button><span>${i.qty}</span><button data-ci-inc="${idx}">+</button></div>
    <button class="ci-remove" data-ci-del="${idx}">✕ ${lang === 'ar' ? 'حذف' : 'Remove'}</button></div></div>`).join(''));
  el('cartSubtotal').textContent = fmt(cartSubtotal());
}
function importCartData(data) {
  try {
    const arr = Array.isArray(data) ? data : JSON.parse(data);
    const clean = arr.filter(i => prodById(i.id)).map(i => ({ key: i.id + '|' + JSON.stringify(i.opts || {}), id: i.id, qty: Math.max(1, Math.min(99, +i.qty || 1)), opts: i.opts || {} }));
    if (!clean.length) throw 0;
    cart = clean; saveCart(); renderCart(); toast(t('cartImported'));
  } catch { toast(t('cartImportErr')); }
}
const copyText = async txt => { try { await navigator.clipboard.writeText(txt); toast(t('linkCopied')); } catch { prompt('', txt); } };

/* ---------------------------------------------------
   11) السلايدرز + الصفحة الرئيسية
--------------------------------------------------- */
function renderHome() {
  fill('catSlider', CATEGORIES.map(catCardHTML).join(''));
  fill('newSlider', PRODUCTS.filter(p => p.isNew).map(cardHTML).join(''));
  fill('discountSlider', PRODUCTS.filter(p => p.old).map(cardHTML).join(''));
  fill('bestSlider', PRODUCTS.filter(p => p.best).map(cardHTML).join(''));
  fill('categorySections', CATEGORIES.filter(c => c.id !== 'offers' && PRODUCTS.some(p => p.cat === c.id)).map(c => `
    <section class="block"><div class="block-head"><h2>${esc(L(c))}</h2>
    <a href="#/shop?category=${c.id}" class="btn btn-outline btn-sm">${t('viewMore')}</a></div>
    <div class="slider-wrap"><button class="slide-arrow prev" data-slider="sec_${c.id}">‹</button>
    <div class="slider product-slider" id="sec_${c.id}">${PRODUCTS.filter(p => p.cat === c.id).map(cardHTML).join('')}</div>
    <button class="slide-arrow next" data-slider="sec_${c.id}">›</button></div></section>`).join(''));
  renderReviews();
}
function renderReviews() {
  const all = [...reviews, ...SEED_REVIEWS];
  fill('reviewsSlider', all.map(r => `<div class="review-card">
    <div class="rv-head"><div class="rv-avatar">${esc((r.name || '?')[0].toUpperCase())}</div>
    <div><div class="rv-name">${esc(r.name)}</div><div class="rv-date">${fmtDate(r.date)}</div></div></div>
    <div class="stars">${'★'.repeat(r.rating)}<span class="off">${'★'.repeat(5 - r.rating)}</span></div>
    ${r.text ? `<p class="rv-text">${esc(r.text)}</p>` : ''}
    ${r.photos && r.photos.length ? `<div class="rv-photos">${r.photos.map(s => `<img src="${s}" alt="">`).join('')}</div>` : ''}</div>`).join(''));
}

/* ---------------------------------------------------
   12) المتجر والفلاتر
--------------------------------------------------- */
const DEFAULT_FILTERS = () => ({ sort: 'newest', cats: [], sub: '', min: '', max: '', inStock: false, onSale: false, onlyNew: false, best: false });
let shop = { key: '', f: DEFAULT_FILTERS(), visible: CONFIG.pageSize, cols: 2 };

function filteredProducts() {
  const f = shop.f;
  let list = PRODUCTS.filter(p => {
    if (f.cats.length && !f.cats.some(c => (c === 'offers' ? p.old > 0 : p.cat === c))) return false;
    if (f.sub && f.sub !== 'all' && p.sub !== f.sub) return false;
    if (f.min !== '' && p.price < +f.min) return false;
    if (f.max !== '' && p.price > +f.max) return false;
    if (f.inStock && p.soldout) return false;
    if (f.onSale && !p.old) return false;
    if (f.onlyNew && !p.isNew) return false;
    if (f.best && !p.best) return false;
    return true;
  });
  const sorts = {
    newest: (a, b) => b.order - a.order, priceAsc: (a, b) => a.price - b.price,
    priceDesc: (a, b) => b.price - a.price, nameAsc: (a, b) => pname(a).localeCompare(pname(b), lang)
  };
  return list.sort(sorts[f.sort] || sorts.newest);
}
function activeFilterCount() {
  const f = shop.f;
  return [f.cats.length > 0, f.min !== '' || f.max !== '', f.inStock, f.onSale, f.onlyNew, f.sort !== 'newest'].filter(Boolean).length;
}
function renderShop(params, key) {
  if (shop.key !== key) {
    shop.key = key; shop.f = DEFAULT_FILTERS(); shop.visible = CONFIG.pageSize;
    const c = params.get('category'); if (c && catById(c)) shop.f.cats = [c];
    shop.f.sub = params.get('sub') || '';
    const flt = params.get('filter'); if (flt === 'new') shop.f.onlyNew = true; if (flt === 'best') shop.f.best = true;
  }
  const list = filteredProducts(), shown = Math.min(shop.visible, list.length);
  const cat = shop.f.cats.length === 1 ? catById(shop.f.cats[0]) : null;
  const sub = cat && cat.subs && shop.f.sub ? cat.subs.find(s => s.id === shop.f.sub) : null;
  el('shopCrumbCat').innerHTML = cat ? ` ‹ <a href="#/shop?category=${cat.id}">${esc(L(cat))}</a>` + (sub ? ` ‹ ${esc(L(sub))}` : '') : '';
  el('shopCount').textContent = `${t('showing')} ${shown} ${t('of')} ${list.length}` + (list.length > CONFIG.pageSize ? ` • ${t('pageSize')} ${CONFIG.pageSize}` : '');
  const fc = activeFilterCount(); el('filtersCount').textContent = fc; el('filtersCount').hidden = fc === 0;
  const grid = el('shopGrid'); grid.className = 'product-grid cols-' + shop.cols;
  grid.innerHTML = list.length ? list.slice(0, shown).map(cardHTML).join('') : `<p class="muted" style="grid-column:1/-1;text-align:center;padding:40px 0">${t('filterEmpty')}</p>`;
  el('loadMoreBtn').parentElement.hidden = shown >= list.length;
  el('view1').classList.toggle('active', shop.cols === 1); el('view2').classList.toggle('active', shop.cols === 2);
}
function syncFilterUI() {
  const f = shop.f;
  el('fSort').value = f.sort; el('fMin').value = f.min; el('fMax').value = f.max;
  el('fInStock').checked = f.inStock; el('fOnSale').checked = f.onSale; el('fNew').checked = f.onlyNew;
  $$('#fCategories input').forEach(i => i.checked = f.cats.includes(i.value));
}
function applyFilterUI() {
  const f = shop.f;
  f.sort = el('fSort').value; f.min = el('fMin').value; f.max = el('fMax').value;
  f.inStock = el('fInStock').checked; f.onSale = el('fOnSale').checked; f.onlyNew = el('fNew').checked;
  f.cats = $$('#fCategories input:checked').map(i => i.value); f.sub = ''; f.best = f.best && false;
  shop.visible = CONFIG.pageSize;
}

/* ---------------------------------------------------
   13) صفحة المنتج + الخيارات
--------------------------------------------------- */
let pg = { p: null, qty: 1, sel: {}, img: 0 };

function renderOptions(container, p, sel, onChange) {
  if (!p.options) { container.hidden = true; container.innerHTML = ''; return; }
  container.hidden = false;
  container.innerHTML = p.options.map(g => `<div class="opt-group"><strong>${esc(L(g))}</strong><div class="opt-values">
    ${g.values.map(v => `<button type="button" class="opt-chip${sel[g.k] === v[0] ? ' active' : ''}" data-k="${g.k}" data-v="${v[0]}">${esc(lang === 'ar' ? v[1] : v[0])}</button>`).join('')}</div></div>`).join('');
  $$('.opt-chip', container).forEach(b => b.addEventListener('click', () => { sel[b.dataset.k] = b.dataset.v; renderOptions(container, p, sel, onChange); onChange && onChange(); }));
}
const optionsComplete = (p, sel) => !p.options || p.options.every(g => sel[g.k]);

function renderProduct(id) {
  const p = prodById(id); if (!p) return false;
  if (pg.p !== p) pg = { p, qty: 1, sel: {}, img: 0 };
  const cat = catById(p.cat), sale = salePct(p);
  el('productBreadcrumb').innerHTML = `<a href="#/">${t('home')}</a> ‹ <a href="#/shop">${t('shop')}</a> ‹ <a href="#/shop?category=${cat.id}">${esc(L(cat))}</a> ‹ <span>${esc(pname(p))}</span>`;
  el('galleryMain').src = p.imgs[pg.img]; el('galleryMain').alt = pname(p);
  fill('galleryThumbs', p.imgs.map((s, i) => `<button class="gallery-thumb${i === pg.img ? ' active' : ''}" data-thumb="${i}"><img src="${s}" alt=""></button>`).join(''));
  el('pName').textContent = pname(p);
  el('pCategory').textContent = L(cat); el('pCategory').href = `#/shop?category=${cat.id}`;
  el('pSku').textContent = p.sku;
  el('pPrice').textContent = fmt(p.price);
  el('pOldPrice').hidden = !p.old; el('pOldPrice').textContent = p.old ? fmt(p.old) : '';
  el('pBadge').hidden = !sale; el('pBadge').className = 'badge sale'; el('pBadge').textContent = sale ? (lang === 'ar' ? `خصم ${sale}%` : `${sale}% ${t('off')}`) : '';
  el('pStock').textContent = p.soldout ? t('outStock') : t('inStock'); el('pStock').classList.toggle('out', p.soldout);
  el('pDescription').textContent = p.desc[lang];
  renderOptions(el('pOptions'), p, pg.sel);
  el('qtyVal').textContent = pg.qty; el('pTotal').textContent = fmt(p.price * pg.qty);
  const addLabel = p.soldout ? t('soldOut') : (lang === 'ar' ? 'إضافة إلى السلة' : 'ADD TO CART');
  [el('addToCartBtn'), el('stickyAddBtn')].forEach(b => { b.textContent = addLabel; b.disabled = p.soldout; });
  el('stickyName').textContent = pname(p); el('stickyPrice').textContent = fmt(p.price);
  el('favBtn').textContent = favs.includes(p.id) ? '❤️' : '🤍';
  fill('relatedSlider', PRODUCTS.filter(x => x.cat === p.cat && x.id !== p.id).concat(PRODUCTS.filter(x => x.cat !== p.cat)).slice(0, 10).map(cardHTML).join(''));
  return true;
}
function addFromProductPage() {
  const p = pg.p; if (!p || p.soldout) return;
  if (!optionsComplete(p, pg.sel)) return toast(t('pickOpts'));
  addToCart(p.id, pg.qty, { ...pg.sel });
}

// مودال اختيار الخيارات
let om = { p: null, qty: 1, sel: {} };
function openOptionsModal(id) {
  const p = prodById(id); if (!p) return;
  om = { p, qty: 1, sel: {} };
  el('omImg').src = p.imgs[0]; el('omName').textContent = pname(p); el('omPrice').textContent = fmt(p.price);
  el('omQty').textContent = 1; el('omError').hidden = true;
  renderOptions(el('omOptions'), p, om.sel);
  openLayer(el('optionsModal'), false);
}

/* ---------------------------------------------------
   14) البحث
--------------------------------------------------- */
function openSearch() { openLayer(el('searchScreen'), false); el('searchInput').focus(); runSearch(); }
function highlight(text, q) {
  const i = norm(text).indexOf(q);
  if (!q || i < 0) return esc(text);
  return esc(text.slice(0, i)) + '<mark>' + esc(text.slice(i, i + q.length)) + '</mark>' + esc(text.slice(i + q.length));
}
function runSearch() {
  const raw = el('searchInput').value.trim(), q = norm(raw);
  el('searchClear').classList.toggle('show', raw.length > 0);
  el('searchDefault').hidden = raw.length > 0; el('searchResults').hidden = raw.length === 0;
  if (!raw) return;
  const res = PRODUCTS.filter(p => norm(p.en).includes(q) || norm(p.ar).includes(q) || norm(p.sku).includes(q) || norm(catById(p.cat).en + ' ' + catById(p.cat).ar).includes(q)).slice(0, 30);
  el('searchResults').innerHTML = res.length ? res.map(p => `<a class="search-item" href="#/product/${p.id}"><img src="${p.imgs[0]}" alt="">
    <div><div class="si-title">${highlight(pname(p), q)}</div><div class="si-cat">${esc(L(catById(p.cat)))}</div></div>
    <div class="si-price${p.soldout ? ' out' : ''}">${p.soldout ? t('outStock') : fmt(p.price)}</div></a>`).join('') : `<p class="muted" style="text-align:center;padding:30px 0">${t('noResults')}</p>`;
}

/* ---------------------------------------------------
   15) الحساب
--------------------------------------------------- */
function renderAccount() {
  el('accName').textContent = user ? user.name : '-'; el('accEmail').textContent = user ? user.email : '-'; el('accPhone').textContent = user ? (user.phone || '-') : '-';
  el('signOutBtn').hidden = !user;
}
const showErr = (id, msg) => { const n = el(id); n.textContent = msg; n.hidden = !msg; };
const validPhone = v => /^\+?\d{10,15}$/.test(String(v).replace(/[\s-]/g, ''));

/* ---------------------------------------------------
   16) إتمام الطلب
--------------------------------------------------- */
let checkoutData = null;
const payMethod = () => (document.querySelector('[name=payMethod]:checked') || {}).value || 'online';
const payOption = () => (document.querySelector('[name=payOption]:checked') || {}).value || 'deposit';
const fulfillmentVal = () => (document.querySelector('[name=fulfillment]:checked') || {}).value || 'delivery';

function totals() {
  const subtotal = cartSubtotal();
  const shipping = fulfillmentVal() === 'pickup' ? 0 : (CONFIG.freeShippingFrom && subtotal >= CONFIG.freeShippingFrom ? 0 : CONFIG.shippingFee);
  const total = subtotal + shipping;
  const deposit = Math.round(total * CONFIG.depositRate);
  return { subtotal, shipping, total, deposit };
}
function renderCheckoutSummary() {
  const s = totals(), online = payMethod() === 'online', dep = payOption() === 'deposit';
  el('sumSubtotal').textContent = fmt(s.subtotal);
  el('sumShipping').textContent = s.shipping ? fmt(s.shipping) : t('free');
  el('sumTotal').textContent = fmt(s.total); el('sumDeposit').textContent = fmt(s.deposit);
  el('sumDepositRow').hidden = !(online && dep);
  el('depositHint').textContent = `${fmt(s.deposit)} / ${fmt(s.total)} — ${t('rest')}`;
  el('sumAddons').textContent = '-';
  // خيار الدفع يظهر مع الدفع أونلاين فقط
  const grp = document.querySelector('[name=payOption]').closest('.radio-group');
  grp.hidden = !online; grp.previousElementSibling.hidden = !online;
  const amount = online ? (dep ? s.deposit : s.total) : 0;
  el('payBtn').textContent = online ? `${dep ? t('payDepositBtn') : t('payFullBtn')} ${amount.toLocaleString('en-US')}` : t('placeOrder');
  el('payBtn').disabled = !['agreePrivacy', 'agreeTerms', 'agreeRefund', 'agreeShipping'].every(id => el(id).checked);
}
function showCheckoutStep(n) {
  el('shippingForm').hidden = n !== 1; el('reviewStep').hidden = n !== 2;
  el('stepDot1').classList.toggle('active', n === 1); el('stepDot1').classList.toggle('done', n === 2);
  el('stepDot2').classList.toggle('active', n === 2);
  if (n === 2) renderCheckoutSummary();
}
function renderCheckout() {
  if (!cartLines().length) { location.hash = '#/cart'; return false; }
  if (user && !el('shName').value) { el('shName').value = user.name || ''; el('shEmail').value = user.email || ''; el('shPhone').value = user.phone || ''; }
  renderCheckoutSummary(); if (!checkoutData) showCheckoutStep(1);
  return true;
}
function newOrderId() {
  const A = 'ABCDEFGHJKLMNPQRSTUVWXYZ';
  return '#' + Array.from({ length: 4 }, () => A[Math.floor(Math.random() * A.length)]).join('') + String(Math.floor(100 + Math.random() * 900));
}
function buildOrder() {
  const s = totals(), d = checkoutData, online = payMethod() === 'online';
  const eta = new Date(Date.now() + 10 * 864e5).toISOString();
  return {
    id: newOrderId(), createdAt: new Date().toISOString(), eta,
    items: cartLines().map(i => ({ id: i.id, qty: i.qty, opts: i.opts, price: i.p.price, en: i.p.en, ar: i.p.ar })),
    customer: { name: d.name, email: d.email, phone: d.phone }, address: d.address, fulfillment: d.fulfillment,
    subtotal: s.subtotal, shipping: s.shipping, total: s.total, deposit: s.deposit,
    payMethod: online ? 'online' : 'cod', payOption: online ? payOption() : 'cod',
    amountDue: online ? (payOption() === 'deposit' ? s.deposit : s.total) : 0,
    paymentStatus: 'pending', status: 'pending'
  };
}
function finalizeOrder(order, paid) {
  if (paid) { order.paymentStatus = order.payOption === 'deposit' ? 'partial' : 'completed'; order.status = 'processing'; }
  else { order.status = 'processing'; }
  orders.unshift(order); store.set('orders', orders);
  cart = []; saveCart(); checkoutData = null; pendingOrder = null; sessionStorage.removeItem('leyla_pending');
  el('thanksOrderNo').textContent = order.id; location.hash = '#/thanks';
}

/* ---------------------------------------------------
   17) صفحة الدفع (تجريبية)
--------------------------------------------------- */
function renderPay() {
  if (!pendingOrder) { location.hash = '#/cart'; return false; }
  const amt = pendingOrder.amountDue;
  el('payMerchant').textContent = CONFIG.storeName;
  el('payAmount').textContent = `${amt.toLocaleString('en-US')} ${lang === 'ar' ? 'جنيه' : 'EGP'}`;
  el('payDetails').innerHTML = pendingOrder.items.map(i => `${esc(lang === 'ar' ? i.ar : i.en)} × ${i.qty}`).join('<br>') + `<br><b>${t('total')}: ${fmt(pendingOrder.total)}</b>`;
  const label = lang === 'ar' ? `ادفعي ${amt.toLocaleString('en-US')} جنيه مصري` : `Pay EGP ${amt.toLocaleString('en-US')}`;
  el('payCardBtn').textContent = label; el('payWalletBtn').textContent = label;
  return true;
}

/* ---------------------------------------------------
   18) طلباتي
--------------------------------------------------- */
let of = { sort: 'newest', statuses: [], pays: [], ful: [], from: '', to: '', gov: '', area: '', district: '' };

function filteredOrders() {
  const q = el('orderSearch').value.trim().replace('#', '').toLowerCase();
  let list = orders.filter(o => {
    if (q && !o.id.replace('#', '').toLowerCase().includes(q)) return false;
    if (of.statuses.length && !of.statuses.includes(o.status)) return false;
    if (of.pays.length && !of.pays.includes(o.paymentStatus)) return false;
    if (of.ful.length && !of.ful.includes(o.fulfillment)) return false;
    if (of.from && new Date(o.createdAt) < new Date(of.from)) return false;
    if (of.to && new Date(o.createdAt) > new Date(of.to)) return false;
    const a = o.address || {};
    if (of.gov && a.governorate !== of.gov) return false;
    if (of.area && !(a.area || '').toLowerCase().includes(of.area.toLowerCase())) return false;
    if (of.district && !(a.district || '').toLowerCase().includes(of.district.toLowerCase())) return false;
    return true;
  });
  list.sort((a, b) => (of.sort === 'oldest' ? 1 : -1) * (new Date(a.createdAt) - new Date(b.createdAt)));
  return list;
}
const stLabel = (map, k) => (map[k] ? L(map[k]) : k);
const statusClass = s => (s === 'delivered' ? 'green' : (s === 'cancelled' || s === 'refunded') ? 'red' : '');
const addressText = a => a ? [a.street, a.building && (lang === 'ar' ? 'مبنى ' : 'Bldg ') + a.building, a.floor && (lang === 'ar' ? 'دور ' : 'Floor ') + a.floor, a.apartment && (lang === 'ar' ? 'شقة ' : 'Apt ') + a.apartment, a.district, a.area, a.governorate, a.country].filter(Boolean).join(', ') : '';

function orderLarge(o) {
  const idx = TRACK.indexOf(o.status);
  return `<div class="order-card"><div class="oc-head"><span class="oc-no">${esc(o.id)}</span>
    <span><span class="status-pill ${statusClass(o.status)}">${stLabel(ORDER_STATUS, o.status)}</span>
    <button class="icon-btn" data-order-settings="${esc(o.id)}" aria-label="Settings">⚙</button></span></div>
    <div class="oc-meta"><div>${t('payStatus')}<b>${stLabel(PAY_STATUS, o.paymentStatus)}</b></div>
    <div>${t('fulfillment')}<b>${o.fulfillment === 'pickup' ? t('pickup') : t('delivery')}</b></div>
    <div>${t('method')}<b>${o.payMethod === 'cod' ? t('cod') : (o.payOption === 'deposit' ? t('payDeposit') : t('payFull'))}</b></div>
    <div>${t('date')}<b>${fmtDate(o.createdAt, true)}</b></div><div>${t('expected')}<b>${fmtDate(o.eta)}</b></div>
    <div>${t('total')}<b>${fmt(o.total)}</b></div></div>
    <div class="tracker">${TRACK.map((s, i) => `<div class="t-step${idx >= i ? ' done' : ''}"><i></i>${stLabel(ORDER_STATUS, s)}</div>`).join('')}</div>
    <div class="oc-boxes"><div class="oc-box"><h5>${t('customer')}</h5>${esc(o.customer.name)}<br>${esc(o.customer.email)}<br><span dir="ltr">${esc(o.customer.phone)}</span><br>
    <a class="btn btn-outline btn-sm" style="margin-top:8px" href="tel:${esc(o.customer.phone)}">📞 ${t('call')}</a></div>
    <div class="oc-box"><h5>${t('deliveryAddress')}</h5>${esc(addressText(o.address))}</div></div></div>`;
}
function orderSmall(o) {
  return `<div class="order-card"><div class="oc-head"><span class="oc-no">${esc(o.id)}</span><span class="status-pill ${statusClass(o.status)}">${stLabel(ORDER_STATUS, o.status)}</span></div>
    <div class="oc-meta"><div>${t('customer')}<b>${esc(o.customer.name)}</b></div><div>${t('date')}<b>${fmtDate(o.createdAt)}</b></div>
    <div>${t('payStatus')}<b>${stLabel(PAY_STATUS, o.paymentStatus)}</b></div><div>${o.items.reduce((s, i) => s + i.qty, 0)} ${t('items')}<b>${fmt(o.total)}</b></div></div>
    <button class="btn btn-outline btn-sm" data-order-view="${esc(o.id)}">${t('view')}</button></div>`;
}
function orderTable(list) {
  return `<div class="table-wrap"><table class="order-table"><thead><tr><th>Order #</th><th>${t('customer')}</th><th>${t('date')}</th><th>${t('status')}</th><th>${t('payStatus')}</th><th>${t('items')}</th><th>${t('method')}</th><th>${t('total')}</th><th></th></tr></thead><tbody>
    ${list.map(o => `<tr><td><b>${esc(o.id)}</b></td><td>${esc(o.customer.name)}</td><td>${fmtDate(o.createdAt)}</td><td>${stLabel(ORDER_STATUS, o.status)}</td><td>${stLabel(PAY_STATUS, o.paymentStatus)}</td>
    <td>${o.items.reduce((s, i) => s + i.qty, 0)}</td><td>${o.payMethod === 'cod' ? t('cod') : 'Online'}</td><td>${fmt(o.total)}</td><td><button class="btn btn-outline btn-sm" data-order-view="${esc(o.id)}">${t('view')}</button></td></tr>`).join('')}</tbody></table></div>`;
}
function renderOrders() {
  el('ordersTotal').textContent = `(${orders.length})`;
  const list = filteredOrders();
  $$('#ordersViewToggle [data-oview]').forEach(b => b.classList.toggle('active', b.dataset.oview === ordersView));
  el('ordersEmpty').hidden = orders.length > 0; el('ordersList').hidden = orders.length === 0;
  const box = el('ordersList'); box.className = 'orders-list' + (ordersView === 'small' ? ' small' : '');
  if (!list.length) { box.innerHTML = orders.length ? `<p class="muted" style="text-align:center">${t('noResults')}</p>` : ''; return; }
  box.innerHTML = ordersView === 'table' ? orderTable(list) : list.map(ordersView === 'small' ? orderSmall : orderLarge).join('');
}

/* ---------------------------------------------------
   19) الراوتر
--------------------------------------------------- */
const PAGES = ['home', 'shop', 'product', 'cart', 'auth', 'account', 'checkout', 'pay', 'thanks', 'orders', 'info', '404'];
function show(name) { PAGES.forEach(p => { el('page-' + p).hidden = p !== name; }); }

function route() {
  const raw = location.hash.replace(/^#/, '') || '/';
  const [path, qs] = raw.split('?'); const params = new URLSearchParams(qs || '');
  const seg = path.split('/').filter(Boolean);
  closeLayers(); window.scrollTo(0, 0); el('stickyBuy').classList.remove('show');
  const name = seg[0] || 'home';

  if (name === 'home') { show('home'); renderHome(); }
  else if (name === 'shop') { show('shop'); renderShop(params, raw); }
  else if (name === 'product') { if (renderProduct(seg[1])) show('product'); else show('404'); }
  else if (name === 'cart') {
    show('cart');
    if (params.get('c')) { try { importCartData(decodeURIComponent(escape(atob(params.get('c'))))); } catch { toast(t('cartImportErr')); } history.replaceState(null, '', '#/cart'); }
    renderCart();
  }
  else if (name === 'auth') { show('auth'); }
  else if (name === 'account') { show('account'); renderAccount(); }
  else if (name === 'checkout') { if (renderCheckout()) show('checkout'); }
  else if (name === 'pay') { if (renderPay()) show('pay'); }
  else if (name === 'thanks') { show('thanks'); }
  else if (name === 'orders') { show('orders'); renderOrders(); }
  else if (name === 'page' && INFO_PAGES[seg[1]]) {
    const pg = INFO_PAGES[seg[1]]; show('info');
    el('infoTitle').textContent = L(pg.t);
    let body = L(pg.b);
    if (seg[1] === 'linkhub') body += `<ul><li><a href="${esc(CONFIG.tiktok)}">TikTok</a></li><li><a href="${esc(CONFIG.instagram)}">Instagram</a></li><li><a href="${esc(CONFIG.facebook)}">Facebook</a></li></ul>`;
    el('infoBody').innerHTML = body;
  }
  else show('404');
  applyLang();
}
window.addEventListener('hashchange', route);

/* ---------------------------------------------------
   20) الأحداث
--------------------------------------------------- */
document.addEventListener('click', e => {
  const q = sel => e.target.closest(sel);
  let n;

  if ((n = q('[data-add]'))) return addToCart(n.dataset.add);
  if ((n = q('[data-opts]'))) return openOptionsModal(n.dataset.opts);
  if ((n = q('[data-slider]'))) {
    const s = el(n.dataset.slider); if (!s) return;
    const dir = document.documentElement.dir === 'rtl' ? -1 : 1, next = n.classList.contains('next');
    return s.scrollBy({ left: (next ? 1 : -1) * dir * s.clientWidth * 0.8, behavior: 'smooth' });
  }
  if ((n = q('[data-close]'))) return closeLayers();
  if ((n = q('[data-lang]'))) return setLang(n.dataset.lang);
  if ((n = q('[data-toggle-sub]'))) return n.parentElement.classList.toggle('open');
  if ((n = q('[data-thumb]'))) { pg.img = +n.dataset.thumb; return renderProduct(pg.p.id); }
  if ((n = q('[data-ci-inc]'))) { cart[+n.dataset.ciInc].qty = Math.min(99, cart[+n.dataset.ciInc].qty + 1); saveCart(); return renderCart(); }
  if ((n = q('[data-ci-dec]'))) { const i = cart[+n.dataset.ciDec]; i.qty = Math.max(1, i.qty - 1); saveCart(); return renderCart(); }
  if ((n = q('[data-ci-del]'))) { cart.splice(+n.dataset.ciDel, 1); saveCart(); return renderCart(); }
  if ((n = q('[data-eye]'))) { const i = el(n.dataset.eye); i.type = i.type === 'password' ? 'text' : 'password'; return; }
  if ((n = q('[data-paytab]'))) {
    $$('[data-paytab]').forEach(b => b.classList.toggle('active', b === n));
    el('payCardForm').hidden = n.dataset.paytab !== 'card'; el('payWalletForm').hidden = n.dataset.paytab !== 'wallet'; return;
  }
  if ((n = q('[data-tab]'))) {
    $$('[data-tab]').forEach(b => b.classList.toggle('active', b === n));
    el('signinForm').hidden = n.dataset.tab !== 'signin'; el('signupForm').hidden = n.dataset.tab !== 'signup'; return;
  }
  if ((n = q('[data-oview]'))) { ordersView = n.dataset.oview; store.set('ordersView', ordersView); return renderOrders(); }
  if ((n = q('[data-order-view]'))) { ordersView = 'large'; store.set('ordersView', 'large'); el('orderSearch').value = n.dataset.orderView; return renderOrders(); }
  if ((n = q('[data-order-settings]'))) {
    const o = orders.find(x => x.id === n.dataset.orderSettings); if (!o) return;
    const within24 = Date.now() - new Date(o.createdAt) < 864e5, ok = ['pending', 'processing', 'confirmed'].includes(o.status);
    if (!(within24 && ok)) return toast(t('cannotCancel'));
    if (confirm(t('cancelConfirm'))) { o.status = 'cancelled'; store.set('orders', orders); renderOrders(); toast(t('orderCancelled')); }
    return;
  }
  if (!q('.dropdown')) el('cartActionsMenu').hidden = true;
});

// الهيدر والقائمة
el('menuBtn').addEventListener('click', () => openLayer(el('sideMenu')));
el('closeMenu').addEventListener('click', closeLayers);
el('searchBtn').addEventListener('click', openSearch);
el('searchCancel').addEventListener('click', closeLayers);
el('searchInput').addEventListener('input', runSearch);
el('searchClear').addEventListener('click', () => { el('searchInput').value = ''; runSearch(); el('searchInput').focus(); });
el('themeToggleSide').addEventListener('click', toggleTheme);
el('themeToggleFooter').addEventListener('click', toggleTheme);

// المتجر
el('loadMoreBtn').addEventListener('click', () => { shop.visible += CONFIG.pageSize; renderShop(new URLSearchParams(), shop.key); });
$$('[data-cols]').forEach(b => b.addEventListener('click', () => { shop.cols = +b.dataset.cols; renderShop(new URLSearchParams(), shop.key); }));
el('filtersBtn').addEventListener('click', () => { syncFilterUI(); openLayer(el('filtersDrawer')); });
el('fApply').addEventListener('click', () => { applyFilterUI(); closeLayers(); renderShop(new URLSearchParams(), shop.key); });
el('fReset').addEventListener('click', () => { shop.f = DEFAULT_FILTERS(); shop.visible = CONFIG.pageSize; syncFilterUI(); closeLayers(); renderShop(new URLSearchParams(), shop.key); });

// صفحة المنتج
el('qtyPlus').addEventListener('click', () => { pg.qty = Math.min(99, pg.qty + 1); el('qtyVal').textContent = pg.qty; el('pTotal').textContent = fmt(pg.p.price * pg.qty); });
el('qtyMinus').addEventListener('click', () => { pg.qty = Math.max(1, pg.qty - 1); el('qtyVal').textContent = pg.qty; el('pTotal').textContent = fmt(pg.p.price * pg.qty); });
el('addToCartBtn').addEventListener('click', addFromProductPage);
el('stickyAddBtn').addEventListener('click', addFromProductPage);
el('favBtn').addEventListener('click', () => {
  const id = pg.p.id; favs = favs.includes(id) ? favs.filter(x => x !== id) : [...favs, id]; store.set('favs', favs);
  el('favBtn').textContent = favs.includes(id) ? '❤️' : '🤍'; toast(favs.includes(id) ? t('fav') : t('unfav'));
});
el('shareBtn').addEventListener('click', async () => {
  const url = location.href;
  if (navigator.share) { try { await navigator.share({ title: pname(pg.p), url }); return; } catch { return; } }
  copyText(url);
});
// شريط الشراء الثابت
if ('IntersectionObserver' in window) {
  new IntersectionObserver(([en]) => {
    const onProduct = !el('page-product').hidden;
    el('stickyBuy').hidden = !onProduct;
    el('stickyBuy').classList.toggle('show', onProduct && !en.isIntersecting && en.boundingClientRect.top < 0);
  }).observe(el('addToCartBtn'));
}

// مودال الخيارات
el('omPlus').addEventListener('click', () => { om.qty = Math.min(99, om.qty + 1); el('omQty').textContent = om.qty; });
el('omMinus').addEventListener('click', () => { om.qty = Math.max(1, om.qty - 1); el('omQty').textContent = om.qty; });
el('omAdd').addEventListener('click', () => {
  if (!optionsComplete(om.p, om.sel)) { el('omError').textContent = t('pickOpts'); el('omError').hidden = false; return; }
  addToCart(om.p.id, om.qty, { ...om.sel }); closeLayers();
});

// السلة
el('cartActionsBtn').addEventListener('click', ev => { ev.stopPropagation(); el('cartActionsMenu').hidden = !el('cartActionsMenu').hidden; });
el('shareCartBtn').addEventListener('click', () => {
  if (!cart.length) return toast(t('cartEmptyToast'));
  const data = btoa(unescape(encodeURIComponent(JSON.stringify(cart.map(({ id, qty, opts }) => ({ id, qty, opts }))))));
  copyText(`${location.origin}${location.pathname}#/cart?c=${encodeURIComponent(data)}`);
});
el('exportCartBtn').addEventListener('click', () => {
  if (!cart.length) return toast(t('cartEmptyToast'));
  const blob = new Blob([JSON.stringify(cart.map(({ id, qty, opts }) => ({ id, qty, opts })), null, 2)], { type: 'application/json' });
  const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'leyla-cart.json'; a.click(); URL.revokeObjectURL(a.href);
});
['importCartBtn', 'importCartBtn2'].forEach(id => el(id).addEventListener('click', () => el('importCartFile').click()));
el('importCartFile').addEventListener('change', async ev => {
  const f = ev.target.files[0]; if (!f) return;
  importCartData(await f.text()); ev.target.value = '';
});

// تسجيل الدخول والحساب
el('googleBtn').addEventListener('click', () => toast(t('googleSoon')));
el('forgotLink').addEventListener('click', ev => { ev.preventDefault(); toast(t('forgotSoon')); });
el('signinForm').addEventListener('submit', async ev => {
  ev.preventDefault();
  const email = el('siEmail').value.trim().toLowerCase(), pass = el('siPass').value;
  if (!email || !pass) return showErr('siError', t('fillReq'));
  const users = store.get('users', []), h = await sha(pass);
  const u = users.find(x => x.email === email && x.hash === h);
  if (!u) return showErr('siError', t('badCreds'));
  user = { name: u.name, email: u.email, phone: u.phone }; store.set('user', user); showErr('siError', '');
  renderStatic(); toast(t('signedIn')); location.hash = '#/account';
});
el('signupForm').addEventListener('submit', async ev => {
  ev.preventDefault();
  const name = el('suName').value.trim(), email = el('suEmail').value.trim().toLowerCase(), phone = el('suPhone').value.trim(), pass = el('suPass').value;
  if (!name || !email || !phone || !pass) return showErr('suError', t('fillReq'));
  if (!validPhone(phone)) return showErr('suError', t('badPhone'));
  if (pass.length < 6) return showErr('suError', t('passMin'));
  const users = store.get('users', []);
  if (users.some(x => x.email === email)) return showErr('suError', t('userExists'));
  users.push({ name, email, phone, hash: await sha(pass) }); store.set('users', users);
  user = { name, email, phone }; store.set('user', user); showErr('suError', '');
  renderStatic(); toast(t('signedIn')); location.hash = '#/account';
});
el('signOutBtn').addEventListener('click', () => { user = null; store.set('user', null); renderStatic(); renderAccount(); toast(t('signedOut')); location.hash = '#/'; });

// إتمام الطلب
el('shippingForm').addEventListener('submit', ev => {
  ev.preventDefault();
  const need = ['shName', 'shArea', 'shDistrict', 'shStreet', 'shBuilding', 'shPhone', 'shEmail'];
  if (need.some(id => !el(id).value.trim())) return showErr('shError', t('fillReq'));
  if (!validPhone(el('shPhone').value)) return showErr('shError', t('badPhone'));
  if (!/^\S+@\S+\.\S+$/.test(el('shEmail').value)) return showErr('shError', t('fillReq'));
  showErr('shError', '');
  checkoutData = {
    name: el('shName').value.trim(), email: el('shEmail').value.trim(), phone: el('shPhone').value.trim(), fulfillment: fulfillmentVal(),
    address: { area: el('shArea').value.trim(), district: el('shDistrict').value.trim(), street: el('shStreet').value.trim(), building: el('shBuilding').value.trim(),
      floor: el('shFloor').value.trim(), apartment: el('shApt').value.trim(), governorate: el('shGov').value, country: el('shCountry').value }
  };
  showCheckoutStep(2); window.scrollTo(0, 0);
});
el('backToShipping').addEventListener('click', () => showCheckoutStep(1));
$$('[name=payMethod],[name=payOption],[name=fulfillment]').forEach(i => i.addEventListener('change', renderCheckoutSummary));
['agreePrivacy', 'agreeTerms', 'agreeRefund', 'agreeShipping'].forEach(id => el(id).addEventListener('change', renderCheckoutSummary));
el('payBtn').addEventListener('click', () => {
  if (!checkoutData) return showCheckoutStep(1);
  if (!['agreePrivacy', 'agreeTerms', 'agreeRefund', 'agreeShipping'].every(id => el(id).checked)) return showErr('payError', t('agreeAll'));
  showErr('payError', '');
  const order = buildOrder();
  if (order.payMethod === 'cod') return finalizeOrder(order, false);
  pendingOrder = order; sessionStorage.setItem('leyla_pending', JSON.stringify(order)); location.hash = '#/pay';
});

// بوابة الدفع (تجريبية)
el('payDetailsBtn').addEventListener('click', () => { el('payDetails').hidden = !el('payDetails').hidden; });
el('cardNum').addEventListener('input', ev => { ev.target.value = ev.target.value.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim(); });
el('cardExp').addEventListener('input', ev => { let v = ev.target.value.replace(/\D/g, '').slice(0, 4); if (v.length > 2) v = v.slice(0, 2) + '/' + v.slice(2); ev.target.value = v; });
el('payCardForm').addEventListener('submit', ev => {
  ev.preventDefault(); if (!pendingOrder) return;
  const num = el('cardNum').value.replace(/\s/g, ''), m = el('cardExp').value.match(/^(\d{2})\/(\d{2})$/), cvv = el('cardCvv').value;
  const okExp = m && +m[1] >= 1 && +m[1] <= 12 && new Date(2000 + +m[2], +m[1], 0, 23, 59) >= new Date();
  if (num.length < 13 || !okExp || !/^\d{3,4}$/.test(cvv)) return toast(t('badCard'));
  el('cardNum').value = el('cardCvv').value = ''; // مفيش بيانات كارت بتتخزن
  finalizeOrder(pendingOrder, true);
});
el('payWalletForm').addEventListener('submit', ev => {
  ev.preventDefault(); if (!pendingOrder) return;
  if (!/^1[0125]\d{8}$/.test(el('walletNum').value.replace(/\s/g, ''))) return toast(t('badWallet'));
  finalizeOrder(pendingOrder, true);
});

// طلباتي
el('orderSearch').addEventListener('input', renderOrders);
el('orderFiltersBtn').addEventListener('click', () => {
  el('ofSort').value = of.sort; el('ofFrom').value = of.from; el('ofTo').value = of.to; el('ofGov').value = of.gov; el('ofArea').value = of.area; el('ofDistrict').value = of.district;
  [['ofStatuses', 'statuses'], ['ofPayStatuses', 'pays'], ['ofFulfillment', 'ful']].forEach(([id, k]) => $$(`#${id} input`).forEach(i => i.checked = of[k].includes(i.value)));
  openLayer(el('orderFiltersDrawer'));
});
const dayEdge = (id, end) => { const d = el(id).value ? new Date(el(id).value) : new Date(); d.setHours(end ? 23 : 0, end ? 59 : 0, 0, 0); const p = n => String(n).padStart(2, '0'); el(id).value = `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}T${p(d.getHours())}:${p(d.getMinutes())}`; };
el('ofFromStart').addEventListener('click', () => dayEdge('ofFrom', false)); el('ofFromEnd').addEventListener('click', () => dayEdge('ofFrom', true));
el('ofToStart').addEventListener('click', () => dayEdge('ofTo', false)); el('ofToEnd').addEventListener('click', () => dayEdge('ofTo', true));
el('ofApply').addEventListener('click', () => {
  of = { sort: el('ofSort').value, from: el('ofFrom').value, to: el('ofTo').value, gov: el('ofGov').value, area: el('ofArea').value.trim(), district: el('ofDistrict').value.trim(),
    statuses: $$('#ofStatuses input:checked').map(i => i.value), pays: $$('#ofPayStatuses input:checked').map(i => i.value), ful: $$('#ofFulfillment input:checked').map(i => i.value) };
  closeLayers(); renderOrders();
});
el('ofReset').addEventListener('click', () => { of = { sort: 'newest', statuses: [], pays: [], ful: [], from: '', to: '', gov: '', area: '', district: '' }; closeLayers(); renderOrders(); });

// فورم المراجعة
let rvRating = 0, rvPhotos = [];
const paintStars = () => $$('#starInput button').forEach(b => b.classList.toggle('on', +b.dataset.v <= rvRating));
$$('#starInput button').forEach(b => b.addEventListener('click', () => { rvRating = +b.dataset.v; paintStars(); }));
el('rvText').addEventListener('input', () => { el('rvCount').textContent = el('rvText').value.length; });
function paintPreviews() {
  fill('rvPreviews', rvPhotos.map((s, i) => `<div class="photo-preview"><img src="${s}" alt=""><button type="button" data-rv-del="${i}">✕</button></div>`).join(''));
  $$('[data-rv-del]').forEach(b => b.addEventListener('click', () => { rvPhotos.splice(+b.dataset.rvDel, 1); paintPreviews(); }));
}
el('rvPhotos').addEventListener('change', async ev => {
  showErr('rvError', '');
  for (const f of [...ev.target.files]) {
    if (rvPhotos.length >= 3) { showErr('rvError', t('photoMax')); break; }
    if (!['image/png', 'image/jpeg', 'image/webp'].includes(f.type)) { showErr('rvError', t('photoType')); continue; }
    if (f.size > 1024 * 1024) { showErr('rvError', t('photoSize')); continue; }
    rvPhotos.push(await new Promise(r => { const fr = new FileReader(); fr.onload = () => r(fr.result); fr.readAsDataURL(f); }));
  }
  ev.target.value = ''; paintPreviews();
});
el('reviewForm').addEventListener('submit', ev => {
  ev.preventDefault();
  const name = el('rvName').value.trim(), phone = el('rvPhone').value.trim();
  if (!name || !phone) return showErr('rvError', t('fillReq'));
  if (!validPhone(phone)) return showErr('rvError', t('badPhone'));
  if (!rvRating) return showErr('rvError', t('rateReq'));
  // الهاتف مش بيتحفظ مع المراجعة ومش بيتعرض
  reviews.unshift({ name, date: new Date().toISOString(), rating: rvRating, text: el('rvText').value.trim(), photos: rvPhotos.slice() });
  if (!store.set('reviews', reviews)) { reviews[0].photos = []; store.set('reviews', reviews); }
  el('reviewForm').reset(); rvRating = 0; rvPhotos = []; paintStars(); paintPreviews(); el('rvCount').textContent = 0; showErr('rvError', '');
  renderReviews(); toast(t('reviewThanks'));
});

/* ---------------------------------------------------
   21) التشغيل
--------------------------------------------------- */
applyTheme();
applyLang();
renderStatic();
updateCartUI();
route();

})();