import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import NavBar from '../components/NavBar';
import BackButton from '../components/BackButton';
import AddVocabForm from '../components/AddVocabForm';
import EditableItem from '../components/EditableItem';
import Speech from '../utils/Speech';

const propTypes = {
  match: PropTypes.shape({ url: PropTypes.string }).isRequired,
  book: PropTypes.shape({
    lang: PropTypes.string,
    transFrm: PropTypes.string,
  }).isRequired,
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
      useSpeech: PropTypes.bool,
      lesson: PropTypes.string,
      type: PropTypes.string,
      tags: PropTypes.arrayOf(PropTypes.string),
    }),
  ).isRequired,
  removeVocab: PropTypes.func.isRequired,
};

const defaultProps = {
  book: {
    id: 'thisisanid01',
    title: '大家的日本語初級I',
    lang: 'ja',
    transFrm: 'zh',
  },
  lesson: {
    id: 'thisisalesson01',
    title: '第一課',
  },
  vocabs: [
    {
      id: 'thisisavocab01',
      vocab: '開きます',
      translation: '開',
      pron: 'あきます',
      useSpeech: true,
      lesson: 'thisisalesson01',
      type: 'v',
      tags: ['他動詞', '一段動詞'],
    },
    {
      id: 'thisisavocab02',
      vocab: '始まる',
      translation: '開始',
      pron: 'はじまる',
      useSpeech: false,
      lesson: 'thisisalesson01',
      type: 'v',
      tags: ['自動詞'],
    },
    {
      id: 'thisisavocab03',
      vocab: 'そのまま',
      translation: '就這樣',
      pron: '',
      useSpeech: false,
      lesson: 'thisisalesson01',
      type: 'n',
      tags: ['名詞'],
    },
    {
      id: 'thisisavocab04',
      vocab: 'パーティー',
      translation: 'Party',
      pron: '',
      useSpeech: false,
      lesson: 'thisisalesson01',
      type: 'n',
      tags: [],
    },
    {
      id: 'thisisavocab05',
      vocab: '拭く',
      translation: '擦',
      pron: 'ふく',
      useSpeech: false,
      lesson: 'thisisalesson01',
      type: 'v',
      tags: ['名詞', '名詞'],
    },
    {
      id: 'thisisavocab06',
      vocab: '思う',
      translation: '想',
      pron: 'おもう',
      useSpeech: false,
      lesson: 'thisisalesson01',
      type: 'v',
      tags: ['他動詞', '一段動詞'],
    },
    {
      id: 'thisisavocab07',
      vocab: '貼ります',
      translation: '貼',
      pron: 'はります',
      useSpeech: false,
      lesson: 'thisisalesson01',
      type: 'v',
      tags: ['他動詞', '一段動詞'],
    },
    {
      id: 'thisisavocab08',
      vocab: '掛けます',
      translation: '掛',
      pron: 'かけます',
      useSpeech: false,
      lesson: 'thisisalesson01',
      type: 'v',
      tags: ['他動詞', '一段動詞'],
    },
    {
      id: 'thisisavocab09',
      vocab: '並べます',
      translation: '並排',
      pron: 'ならべます',
      useSpeech: false,
      lesson: 'thisisalesson01',
      type: 'v',
      tags: ['他動詞', '一段動詞'],
    },
    {
      id: 'thisisavocab10',
      vocab: '植えます',
      translation: '種植',
      pron: 'うえます',
      useSpeech: false,
      lesson: 'thisisalesson01',
      type: 'v',
      tags: ['他動詞', '一段動詞'],
    },

    {
      id: 'thisisavocab11',
      vocab: '予習します',
      translation: '預習',
      pron: 'よしゅうします',
      useSpeech: false,
      lesson: 'thisisalesson01',
      type: 'v',
      tags: ['他動詞', '一段動詞'],
    },
    {
      id: 'thisisavocab12',
      vocab: '授業',
      translation: '授課',
      pron: 'じゅぎょう',
      useSpeech: false,
      lesson: 'thisisalesson01',
      type: 'n',
      tags: ['他動詞', '一段動詞'],
    },
    {
      id: 'thisisavocab13',
      vocab: '花瓶',
      translation: '花瓶',
      pron: 'かびん',
      useSpeech: false,
      lesson: 'thisisalesson01',
      type: 'n',
      tags: ['他動詞'],
    },
    {
      id: 'thisisavocab14',
      vocab: '非常袋',
      translation: '避難袋',
      pron: 'ひじょうぶくろ',
      useSpeech: false,
      lesson: 'thisisalesson01',
      type: 'v',
      tags: ['他動詞', '一段動詞'],
    },
    {
      id: 'thisisavocab15',
      vocab: '懐中電灯',
      translation: '手電筒',
      pron: 'かいちゅうでんとう',
      useSpeech: false,
      lesson: 'thisisalesson01',
      type: 'v',
      tags: ['他動詞', '一段動詞'],
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

  renderVocabList() {
    const { editMode } = this.state;
    const { vocabs, match } = this.props;
    return (
      <div className="list-block media-list">
        <ul>
          {
            vocabs.map(vocab => (
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
                  <div className="item-vocab-after">
                    <span>{`[${vocab.type}] ${vocab.translation}`}</span>
                    <div
                      className="btn-speech icon ion-ios-volume-high"
                      onClick={() => { this.speech(vocab); }}
                      role="presentation"
                    />
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
          {vocabs.length <= 0 ? (this.renderNoData()) : (this.renderVocabList())}
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
