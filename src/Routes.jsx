import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './pages/Home';
import Books from './pages/Books';
import Lessons from './pages/Lessons';
import History from './pages/History';
import Vocabs from './pages/Vocabs';
import Vocab from './pages/Vocab';
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
        <Route path="/lessons/:lessionId/vocabs/:vocabId" component={Vocab} />
        <Route path="/lessons/:lessionId/vocabs" component={Vocabs} />
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
