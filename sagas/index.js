import {fork, all} from 'redux-saga/effects';
import emojiSagas from './emojis-sagas'
import postsSagas from './posts-sagas';
import commentSagas from './comments-sagas'
import userSagas from './user-sagas'
import followersSagas from './followers-sagas'
function* rootSaga() {
  yield all([fork(postsSagas)]);
  yield all([fork(commentSagas)]);
  yield all([fork(emojiSagas)]);
  yield all([fork(userSagas)]);
  yield all([fork(followersSagas)]);
}

export default rootSaga;
