import { connect } from 'react-redux';
import Home from '../pages/Home';
import { editBook } from '../actions/actions';
import Languages from '../utils/Languages';

const mapStateToProps = state => ({
  activeBookId: state.user.activeBookId,
  isAppReady: state.app.isReady,
  books: state.books,
  LANG: Languages[state.user.lang],
});

const mapDispatchToProps = ({
  editBook,
});

const HomeContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);

export default HomeContainer;
