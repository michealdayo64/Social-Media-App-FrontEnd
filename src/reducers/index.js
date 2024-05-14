// reducers/index.js
import { combineReducers } from 'redux';
import auth from './auth';

const rootReducer = combineReducers({
  auth,
  // Add more reducers as needed
});

export default rootReducer;
