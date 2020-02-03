import {combineReducers} from 'redux';
import posts from './posts-reducer';
import comments from './comments-reducer';
const reducers = combineReducers({
  posts,
  comments,
});

export default reducers;
