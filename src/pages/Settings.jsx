import React from 'react';
import PropTypes from 'prop-types';
import './Settings.css';

const propTypes = {
  user: PropTypes.shape({
    displayName: PropTypes.string,
    email: PropTypes.string,
    photoURL: PropTypes.string,
  }).isRequired,
  logoutOfFirebase: PropTypes.func.isRequired,
};

function Settings(props) {
  const { logoutOfFirebase, user } = props;
  const { displayName, email, photoURL } = user;
  return (
    <div className="settings page without-header">
      <div className="page-inner">
        <div className="profile-block">
          <img className="avatar" src={photoURL} alt={displayName} />
          <h2 className="text-center">{displayName}</h2>
          <p className="text-center text-alpha">{email}</p>
        </div>
        <div className="list-block inset">
          <ul>
            <li>
              <a
                className="list-button item-link color-red"
                role="presentation"
                onClick={() => { logoutOfFirebase(); }}
              >
                Log out
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

Settings.propTypes = propTypes;

export default Settings;
