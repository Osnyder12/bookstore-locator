import { getAnalytics } from '@firebase/analytics';
import { getApp, getApps, initializeApp } from '@firebase/app';
import { getAuth } from '@firebase/auth';
import { getFirestore } from '@firebase/firestore';
import firebaseConfig from './firebaseConfig';

let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

const auth = getAuth(app);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { analytics, app, auth, db };


