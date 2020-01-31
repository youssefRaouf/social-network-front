import {combineReducers} from 'redux';
import posts from './posts-reducer';

const reducers = combineReducers({
  posts,
});

export default reducers;
