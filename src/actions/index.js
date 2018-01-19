import axios from "axios";
import {
  AUTH_USER,
  UNAUTH_USER,
  FETCH_MESSAGE,
  AUTH_ERROR,
  UPDATE_CONSUMPTION_TARGET,
  REMOVE_CHAR_CONSUMPTION_TARGET,
  SET_SHOPPING_PERIOD,
  SET_PRODUCTS,
  UPDATE_SELECTED_ITEMS,
  UPDATE_PRODUCT_QUANTITY,
  UPDATE_OVERLIMIT,
  REMOVE_FROM_BASKET,
  SAVE_GUEST_SELECTION,
  SHOW_PREVIOUS_GUEST_PRODUCT_SELECTION_ONLOAD
} from './types';
import {searchTake, GUEST_ID} from '../config';
import {ROOT_URL} from '../configapi';
export const CREATE_ITEM="create_item";


export function createItem(values, callback){
  console.log('values',values);
  callback();

  return {
    type:CREATE_ITEM,
    payload:values
  }
}


export function signinUser({email, password}, callback){
  return function(dispatch){          // redux-thunk will call this method
    axios.post(`${ROOT_URL}/signin`, {email, password})
      .then(response => {
      //this.props.history.push('/authenticatedroute');
      dispatch({type:AUTH_USER});

      localStorage.setItem("token", response.data.token);

      callback();
      })
      .catch(()=>{

        dispatch(authError('Wrong email or password'));
      });
  }
}



export function signupUser({email, password}, callback){
  return function(dispatch){
    axios.post(`${ROOT_URL}/signup`, {email, password})
    .then(response => {
      console.log('sign up ok');
      dispatch({type:AUTH_USER});
      localStorage.setItem("token", response.data.token);
      callback();
    })
    .catch(error => {
      dispatch(signupError(error));
    })
  }
}
export function authError(error){
  console.log('dispatch error!!', error);
  return{
    type: AUTH_ERROR,
    payload: error
  }
}

export function signupError(error){
  console.log('dispatch error!!', error);
  return{
    type: AUTH_ERROR,
    payload: error
  }
}


export function signoutUser(){
  localStorage.removeItem("token");
  return {type:UNAUTH_USER};
}


//redux-thunk way
export function fetchMessage(){
  return function(dispatch){
    axios.get(ROOT_URL, {
      headers: {authorization : localStorage.getItem('token')}
    })
    .then(response=>{
      console.log(response);
      dispatch({
        type: FETCH_MESSAGE,
        payload:response.data.message
      })
    })
  }
}

export function updateConsumptionTarget(input){
  return{
    type: UPDATE_CONSUMPTION_TARGET,
    payload: input
  }
}

export function removeCharFromConsumptionTarget(){
  return{
    type: REMOVE_CHAR_CONSUMPTION_TARGET,
    payload: ""
  }
}

export function setShoppingPeriod(period){
  return{
    type:SET_SHOPPING_PERIOD,
    payload:period
  }
}

export function removeFromSelected(itemId){
  return{
    type: REMOVE_FROM_BASKET,
    payload : itemId
  }
}


export function getProducts(searchTerm, searchOffset){
  const  searchText = searchTerm || "tesco";
  return function(dispatch){
    const dataObj = {"searchText" : searchText, "searchOffset" : searchOffset, "searchTake" : searchTake };
    const ax = axios.post(`${ROOT_URL}/getProducts`, dataObj);
    ax.then(response => {
    console.log("products recieved", response.data.usableObj);
    const result = {...response.data, "searchText" : searchText, "searchOffset" : searchOffset }
      dispatch({
              type:SET_PRODUCTS,
              payload: result
            });
    })
  }
}

export function sendSelectedToServer(selectedItems, goals){
  console.log('sending selected to server');
  const guestId = localStorage.getItem("guestId");
  if(guestId){
    const dataObj = {guestId, selectedItems, goals};
    const request = axios.post(`${ROOT_URL}/saveGuestSelection`, dataObj);
    return{
      type: SAVE_GUEST_SELECTION,
      payload: request
    }
  }
}

export function updateSelected(id, nextShoppingLimit){
  const data = {id, nextShoppingLimit}
  return{
    type: UPDATE_SELECTED_ITEMS,
    payload:data
  }
}

// export function updateProductQuantity(id, productQuantity, nextShoppingLimit){
//   const data = {id, productQuantity, nextShoppingLimit}
//   return{
//     type: UPDATE_PRODUCT_QUANTITY,
//     payload:data
//   }
// }
export function updateProductQuantity(id, mathOperation, nextShoppingLimit){    //mathOperation "+" or "-"
  const data = {id, mathOperation, nextShoppingLimit}
  return{
    type: UPDATE_PRODUCT_QUANTITY,
    payload:data
  }
}


export function recalculateBasketTotal(weeklyTotal){
  const data = {weeklyTotal};
  return{
    type: UPDATE_OVERLIMIT,
    payload: data
  }
}

export function getGuestId(){
  const endPoint = `${ROOT_URL}/getguestid`;
  const request = axios.get(endPoint);
  request.then(response => {
    console.log('getGuestId', response.data);
    localStorage.setItem(GUEST_ID, response.data.newGuestID)
  });

}

export function getUserData(guestId){
    return function(dispatch){
      const ax = axios.get(`${ROOT_URL}/getGuestSelection/${guestId}`);
       ax.then(response => {
       console.log("recieved saved selection", response.data.usableObj);
        console.log("recieved goals", response.data.goals);
      dispatch({
        type:  SHOW_PREVIOUS_GUEST_PRODUCT_SELECTION_ONLOAD,
        payload: response.data
      })
    })
  }
}
//promise way, instead of redux-thunk
// export function fetchMessage(){
//   const request = axios.get(ROOT_URL, {
//     headers: { authorization: localStorage.getItem('token')}
//   });
//   return {
//     type:FETCH_MESSAGE,
//     payload: request
//   }
// }
