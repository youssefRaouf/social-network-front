import {call, put, takeLatest} from 'redux-saga/effects';
import * as types from '../utils/Consts';
// import Event from '../models/Event';
import {getPosts,createPost,getCommentsByPostId, createComment} from '../services/Api';

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
function* createComments({text,post_id,parent_id}) {
  try {
    let data = yield call(createComment,text,post_id,parent_id);
    // data = data.map(event => new Event(event));
    yield put({
      type: types.CREATE_COMMENT_SUCCESS, 
      data,
    });
  } catch (error) {
    console.log(error);
    yield put({
      type: types.CREATE_COMMENT_FAIL,
      error,
    });
  }
}

export default function* commentsSagas() {
  yield takeLatest(types.FETCH_COMMENTS, requestComments);
  yield takeLatest(types.CREATE_COMMENT, createComments);

}
