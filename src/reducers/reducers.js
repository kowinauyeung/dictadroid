import { combineReducers } from 'redux';
import app from './app';
import user from './user';
import books from './books';
import lessons from './lessons';
import vocabs from './vocabs';

const reducers = combineReducers({
  app,
  user,
  books,
  lessons,
  vocabs,
});

export default reducers;
