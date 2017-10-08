import React from 'react';
import PropTypes from 'prop-types';
import { Popup } from '../components/Modal';
import logo from '../logo.svg';
import './LoginForm.css';

const propTypes = {
  isLogin: PropTypes.bool.isRequired,
  loginWithGoogle: PropTypes.func.isRequired,
  loginWithFacebook: PropTypes.func.isRequired,
  loginWithTwitter: PropTypes.func.isRequired,
  loginWithGithub: PropTypes.func.isRequired,
};

function LoginForm(props) {
  const {
    isLogin,
    loginWithGoogle,
    loginWithFacebook,
    loginWithTwitter,
    loginWithGithub,
  } = props;
  return (
    <div className="login-form">
      <Popup
        header=""
        visible={!isLogin}
        isHideLeft
        isHideRight
      >
        <div className="page-inner login-bg">
          <img className="logo" src={logo} alt="Dictadroid" />
          <div className="content-block">
            <p>
              <a
                className="button button-login login-with-google"
                onClick={() => { loginWithGoogle(); }}
                role="presentation"
              >
                <i className="icon ion-social-google" />
                Login with Google
              </a>
            </p>
            <p style={{ display: 'none' }}>
              <a
                className="button button-login login-with-facebook"
                onClick={() => { loginWithFacebook(); }}
                role="presentation"
              >
                <i className="icon ion-social-facebook" />
                Login with Facebook
              </a>
            </p>
            <p style={{ display: 'none' }}>
              <a
                className="button button-login login-with-twitter"
                onClick={() => { loginWithTwitter(); }}
                role="presentation"
              >
                <i className="icon ion-social-twitter" />
                Login with Twitter
              </a>
            </p>
            <p style={{ display: 'none' }}>
              <a
                className="button button-login login-with-github"
                onClick={() => { loginWithGithub(); }}
                role="presentation"
              >
                <i className="icon ion-social-github" />
                Login with GitHub
              </a>
            </p>
          </div>
        </div>
      </Popup>
    </div>
  );
}

LoginForm.propTypes = propTypes;

export default LoginForm;
