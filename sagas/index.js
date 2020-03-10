import {fork, all} from 'redux-saga/effects';
import emojiSagas from './emojis-sagas'
import postsSagas from './posts-sagas';
import commentSagas from './comments-sagas'
import userSagas from './user-sagas'
import followersSagas from './followers-sagas'
import messagesSagas from './messages-sagas'
import roomsSagas from './rooms-sagas'
function* rootSaga() {
  yield all([fork(postsSagas)]);
  yield all([fork(commentSagas)]);
  yield all([fork(emojiSagas)]);
  yield all([fork(userSagas)]);
  yield all([fork(followersSagas)]);
  yield all([fork(messagesSagas)]);
  yield all([fork(roomsSagas)]);

}

export default rootSaga;
