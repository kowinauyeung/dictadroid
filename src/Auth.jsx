import { connect } from 'react-redux';
import LoginForm from './components/LoginForm';

const mapStateToProps = state => ({
  isLogin: state.user.isLogin,
});

const Auth = connect(
  mapStateToProps,
  null,
)(LoginForm);

export default Auth;
