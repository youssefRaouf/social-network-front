import {call, put, takeLatest} from 'redux-saga/effects';
import * as types from '../utils/Consts';
// import Event from '../models/Event';
import {getPosts,createPost,getCommentsByPostId, createComment, createEmoji, updateEmoji, deleteEmoji} from '../services/Api';

// function* requestComments({offset,post_id}) {
//   try {
//     let data = yield call(getCommentsByPostId,offset,post_id);
//     // data = data.map(event => new Event(event));
//     // console.log("el data",data)
//     yield put({
//       type: types.FETCH_COMMENTS_SUCCESS, 
//       data,
//     });
//   } catch (error) {
//     console.log(error);
//     yield put({
//       type: types.FETCH_COMMENTS_FAIL,
//       error,
//     });
//   }
// }
function* createEmojis({index,post_id}) {
  try {
    // console.log("sagaemojis")
    let data = yield call(createEmoji,index,post_id);
    // data = data.map(event => new Event(event));
    yield put({
      type: types.CREATE_EMOJI_SUCCESS, 
      data,
    });
  } catch (error) {
    console.log(error);
    yield put({
      type: types.CREATE_EMOJI_FAIL,
      error,
    });
  }
}
function* updateEmojis({index,post_id}) {
  try {
    // console.log("sagaemojis")
    let data = yield call(updateEmoji,index,post_id);
    // data = data.map(event => new Event(event));
    yield put({
      type: types.UPDATE_EMOJI_SUCCESS, 
      data,
    });
  } catch (error) {
    console.log(error);
    yield put({
      type: types.UPDATE_EMOJI_FAIL,
      error,
    });
  }
}
function* deleteEmojis({post_id}) {
  try {
    // console.log("sagaemojis")
    let data = yield call(deleteEmoji,post_id);
    // data = data.map(event => new Event(event));
    yield put({
      type: types.DELETE_EMOJI_SUCCESS, 
      data,
    });
  } catch (error) {
    console.log(error);
    yield put({
      type: types.DELETE_EMOJI_FAIL,
      error,
    });
  }
}

export default function* emojiSagas() {
  // yield takeLatest(types.FETCH_COMMENTS, requestComments);
  yield takeLatest(types.CREATE_EMOJI, createEmojis);
  yield takeLatest(types.UPDATE_EMOJI, updateEmojis);
  yield takeLatest(types.DELETE_EMOJI, deleteEmojis);

}
