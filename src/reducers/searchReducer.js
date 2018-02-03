import _ from 'lodash';
import {
  SET_PRODUCTS,
  UPDATE_SELECTED_ITEMS,
  UPDATE_PRODUCT_QUANTITY,
  UPDATE_OVERLIMIT,
  REMOVE_FROM_BASKET,
  SHOW_PREVIOUS_GUEST_PRODUCT_SELECTION_ONLOAD,
  MARK_ITEM_BOUGHT
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
  let newSelected = {}, basketTotal = 0, overLimit = false, newProducts= {}, itemId = "";
  switch(action.type){
    case SET_PRODUCTS:
      console.log(SET_PRODUCTS, action.payload);
      const usableObj = action.payload.usableObj;
      _.mapKeys(usableObj, function (item, key){
        if(state.selectedItems[key]){      // if product recieved is part of selected
          item.productQuantity = state.selectedItems[key].productQuantity;
        }
        else{                                       // add default quantities
          if(item.UnitOfSale === 3){
            item.productQuantity = 100;
          }
          else{
            item.productQuantity = 1;
          }
        }
        const productQuantity = item.productQuantity;
        const selectedId = item.id;
        usableObj[selectedId].productQuantity = productQuantity;
      })

      if(action.payload.searchOffset === 0){
        newProducts = {...action.payload.usableObj};
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
        if(state.selectedItems[payloadId].id){          // make sure item has id, before using id -> why ? -> might not need this line
          delete newSelected[payloadId];
          //newSelected[payloadId] = {productQuantity : existingProductQuantityValue};  // don't understand why I needed this line
        }
        else{
          newSelected[payloadId] = {...product, productQuantity : existingProductQuantityValue} ;  // why ? -> item must be deselected, it doesn't need quantity
        }
      }
      else {                                                  // if selected not found -> add it to selection
        newSelected = {...state.selectedItems};
        newSelected[payloadId] = product;
        newSelected[payloadId].isBought ? newSelected[payloadId].isBought = true : newSelected[payloadId].isBought = false;
        if(!newSelected[payloadId].productQuantity){
          if(newSelected[payloadId].UnitOfSale === 3){        // if item sold as loose -> per 100 grams
            newSelected[payloadId].productQuantity = 100;     // default 100 grams
          }
          else{
            newSelected[payloadId].productQuantity = 1;
          }
        }
        else{
          // newSelected[payloadId].productQuantity = 1
        }
      }
      _.mapKeys(newSelected, function(value, key){
        // if(value.productEnergy){
        //   basketTotal+= +value.productEnergy*value.productQuantity;
        // }
        if(value.productEnergy){
          if(value.UnitOfSale === 3){
            basketTotal+= +value.productEnergy * value.productQuantity / 100;
          }
          else{
            basketTotal+= +value.productEnergy * value.productQuantity;
          }
        }
      });
      if(basketTotal > action.payload.weeklyTotal){
        overLimit = true
      }
      console.log('manual selected', newSelected);
      return {...state, selectedItems: newSelected, basketTotal, overLimit}

    case SHOW_PREVIOUS_GUEST_PRODUCT_SELECTION_ONLOAD:
        newSelected = {...state.selectedItems, ...action.payload.usableObj};
        newProducts = {...state.products, ...action.payload.usableObj};
        _.mapKeys(newSelected, function(value, key){
          // if(value.productEnergy){
          //   //value.productQuantity = 1;
          //   basketTotal+= +value.productEnergy * value.productQuantity;
          // }
          if(value.UnitOfSale === 3){
            //value.productQuantity = 1;
            basketTotal+= +value.productEnergy * value.productQuantity / 100;
          }
          else{
            basketTotal+= +value.productEnergy * value.productQuantity;
          }
        });
        console.log("previous data - from server", newSelected);
      return {...state, products: newProducts, selectedItems: newSelected, basketTotal, overLimit:true}
    case MARK_ITEM_BOUGHT:
      itemId = action.payload.itemId;
      newSelected = {...state.selectedItems};
      newSelected[itemId].isBought ? newSelected[itemId].isBought = false : newSelected[itemId].isBought = true;
      return {...state, selectedItems: newSelected}

    case UPDATE_PRODUCT_QUANTITY:
      itemId = action.payload.id;
      const mathOperation = action.payload.mathOperation;
      newSelected = {...state.selectedItems};
    if(state.selectedItems[itemId]){                                // if item is selected or just incremented without selection
        if(newSelected[itemId].UnitOfSale === 3){                   // loose items sold by grams
          if(mathOperation === "+"){
            newSelected[itemId].productQuantity += 100;
          }
          else if(mathOperation === "-"){
            if(newSelected[itemId].productQuantity > 100){          // substruct only if more then 100
              newSelected[itemId].productQuantity -= 100;
            }
          }
        }
        else{
          if(mathOperation === "+"){
            newSelected[itemId].productQuantity += 1;
          }
          else if(mathOperation === "-"){
            if(newSelected[itemId].productQuantity > 1){          // substruct only if more then 100
              newSelected[itemId].productQuantity -= 1;
            }
          }
          //newSelected[itemId].productQuantity = action.payload.productQuantity + 1
        }
      }
      // for now remove the option to change quantity of unselected items
      // else{
      //   newSelected = {...state.selectedItems};
      //   newSelected[action.payload.id] = {productQuantity : action.payload.productQuantity};
      // }
      _.mapKeys(newSelected, function(value, key){
        // if(value.productEnergy){
        //   basketTotal+= +value.productEnergy * value.productQuantity;
        // }
        if(value.productEnergy){
          if(value.UnitOfSale === 3){
            basketTotal+= +value.productEnergy * value.productQuantity / 100;
          }
          else{
            basketTotal+= +value.productEnergy * value.productQuantity;
          }
        }
      });
      if(basketTotal > action.payload.weeklyTotal){
        overLimit = true
      }
      return {...state, selectedItems: newSelected, basketTotal, overLimit}
    case UPDATE_OVERLIMIT:
      if(state.basketTotal > action.payload.weeklyTotal){
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
