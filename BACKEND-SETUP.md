# AgriDoctor Pro - Backend setup (Firebase, නොමිලේ Spark plan)

1. console.firebase.google.com → **Add project** (Google Analytics off).
2. **Build → Authentication → Get started → Email/Password → Enable**.
   - Settings → Authorized domains → `pamodikavindya.github.io` එකතු කරන්න.
3. **Build → Firestore Database → Create database** (production mode, asia-south1 වැනි ළඟම region).
   - **Rules** tab → `firestore.rules` file එකේ සම්පූර්ණ අන්තර්ගතය paste කරලා **Publish**.
4. **Project settings (⚙️) → Your apps → Web (</>)** → app එකක් register කරන්න → ලැබෙන `firebaseConfig` අගයන් `firebase-config.js` එකට දාන්න.
5. විශේෂඥයන්: Firestore → **Start collection** → `experts` → document එකකට fields:
   `name` (string), `nameEn` (string), `district` (string - සිංහලෙන්, උදා: මහනුවර), `phone` (string), `email` (string, හිස් විය හැක).
6. Files GitHub එකට upload කරන්න (index.html, style.css, script.js, backend.js, firebase-config.js, images/).

## සැලකිය යුතුයි
- Cloud Storage භාවිතා නොකරයි (ඒක නොමිලේ plan එකේ නැහැ). ඡායාරූප save නොවේ.
- කුලිය ලැයිස්තුවේ දුරකථන අංක **සැමට පේනවා** - එය ලැයිස්තුගත කරන අයට කියන්න.
- Google Cloud Console → APIs & Services → Credentials → ඔබේ API key එක → **HTTP referrers** වලට `pamodikavindya.github.io/*` පමණක් සීමා කරන්න.

## ඇණවුම් (orders)
- ඇණවුම් `orders` collection එකට සුරැකේ (login වූ පරිශීලකයාට තමන්ගේ ඒවා පමණක් කියවිය හැක).
- විකුණුම්කරු ඇණවුම් බලන්නේ **Firebase Console → Firestore Database → orders** වෙතින්.
- `script.js` හි `SHOP_WHATSAPP` එකට ඔබේ WhatsApp අංකය ("94771234567" ආකෘතියෙන්) දැම්මොත් ඇණවුමෙන් පසු "WhatsApp මගින් යවන්න" බොත්තම පෙන්වයි.
- `PRODUCTS` ලැයිස්තුවේ ඇත්ත භාණ්ඩ සහ මිල දාන්න (දැනට උදාහරණ).
- firestore.rules අලුත් version එක නැවත Publish කරන්න (orders rule එකතු කර ඇත).
