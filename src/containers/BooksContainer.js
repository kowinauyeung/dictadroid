import { connect } from 'react-redux';
import Languages from '../utils/Languages';
import Books from '../pages/Books';
import { addBook, removeBook, editBook, setActiveBook } from '../actions/actions';

const mapStateToProps = state => ({
  isFetchingBooks: state.app.isFetchingBooks,
  activeBookId: state.user.activeBookId,
  books: state.books,
  LANG: Languages[state.user.lang],
});

const mapDispatchToProps = ({
  addBook,
  removeBook,
  editBook,
  setActiveBook,
});

const BooksContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Books);

export default BooksContainer;
