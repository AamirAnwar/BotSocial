import axios from 'axios';

export const FETCH_STORIES = 'fetch_stories';
export const REGISTER_USER = 'register_user';
export const LOGIN_USER = 'login_user';
export const LOGOUT_USER = 'logout_user';
export const CREATE_STORY = 'create_story';
export const LIKE_STORY = 'like_story';
export const DISLIKE_STORY = 'dislike_story';
export const COMMENT_STORY = 'comment_story';


const ROOT_URL = '/api/v1';

export function registerUser(username, password) {
  const request = axios.post(`${ROOT_URL}/user/register`);
  return {
    type: REGISTER_USER,
    payload: request
  }
}

export function loginUser(username, password) {
  // Only works when the express uses bodyParser.json(). <-- 2 Hours.Right there.
  const data = {
    username: username,
    password: password
  };

// Use this when the express server uses {urlExtended:false}
  // const data = `username=${username}&password=${password}`;

const request = axios.post(`${ROOT_URL}/user/login`, data);
  return {
    type:LOGIN_USER,
    payload:request
  }
}

export function fetchStories(auth_token) {
  // { 'headers': { 'Authorization': AuthStr } }
  const request = axios.get(`${ROOT_URL}/story`, {'headers':{'auth_token':auth_token}});
  return {
    type:FETCH_STORIES,
    payload: request
  }
}

export function createStory(text, auth_token) {
  const request = axios.post(`${ROOT_URL}/story`, {text:text},{'headers':{'auth_token':auth_token}});
  return {
    type:CREATE_STORY,
    payload:request
  }
}

export function likeStory(story_id, auth_token) {
  const request = axios.post(`${ROOT_URL}/story/${story_id}/like`,{},{'headers':{'auth_token':auth_token}});
  return {
    type:LIKE_STORY,
    payload:request
  }
}

export function dislikeStory(story_id, auth_token) {
  const request = axios.post(`${ROOT_URL}/story/${story_id}/dislike`,{},{'headers':{'auth_token':auth_token}});
  return {
    type:DISLIKE_STORY,
    payload:request
  }
}


export function commentStory(story_id, text,auth_token) {
  const request = axios.post(`${ROOT_URL}/story/${story_id}/comment`,{text:text},{'headers':{'auth_token':auth_token}});
  return {
    type:COMMENT_STORY,
    payload:request
  }
}


export function logoutUser() {
  return {
    type:LOGOUT_USER
  }
}
