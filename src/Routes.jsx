import React from 'react';
import { Route } from 'react-router-dom';

import Home from './pages/Home';
import Books from './pages/Books';
import Lessions from './pages/Lessions';
import Vocabs from './pages/Vocabs';
import Dictation from './pages/Dictation';
import Translation from './pages/Translation';
import Settings from './pages/Settings';
import Login from './pages/Login';

function Routes() {
  return (
    <div className="pages">
      <Route exact path="/" component={Home} />
      <Route path="/books" component={Books} />
      <Route path="/lessions/:bookid" component={Lessions} />
      <Route path="/vocabs/:lessionid" component={Vocabs} />
      <Route path="/dictation" component={Dictation} />
      <Route path="/translation" component={Translation} />
      <Route path="/settings" component={Settings} />
      <Route path="/login" component={Login} />
    </div>
  );
}

export default Routes;
