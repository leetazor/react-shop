import { createContext, useState, useEffect } from 'react';

import { onAuthStateChangedListener, createUserDocumentFromAuth } from '../utils/firebase/firebase.utils';

// the actual value we want to access
export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null,
});

// component
export const UserProvider = ({ children }) => {
    const [ currentUser, setCurrentUser ] = useState(null);
    const value = {currentUser, setCurrentUser};

    useEffect(() => {
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