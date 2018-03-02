import { combineReducers } from 'redux';
import Reducer_Story from './Reducer_Story';
// import Reducer_Register_User from './Reducer_Register_User';
import Reducer_Login_User from './Reducer_Login_User';

const rootReducer = combineReducers({
  stories:Reducer_Story,
  user: Reducer_Login_User,

});

export default rootReducer;
