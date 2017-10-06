import { connect } from 'react-redux';
import Home from '../pages/Home';
import { editBook } from '../actions/actions';

const mapStateToProps = state => ({
  activeBookId: state.user.activeBookId,
  books: state.books,
});

const mapDispatchToProps = ({
  editBook,
});

const HomeContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);

export default HomeContainer;
