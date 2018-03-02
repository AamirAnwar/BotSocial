import {REGISTER_USER} from '../actions';
export default function(state=null, action) {
  switch (action.type) {
    case REGISTER_USER:
    console.log(action.payload);
    return state;
  default:return state;
  }

}
