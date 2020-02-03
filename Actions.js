import * as types from './utils/Consts';

export function fetchPosts(offset) {
    return {type: types.FETCH_POSTS,offset};
}
export function fetchComments(offset,post_id) {
  return {type: types.FETCH_COMMENTS,offset,post_id};
}
export function createPosts(text,user_id) {
  return {type: types.CREATE_POST,text,user_id};
}
export function fetchCategories(page = 1, refresh) {
  return {type: types.FETCH_CATEGORIES, page, refresh};
}

