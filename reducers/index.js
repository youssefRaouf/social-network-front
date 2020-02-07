import {combineReducers} from 'redux';
import posts from './posts-reducer';
import comments from './comments-reducer';
import emojis from './emojis-reducer'
const reducers = combineReducers({
  posts,
  comments,
  emojis,
});

export default reducers;
