import { connect } from 'react-redux';
import Dictation from '../pages/Dictation';
import { submitResult } from '../actions/actions';
import Languages from '../utils/Languages';

const mapStateToProps = state => ({
  book: state.books[state.user.activeBookId],
  lessons: state.lessons,
  vocabs: state.vocabs,
  isAppReady: state.app.isReady,
  isFetchingVocabs: state.app.isFetchingVocabs,
  isFetchingLessons: state.app.isFetchingLessons,
  LANG: Languages[state.user.lang],
});

const mapDispatchToProps = ({
  submitResult,
});

const DictationContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Dictation);

export default DictationContainer;
