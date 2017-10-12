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
      <div className="redirect-to page without-header">
        <div className="page-inner real-center">
          <p className="text-center grey">Please wait for a moment.</p>
        </div>
      </div>
    );
  }
  return <Redirect to={`/${location.search.replace('?url=/', '')}`} />;
}

RedirectTo.propTypes = propTypes;

export default RedirectTo;
