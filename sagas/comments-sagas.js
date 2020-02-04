import {call, put, takeLatest} from 'redux-saga/effects';
import * as types from '../utils/Consts';
// import Event from '../models/Event';
import {getPosts,createPost,getCommentsByPostId} from '../services/Api';

function* requestComments({offset,post_id}) {
  try {
    let data = yield call(getCommentsByPostId,offset,post_id);
    // data = data.map(event => new Event(event));
    // console.log("el data",data)
    yield put({
      type: types.FETCH_COMMENTS_SUCCESS, 
      data,
    });
  } catch (error) {
    console.log(error);
    yield put({
      type: types.FETCH_COMMENTS_FAIL,
      error,
    });
  }
}
// function* createPosts({text,user_id}) {
//   try {
//     let data = yield call(createPost,text,user_id);
//     // data = data.map(event => new Event(event));
//     yield put({
//       type: types.CREATE_POST_SUCCESS, 
//       data,
//     });
//   } catch (error) {
//     console.log(error);
//     yield put({
//       type: types.CREATE_POST_FAIL,
//       error,
//     });
//   }
// }

export default function* commentsSagas() {
  yield takeLatest(types.FETCH_COMMENTS, requestComments);
  // yield takeLatest(types.CREATE_POST, createPosts);

}
