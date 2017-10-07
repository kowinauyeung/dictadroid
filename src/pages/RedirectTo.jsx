import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

const propTypes = {
  match: PropTypes.shape({ url: PropTypes.string }).isRequired,
  isAppReady: PropTypes.bool.isRequired,
};

function RedirectTo(props) {
  const { match, isAppReady } = props;
  if (!isAppReady) {
    return (
      <div className="loading-overlay">
        <i className="icon ion-ios-loop-strong loading-icon" />
      </div>
    );
  } else {
    return <Redirect to={`/${match.params.redirectPage}`} />;
  }
}

RedirectTo.propTypes = propTypes;

export default RedirectTo;
