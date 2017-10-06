import { connect } from 'react-redux';
import Settings from '../pages/Settings';
import { logoutOfFirebase } from '../actions/actions';

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = ({
  logoutOfFirebase,
});

const BooksContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Settings);

export default BooksContainer;
