import {call, put, takeLatest} from 'redux-saga/effects';
import * as types from '../utils/Consts';
// import Event from '../models/Event';
import {getRooms} from '../services/Api';

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
// function* createMessages({message,from_user,to_user}) {
//   try {
//     let data = yield call(createMessage,message,from_user,to_user);
//     // data = data.map(event => new Event(event));
//     yield put({
//       type: types.CREATE_MESSAGE_SUCCESS, 
//       data,
//     });
//   } catch (error) {
//     console.log(error);
//     yield put({
//       type: types.CREATE_MESSAGE_FAIL,
//       error,
//     });
//   }
// }

export default function* roomsSagas() {
  yield takeLatest(types.FETCH_ROOMS, requestRooms);
  // yield takeLatest(types.CREATE_MESSAGE, createMessages);

}
