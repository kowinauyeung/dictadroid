import { connect } from 'react-redux';
import Lessons from '../pages/Lessons';
import { addLesson, removeLesson, editLesson } from '../actions/actions';

const mapStateToProps = state => ({
  book: state.books[state.user.activeBookId],
  lessons: state.lessons,
});

const mapDispatchToProps = ({
  addLesson,
  removeLesson,
  editLesson,
});

const LessonsContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Lessons);

export default LessonsContainer;
