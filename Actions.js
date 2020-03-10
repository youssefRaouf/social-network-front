import * as types from './utils/Consts';

export function fetchPosts(offset) {
    return {type: types.FETCH_POSTS,offset};
}
export function fetchPostsByUserId(offset,user_id) {
  console.log("d5lna user posts",user_id)
  return {type: types.FETCH_POSTS_USER_ID,offset,user_id};
}
export function fetchComments(offset,post_id) {
  return {type: types.FETCH_COMMENTS,offset,post_id};
}
export function createPosts(text,url,videoName) {
  return {type: types.CREATE_POST,text,url,videoName};
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

export function postEmojisCountChange(post_id, post) {
  return {type: types.EMOJIS_COUNT_CHANGE, post_id, post};
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
export function checkUser(email) {
  return {type: types.CHECK_USER,email};
}
export function createUser(phone,user) {
  return {type: types.CREATE_USER,phone,user};
}
export function fetchUser() {
  return {type: types.FETCH_USER};
}
export function getFollowers(offset,userId) {
  return {type: types.FETCH_FOLLOWERS,offset,userId};
}
export function getFollowings(offset,userId) {
  return {type: types.FETCH_FOLLOWINGS,offset,userId};
}
export function createFollow(to_user) {
  return {type: types.CREATE_FOLLOW,to_user};
}
export function deleteFollow(to_user) {
  return {type: types.DELETE_FOLLOW,to_user};
}
export function messagesReceived(message) {
  return {type: types.MESSAGES_RECEIVED,message};
}
export function fetchMessages(offset,id) {
  console.log(id)
  return {type: types.FETCH_MESSAGES,offset,id};
}
export function createMessage(message,from_user,id) {
  return {type: types.CREATE_MESSAGE,message,from_user,id};
}
export function fetchRooms(offset,id) {
  return {type: types.FETCH_ROOMS,offset,id};
}

