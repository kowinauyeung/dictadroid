import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const propTypes = {
  to: PropTypes.string.isRequired,
};

function BackButton(props) {
  const { to } = props;
  return (
    <Link
      to={to}
      className="link"
    >
      <i className="icon ion-ios-arrow-back" />
      <span>Back</span>
    </Link>
  );
}

BackButton.propTypes = propTypes;

export default BackButton;
