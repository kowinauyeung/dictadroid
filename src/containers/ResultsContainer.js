import { connect } from 'react-redux';
import Results from '../pages/Results';

const mapStateToProps = state => ({
  isFetchingResults: state.app.isFetchingResults,
  isAppReady: state.app.isReady,
  results: state.results,
});

const ResultsContainer = connect(
  mapStateToProps,
  null,
)(Results);

export default ResultsContainer;
