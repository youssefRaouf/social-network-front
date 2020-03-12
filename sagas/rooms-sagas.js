import {call, put, takeLatest} from 'redux-saga/effects';
import * as types from '../utils/Consts';
// import Event from '../models/Event';
import {getRooms,createRoom} from '../services/Api';

function* requestRooms({offset,id}) {
  try {
    let data = yield call(getRooms,offset,id);
    // data = data.map(event => new Event(event));
    // console.log("el data",data)
    yield put({
      type: types.FETCH_ROOMS_SUCCESS, 
      data,
    });
  } catch (error) {
    console.log(error);
    yield put({
      type: types.FETCH_ROOMS_FAIL,
      error,
    });
  }
}
function* createRooms({user1_id,user2_id}) {
  try {
    let data = yield call(createRoom,user1_id,user2_id);
    // data = data.map(event => new Event(event));
    console.log("saga",data)
    yield put({
      type: types.CREATE_ROOM_SUCCESS, 
      data,
    });
  } catch (error) {
    console.log(error);
    yield put({
      type: types.CREATE_ROOM_FAIL,
      error,
    });
  }
}

export default function* roomsSagas() {
  yield takeLatest(types.FETCH_ROOMS, requestRooms);
  yield takeLatest(types.CREATE_ROOM, createRooms);

}
