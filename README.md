# 🌿 AgriDoctor Pro

AI-powered plant disease detection and farm-support web app for Sri Lankan farmers.
**සිංහල / English** · Works on mobile · Installable as a PWA

> **Live demo:**  https://pamodikavindya1.github.io/Agri-Doctor/


## Features

- 🤖 **AI disease detection** – upload a leaf photo; a Teachable Machine / TensorFlow.js model runs **in the browser** and returns the disease, a confidence score and treatment advice. Low-confidence results ask the user to retake the photo instead of guessing.
- 📖 **Disease directory** – 38 diseases (rice, tea, banana, vegetables, fruit trees…) with scientific name, treatment and prevention, searchable by text or voice, in Sinhala and English.
- 🌦️ **Weather & farm advice** – 5-day forecast for all 25 districts (Open-Meteo, no API key) with plain-language advice: best day to spray/fertilise, rain/wind/heat warnings and fungal-disease alerts.
- 🚜 **Equipment rental** – farmers list tractors, water tanks, harvesters etc.; everyone can browse, only logged-in owners can add or delete their own listings.
- 🛒 **Farm-supply orders** – product catalogue, cart and order form; orders are stored in Firestore (and can be forwarded by WhatsApp).
- 👩‍🌾 **Expert & support contacts** – official Department of Agriculture contacts (1920 advisory line, research institutes) plus a district-wise expert directory.
- 🌗 Dark mode · 🌐 Sinhala/English toggle · 📴 offline notice · ♿ keyboard focus styles

## Tech stack

| Layer | Technology |
|---|---|
| Frontend | HTML, CSS (variables, grid, glass UI), vanilla JavaScript |
| AI | TensorFlow.js + Teachable Machine image model (runs client-side) |
| Backend | Firebase **Authentication** (email/password) + **Cloud Firestore** (Spark plan, free) |
| Hosting | GitHub Pages |

## Project structure

```
index.html          page structure
style.css           styling (light/dark, responsive)
script.js           app logic, Sinhala/English text, disease data, weather, shop
backend.js          Firebase integration (loaded as an ES module)
firebase-config.js  Firebase project settings (public web config)
firestore.rules     Firestore security rules
sw.js               clears any old service worker/cache left from earlier versions
images/             background image
```

## Run locally

ES modules need a web server (opening `index.html` directly will disable the backend but the rest still works):

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

## Set up your own backend

See **BACKEND-SETUP.md**. In short: create a Firebase project → enable Email/Password → create Firestore → publish `firestore.rules` → paste your web config into `firebase-config.js` → add your GitHub Pages domain under Authentication → Settings → Authorized domains.

## Security notes

- The Firebase web config is public by design; protection comes from `firestore.rules` (writes require login, field validation, users can only delete their own rental listings, orders are private).
- Rental listings show the owner's phone number publicly.
- Photos are analysed in the browser and are **not uploaded or stored**.

## Known limitations

- The AI model recognises only the classes it was trained on (currently healthy, rust, leaf curl, powdery mildew). The other diseases are available in the directory/search; detecting them requires retraining the model with labelled images.
- Shop products/prices are **sample data** until you add real products.
- Treatment text is general guidance, not a prescription. Always follow the product label and consult an agriculture officer.
- No online payment: orders are requests the seller confirms.

## Credits & data sources

- Weather data: Open-Meteo.com (free for non-commercial use).
- Contact details: Department of Agriculture, Sri Lanka (doa.gov.lk) – please verify on the official site before relying on them.
- Icons: Font Awesome · Fonts: Poppins (Google Fonts)

---
**සිංහලෙන් කෙටියෙන්:** ශ්‍රී ලංකාවේ ගොවීන් සඳහා ශාක රෝග AI මගින් හඳුනාගැනීම, රෝග නාමාවලිය, අවදානම් සිතියම, උපකරණ කුලිය, කෘෂි භාණ්ඩ ඇණවුම් සහ විශේෂඥ සම්බන්ධතා ඇතුළත් වෙබ් යෙදුමකි.
