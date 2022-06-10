import { createContext, useEffect, useReducer } from 'react';

import {createAction} from '../utils/reducer/reducer.utils';

import { onAuthStateChangedListener, createUserDocumentFromAuth } from '../utils/firebase/firebase.utils';

// Context
export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null,
});

// Redux Action Types
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

// Provider Component
export const UserProvider = ({ children }) => {
    
    // useReducer takes 2 arguments: Reducer and State (Initial state),
    // we always get 2 arguments back: 1) state object, current values being stored and a Dispatch function
    const [ state, dispatch ] = useReducer(userReducer, INITIAL_STATE);
    
    const {currentUser} = state;
    console.log(currentUser);

    //Dispatch to the Reducer Function
    const setCurrentUser = (user) => {
      dispatch(        
        createAction(
          USER_ACTION_TYPES.SET_CURRENT_USER,
          user
        )      
      );
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
