import { connect } from 'react-redux';
import Vocab from '../pages/Vocab';
import {
  editVocab,
  listenToVocabs,
  listenToLessons,
  unListenToVocabs,
  unListenToLessons,
} from '../actions/actions';

const mapStateToProps = state => ({
  book: state.books[state.user.activeBookId],
  lessons: state.lessons,
  vocabs: state.vocabs,
  isAppReady: state.app.isReady,
  isFetchingVocabs: state.app.isFetchingVocabs,
  isFetchingLessons: state.app.isFetchingLessons,
});

const mapDispatchToProps = ({
  editVocab,
  listenToVocabs,
  listenToLessons,
  unListenToVocabs,
  unListenToLessons,
});

const LessonsContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Vocab);

export default LessonsContainer;
