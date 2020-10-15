import {call, put, takeLatest} from 'redux-saga/effects';
import * as types from '../utils/Consts';
import {getFollowersCountByUserId,getFollowingsCountByUserId, getFollowers, getFollowings, createFollow, deleteFollow} from '../services/Api';

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

function* requestFollowersCountByUserId({ user_id }) {
  try {
    let data = yield call(getFollowersCountByUserId,user_id);
    // data = data.map(event => new Event(event));
    yield put({
      type: types.FETCH_FOLLOWERS_COUNT_USER_ID_SUCCESS,
      data,
      user_id
    });
  } catch (error) {
    console.log(error);
    yield put({
      type: types.FETCH_FOLLOWERS_COUNT_USER_ID_FAIL,
      error,
    });
  }
}

function* requestFollowingsCountByUserId({ user_id }) {
  try {
    let data = yield call(getFollowingsCountByUserId,user_id);
    // data = data.map(event => new Event(event));
    yield put({
      type: types.FETCH_FOLLOWINGS_COUNT_USER_ID_SUCCESS,
      data,
      user_id
    });
  } catch (error) {
    console.log(error);
    yield put({
      type: types.FETCH_FOLLOWINGS_COUNT_USER_ID_FAIL,
      error,
    });
  }
}

export default function* followersSagas() {
  yield takeLatest(types.FETCH_FOLLOWERS, requestFollowers);
  yield takeLatest(types.FETCH_FOLLOWINGS, requestFollowings);
  yield takeLatest(types.CREATE_FOLLOW, createFollows);
  yield takeLatest(types.DELETE_FOLLOW, deleteFollows);
  yield takeLatest(types.FETCH_FOLLOWERS_COUNT_USER_ID, requestFollowersCountByUserId);
  yield takeLatest(types.FETCH_FOLLOWINGS_COUNT_USER_ID, requestFollowingsCountByUserId);
}
