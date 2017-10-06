import { connect } from 'react-redux';
import Books from '../pages/Books';
import { addBook, removeBook, editBook, setActiveBook } from '../actions/actions';

const mapStateToProps = state => ({
  activeBookId: state.user.activeBookId,
  books: state.books,
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
