# A² Tracker — نسخة Firebase

تطبيق ويب مستقل (PWA) لمتابعة العادات والأذكار والمواعيد. كل مستخدم بيسجّل بإيميله، وبياناته محمية بقواعد أمان ما يقدرش يقراها غيره — حتى الأدمن بيشوف الأسماء والإيميلات والعدد بس.

## الملفات
- `index.html` — التطبيق كله.
- `firebase-config.js` — **لازم تملاه** بإعدادات مشروعك.
- `firestore.rules` — قواعد الأمان (تتحط في Firebase Console).
- `manifest.webmanifest` + `sw.js` + الأيقونات — عشان يتثبّت كتطبيق ويشتغل أوفلاين.

## الإعداد (١٥ دقيقة، مرة واحدة)

### ١) مشروع Firebase
1. افتح https://console.firebase.google.com وسجّل بحساب جوجل ← **Add project** ← اسم المشروع مثلًا `a2-tracker` ← عطّل Google Analytics ← Create.
2. من القائمة الجانبية: **Build ← Authentication ← Get started ← Sign-in method ← Email/Password ← Enable ← Save**.
3. **Build ← Firestore Database ← Create database** ← اختار أقرب Location (مثلًا `europe-west`) ← ابدأ بـ **Production mode** ← Create.
4. في Firestore: تبويب **Rules** ← امسح اللي فيه والصق محتوى ملف `firestore.rules` ← **Publish**.
5. إعدادات المشروع (⚙️ ← Project settings) ← تحت **Your apps** ← أيقونة الويب `</>` ← اسم `A2` ← (من غير Hosting) ← Register ← هيظهر لك كود فيه `firebaseConfig = { apiKey: "...", ... }`. انسخ القيم دي وحطها في `firebase-config.js`.

### ٢) رفع الملفات على GitHub Pages
1. على GitHub: **New repository** ← اسم `a2-tracker` ← Public ← Create.
2. ارفع كل الملفات اللي في المجلد ده (Add file ← Upload files) ← Commit.
3. **Settings ← Pages ← Source: Deploy from a branch ← Branch: main / (root) ← Save**.
4. بعد دقيقة الرابط هيبقى: `https://USERNAME.github.io/a2-tracker/`

### ٣) اسمح للرابط يعمل تسجيل دخول
Firebase Console ← **Authentication ← Settings ← Authorized domains ← Add domain** ← اكتب `USERNAME.github.io` ← Add.

### ٤) خلّي نفسك أدمن
1. افتح الرابط وسجّل حساب بإيميلك.
2. Firebase Console ← **Authentication ← Users** ← انسخ الـ **User UID** بتاعك.
3. **Firestore ← Start collection** ← Collection ID: `admins` ← Document ID: (الصق الـ UID) ← أضف حقل `role` بقيمة `admin` ← Save.
4. اعمل تحديث للتطبيق ← في تبويب **الملخّص** هتلاقي كارت **المشتركين** بالأسماء والعدد.

## بعد كده
- ابعت الرابط لأي حد: يفتحه ← «إنشاء حساب» بإيميله ← يثبّته على الشاشة الرئيسية (Safari ← مشاركة ← إضافة إلى الشاشة الرئيسية).
- لتحديث التطبيق: ارفع `index.html` الجديد مكان القديم على GitHub.
- المجاني في Firebase بيكفي مئات المستخدمين بسهولة.

## ملاحظات
- صور الأذكار بتتخزن مصغّرة جوّه بيانات المستخدم (بدون Storage).
- التنبيهات بتشتغل والتطبيق مفتوح أو في الخلفية قريب؛ للمواعيد المهمة استخدم زر 📅 لإضافتها لكالندر الموبايل.
