import { connect } from 'react-redux';
import LoadingOverlay from '../components/LoadingOverlay';

const mapStateToProps = state => ({
  visible: state.app.isLoading,
});

const Auth = connect(
  mapStateToProps,
  null,
)(LoadingOverlay);

export default Auth;
