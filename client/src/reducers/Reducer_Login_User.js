import {LOGIN_USER, LOGOUT_USER} from '../actions';
export default function(state=null, action) {
  switch (action.type) {
    case LOGIN_USER:
    // console.log("Reducerlog - " + JSON.stringify(action.payload.data,null,2));
    const {data} = action.payload;

    if (data && data.user) {
      return {
        username:data.user.username,
        access_token:data.access_token
      }
    }
    case LOGOUT_USER: return null
    default: return state;
  }
}
