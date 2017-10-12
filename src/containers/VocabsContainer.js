import { connect } from 'react-redux';
import Vocabs from '../pages/Vocabs';
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
