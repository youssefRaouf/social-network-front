import {call, put, takeLatest} from 'redux-saga/effects';
import * as types from '../utils/Consts';
import {checkUser, updateEmoji, deleteEmoji, createUser, fetchUser, search} from '../services/Api';
function* checkUsers({email}) {
  try {
    let data = yield call(checkUser,email);
    yield put({
      type: types.CHECK_USER_SUCCESS, 
      data,
    });
  } catch (error) {
    console.log(error);
    yield put({
      type: types.CHECK_USER_FAIL,
      error,
    });
  }
}
function* createUsers({phone,user}) {
  try {
    console.log("el phone",phone)
    console.log("el user",user)

    let data = yield call(createUser,phone,user);
    yield put({
      type: types.CREATE_USER_SUCCESS, 
      data,
    });
  } catch (error) {
    console.log(error);
    yield put({
      type: types.CREATE_USER_FAIL,
      error,
    });
  }
}
function* fetchUsers({}) {
  try {
    let data = yield call(fetchUser,);
    yield put({
      type: types.FETCH_USER_SUCCESS, 
      data,
    });
  } catch (error) {
    console.log(error);
    yield put({
      type: types.FETCH_USER_FAIL,
      error,
    });
  }
}
function* findUsers({offset,name}) {
  try {
    if(name!==''){
    let data = yield call(search,offset,name);
    yield put({
      type: types.FIND_USERS_SUCCESS, 
      data,
    });
  }
  } catch (error) {
    console.log(error);
    yield put({
      type: types.FIND_USERS_FAIL,
      error,
    });
  }
}


export default function* userSagas() {
  yield takeLatest(types.CHECK_USER, checkUsers);
  yield takeLatest(types.CREATE_USER, createUsers);
  yield takeLatest(types.FETCH_USER, fetchUsers);
  yield takeLatest(types.FIND_USERS, findUsers);
}
