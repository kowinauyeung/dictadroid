import React from 'react';
import PropTypes from 'prop-types';
import './NavBar.css';

const propTypes = {
  pageName: PropTypes.string.isRequired,
  left: PropTypes.element,
  right: PropTypes.element,
};

const defaultProps = {
  pageName: '',
  left: null,
  right: null,
};

function NavBar(props) {
  const { pageName, left, right } = props;
  return (
    <div className="navbar">
      <div className="navbar-inner">
        <div className="center">{pageName}</div>
        {left !== null ? <div className="left">{left}</div> : ''}
        {right !== null ? <div className="right">{right}</div> : ''}
      </div>
    </div>
  );
}

NavBar.propTypes = propTypes;
NavBar.defaultProps = defaultProps;

export default NavBar;
