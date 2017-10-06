import React from 'react';
import PropTypes from 'prop-types';
import { Popup } from '../components/Modal';
import logo from '../logo.svg';
import './LoginForm.css';

const propTypes = {
  isLogin: PropTypes.bool.isRequired,
};

function LoginForm(props) {
  const { isLogin } = props;
  return (
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
            <a className="button button-login login-with-google">
              <i className="icon ion-social-google" />
              Login with Google
            </a>
          </p>
          <p>
            <a className="button button-login login-with-facebook">
              <i className="icon ion-social-facebook" />
              Login with Facebook
            </a>
          </p>
          <p>
            <a className="button button-login login-with-twitter">
              <i className="icon ion-social-twitter" />
              Login with Twitter
            </a>
          </p>
          <p>
            <a className="button button-login login-with-github">
              <i className="icon ion-social-github" />
              Login with GitHub
            </a>
          </p>
        </div>
      </div>
    </Popup>
  );
}

LoginForm.propTypes = propTypes;

export default LoginForm;
