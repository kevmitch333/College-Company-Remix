import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, doc, getDocFromServer } from 'firebase/firestore';
import { getAuth, signInAnonymously, onAuthStateChanged, User } from 'firebase/auth';
import firebaseConfig from '../firebase-applet-config.json';

// Initialize Firebase App
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// Initialize Auth
export const auth = getAuth(app);

// Initialize Firestore with configured databaseId
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId || '(default)');

// Validate Connection to Firestore on startup
async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn("Firestore connection: client offline or syncing in background.");
    }
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
