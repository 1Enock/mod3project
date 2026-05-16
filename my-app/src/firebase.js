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

const firebaseConfig = {
  apiKey: "AIzaSyC_vwMajnutmHyyrr2FbUCXDsGvrWvc2As",
  authDomain: "mod3project-727a0.firebaseapp.com",
  projectId: "mod3project-727a0",
  storageBucket: "mod3project-727a0.firebasestorage.app",
  messagingSenderId: "1072620021873",
  appId: "1:1072620021873:web:c9538d4ff6a04619c8d3d0",
  measurementId: "G-G8X6KV0W3W"
};

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
