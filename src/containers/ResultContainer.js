import { connect } from 'react-redux';
import Result from '../pages/Result';

const mapStateToProps = state => ({
  book: state.books[state.user.activeBookId],
  isFetchingResults: state.app.isFetchingResults,
  isAppReady: state.app.isReady,
  results: state.results,
});

const ResultsContainer = connect(
  mapStateToProps,
  null,
)(Result);

export default ResultsContainer;
