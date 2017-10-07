import { connect } from 'react-redux';
import Vocab from '../pages/Vocab';
import { editVocab } from '../actions/actions';

const mapStateToProps = state => ({
  book: state.books[state.user.activeBookId],
  lessons: state.lessons,
  vocabs: state.vocabs,
});

const mapDispatchToProps = ({
  editVocab,
});

const LessonsContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Vocab);

export default LessonsContainer;
