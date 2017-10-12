import { combineReducers } from 'redux';
import app from './app';
import user from './user';
import books from './books';
import lessons from './lessons';
import vocabs from './vocabs';
import results from './results';

const reducers = combineReducers({
  app,
  user,
  books,
  lessons,
  vocabs,
  results,
});

export default reducers;
