import {combineReducers} from 'redux';
import posts from './posts-reducer';
import comments from './comments-reducer';
import emojis from './emojis-reducer'
import user from './user-reducer'
const reducers = combineReducers({
  posts,
  comments,
  emojis,
  user
});

export default reducers;
