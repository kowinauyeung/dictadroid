import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  history: PropTypes.shape({ goBack: PropTypes.func }).isRequired,
};

function BackButton(props) {
  const { goBack } = props.history;
  return (
    <div
      className="link"
      role="presentation"
      onClick={goBack}
    >
      <i className="icon ion-ios-arrow-back" />
      <span>Back</span>
    </div>
  );
}

BackButton.propTypes = propTypes;

export default BackButton;
