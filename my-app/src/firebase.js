import { initializeApp } from 'firebase/app'
import {
  getAuth,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth'

// TODO: replace with your Firebase web config
const firebaseConfig = {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'YOUR_AUTH_DOMAIN',
  projectId: 'YOUR_PROJECT_ID',
  storageBucket: 'YOUR_STORAGE_BUCKET',
  messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
  appId: 'YOUR_APP_ID',
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const googleProvider = new GoogleAuthProvider()

export const signUp = (email, password) =>
  createUserWithEmailAndPassword(auth, email, password)

export const signIn = (email, password) =>
  signInWithEmailAndPassword(auth, email, password)

export const signInWithGoogle = () => signInWithPopup(auth, googleProvider)

export const logout = () => signOut(auth)

export const subscribeAuth = (cb) => onAuthStateChanged(auth, cb)

export default auth
