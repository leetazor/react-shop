/* ------------ IMPORTS ------------- */

import { AnyAction } from 'redux';

/* ------------ TYPES ------------- */

// inside of our reducer, we have some actions that do have payloads ans some that don't
// with TypeScript we miust be explicit and only use actions with proper types
// we can't have an Action with payload 'undefined'

// type for Actions with payload
export type ActionWithPayload<T, P> = {
  type: T;
  payload: P;
}

// type for Actions without payload
export type Action<T> = {
  type: T;
}

/* ------------ CREATE ACTION TYPE MATCHER FUNCTION ------------- */

// Action Matchers Definition 
// 'AC' here stands for 'Action Creator'
// the below type is generic Action Creator that is some function that returns back 'AnyAction'
type Matchable<AC extends () => AnyAction> = AC & {
  type: ReturnType<AC>['type'];
  match(action: AnyAction): action is ReturnType<AC>;
}

// function type overloading
export function withMatcher<AC extends () => AnyAction & { type: string }>(actionCreator: AC): Matchable<AC>;
export function withMatcher<AC extends (...args: any[]) => AnyAction & { type: string }>(actionCreator: AC): Matchable<AC>;


//the actual Matcher Function we are going to wrap Actions into 
export function withMatcher( actionCreator: Function ) {
  const type = actionCreator().type;
  return Object.assign(actionCreator, {
    type,
    match(action: AnyAction) {
      return action.type === type;
    }
  })
}

/* ------------ CREATE ACTION FUNCTIONS ------------- */

// 'Function Overloading' comes from TypeScript, not JavaScript
// it allows us to make multiple function type definitions of the same name
// this way, we have multiple type definitions for create action

// if 'Create Action' is called with Type and Payload, the return action will be 'ActionWithPayload':
export function createAction<T extends string, P>(type: T, payload: P): ActionWithPayload<T, P>;

// if 'Create Action' is called with only Type (no Payload), the return will be 'Action':
// (we are setting payload type to 'void' in this case, to account for it)
export function createAction<T extends string>(type: T, payload: void): Action<T>;

// The actual Action definition:
export function createAction<T extends string, P>(type: T, payload: P) {
  return { type, payload };
}

//export const createAction = (type, payload) => ({ type, payload });
