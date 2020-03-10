import {combineReducers} from 'redux';
import posts from './posts-reducer';
import comments from './comments-reducer';
import emojis from './emojis-reducer'
import user from './user-reducer'
import followers from './followers-reducer'
import messages from './messages-reducer'
import rooms from './rooms-reducer'
const reducers = combineReducers({
  posts,
  comments,
  emojis,
  user,
  followers,
  messages,
  rooms,
});

export default reducers;
