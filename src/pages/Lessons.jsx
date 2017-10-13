import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import NavBar from '../components/NavBar';
import BackButton from '../components/BackButton';
import AddLessonForm from '../components/AddLessonForm';
import EditLessonForm from '../components/EditLessonForm';
import EditableItem from '../components/EditableItem';

const propTypes = {
  match: PropTypes.shape({ url: PropTypes.string }).isRequired,
  book: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
  }),
  lessons: PropTypes.objectOf(
    PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
      vocabs: PropTypes.object,
    }),
  ).isRequired,
  addLesson: PropTypes.func.isRequired,
  removeLesson: PropTypes.func.isRequired,
  editLesson: PropTypes.func.isRequired,
  isFetchingLessons: PropTypes.bool.isRequired,
  isAppReady: PropTypes.bool.isRequired,
};

const defaultProps = {
  book: null,
  lessons: null,
};

let scrollTop = 0;

class Lessons extends Component {
  constructor() {
    super();
    this.state = {
      editMode: false,
      isShowAddLessonPopUp: false,
      editingLesson: undefined,
    };
    this.noDataMsg = 'You do not have any lesson yet.';
    this.loadingMsg = 'Loading...';
    this.switchOnEditMode = this.switchOnEditMode.bind(this);
    this.switchOffEditMode = this.switchOffEditMode.bind(this);
    this.showAddLessonPopUp = this.showAddLessonPopUp.bind(this);
    this.hideAddLessonPopUp = this.hideAddLessonPopUp.bind(this);
    this.endEditLesson = this.endEditLesson.bind(this);
    this.removeLesson = this.removeLesson.bind(this);
    this.scrollContainer = null;
  }

  componentDidMount() {
    this.scrollContainer.scrollTop = scrollTop;
  }

  componentWillUnmount() {
    scrollTop = this.scrollContainer.scrollTop;
  }

  editLesson(targetLesson) {
    this.setState({ editingLesson: targetLesson });
  }

  endEditLesson() {
    this.setState({ editingLesson: undefined });
  }

  removeLesson(targetLesson) {
    const firm = window.confirm(`Remove the lesson "${targetLesson.title}"?`);
    if (firm) this.props.removeLesson(targetLesson);
  }

  showAddLessonPopUp() {
    this.setState({ isShowAddLessonPopUp: true });
  }

  hideAddLessonPopUp() {
    this.setState({ isShowAddLessonPopUp: false });
  }

  switchOnEditMode() {
    this.setState({ editMode: true });
  }

  switchOffEditMode() {
    this.setState({ editMode: false });
  }

  renderRightControl() {
    const { editMode } = this.state;
    const { lessons } = this.props;

    if (editMode) {
      return (
        <div onClick={this.switchOffEditMode} role="presentation">Done</div>
      );
    }

    return (
      <div className="control-group">
        <div
          onClick={this.showAddLessonPopUp}
          role="presentation"
          className="link icon-only"
        >
          <i className="icon ion-ios-plus-empty" />
        </div>
        {
          Object.keys(lessons).length > 0 ?
            (
              <div
                onClick={this.switchOnEditMode}
                role="presentation"
                className="link icon-only"
              >
                <i className="icon ion-ios-compose-outline" />
              </div>
            )
            :
            ''
        }
      </div>
    );
  }

  renderLessonList() {
    const { editMode } = this.state;
    const { lessons, match } = this.props;
    return (
      <div className="list-block media-list">
        <ul>
          {
            Object.keys(lessons).map((key) => {
              const lesson = lessons[key];
              return (
                <EditableItem
                  key={lesson.id}
                  showButtons={editMode}
                  onRemoveClick={() => {
                    this.removeLesson(lesson);
                  }}
                  onEditClick={() => {
                    this.editLesson(lesson);
                  }}
                >
                  <Link
                    to={
                      editMode ?
                        `${match.url}`
                        :
                        `${match.url}/${lesson.id}/vocabs`
                    }
                  >
                    <div className="item-title-row">
                      <div className="item-title">{lesson.title}</div>
                    </div>
                    <div className="item-subtitle grey">
                      {lesson.vocabs ? Object.keys(lesson.vocabs).length : '0'} vocabs
                    </div>
                  </Link>
                </EditableItem>
              );
            })
          }
        </ul>
      </div>
    );
  }

  renderNoData() {
    const { isFetchingLessons } = this.props;
    return (
      <div className="real-center">
        <p className="text-center grey">
          {isFetchingLessons ? this.loadingMsg : this.noDataMsg}
        </p>
      </div>
    );
  }

  render() {
    const { isShowAddLessonPopUp, editingLesson } = this.state;
    const {
      book,
      lessons,
      addLesson,
      editLesson,
      isAppReady,
    } = this.props;

    if (!isAppReady) {
      return <Redirect to="/redirect?url=/lessons" />;
    }

    if (!book) {
      return <Redirect to="/books" />;
    }

    return (
      <div className="lessons page">
        <NavBar
          pageName={book.title}
          left={<BackButton to="/" />}
          right={this.renderRightControl()}
        />
        <div className="page-inner" ref={(ref) => { this.scrollContainer = ref; }}>
          {Object.keys(lessons).length <= 0 ? (this.renderNoData()) : (this.renderLessonList())}
        </div>
        <AddLessonForm
          isPopUp={isShowAddLessonPopUp}
          hide={this.hideAddLessonPopUp}
          bookId={book.id}
          addLesson={addLesson}
        />
        <EditLessonForm
          targetLesson={editingLesson}
          hide={this.endEditLesson}
          editLesson={editLesson}
        />
      </div>
    );
  }
}

Lessons.propTypes = propTypes;
Lessons.defaultProps = defaultProps;

export default Lessons;
