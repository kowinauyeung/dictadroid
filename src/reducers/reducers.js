import { combineReducers } from 'redux';
import user from './user';
import books from './books';
import lessons from './lessons';
import vocabs from './vocabs';

const reducers = combineReducers({
  user,
  books,
  lessons,
  vocabs,
});

export default reducers;
