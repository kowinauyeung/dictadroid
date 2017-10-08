import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

const propTypes = {
  location: PropTypes.shape({ search: PropTypes.string }).isRequired,
  isAppReady: PropTypes.bool.isRequired,
};

function RedirectTo(props) {
  const { location, isAppReady } = props;
  if (!isAppReady) {
    return (
      <div className="loading-overlay">
        <i className="icon ion-ios-loop-strong loading-icon" />
      </div>
    );
  }
  return <Redirect to={`/${location.search.replace('?url=/', '')}`} />;
}

RedirectTo.propTypes = propTypes;

export default RedirectTo;
