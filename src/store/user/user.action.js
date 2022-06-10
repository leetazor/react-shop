import { USER_ACTION_TYPES } from './user.types';
import { createAction } from "../../utils/reducer/reducer.utils";

 
 // Function, creating an action object
export const setCurrentUser = (user) =>
   createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user);
