import {
  UPDATE_CONSUMPTION_TARGET,
  REMOVE_CHAR_CONSUMPTION_TARGET,
  //SET_SHOPPING_PERIOD,
  SHOW_PREVIOUS_GUEST_PRODUCT_SELECTION_ONLOAD
} from '../actions/types';

const defaultState = {
  consumptionTarget : "",
  howOftenShopValue: 1,
  weeklyTotal: "",
};

export default function(state=defaultState, action){
  let newValue, weeklyTotal;
  switch (action.type) {
    case SHOW_PREVIOUS_GUEST_PRODUCT_SELECTION_ONLOAD:
      const {consumptionTarget : consumption} = action.payload.goals;
      const {weeklyTotal : weekly} = action.payload.goals;

    return {...state, consumptionTarget:consumption, weeklyTotal : weekly}
    case UPDATE_CONSUMPTION_TARGET:
      newValue =  state.consumptionTarget;
      newValue += action.payload;
      weeklyTotal = getWeeklyTotal(newValue);
      //nextShoppingLimit = getNextShoppingLimit(weeklyTotal, state.howOftenShopValue);
      return {...state, consumptionTarget : newValue, weeklyTotal};
    case REMOVE_CHAR_CONSUMPTION_TARGET:
      newValue =  state.consumptionTarget;
      newValue = newValue.slice(0, -1);
      weeklyTotal = getWeeklyTotal(newValue);
      //nextShoppingLimit = getNextShoppingLimit(weeklyTotal, state.howOftenShopValue);
      return {...state, consumptionTarget : newValue, weeklyTotal};
    // case SET_SHOPPING_PERIOD:
    //   //nextShoppingLimit = getNextShoppingLimit(state.weeklyTotal, action.payload);
    //   return {...state, howOftenShopValue: action.payload};
    default:
    return {...state};
  }
}
// function getNextShoppingLimit(weeklyTotalValue, howOftenShop){
//   if(weeklyTotalValue !== "" && howOftenShop !== 0){
//     const nextShoppingLimit = weeklyTotalValue / howOftenShop;
//     return Math.round(nextShoppingLimit);
//   }
//   return 0;
// }
function getWeeklyTotal(consumptionTarget){
  if(consumptionTarget !== ""){
    return Math.round(consumptionTarget * 7);
  }
  return "";
}
