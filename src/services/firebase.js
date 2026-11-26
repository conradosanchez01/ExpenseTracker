import { getApp, getApps, initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

/**
 * Inicialización de Firebase / Cloud Firestore (firebase.js)
 * Corresponde a: User Story #5 (#per-s3-us5-rn) — Sprint 3
 * Asignado a: Manuel / Jerónimo
 *
 * Las credenciales salen de variables EXPO_PUBLIC_* (archivo .env, que no se
 * sube al repo). Después de editar .env hay que reiniciar con: npx expo start -c
 *
 * getFirestore(app) en React Native usa caché en MEMORIA (no hay IndexedDB):
 * offline la lista y las escrituras pendientes viven mientras el proceso esté
 * abierto, pero no sobreviven al cierre de la app (ver PERSISTENCIA.md, Prueba 3).
 */
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const db = getFirestore(app);
export default app;
