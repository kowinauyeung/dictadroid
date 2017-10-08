import { connect } from 'react-redux';
import RedirectTo from '../pages/RedirectTo';

const mapStateToProps = state => ({
  isAppReady: state.app.isReady,
});

const BooksContainer = connect(
  mapStateToProps,
  null,
)(RedirectTo);

export default BooksContainer;
