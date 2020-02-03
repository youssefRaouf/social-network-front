import {fork, all} from 'redux-saga/effects';

import postsSagas from './posts-sagas';
import commentSagas from './comments-sagas'
function* rootSaga() {
  yield all([fork(postsSagas)]);
  yield all([fork(commentSagas)]);

}

export default rootSaga;
