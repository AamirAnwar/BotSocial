import axios from 'axios';

export const FETCH_STORIES = 'fetch_stories';
const ROOT_URL = '/api/v1';

export function fetchStories() {
  const request = axios.get(`${ROOT_URL}/story`);
  return {
    type:FETCH_STORIES,
    payload: request
  }
}
