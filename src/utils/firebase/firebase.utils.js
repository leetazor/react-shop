/* ------------ IMPORT REQUIRED METHODS -------------- */

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

/* ------------ FIREBASE CONFIG -------------- */

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

//get the firestore database reference
export const db = getFirestore();

/* ------------ FIREBASE AUTHENTICATION -------------- */

const GoogleProvider = new GoogleAuthProvider();

GoogleProvider.setCustomParameters({
    prompt: "select_account"
});

//get the authentication reference
export const auth = getAuth();

// creates methods to sign in with Google with pop-up or redirect
export const signInWithGooglePopup = () => signInWithPopup(auth, GoogleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, GoogleProvider);

// creates an authentication record with Firebase, using Email and Password
export const createAuthUserWithEmailAndPassword = async (email, password) => {
      if(!email || !password) return;
      return await createUserWithEmailAndPassword(auth, email, password);
};

// Authnticates with Firebase, using Email and Password
export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;
    return await signInWithEmailAndPassword(auth, email, password);
};

// Signs user out
export const signOutUser = async () => await signOut(auth);

// onAuthStateChanged is an constant listener, it always listents for when someone logs in or out.
export const onAuthStateChangedListener = (callback) =>
onAuthStateChanged(auth, callback);


/* ------------ FIRESTORE DATABASE -------------- */


// creates a user record in the Firestore database
export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
  ) => {

      if(!userAuth) return;

      // create a document reference in our firestore database,
        // like a blueprint we can then use to get the record about this user from the database
        // takes 3 arguments: database, collection and unique identifier
      const userDocRef = doc(db, 'users', userAuth.uid);

       // (Firebase) getDoc method tries to get the data, based on 3 parameters, set above
        // creates an object as a 'snapshot' or a request to the database, using the blueprint created above,
        // we can use this to check if user exists or not
      const userSnapshot = await getDoc(userDocRef);     

      // .exists() method applied to the above object checks if the record in the database already exists 
      if(!userSnapshot.exists()) {
          // de-structuring existing fields displayName and email from the object we got with firebase's getAuth()
          const { displayName, email } = userAuth;
          const createdAt = new Date();
          
          // below creates the record in the database with the data from userAuth in a specific collection
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
      //returns back a user Reference that we created above 
      return userDocRef;    
};


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
  const categoryMap = querySnapshot.docs.reduce((accumulator, docSnapshot) => {             
      const { title, items } = docSnapshot.data();
      accumulator[title.toLowerCase()] = items;
      return accumulator;
  }, {});
  
  return categoryMap;
};