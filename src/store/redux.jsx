import {
  applyMiddleware,
  createStore,
} from 'redux';
import promise from 'redux-promise';
import reducers from '../reducers/index';
import Async from '../middleware/async';   //custom middleware
import reduxThunk from 'redux-thunk';
import watch from 'redux-watch';
import {AUTH_USER, UPDATE_OVERLIMIT} from '../actions/types';
import {GUEST_ID} from '../config';
import {getGuestId} from '../actions';

const createStoreWithMiddleware = applyMiddleware(promise, Async, reduxThunk)(createStore);
export const store = createStoreWithMiddleware(reducers);


const guestId = localStorage.getItem(GUEST_ID);
const token = localStorage.getItem("token");

if(token){                                                // registered user
  store.dispatch({type:AUTH_USER});
}
else if(guestId){                                         // used to login as guest
  console.log("guest Id found");
}
else{                                                     // no guest id
  // generate id and store it
  // call backend requesting id
  getGuestId();
}

store.subscribe(()=>{
   console.log("store changed", store.getState());
   // console.log('weeklyTotal', store.getState().goals.weeklyTotal);
});

let watchNextShoppingLimit = watch(store.getState, 'goals.nextShoppingLimit')
store.subscribe(watchNextShoppingLimit((newVal, oldVal, objectPath) => {
  // console.log('%s changed from %s to %s', objectPath, oldVal, newVal)
  if(oldVal !== newVal){
    store.dispatch({ type: UPDATE_OVERLIMIT, payload: { nextShoppingLimit: newVal }});
  }
})
);

let watchHowOftenShopValue = watch(store.getState, 'goals.howOftenShopValue')
store.subscribe(watchHowOftenShopValue((newVal, oldVal, objectPath) => {
  // console.log('%s changed from %s to %s', objectPath, oldVal, newVal)
  if(oldVal !== newVal){
    const weeklyTotal = store.getState().goals.weeklyTotal;
    store.dispatch({ type: UPDATE_OVERLIMIT, payload: { weeklyTotal: weeklyTotal, howOftenShopValue : newVal }});
  }
})
);
