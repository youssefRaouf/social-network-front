import { call, put, takeLatest } from 'redux-saga/effects';
import * as types from '../utils/Consts';
// import Event from '../models/Event';
import { getPosts, createPost, getPostsByUserId ,getPostsCountByUserId} from '../services/Api';

function* requestEvents({ offset }) {
  try {
    let data = yield call(getPosts, offset);
    // data = data.map(event => new Event(event));
    yield put({
      type: types.FETCH_POSTS_SUCCESS,
      data,
      offset
    });
  } catch (error) {
    console.log(error);
    yield put({
      type: types.FETCH_POSTS_FAIL,
      error,
    });
  }
}
function* requestEventsByUserId({ offset, user_id }) {
  try {
    let data = yield call(getPostsByUserId, offset, user_id);
    // data = data.map(event => new Event(event));
    yield put({
      type: types.FETCH_POSTS_USER_ID_SUCCESS,
      data,
      user_id,
      offset
    });
  } catch (error) {
    console.log(error);
    yield put({
      type: types.FETCH_POSTS_USER_ID_FAIL,
      error,
    });
  }
}

function* requestPostsCountByUserId({ user_id }) {
  try {
    let data = yield call(getPostsCountByUserId,user_id);
    // data = data.map(event => new Event(event));
    yield put({
      type: types.FETCH_POSTS_COUNT_USER_ID_SUCCESS,
      data,
      user_id
    });
  } catch (error) {
    console.log(error);
    yield put({
      type: types.FETCH_POSTS_COUNT_USER_ID_FAIL,
      error,
    });
  }
}

function* createPosts({ text, url, videoName }) {
  try {
    let data = yield call(createPost, text, url, videoName);
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
  yield takeLatest(types.FETCH_POSTS_USER_ID, requestEventsByUserId);
  yield takeLatest(types.FETCH_POSTS_COUNT_USER_ID, requestPostsCountByUserId);
  yield takeLatest(types.CREATE_POST, createPosts);
}
