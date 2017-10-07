import { connect } from 'react-redux';
import Root from '../components/Root';
import { initApp } from '../actions/actions';

const mapDispatchToProps = ({
  initApp,
});

const BooksContainer = connect(
  null,
  mapDispatchToProps,
)(Root);

export default BooksContainer;
