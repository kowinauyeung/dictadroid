import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './containers/HomeContainer';
import Books from './containers/BooksContainer';
import Lessons from './containers/LessonsContainer';
import Vocabs from './containers/VocabsContainer';
import Vocab from './containers/VocabContainer';
import Results from './pages/Results';
import Dictation from './containers/DictationContainer';
import Translation from './pages/Translation';
import Settings from './containers/SettingsContainer';
import RedirectTo from './containers/RedirectToContainer';

function Routes() {
  return (
    <div className="pages">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/books" component={Books} />
        <Route path="/lessons/:lessonId/vocabs/:vocabId" component={Vocab} />
        <Route path="/lessons/:lessonId/vocabs" component={Vocabs} />
        <Route path="/lessons" component={Lessons} />
        <Route path="/results/:resultId" component={Results} />
        <Route path="/results" component={Results} />
        <Route path="/dictation" component={Dictation} />
        <Route path="/translation" component={Translation} />
        <Route path="/settings" component={Settings} />
        <Route path="/redirect" component={RedirectTo} />
      </Switch>
    </div>
  );
}

export default Routes;
