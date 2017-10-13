import { connect } from 'react-redux';
import Vocabs from '../pages/Vocabs';
import Languages from '../utils/Languages';
import {
  addVocab,
  removeVocab,
  editVocab,
} from '../actions/actions';

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
  addVocab,
  removeVocab,
  editVocab,
});

const LessonsContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Vocabs);

export default LessonsContainer;
