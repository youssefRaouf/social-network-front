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
export function postsReceived(post) {
  return {type: types.POSTS_RECEIVED, post};
}
export function commentsReceived(comment) {
  return {type: types.COMMENTS_RECEIVED, comment};
}

export function postCommentsCountChange(post_id, commentsCount) {
  return {type: types.COMMENTS_COUNT_CHANGE, post_id, commentsCount};
}

export function createComments(text,post_id,parent_id) {
  return {type: types.CREATE_COMMENT,text,post_id,parent_id};
}
export function createEmojis(type,post_id) {
  return {type: types.CREATE_EMOJI,type,post_id};
}
export function fetchCategories(page = 1, refresh) {
  return {type: types.FETCH_CATEGORIES, page, refresh};
}

