import _ from 'lodash';
import {
  SET_PRODUCTS,
  UPDATE_SELECTED_ITEMS,
  UPDATE_PRODUCT_QUANTITY,
  UPDATE_OVERLIMIT,
  REMOVE_FROM_BASKET,
  SHOW_PREVIOUS_GUEST_PRODUCT_SELECTION_ONLOAD
} from '../actions/types';

const defaultState = {
  searchText : "",
  products : {},
  selectedItems: {},
  basketTotal : 0,
  overLimit : false,
  previousSearch : "",
  searchOffset : 0
};

export default function(state=defaultState, action){
  let newSelected = {}, basketTotal = 0, overLimit = false, newProducts= {};
  switch(action.type){
    case SET_PRODUCTS:
      console.log(SET_PRODUCTS, action.payload);
      if(action.payload.searchOffset === 0){
        newProducts = {...action.payload.usableObj}
      }
      else{
        newProducts = {...state.products, ...action.payload.usableObj};
      }
      return {...state, products: newProducts, searchOffset: action.payload.searchOffset, searchText: action.payload.searchText}
    case UPDATE_SELECTED_ITEMS:
      const payloadId = action.payload.id;
      const product = state.products[payloadId];
      if(state.selectedItems[payloadId]){               // if selected found, means  -> toggle -> deselect
        let existingProductQuantityValue = state.selectedItems[payloadId].productQuantity;
        newSelected = {...state.selectedItems};
        if(state.selectedItems[payloadId].id){
          delete newSelected[payloadId];
          newSelected[payloadId] = {productQuantity : existingProductQuantityValue};
        }
        else{
          newSelected[payloadId] = {...product, productQuantity : existingProductQuantityValue} ;
        }
      }
      else {                                            // if selected not found -> add it to selection
        newSelected = {...state.selectedItems};
        newSelected[payloadId] = product;
        newSelected[payloadId].productQuantity = "1";
      }
      _.mapKeys(newSelected, function(value, key){
        if(value.productEnergy){
          basketTotal+= +value.productEnergy*value.productQuantity;
        }
      });
      if(basketTotal > action.payload.nextShoppingLimit){
        overLimit = true
      }
      console.log('manual selected', newSelected);
      return {...state, selectedItems: newSelected, basketTotal, overLimit}

    case SHOW_PREVIOUS_GUEST_PRODUCT_SELECTION_ONLOAD:
        newSelected = {...state.selectedItems, ...action.payload.usableObj};
        newProducts = {...state.products, ...action.payload.usableObj};
        _.mapKeys(newSelected, function(value, key){
          if(value.productEnergy){
            value.productQuantity = 1;
            basketTotal+= +value.productEnergy*value.productQuantity;
          }
        });
        console.log("previous data - from server", newSelected);
      return {...state, products: newProducts, selectedItems: newSelected, basketTotal, overLimit:true}

    case UPDATE_PRODUCT_QUANTITY:
      if(state.selectedItems[action.payload.id]){
        newSelected = {...state.selectedItems};
        newSelected[action.payload.id].productQuantity = action.payload.productQuantity
      }
      else{
        newSelected = {...state.selectedItems};
        newSelected[action.payload.id] = {productQuantity : action.payload.productQuantity};
      }
      _.mapKeys(newSelected, function(value, key){
        if(value.productEnergy){
          basketTotal+= +value.productEnergy*value.productQuantity;
        }
      });
      if(basketTotal > action.payload.nextShoppingLimit){
        overLimit = true
      }
      return {...state, selectedItems: newSelected, basketTotal, overLimit}
    case UPDATE_OVERLIMIT:
      if(state.basketTotal > action.payload.nextShoppingLimit){
        overLimit = true;
      }
      else{
        overLimit = false;
      }
      return {...state, overLimit };
    case REMOVE_FROM_BASKET:
    console.log('REMOVE_FROM_BASKET', action.payload);
      newSelected = {...state.selectedItems};
      console.log('newSelected', newSelected);
      delete newSelected[action.payload];
      return {...state, selectedItems: newSelected };
    default:
    return {...state};
  }
}
