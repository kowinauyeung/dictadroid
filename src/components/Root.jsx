import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter } from 'react-router-dom';
import Routes from '../Routes';
import LoginFormContainer from '../containers/LoginFormContainer';
import LoadingOverlayContainer from '../containers/LoadingOverlayContainer';
import TabBar from './TabBar';

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
          <Routes />
          <TabBar />
          <LoginFormContainer />
          <LoadingOverlayContainer />
        </div>
      </BrowserRouter>
    );
  }
}

Root.propTypes = propTypes;

export default Root;
