import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const propTypes = {
  to: PropTypes.string.isRequired,
  text: PropTypes.string,
};

const defaultProps = {
  text: 'Back',
};

function BackButton(props) {
  const { to, text } = props;
  return (
    <Link
      to={to}
      className="link"
    >
      <i className="icon ion-ios-arrow-back" />
      <span>{text}</span>
    </Link>
  );
}

BackButton.propTypes = propTypes;
BackButton.defaultProps = defaultProps;

export default BackButton;
