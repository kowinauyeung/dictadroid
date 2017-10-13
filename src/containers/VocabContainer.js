import { connect } from 'react-redux';
import Vocab from '../pages/Vocab';
import Languages from '../utils/Languages';
import {
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
  editVocab,
});

const LessonsContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Vocab);

export default LessonsContainer;
