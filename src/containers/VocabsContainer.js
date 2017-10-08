import { connect } from 'react-redux';
import Vocabs from '../pages/Vocabs';
import {
  addVocab,
  removeVocab,
  editVocab,
  listenToVocabs,
  unListenToVocabs,
} from '../actions/actions';

const mapStateToProps = state => ({
  book: state.books[state.user.activeBookId],
  lessons: state.lessons,
  vocabs: state.vocabs,
  isAppReady: state.app.isReady,
  isFetchingVocabs: state.app.isFetchingVocabs,
});

const mapDispatchToProps = ({
  addVocab,
  removeVocab,
  editVocab,
  listenToVocabs,
  unListenToVocabs,
});

const LessonsContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Vocabs);

export default LessonsContainer;
