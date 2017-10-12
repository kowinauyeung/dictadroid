import { connect } from 'react-redux';
import Root from '../components/Root';
import { initApp } from '../actions/actions';

const mapDispatchToProps = ({
  initApp,
});

const RootContainer = connect(
  null,
  mapDispatchToProps,
)(Root);

export default RootContainer;
