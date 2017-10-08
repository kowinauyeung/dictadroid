import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import NavBar from '../components/NavBar';
import BackButton from '../components/BackButton';
import AddVocabForm from '../components/AddVocabForm';
import EditVocabForm from '../components/EditVocabForm';
import EditableItem from '../components/EditableItem';
import Speech from '../utils/Speech';

const propTypes = {
  match: PropTypes.shape({ url: PropTypes.string }).isRequired,
  book: PropTypes.shape({
    lang: PropTypes.string,
    transFrm: PropTypes.string,
  }),
  lessons: PropTypes.objectOf(
    PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
    }),
  ).isRequired,
  vocabs: PropTypes.objectOf(
    PropTypes.shape({
      id: PropTypes.string,
      vocab: PropTypes.string,
      translation: PropTypes.string,
      pron: PropTypes.string,
      useSpeech: PropTypes.bool,
      type: PropTypes.string,
      tags: PropTypes.arrayOf(PropTypes.string),
    }),
  ).isRequired,
  addVocab: PropTypes.func.isRequired,
  removeVocab: PropTypes.func.isRequired,
  editVocab: PropTypes.func.isRequired,
  isAppReady: PropTypes.bool.isRequired,
  isFetchingVocabs: PropTypes.bool.isRequired,
  listenToVocabs: PropTypes.func.isRequired,
  unListenToVocabs: PropTypes.func.isRequired,
};

const defaultProps = {
  book: null,
  lessons: null,
};

class Vocabs extends Component {
  constructor() {
    super();
    this.state = {
      editMode: false,
      isShowAddVocabPopUp: false,
      editingVocab: undefined,
    };
    this.noDataMsg = 'You do not have any vacabulary yet.';
    this.loadingMsg = 'Loading...';
    this.switchOnEditMode = this.switchOnEditMode.bind(this);
    this.switchOffEditMode = this.switchOffEditMode.bind(this);
    this.showAddVocabPopUp = this.showAddVocabPopUp.bind(this);
    this.hideAddVocabPopUp = this.hideAddVocabPopUp.bind(this);
    this.endEditVocab = this.endEditVocab.bind(this);
    this.removeVocab = this.removeVocab.bind(this);
  }

  componentDidMount() {
    const { listenToVocabs, lessons, match } = this.props;
    const lesson = lessons[match.params.lessonId];
    if (!lesson) return;
    listenToVocabs(lesson.id);
  }

  componentWillUnmount() {
    const { unListenToVocabs, lessons, match } = this.props;
    const lesson = lessons[match.params.lessonId];
    if (!lesson) return;
    unListenToVocabs(lesson.id);
  }

  speech(vocab) {
    const { lang } = this.props.book;
    Speech.pron(vocab, lang);
  }

  editVocab(targetVocab) {
    this.setState({ editingVocab: targetVocab });
  }

  endEditVocab() {
    this.setState({ editingVocab: undefined });
  }

  removeVocab(targetVocab) {
    const firm = window.confirm(`Remove the vocab "${targetVocab.vocab}"?`);
    if (firm) this.props.removeVocab(targetVocab);
  }

  showAddVocabPopUp() {
    this.setState({ isShowAddVocabPopUp: true });
  }

  hideAddVocabPopUp() {
    this.setState({ isShowAddVocabPopUp: false });
  }

  switchOnEditMode() {
    this.setState({ editMode: true });
  }

  switchOffEditMode() {
    this.setState({ editMode: false });
  }

  renderRightControl() {
    const { editMode } = this.state;
    const { vocabs } = this.props;

    if (editMode) {
      return (
        <div onClick={this.switchOffEditMode} role="presentation">Done</div>
      );
    }

    return (
      <div className="control-group">
        <div
          onClick={this.showAddVocabPopUp}
          role="presentation"
          className="link icon-only"
        >
          <i className="icon ion-ios-plus-empty" />
        </div>
        {
          Object.keys(vocabs).length > 0 ?
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

  renderVocabList() {
    const { editMode } = this.state;
    const { vocabs, match } = this.props;
    return (
      <div className="list-block media-list">
        <ul>
          {
            Object.keys(vocabs).map((key) => {
              const vocab = vocabs[key];
              return (
                <EditableItem
                  key={vocab.id}
                  showButtons={editMode}
                  onRemoveClick={() => {
                    this.removeVocab(vocab);
                  }}
                  onEditClick={() => {
                    this.editVocab(vocab);
                  }}
                >
                  <Link
                    to={
                      editMode ?
                        `${match.url}`
                        :
                        `${match.url}/${vocab.id}`
                    }
                  >
                    <div className={`item-title-row${vocab.pron ? '' : ' title-only'}`}>
                      <div className="item-title">{vocab.vocab}</div>
                    </div>
                    {vocab.pron ? <div className="item-subtitle small">{vocab.pron}</div> : ''}
                  </Link>
                  <div className="item-vocab-after">
                    <span>{`[${vocab.type}] ${vocab.translation}`}</span>
                    <div
                      className="btn-speech icon ion-ios-volume-high"
                      onClick={() => { this.speech(vocab); }}
                      role="presentation"
                    />
                  </div>
                </EditableItem>
              );
            })
          }
        </ul>
      </div>
    );
  }

  renderNoData() {
    const { isFetchingVocabs } = this.props;
    return (
      <div className="content-block">
        <p className="text-center">
          {isFetchingVocabs ? this.loadingMsg : this.noDataMsg}
        </p>
      </div>
    );
  }

  render() {
    const { isShowAddVocabPopUp, editingVocab } = this.state;
    const { book, lessons, vocabs, match, addVocab, editVocab, isAppReady } = this.props;
    const lessonId = match.params.lessonId;

    if (!isAppReady) {
      return <Redirect to={`/redirect?url=${match.url}`} />;
    }

    if (!lessons[lessonId]) {
      return <Redirect to={`/lessons/${lessonId}`} />;
    }

    return (
      <div className="vocabs page">
        <NavBar
          pageName={lessons[lessonId].title}
          left={<BackButton to="/lessons" text="Lessons" />}
          right={this.renderRightControl()}
        />
        <div className="page-inner">
          {Object.keys(vocabs).length <= 0 ? (this.renderNoData()) : (this.renderVocabList())}
        </div>
        <AddVocabForm
          bookId={book.id}
          lessonId={lessonId}
          isPopUp={isShowAddVocabPopUp}
          hide={this.hideAddVocabPopUp}
          addVocab={addVocab}
        />
        <EditVocabForm
          targetVocab={editingVocab}
          hide={this.endEditVocab}
          editVocab={editVocab}
        />
      </div>
    );
  }
}

Vocabs.propTypes = propTypes;
Vocabs.defaultProps = defaultProps;

export default Vocabs;
