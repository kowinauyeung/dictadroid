import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import NavBar from '../components/NavBar';
import BackButton from '../components/BackButton';
import AddLessonForm from '../components/AddLessonForm';
import EditLessonForm from '../components/EditLessonForm';
import EditableItem from '../components/EditableItem';

const propTypes = {
  match: PropTypes.shape({ url: PropTypes.string }).isRequired,
  book: PropTypes.shape({
    title: PropTypes.string,
  }).isRequired,
  lessons: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
      vocabs: PropTypes.array,
    }),
  ).isRequired,
  removeLesson: PropTypes.func.isRequired,
};

const defaultProps = {
  book: {
    title: '大家的日本語初級I',
  },
  lessons: [
    {
      id: 'thisisalesson01',
      title: '第一課',
      vocabs: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    },
    {
      id: 'thisisalesson02',
      title: '第二課',
      vocabs: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    },
    {
      id: 'thisisalesson03',
      title: '第三課',
      vocabs: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    },
    {
      id: 'thisisalesson04',
      title: '第四課',
      vocabs: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    },
    {
      id: 'thisisalesson05',
      title: '第五課',
      vocabs: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    },
    {
      id: 'thisisalesson06',
      title: '第六課',
      vocabs: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    },
    {
      id: 'thisisalesson07',
      title: '第七課',
      vocabs: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    },
    {
      id: 'thisisalesson08',
      title: '第八課',
      vocabs: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    },
    {
      id: 'thisisalesson09',
      title: '第九課',
      vocabs: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    },
    {
      id: 'thisisalesson10',
      title: '第十課',
      vocabs: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    },
    {
      id: 'thisisalesson11',
      title: '第十一課',
      vocabs: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    },
    {
      id: 'thisisalesson12',
      title: '第十二課',
      vocabs: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    },
    {
      id: 'thisisalesson13',
      title: '第十三課',
      vocabs: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    },
  ],
  removeLesson: (lesson) => { console.log(lesson); },
};

class Lessons extends Component {
  constructor() {
    super();
    this.state = {
      editMode: false,
      isShowAddLessonPopUp: false,
      editingLesson: undefined,
    };
    this.noDataMsg = 'You do not have any lesson yet.';
    this.switchOnEditMode = this.switchOnEditMode.bind(this);
    this.switchOffEditMode = this.switchOffEditMode.bind(this);
    this.showAddLessonPopUp = this.showAddLessonPopUp.bind(this);
    this.hideAddLessonPopUp = this.hideAddLessonPopUp.bind(this);
    this.endEditLesson = this.endEditLesson.bind(this);
    this.removeLesson = this.removeLesson.bind(this);
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
          lessons.length > 0 ?
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
            lessons.map(lesson => (
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
                    {lesson.vocabs.length} vocabs
                  </div>
                </Link>
              </EditableItem>
            ))
          }
        </ul>
      </div>
    );
  }

  renderNoData() {
    return (
      <div className="content-block">
        <p className="text-center">{this.noDataMsg}</p>
      </div>
    );
  }

  render() {
    const { isShowAddLessonPopUp, editingLesson } = this.state;
    const { book, lessons } = this.props;
    return (
      <div className="lessons page">
        <NavBar
          pageName={book.title}
          left={<BackButton to="/" />}
          right={this.renderRightControl()}
        />
        <div className="page-inner">
          {lessons.length <= 0 ? (this.renderNoData()) : (this.renderLessonList())}
        </div>
        <AddLessonForm
          isPopUp={isShowAddLessonPopUp}
          hide={this.hideAddLessonPopUp}
        />
        <EditLessonForm
          targetLesson={editingLesson}
          hide={this.endEditLesson}
        />
      </div>
    );
  }
}

Lessons.propTypes = propTypes;
Lessons.defaultProps = defaultProps;

export default Lessons;
