import { initializeApp, getApps, FirebaseApp } from 'firebase/app'
import {
  FIREBASE_API_KEY,
  FIREBASE_APP_ID,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_MESSAGING_SENDER_ID,
  FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET
} from '@/constant/env'

const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: FIREBASE_STORAGE_BUCKET,
  messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
  appId: FIREBASE_APP_ID,
  measurementId: FIREBASE_MESSAGING_SENDER_ID
}

let firebaseApp: FirebaseApp

export const getFirebaseApp = (): FirebaseApp => {
  if (typeof window !== 'undefined' && !getApps().length) {
    firebaseApp = initializeApp(firebaseConfig)
  }
  return firebaseApp
}

export { firebaseApp }
