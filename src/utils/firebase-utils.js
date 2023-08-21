// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup} from 'firebase/auth'
import {getFirestore, doc, getDoc, setDoc} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDKyFprNa4MHwepol4qBZnNEDarBePHLFQ",
  authDomain: "crown-clothing-db-db2cd.firebaseapp.com",
  projectId: "crown-clothing-db-db2cd",
  storageBucket: "crown-clothing-db-db2cd.appspot.com",
  messagingSenderId: "571650451231",
  appId: "1:571650451231:web:34ce30a5383a762565322a"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters(
   { 
    prompt: 'select_account',
    }
)

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const signInWithGoogleRedirect = () => signInWithGoogleRedirect(auth, provider);
export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid);
  const userSnap = await getDoc(userDocRef);
  const { displayName, email } = userAuth;
  const created_at = new Date();

  if (!userSnap.exists()) {
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        created_at
      })
    } catch (error) {
      console.log('error user creating', error.message);
    }
  }
  return userDocRef;
}

export const createAuthUserWithEmailAndPassword =  async (email, password) => {
  if (!email && !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
}