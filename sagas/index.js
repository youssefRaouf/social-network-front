import {fork, all} from 'redux-saga/effects';

import postsSagas from './posts-sagas';

function* rootSaga() {
  yield all([fork(postsSagas)]);
}

export default rootSaga;
