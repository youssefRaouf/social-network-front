import {call, put, takeLatest} from 'redux-saga/effects';
import * as types from '../utils/Consts';
// import Event from '../models/Event';
import {getPosts,createPost} from '../services/Api';

function* requestEvents({offset}) {
  try {
    let data = yield call(getPosts,offset);
    // data = data.map(event => new Event(event));
    yield put({
      type: types.FETCH_POSTS_SUCCESS, 
      data,
    });
  } catch (error) {
    console.log(error);
    yield put({
      type: types.FETCH_POSTS_FAIL,
      error,
    });
  }
}
function* createPosts({text,url,videoName}) {
  try {
    let data = yield call(createPost,text,url,videoName);
    // data = data.map(event => new Event(event));
    yield put({
      type: types.CREATE_POST_SUCCESS, 
      data,
    });
  } catch (error) {
    console.log(error);
    yield put({
      type: types.CREATE_POST_FAIL,
      error,
    });
  }
}

export default function* eventsSagas() {
  yield takeLatest(types.FETCH_POSTS, requestEvents);
  yield takeLatest(types.CREATE_POST, createPosts);
}
