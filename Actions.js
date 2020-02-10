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

export function postEmojisCountChange(post_id, emojisCount) {
  return {type: types.EMOJIS_COUNT_CHANGE, post_id, emojisCount};
}

export function createComments(text,post_id,parent_id) {
  return {type: types.CREATE_COMMENT,text,post_id,parent_id};
}
export function createEmojis(index,post_id) {
  // console.log("gwa el action")
  return {type: types.CREATE_EMOJI,index,post_id};
}
export function updateEmojis(index,post_id) {
  return {type: types.UPDATE_EMOJI,index,post_id};
}
export function deleteEmojis(post_id) {
  console.log("gwa el action")
  return {type: types.DELETE_EMOJI,post_id};
}
export function fetchCategories(page = 1, refresh) {
  return {type: types.FETCH_CATEGORIES, page, refresh};
}

