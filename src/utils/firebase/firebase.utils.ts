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
    onAuthStateChanged,
    User
} from 'firebase/auth';

import {
     getFirestore,
     doc,
     getDoc,
     setDoc,
     collection,
     writeBatch,
     query,
     getDocs,
     QueryDocumentSnapshot
} from 'firebase/firestore';

import { Category } from '../../store/categories/category.types';

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
initializeApp(firebaseConfig);

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
export const createAuthUserWithEmailAndPassword = async (email: string, password: string) => {
  if(!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};

// Authnticates with Firebase, using Email and Password
export const signInAuthUserWithEmailAndPassword = async (email: string, password: string) => {
if(!email || !password) return;
return await signInWithEmailAndPassword(auth, email, password);
};

// Signs user out
export const signOutUser = async () => await signOut(auth);

// gets the user who is currently authenticated and also unsubscribes the listener
export const getCurrentUser = (): Promise<User | null> => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (userAuth) => {
        unsubscribe();
        resolve(userAuth);
      },
      reject
    );
  });
}

/* ------------ FIRESTORE DATABASE -------------- */

// TYPES

export type AdditionalInformation = {
  displayName?: string; // displayName here is optional
}

export type UserData = {
  createdAt: Date;
  displayName: string;
  email: string;
}

// 'QueryDocumentSnapshot' we are importing from firebase/firestore
// 'User' type we're importing directly from firebase/auth - it is already pre-configured by firebase

//FUNCTIONS

// creates a user record in the Firestore database
export const createUserDocumentFromAuth = async (
    userAuth: User, 
    additionalInformation = {} as AdditionalInformation
    ):Promise<void | QueryDocumentSnapshot<UserData>> => {

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
                console.log('error creating the user', error);
            }
        }

        // returns back a user Snapshot (special firestore object, representing the record in the firestore database)
        // as a QueryDocumentSnapshot type with UserData type inside
        return userSnapshot as QueryDocumentSnapshot<UserData>;    
};


/*--------------------------------- Collections and Products -------------------------------------*/ 

// TYPES

export type ObjectToAdd = {
  title: string;
}


// FUNCTIONS

// below method is for writing (PUT) collections and products into the Firestore database - only need to do it once
// Async functions always return a type 'Promise'

// <T extends ObjectsToAdd> here stands for a generic type, extending from ObjectToAdd generic type we've created above

export const addCollectionAndDocuments = async <T extends ObjectToAdd> (
  collectionKey: string,
  objectsToAdd: T[]
  ): Promise<void> => {
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
// This Function returns a 'Promise' to return an array of Categories (we're importing Category type from Category Types):
export const getCategoriesAndDocuments = async (): Promise<Category[]> => {
  const collectionRef = collection(db, 'categories');    
  const q = query(collectionRef);    

  const querySnapshot = await getDocs(q);    
  return querySnapshot.docs.map(
    // WE know that docSnapshot.data() is going to come back as a 'Category' type
    // TypeScript doesn't know this, so we're telling it with 'as Category':
    docSnapshot => docSnapshot.data() as Category
    );
};