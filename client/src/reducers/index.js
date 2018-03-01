import { combineReducers } from 'redux';
import Reducer_Story from './Reducer_Story';
const rootReducer = combineReducers({
  stories:Reducer_Story
});

export default rootReducer;
