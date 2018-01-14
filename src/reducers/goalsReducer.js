import {
  UPDATE_CONSUMPTION_TARGET,
  REMOVE_CHAR_CONSUMPTION_TARGET,
  SET_SHOPPING_PERIOD
} from '../actions/types';

const defaultState = {
  consumptionTarget : "",
  weeklyTotal: "",
  howOftenShopValue: 0,
  nextShoppingLimit : 0
};

export default function(state=defaultState, action){
  let newValue, weeklyTotal,nextShoppingLimit;
  switch (action.type) {
    case UPDATE_CONSUMPTION_TARGET:
      newValue =  state.consumptionTarget;
      newValue += action.payload;
      weeklyTotal = getWeeklyTotal(newValue);
      nextShoppingLimit = getNextShoppingLimit(weeklyTotal, state.howOftenShopValue);
      return {...state, consumptionTarget : newValue, weeklyTotal, nextShoppingLimit};
    case REMOVE_CHAR_CONSUMPTION_TARGET:
      newValue =  state.consumptionTarget;
      newValue = newValue.slice(0, -1);
      weeklyTotal = getWeeklyTotal(newValue);
      nextShoppingLimit = getNextShoppingLimit(weeklyTotal, state.howOftenShopValue);
      return {...state, consumptionTarget : newValue, weeklyTotal, nextShoppingLimit};
    case SET_SHOPPING_PERIOD:
      nextShoppingLimit = getNextShoppingLimit(state.weeklyTotal, action.payload);
      return {...state, howOftenShopValue: action.payload, nextShoppingLimit};
    default:
    return {...state};
  }
}
function getNextShoppingLimit(weeklyTotalValue, howOftenShop){
  if(weeklyTotalValue !== "" && howOftenShop !== 0){
    const nextShoppingLimit = weeklyTotalValue / howOftenShop;
    return Math.round(nextShoppingLimit);
  }
  return 0;
}
function getWeeklyTotal(consumptionTarget){
  if(consumptionTarget !== ""){
    return Math.round(consumptionTarget * 7);
  }
  return "";
}
