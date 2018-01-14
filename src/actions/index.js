// import _ from 'lodash';
import axios from "axios";
import {
  AUTH_USER,
  UNAUTH_USER,
  FETCH_MESSAGE,
  AUTH_ERROR,
  UPDATE_CONSUMPTION_TARGET,
  REMOVE_CHAR_CONSUMPTION_TARGET,
  SET_SHOPPING_PERIOD,
  // SET_SEARCH_TEXT,
  SET_PRODUCTS,
  UPDATE_SELECTED_ITEMS,
  UPDATE_PRODUCT_QUANTITY,
  UPDATE_OVERLIMIT,
  REMOVE_FROM_BASKET,
  SAVE_GUEST_SELECTION
} from './types';
import {searchTake, GUEST_ID} from '../config';
export const CREATE_ITEM="create_item";
//const ROOT_URL = "http://localhost:3090";
const ROOT_URL = "https://fatter-api.herokuapp.com";


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

// function checkWindowPosition(e){
//   var scrollHeight = document.body.scrollHeight ,
//    scrollTop = window.pageYOffset,
//     clientHeight = window.innerHeight;
//     // console.log('offset', window.pageYOffset);
//     // console.log('client', window.innerHeight);
//     // console.log('scrollheight', document.body.scrollHeight);
//     const scrollBottom = scrollHeight - clientHeight - scrollTop;
//     // console.log('scrollBottom', scrollBottom);
//       if (scrollBottom <= 30) {
//           console.log("LOAD MORE");
//           getProducts();
//       }
// }
//export const scrollThrottle = _.throttle(checkWindowPosition,1000);

// export function getProducts(searchTerm, searchOffset){
//   const  searchText = searchTerm || "tesco";
//   return function(dispatch){
//     // const take = searchTake;
//     const TESCO_API = `https://dev.tescolabs.com/grocery/products/?query=${searchText}&offset=${searchOffset}&limit=${searchTake}`;
//     let results = [];
//     let usableResults = [];
//     const unusableIndexes = [];
//     axios.get(TESCO_API, {
//       headers:{"Ocp-Apim-Subscription-Key" : tescoapi}
//     })
//     .then(response => {
//       results = response.data.uk.ghs.products.results;
//       usableResults = _.map(results, _.clone);
//       console.log('api response', results);
//       // console.log('usableResults', usableResults);
//       new Promise(function(resolve, reject){
//         const waitingArr = [];
//         results.forEach((item, i) =>{
//           const tpnb = item.tpnb;
//           const TESCO_PRODUCT_API = `https://dev.tescolabs.com/product/?tpnb=${tpnb}`;
//           setTimeout(function(){
//               axios.get(TESCO_PRODUCT_API, {
//               headers:{"Ocp-Apim-Subscription-Key" : tescoapi}
//             })
//             .then((productResponse, ) => {
//               waitingArr.push(i);
//
//                 try{
//                   const foundItem = productResponse.data.products[0];
//                   console.log('foundItem', foundItem);
//                   const kcalPer100 = foundItem.calcNutrition.calcNutrients[1].valuePer100;    // fails and triggers catch block
//                   const unitOfSale =  usableResults[i].UnitOfSale;
//                   const quantity = (foundItem.qtyContents) ? foundItem.qtyContents.quantity : "";
//                   let weightUnits =(foundItem.qtyContents) ? foundItem.qtyContents.quantityUom : "per 100g";
//                   usableResults[i].kcalPer100 = kcalPer100;
//                   usableResults[i].weightUnits = weightUnits;
//                   usableResults[i].quantity = quantity;
//                   if(unitOfSale === 1){           // packaged
//                     if(weightUnits.toLowerCase() === "kg"){
//                       const totalEnergy = Math.round(quantity * 10 * kcalPer100);
//                       usableResults[i].productEnergy = totalEnergy;
//                     }
//                     else if(weightUnits.toLowerCase() === "g"){
//                       const totalEnergy = Math.round(quantity / 100 * kcalPer100);
//                       usableResults[i].productEnergy = totalEnergy;
//                     }
//                     else if(weightUnits.toLowerCase() === "ml"){
//                       // console.log('quantity',quantity);
//                       // console.log('kcalPer100', kcalPer100);
//                       const totalEnergy = Math.round(quantity / 100 * kcalPer100);
//                       usableResults[i].productEnergy = totalEnergy;
//                     }
//                     else{
//                       throw "Error unitOfSale 1";
//                     }
//                   }
//                   else if(unitOfSale === 3){                                // loose
//                     if(weightUnits.toLowerCase() === "per 100g"){
//                       const totalEnergy = Math.round(kcalPer100);
//                       usableResults[i].productEnergy = totalEnergy;
//                     }
//                     else{
//                       throw "Error unitOfSale 2";
//                     }
//                   }
//                   else if(unitOfSale === 2){                                  // single item
//                     if(weightUnits.toLowerCase() === "sngl"){
//                       const AverageSellingUnitWeight = usableResults[i].AverageSellingUnitWeight
//                       const averageEnergyPerItem = kcalPer100 * 10 * AverageSellingUnitWeight;
//                       let totalEnergy = Math.round(averageEnergyPerItem);
//                       usableResults[i].productEnergy = totalEnergy;
//                       usableResults[i].weightUnits = 'item';                         // rename SNGL to item
//                     }
//                     else{
//                       throw "Error unitOfSale 3";
//                     }
//                   }
//                 }
//                 catch(e){
//                   // console.log('catch', i);
//                   // console.log(e);
//                   // console.log('prod', productResponse.data.products[0]);
//                   unusableIndexes.push(i);
//                  }
//                 finally{
//                   if(waitingArr.length === results.length){
//                     resolve();
//                   }
//                 }
//               })
//               .catch(error => console.log(error))
//             }, 600);
//           });
//       })
//       .then(()=>{
//         unusableIndexes.sort();
//         for(let y = unusableIndexes.length - 1; y >= 0; y--){
//           usableResults.splice(unusableIndexes[y], 1);
//         }
//         const usableObj = {};
//         usableResults.reduce(function(previousValue, currentValue){
//           usableObj[currentValue.id] = currentValue;
//         }, usableObj);
//         const payloadObject = {usableObj, searchText, searchOffset}
//         console.log('usableObj',usableObj);
//         dispatch({
//           type:SET_PRODUCTS,
//           payload: payloadObject
//         });
//       });
//     });
//   }
// }

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

export function sendSelectedToServer(selectedItems){
  console.log('sending selected to server');
  const guestId = localStorage.getItem("guestId");
  if(guestId){
    const dataObj = {guestId, selectedItems};
    const request = axios.post(`${ROOT_URL}/saveGuestSelection`, dataObj);
    return{
      type: SAVE_GUEST_SELECTION,
      payload: request
    }
  }
}
  //   const TESCO_API = `https://dev.tescolabs.com/grocery/products/?query=${searchText}&offset=${searchOffset}&limit=${searchTake}`;
    // let usableResults = [];
    // const unusableIndexes = [];
  //   axios.get(TESCO_API, {
  //     headers:{"Ocp-Apim-Subscription-Key" : tescoapi}
  //   })
  //   .then(response => {
  //     results = response.data.uk.ghs.products.results;
  //     usableResults = _.map(results, _.clone);
  //     console.log('api response', results);
  //     // console.log('usableResults', usableResults);
  //     new Promise(function(resolve, reject){
  //       const waitingArr = [];
  //       results.forEach((item, i) =>{
  //         const tpnb = item.tpnb;
  //         const TESCO_PRODUCT_API = `https://dev.tescolabs.com/product/?tpnb=${tpnb}`;
  //         setTimeout(function(){
  //             axios.get(TESCO_PRODUCT_API, {
  //             headers:{"Ocp-Apim-Subscription-Key" : tescoapi}
  //           })
  //           .then((productResponse, ) => {
  //             waitingArr.push(i);
  //
  //               try{
  //                 const foundItem = productResponse.data.products[0];
  //                 console.log('foundItem', foundItem);
  //                 const kcalPer100 = foundItem.calcNutrition.calcNutrients[1].valuePer100;    // fails and triggers catch block
  //                 const unitOfSale =  usableResults[i].UnitOfSale;
  //                 const quantity = (foundItem.qtyContents) ? foundItem.qtyContents.quantity : "";
  //                 let weightUnits =(foundItem.qtyContents) ? foundItem.qtyContents.quantityUom : "per 100g";
  //                 usableResults[i].kcalPer100 = kcalPer100;
  //                 usableResults[i].weightUnits = weightUnits;
  //                 usableResults[i].quantity = quantity;
  //                 if(unitOfSale === 1){           // packaged
  //                   if(weightUnits.toLowerCase() === "kg"){
  //                     const totalEnergy = Math.round(quantity * 10 * kcalPer100);
  //                     usableResults[i].productEnergy = totalEnergy;
  //                   }
  //                   else if(weightUnits.toLowerCase() === "g"){
  //                     const totalEnergy = Math.round(quantity / 100 * kcalPer100);
  //                     usableResults[i].productEnergy = totalEnergy;
  //                   }
  //                   else if(weightUnits.toLowerCase() === "ml"){
  //                     // console.log('quantity',quantity);
  //                     // console.log('kcalPer100', kcalPer100);
  //                     const totalEnergy = Math.round(quantity / 100 * kcalPer100);
  //                     usableResults[i].productEnergy = totalEnergy;
  //                   }
  //                   else{
  //                     throw "Error unitOfSale 1";
  //                   }
  //                 }
  //                 else if(unitOfSale === 3){                                // loose
  //                   if(weightUnits.toLowerCase() === "per 100g"){
  //                     const totalEnergy = Math.round(kcalPer100);
  //                     usableResults[i].productEnergy = totalEnergy;
  //                   }
  //                   else{
  //                     throw "Error unitOfSale 2";
  //                   }
  //                 }
  //                 else if(unitOfSale === 2){                                  // single item
  //                   if(weightUnits.toLowerCase() === "sngl"){
  //                     const AverageSellingUnitWeight = usableResults[i].AverageSellingUnitWeight
  //                     const averageEnergyPerItem = kcalPer100 * 10 * AverageSellingUnitWeight;
  //                     let totalEnergy = Math.round(averageEnergyPerItem);
  //                     usableResults[i].productEnergy = totalEnergy;
  //                     usableResults[i].weightUnits = 'item';                         // rename SNGL to item
  //                   }
  //                   else{
  //                     throw "Error unitOfSale 3";
  //                   }
  //                 }
  //               }
  //               catch(e){
  //                 // console.log('catch', i);
  //                 // console.log(e);
  //                 // console.log('prod', productResponse.data.products[0]);
  //                 unusableIndexes.push(i);
  //                }
  //               finally{
  //                 if(waitingArr.length === results.length){
  //                   resolve();
  //                 }
  //               }
  //             })
  //             .catch(error => console.log(error))
  //           }, 600);
  //         });
  //     })
  //     .then(()=>{
  //       unusableIndexes.sort();
  //       for(let y = unusableIndexes.length - 1; y >= 0; y--){
  //         usableResults.splice(unusableIndexes[y], 1);
  //       }
  //       const usableObj = {};
  //       usableResults.reduce(function(previousValue, currentValue){
  //         usableObj[currentValue.id] = currentValue;
  //       }, usableObj);
  //       const payloadObject = {usableObj, searchText, searchOffset}
  //       console.log('usableObj',usableObj);
  //       dispatch({
  //         type:SET_PRODUCTS,
  //         payload: payloadObject
  //       });
  //     });
  //   });
  // }



export function updateSelected(id, nextShoppingLimit){
  const data = {id, nextShoppingLimit}
  return{
    type: UPDATE_SELECTED_ITEMS,
    payload:data
  }
}

export function updateProductQuantity(id, productQuantity, nextShoppingLimit){
  const data = {id, productQuantity, nextShoppingLimit}
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
