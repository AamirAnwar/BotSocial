import {FETCH_STORIES, CREATE_STORY, LIKE_STORY,DISLIKE_STORY, COMMENT_STORY} from '../actions';
export default function(state=[], action) {
  switch (action.type) {
    case FETCH_STORIES:
    if (action.payload.data) {
      return action.payload.data;
    }
    return state;

    case CREATE_STORY:
    if (action.payload.data) {
      const createdStory = action.payload.data.story;
      return [createdStory,...state];
    }
    return state;

    case LIKE_STORY:
    if (action.payload.data) {
      return []
    }
    return state;

    case DISLIKE_STORY:
    if (action.payload.data) {
      return []
    }
    return state;

    case COMMENT_STORY:
    //TODO
    // if (action.payload.data) {
    //   return []
    // }
    return state;

    default:
    return state;
  }
}
