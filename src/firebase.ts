import { initializeApp, getApps, getApp } from 'firebase/app';
import { initializeFirestore, getFirestore, doc, getDocFromServer, setLogLevel } from 'firebase/firestore';
import { getAuth, signInAnonymously, onAuthStateChanged, User } from 'firebase/auth';
import firebaseConfig from '../firebase-applet-config.json';

// Silence internal Firestore transport warnings to prevent false error notifications
setLogLevel('silent');

// Initialize Firebase App
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// Initialize Auth
export const auth = getAuth(app);

// Initialize Firestore with configured databaseId and forced long polling
// to prevent stream buffering timeouts behind proxies and Cloud Run environments
const dbId = firebaseConfig.firestoreDatabaseId || '(default)';
let firestoreDb;
try {
  firestoreDb = initializeFirestore(app, {
    experimentalForceLongPolling: true,
  }, dbId);
} catch {
  firestoreDb = getFirestore(app, dbId);
}
export const db = firestoreDb;

// Validate Connection to Firestore on startup
async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error: any) {
    console.warn("Firestore connection notice: operating with offline cache or background sync.", error?.message || error);
  }
}
testConnection();

// Auto authenticate anonymously if not signed in
export function ensureAuthenticated(callback?: (user: User) => void) {
  return onAuthStateChanged(auth, (user) => {
    if (user) {
      if (callback) callback(user);
    } else {
      signInAnonymously(auth).catch((err) => {
        console.warn("Anonymous sign-in fallback:", err);
      });
    }
  });
}
