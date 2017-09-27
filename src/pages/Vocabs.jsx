import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import NavBar from '../components/NavBar';
import BackButton from '../components/BackButton';
import AddVocabForm from '../components/AddVocabForm';

const propTypes = {
  match: PropTypes.shape({ url: PropTypes.string }).isRequired,
  lesson: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
  }).isRequired,
  vocabs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      vocab: PropTypes.string,
      translation: PropTypes.string,
      pron: PropTypes.string,
      lesson: PropTypes.string,
      type: PropTypes.string,
      tags: PropTypes.arrayOf(PropTypes.string),
    }),
  ).isRequired,
  removeVocab: PropTypes.func.isRequired,
};

const defaultProps = {
  lesson: {
    id: 'thisisalesson01',
    title: '第一課',
  },
  vocabs: [
    {
      id: 'thisisavocab01',
      vocab: '始める',
      translation: '開始',
      pron: 'はじめる',
      lesson: 'thisisalesson01',
      type: 'verb',
      tags: ['自動詞', '一段動詞'],
    },
  ],
  removeVocab: (vocab) => { console.log(vocab); },
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
    this.switchOnEditMode = this.switchOnEditMode.bind(this);
    this.switchOffEditMode = this.switchOffEditMode.bind(this);
    this.showAddVocabPopUp = this.showAddVocabPopUp.bind(this);
    this.hideAddVocabPopUp = this.hideAddVocabPopUp.bind(this);
    this.endEditVocab = this.endEditVocab.bind(this);
    this.removeVocab = this.removeVocab.bind(this);
  }

  editVocab(targetVocab) {
    this.setState({ editingVocab: targetVocab });
  }

  endEditVocab() {
    this.setState({ editingVocab: undefined });
  }

  removeVocab(targetVocab) {
    const firm = window.confirm(`Remove the vocab "${targetVocab.title}"?`);
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
          vocabs.length > 0 ?
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

  renderNoData() {
    return (
      <div className="content-block">
        <p className="text-center">{this.noDataMsg}</p>
      </div>
    );
  }

  render() {
    const { isShowAddVocabPopUp, editingVocab } = this.state;
    const { lesson, vocabs, match } = this.props;
    return (
      <div className="vocabs page">
        <NavBar
          pageName={lesson.title}
          left={<BackButton to="/lessons" text="Lessons" />}
          right={this.renderRightControl()}
        />
        <div className="page-inner">
          {vocabs.length <= 0 ? (this.renderNoData()) : (this.renderNoData())}
        </div>
        <AddVocabForm
          lessonId={match.params.lessionId}
          isPopUp={isShowAddVocabPopUp}
          hide={this.hideAddVocabPopUp}
        />
      </div>
    );
  }
}

Vocabs.propTypes = propTypes;
Vocabs.defaultProps = defaultProps;

export default Vocabs;
