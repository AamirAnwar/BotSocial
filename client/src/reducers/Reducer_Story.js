import {FETCH_STORIES} from '../actions';
export default function(state=[], action) {
  switch (action.type) {
    case FETCH_STORIES:
    if (action.payload.data) {
      return action.payload.data;
    }
    return state;

    default:
    return state;
  }
}
