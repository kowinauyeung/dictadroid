import { connect } from 'react-redux';
import Result from '../pages/Result';
import Languages from '../utils/Languages';

const mapStateToProps = state => ({
  book: state.books[state.user.activeBookId],
  isFetchingResults: state.app.isFetchingResults,
  isAppReady: state.app.isReady,
  results: state.results,
  LANG: Languages[state.user.lang],
  lang: state.user.lang,
});

const ResultsContainer = connect(
  mapStateToProps,
  null,
)(Result);

export default ResultsContainer;
