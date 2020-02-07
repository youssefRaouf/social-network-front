import {fork, all} from 'redux-saga/effects';
import emojiSagas from './emojis-sagas'
import postsSagas from './posts-sagas';
import commentSagas from './comments-sagas'
function* rootSaga() {
  yield all([fork(postsSagas)]);
  yield all([fork(commentSagas)]);
  yield all([fork(emojiSagas)]);
}

export default rootSaga;
