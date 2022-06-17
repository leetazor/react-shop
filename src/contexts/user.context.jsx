import { createContext, useState, useEffect } from 'react';

import { onAuthStateChangedListener, createUserDocumentFromAuth } from '../utils/firebase/firebase.utils';

// the actual value we want to access
export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null,
});

// component
export const UserProvider = ({ children }) => {
    //The state inside of the Context Component is available for access by all components wrapped by this Context Provider (Component)
    const [ currentUser, setCurrentUser ] = useState(null);
    const value = {currentUser, setCurrentUser};

    useEffect(() => {
      /* 'onAuthStateChanged' - is a listener funtion, supplied by Firebase, that listens for changes in authentication (user sign-ins and sign-outs)
      Unsubscribe method is returned from 'onAuthStateChanged' - it stops the listener.
      Whenever a component unmounts, useEffect runs whatever is returned from it.
      In the below case, unsubscribe method will be called when UserContext component unmouts, stopping the active listener.
      We need to stop the listener when component unmounts, to avoid memory leaks.
      */
      const unsubscribe = onAuthStateChangedListener((user) => {
          if(user) {
            createUserDocumentFromAuth(user);
          }
         setCurrentUser(user);
      });      
      //useEffect callback will return whatever the callback function runs when it un-mounts
      return unsubscribe;
    }, []);

    return <UserContext.Provider value={value}>{ children }</UserContext.Provider>
}