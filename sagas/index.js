import {fork, all} from 'redux-saga/effects';
import emojiSagas from './emojis-sagas'
import postsSagas from './posts-sagas';
import commentSagas from './comments-sagas'
import userSagas from './user-sagas'
function* rootSaga() {
  yield all([fork(postsSagas)]);
  yield all([fork(commentSagas)]);
  yield all([fork(emojiSagas)]);
  yield all([fork(userSagas)]);
}

export default rootSaga;
