import { combineReducers } from 'redux';
import { reducer as form } from "redux-form";
import authReducer from './authReducer';
import goals from './goalsReducer';
import search from './searchReducer';

const rootReducer = combineReducers({
  form,
  auth: authReducer,
  goals,
  search
});

export default rootReducer;
