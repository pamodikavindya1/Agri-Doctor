// Firebase Console → Project settings (⚙️) → Your apps → Web app එකේ ලැබෙන අගයන් මෙතැනට දාන්න.
// මේ අගයන් රහස් නොවේ (web app වල public). ආරක්ෂාව ලැබෙන්නේ firestore.rules වලින්.
// "PASTE" වලින් පටන් ගන්නා අගයක් තිබේ නම් backend ක්‍රියා නොකර, site එක පරණ විදියටම (browser එකේ දත්ත) වැඩ කරයි.
export const firebaseConfig = {
  apiKey: "PASTE_API_KEY",
  authDomain: "PASTE_PROJECT_ID.firebaseapp.com",
  projectId: "PASTE_PROJECT_ID",
  storageBucket: "PASTE_PROJECT_ID.appspot.com",
  messagingSenderId: "PASTE_SENDER_ID",
  appId: "PASTE_APP_ID"
};
