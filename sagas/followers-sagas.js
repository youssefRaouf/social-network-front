import {call, put, takeLatest} from 'redux-saga/effects';
import * as types from '../utils/Consts';
// import Event from '../models/Event';
import {getPosts,createPost,getCommentsByPostId, createComment, getFollowers, getFollowings, createFollow, deleteFollow} from '../services/Api';

function* requestFollowers({offset,userId}) {
  try {
    let data = yield call(getFollowers,offset,userId);
    // data = data.map(event => new Event(event));
    // console.log("el data",data)
    yield put({
      type: types.FETCH_FOLLOWERS_SUCCESS, 
      data,
      userId
    });
  } catch (error) {
    console.log(error);
    yield put({
      type: types.FETCH_FOLLOWERS_FAIL,
      error,
    });
  }
}

function* requestFollowings({offset,userId}) {
  try {
    let data = yield call(getFollowings,offset,userId);
    // data = data.map(event => new Event(event));
    // console.log("el data",data)
    yield put({
      type: types.FETCH_FOLLOWINGS_SUCCESS, 
      data,
      userId
    });
  } catch (error) {
    console.log(error);
    yield put({
      type: types.FETCH_FOLLOWINGS_FAIL,
      error,
    });
  }
}
function* createFollows({to_user}) {
  try {
    let data = yield call(createFollow,to_user);
    // data = data.map(event => new Event(event));
    yield put({
      type: types.CREATE_FOLLOW_SUCCESS, 
      data,
    });
  } catch (error) {
    console.log(error);
    yield put({
      type: types.CREATE_FOLLOW_FAIL,
      error,
    });
  }
}
function* deleteFollows({to_user}) {
  try {
    let data = yield call(deleteFollow,to_user);
    // data = data.map(event => new Event(event));
    yield put({
      type: types.DELETE_FOLLOW_SUCCESS, 
      data,
    });
  } catch (error) {
    console.log(error);
    yield put({
      type: types.DELETE_FOLLOW_FAIL,
      error,
    });
  }
}

export default function* followersSagas() {
  yield takeLatest(types.FETCH_FOLLOWERS, requestFollowers);
  yield takeLatest(types.FETCH_FOLLOWINGS, requestFollowings);
  yield takeLatest(types.CREATE_FOLLOW, createFollows);
  yield takeLatest(types.DELETE_FOLLOW, deleteFollows);

}
