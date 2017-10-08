import { connect } from 'react-redux';
import LoginForm from '../components/LoginForm';
import {
  loginWithGoogle,
  loginWithFacebook,
  loginWithTwitter,
  loginWithGithub,
} from '../actions/actions';

const mapStateToProps = state => ({
  isLogin: state.user.isLogin,
});

const mapDispatchToProps = ({
  loginWithGoogle,
  loginWithFacebook,
  loginWithTwitter,
  loginWithGithub,
});

const Auth = connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginForm);

export default Auth;
