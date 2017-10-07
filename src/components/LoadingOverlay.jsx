import React from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';
import './LoadingOverlay.css';

const propTypes = {
  visible: PropTypes.bool.isRequired,
};

const defaultProps = {
  visible: true,
};

function LoadingOverlay(props) {
  const loadingClass = ClassNames('loading-overlay', { hide: !props.visible });
  return (
    <div className={loadingClass}>
      <i className="icon ion-ios-loop-strong loading-icon" />
    </div>
  );
}

LoadingOverlay.propTypes = propTypes;
LoadingOverlay.defaultProps = defaultProps;

export default LoadingOverlay;
