import {FETCH_STORIES} from '../actions';
export default function(state=[], action) {
  switch (action.type) {
    case FETCH_STORIES:
    return action.payload.data;
  }
  return state
}
