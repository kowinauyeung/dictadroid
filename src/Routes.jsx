import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './containers/HomeContainer';
import Books from './containers/BooksContainer';
import Lessons from './containers/LessonsContainer';
import Vocabs from './containers/VocabsContainer';
import Vocab from './containers/VocabContainer';
import Results from './containers/ResultsContainer';
import Result from './containers/ResultContainer';
import Dictation from './containers/DictationContainer';
import Settings from './containers/SettingsContainer';
import RedirectTo from './containers/RedirectToContainer';

import LoginFormContainer from './containers/LoginFormContainer';
import LoadingOverlayContainer from './containers/LoadingOverlayContainer';
import TabBar from './components/TabBar';

function Routes() {
  return (
    <div className="pages">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/books" component={Books} />
        <Route path="/lessons/:lessonId/vocabs/:vocabId" component={Vocab} />
        <Route path="/lessons/:lessonId/vocabs" component={Vocabs} />
        <Route path="/lessons" component={Lessons} />
        <Route path="/results/:resultId" component={Result} />
        <Route path="/results" component={Results} />
        <Route path="/dictation" component={Dictation} />
        <Route path="/translation" component={Dictation} />
        <Route path="/settings" component={Settings} />
        <Route path="/redirect" component={RedirectTo} />
        <Route component={Home} />
      </Switch>
      <TabBar />
      <LoginFormContainer />
      <LoadingOverlayContainer />
    </div>
  );
}

export default Routes;
