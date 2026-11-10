/**
 * AgriDoctor Pro - backend.js (Firebase: Auth + Firestore, Spark plan - නොමිලේ)
 * script.js සමඟ සන්නිවේදනය කරන්නේ window.AgriBackend සහ "agri:*" events වලින්.
 * Cloud Storage භාවිතා නොකරයි (ඡායාරූප save නොකරයි) - එය ගෙවීම් plan එකක් අවශ්‍ය කරයි.
 */
import { firebaseConfig } from "./firebase-config.js";

const SDK = "https://www.gstatic.com/firebasejs/10.14.1";
const configured = !!firebaseConfig && !!firebaseConfig.apiKey && !String(firebaseConfig.apiKey).startsWith("PASTE");
const emit = (name, detail) => window.dispatchEvent(new CustomEvent(name, { detail }));

window.AgriBackend = { enabled: false };

// await නොකර ධාවනය කරයි - එවිට UI buttons බලා සිටීමක් නැතිව වහාම වැඩ කරයි
(async () => {
  if (!configured) { console.info("Backend: firebase-config.js පිරවා නැත."); emit("agri:error", "firebase-config.js is not filled in"); return; }

  try {
    const [appM, authM, fsM] = await Promise.all([
      import(`${SDK}/firebase-app.js`),
      import(`${SDK}/firebase-auth.js`),
      import(`${SDK}/firebase-firestore.js`)
    ]);

    const app = appM.initializeApp(firebaseConfig);
    const auth = authM.getAuth(app);
    const db = fsM.getFirestore(app);

    const needUser = () => {
      if (!auth.currentUser) throw new Error("not-logged-in");
      return auth.currentUser.uid;
    };

    window.AgriBackend = {
      enabled: true,

      // ---------- Auth ----------
      signUp: (email, pw) => authM.createUserWithEmailAndPassword(auth, email, pw),
      signIn: (email, pw) => authM.signInWithEmailAndPassword(auth, email, pw),
      signOut: () => authM.signOut(auth),

      // ---------- කුලිය ----------
      addRental: (r) => fsM.addDoc(fsM.collection(db, "rentals"), {
        owner: String(r.owner).slice(0, 60),
        phone: String(r.phone),
        type: String(r.type).slice(0, 30),
        district: String(r.district).slice(0, 30),
        address: String(r.address).slice(0, 120),
        price: String(r.price || "").slice(0, 10),
        uid: needUser(),
        createdAt: fsM.serverTimestamp()
      }),
      deleteRental: (id) => fsM.deleteDoc(fsM.doc(db, "rentals", id)),

      // ---------- ඇණවුම් (ඔබට පමණක් පේන්නේ Firebase console එකෙන්) ----------
      addOrder: (o) => fsM.addDoc(fsM.collection(db, "orders"), {
        name: String(o.name).slice(0, 60),
        phone: String(o.phone),
        district: String(o.district).slice(0, 30),
        address: String(o.address).slice(0, 120),
        note: String(o.note || "").slice(0, 200),
        items: o.items.slice(0, 20).map(i => ({ id: String(i.id).slice(0, 30), qty: Number(i.qty), price: Number(i.price) })),
        total: Number(o.total),
        uid: needUser(),
        createdAt: fsM.serverTimestamp()
      }),

      // ---------- රෝග වාර්තා (සිතියම සඳහා) ----------
      addReport: (r) => fsM.addDoc(fsM.collection(db, "reports"), {
        disease: String(r.disease).slice(0, 40),
        district: String(r.district).slice(0, 30),
        uid: needUser(),
        createdAt: fsM.serverTimestamp()
      })
    };

    // Auth තත්ත්වය
    authM.onAuthStateChanged(auth, (u) => emit("agri:auth", u ? { uid: u.uid, email: u.email } : null));

    // කුලිය ලැයිස්තුව (real-time)
    fsM.onSnapshot(
      fsM.query(fsM.collection(db, "rentals"), fsM.orderBy("createdAt", "desc"), fsM.limit(100)),
      (snap) => emit("agri:rentals", snap.docs.map(d => ({ id: d.id, ...d.data() }))),
      (err) => console.error("rentals listener:", err)
    );

    // රෝග වාර්තා (real-time) - අලුත්ම 300
    fsM.onSnapshot(
      fsM.query(fsM.collection(db, "reports"), fsM.orderBy("createdAt", "desc"), fsM.limit(300)),
      (snap) => emit("agri:reports", snap.docs.map(d => {
        const x = d.data();
        return { disease: x.disease, district: x.district, t: x.createdAt ? x.createdAt.toMillis() : Date.now() };
      })),
      (err) => console.error("reports listener:", err)
    );

    // විශේෂඥයන් (Firebase console එකෙන් එකතු කරන්න)
    fsM.getDocs(fsM.collection(db, "experts"))
      .then(snap => emit("agri:experts", snap.docs.map(d => ({ id: d.id, ...d.data() }))))
      .catch(err => console.error("experts:", err));

    emit("agri:ready", true);
  } catch (err) {
    console.error("Backend init failed - දේශීය ප්‍රකාරයෙන් දිගටම:", err);
    window.AgriBackend = { enabled: false };
    emit("agri:error", String((err && err.message) || err));
  }
})();
