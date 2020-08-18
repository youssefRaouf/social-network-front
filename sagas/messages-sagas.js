import {call, put, takeLatest} from 'redux-saga/effects';
import * as types from '../utils/Consts';
// import Event from '../models/Event';
import {getMessages,createMessage} from '../services/Api';

function* requestMessages({offset,id}) {
  try {
    let data = yield call(getMessages,offset,id);
    // data = data.map(event => new Event(event));
    // console.log("el data",data)
    yield put({
      type: types.FETCH_MESSAGES_SUCCESS, 
      data,
      id
    });
  } catch (error) {
    console.log(error);
    yield put({
      type: types.FETCH_MESSAGES_FAIL,
      error,
    });
  }
}
function* createMessages({message,from_user,to_user,id}) {
  try {
    let data = yield call(createMessage,message,from_user,to_user,id);
    // data = data.map(event => new Event(event));
    yield put({
      type: types.CREATE_MESSAGE_SUCCESS, 
      data,
    });
  } catch (error) {
    console.log(error);
    yield put({
      type: types.CREATE_MESSAGE_FAIL,
      error,
    });
  }
}

export default function* messagesSagas() {
  yield takeLatest(types.FETCH_MESSAGES, requestMessages);
  yield takeLatest(types.CREATE_MESSAGE, createMessages);

}
