import { initializeApp } from 'firebase/app';

import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from 'firebase/auth';

import {
     getFirestore,
     doc,
     getDoc,
     setDoc,
     collection,
     writeBatch,
     query,
     getDocs
} from 'firebase/firestore';


// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC8JoKsnwJ6wSMKVSSuyR7nibqG8-Ly4Ss",
    authDomain: "first-react-app-shop.firebaseapp.com",
    projectId: "first-react-app-shop",
    storageBucket: "first-react-app-shop.appspot.com",
    messagingSenderId: "120003394702",
    appId: "1:120003394702:web:4d346119058f707def1ddf"
};
  
// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const GoogleProvider = new GoogleAuthProvider();

GoogleProvider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();

export const signInWithGooglePopup = () => signInWithPopup(auth, GoogleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, GoogleProvider);

export const db = getFirestore();

//below method is for writing (PUT) collections and products into the Firestore database - only need to do it once
export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = collection(db, collectionKey);
    const batch = writeBatch(db);

    objectsToAdd.forEach((object) => {
      const docRef = doc(collectionRef, object.title.toLowerCase());
      batch.set(docRef, object);
    });

    await batch.commit();
    console.log('done');
}

//GET data from the Firestore
export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, 'categories');
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((docSnapshot) => docSnapshot.data());
};


export const createUserDocumentFromAuth = async (
    userAuth,
    additionalInformation = {}
    ) => {

        if(!userAuth) return;
        const userDocRef = doc(db, 'users', userAuth.uid);

        const userSnapshot = await getDoc(userDocRef);     

        //if user data does not exist
        //create the document with the data from userAuth in my collection
        if(!userSnapshot.exists()) {
            // de-structuring existing fields displayName and email from the object we got with firebase's getAuth()
            const { displayName, email } = userAuth;
            const createdAt = new Date();

            try {
                await setDoc(userDocRef, {
                    displayName,
                    email,
                    createdAt,
                    ...additionalInformation
                });
            } catch (error) {
                console.log('error creating the user', error.message);
            }
        }

        //if user data exists
        return userDocRef;
    
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
      if(!email || !password) return;
      return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;
    return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

// onAuthStateChanged is an constant listener, it always listents for when someone logs in or out.
export const onAuthStateChangedListener = (callback) =>
onAuthStateChanged(auth, callback);