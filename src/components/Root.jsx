import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Routes from '../Routes';
import VocabCard from '../containers/VocabCardContainer';

const propTypes = {
  initApp: PropTypes.func.isRequired,
};

class Root extends Component {
  componentDidMount() {
    this.props.initApp();
  }

  render() {
    return (
      <BrowserRouter>
        <div className="root">
          <Switch>
            <Route path="/vocab-card/:vocabJson" component={VocabCard} />
            <Route component={Routes} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

Root.propTypes = propTypes;

export default Root;
