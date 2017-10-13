import { connect } from 'react-redux';
import Lessons from '../pages/Lessons';
import Languages from '../utils/Languages';
import {
  addLesson,
  removeLesson,
  editLesson,
} from '../actions/actions';

const mapStateToProps = state => ({
  book: state.books[state.user.activeBookId],
  isFetchingLessons: state.app.isFetchingLessons,
  isAppReady: state.app.isReady,
  lessons: state.lessons,
  LANG: Languages[state.user.lang],
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
