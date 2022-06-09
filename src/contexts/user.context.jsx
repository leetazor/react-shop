import { createContext, useEffect, useReducer } from 'react';

import { onAuthStateChangedListener, createUserDocumentFromAuth } from '../utils/firebase/firebase.utils';

// the actual value we want to access
export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null,
});

export const USER_ACTION_TYPES = {
  SET_CURRENT_USER : 'SET_CURRENT_USER'
}

const userReducer = (state, action) => {
  console.log('dispatched');
 
  const { type, payload } = action;

  switch(type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: payload
      }
    default:
      throw new Error(`Unhandled type ${type} in userReducer`)
  } 
}

const INITIAL_STATE = {
  currentUser: null
}

// component
export const UserProvider = ({ children }) => {
    
    // useReducer takes 2 arguments: Reducer and State (Initial state),
    // we always get 2 arguments back: 1) state object, current values being stored and a Dispatch function
    const [ state, dispatch ] = useReducer(userReducer, INITIAL_STATE);
    
    const {currentUser} = state;
    console.log(currentUser);

    
    const setCurrentUser = (user) => {
      dispatch({type: USER_ACTION_TYPES.SET_CURRENT_USER, payload: user});
    }
  
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
