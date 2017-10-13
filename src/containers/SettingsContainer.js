import { connect } from 'react-redux';
import Settings from '../pages/Settings';
import { logoutOfFirebase, addBook, addLesson, addVocab, setUserLang } from '../actions/actions';

const mapStateToProps = state => ({
  user: state.user,
  isAppReady: state.app.isReady,
});

const mapDispatchToProps = ({
  logoutOfFirebase,
  addBook,
  addLesson,
  addVocab,
  setUserLang,
});

const BooksContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Settings);

export default BooksContainer;
