import { connect } from 'react-redux';
import Settings from '../pages/Settings';
import { logoutOfFirebase, addBook, addLesson, addVocab } from '../actions/actions';

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = ({
  logoutOfFirebase,
  addBook,
  addLesson,
  addVocab,
});

const BooksContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Settings);

export default BooksContainer;
