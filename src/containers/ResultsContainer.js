import { connect } from 'react-redux';
import Results from '../pages/Results';
import Languages from '../utils/Languages';

const mapStateToProps = state => ({
  isFetchingResults: state.app.isFetchingResults,
  isAppReady: state.app.isReady,
  results: state.results,
  LANG: Languages[state.user.lang],
  lang: state.user.lang,
});

const ResultsContainer = connect(
  mapStateToProps,
  null,
)(Results);

export default ResultsContainer;
