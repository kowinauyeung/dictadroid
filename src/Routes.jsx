import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './containers/HomeContainer';
import Books from './containers/BooksContainer';
import Lessons from './containers/LessonsContainer';
import Vocabs from './containers/VocabsContainer';
import Vocab from './containers/VocabContainer';
import History from './pages/History';
import Dictation from './pages/Dictation';
import Translation from './pages/Translation';
import Settings from './pages/Settings';
import Login from './pages/Login';

function Routes() {
  return (
    <div className="pages">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/books" component={Books} />
        <Route path="/lessons/:lessonId/vocabs/:vocabId" component={Vocab} />
        <Route path="/lessons/:lessonId/vocabs" component={Vocabs} />
        <Route path="/lessons" component={Lessons} />
        <Route path="/history" component={History} />
        <Route path="/dictation" component={Dictation} />
        <Route path="/translation" component={Translation} />
        <Route path="/settings" component={Settings} />
        <Route path="/login" component={Login} />
      </Switch>
    </div>
  );
}

export default Routes;
