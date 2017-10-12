import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import NavBar from '../components/NavBar';
import BackButton from '../components/BackButton';
import EditVocabForm from '../components/EditVocabForm';
import Speech from '../utils/Speech';
import './Vocab.css';

const propTypes = {
  match: PropTypes.shape({ url: PropTypes.string }).isRequired,
  book: PropTypes.shape({
    title: PropTypes.string,
    lang: PropTypes.string,
  }),
  lessons: PropTypes.objectOf(
    PropTypes.shape({
      title: PropTypes.string,
    }),
  ),
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
  isAppReady: PropTypes.bool.isRequired,
  editVocab: PropTypes.func.isRequired,
  isFetchingVocabs: PropTypes.bool.isRequired,
  isFetchingLessons: PropTypes.bool.isRequired,
};

const defaultProps = {
  book: null,
  lessons: null,
};

const typeMap = {
  n: 'Noun',
  v: 'Verb',
  adj: 'Adjective',
  adv: 'Adverb',
  pn: 'pronoun',
  other: 'Other',
};

class Vocab extends Component {
  constructor() {
    super();
    this.state = {
      editMode: false,
    };
    this.startEditVocab = this.startEditVocab.bind(this);
    this.endEditVocab = this.endEditVocab.bind(this);
    this.lessonsListener = null;
    this.vocabsListener = null;
    this.noDataMsg = 'Loading...';
  }

  startEditVocab() {
    this.setState({ editMode: true });
  }

  endEditVocab() {
    this.setState({ editMode: false });
  }

  renderInner() {
    const { match, vocabs, book } = this.props;
    const vocab = vocabs[match.params.vocabId];

    return (
      <div className="page-inner">
        <div className="content-block">
          <div className="content-block-inner">
            <p className="text-center vocab-display">{vocab.vocab}</p>
            {vocab.pron ? <p className="text-center pron-display">{vocab.pron}</p> : ''}
            <p className="text-center">
              <i
                className="icon ion-ios-volume-high btn-pron"
                role="presentation"
                onClick={() => { Speech.pron(vocab, book.lang); }}
              />
            </p>
            <p className="text-center type-display">[{typeMap[vocab.type]}]</p>
            <div className="line" />
            <p className="text-center translate-display">{vocab.translation}</p>
            {
              vocab.tags && vocab.tags.length > 0 ?
                (
                  <div className="text-center tags-display">
                    {
                      vocab.tags.map(tag => (
                        <div
                          key={`tag-${tag}`}
                          className="chip"
                        >
                          <div className="chip-label">{tag}</div>
                        </div>
                      ))
                    }
                  </div>
                )
                :
                ''
            }
            <p>
              <a
                href={`http://www.google.com/images?q=${vocab.vocab}`}
                className="button"
                target="_blank"
              >
                Google image
              </a>
            </p>
            <p>
              <a
                href={`https://www.japandict.com/?s=${vocab.vocab}`}
                className="button"
                target="_blank"
              >
                Dictionary
              </a>
            </p>
          </div>
        </div>
      </div>
    );
  }

  renderNoData() {
    return (
      <div className="real-center">
        <p className="text-center grey">{this.noDataMsg}</p>
      </div>
    );
  }

  render() {
    const {
      match,
      vocabs,
      book,
      lessons,
      editVocab,
      isAppReady,
      isFetchingVocabs,
      isFetchingLessons,
    } = this.props;
    const { editMode } = this.state;
    const lessonId = match.params.lessonId;
    const vocabId = match.params.vocabId;
    const lesson = lessons[lessonId];
    const vocab = vocabs[vocabId];

    if (!isAppReady) {
      return <Redirect to={`/redirect?url=${match.url}`} />;
    }

    if (!lesson && !isFetchingLessons) {
      return <Redirect to="/lessons" />;
    }

    if (!vocab && !isFetchingVocabs) {
      return <Redirect to={`/lessons/${match.params.lessonId}/vocabs`} />;
    }

    return (
      <div className="vocab page">
        <NavBar
          pageName={book && lesson ? `${book.title} - ${lesson.title}` : 'loading...'}
          left={<BackButton to={`/lessons/${lessonId}/vocabs`} text="back" />}
          right={<div onClick={this.startEditVocab} role="presentation">Edit</div>}
        />
        {vocab ? this.renderInner() : this.renderNoData()}
        <EditVocabForm
          targetVocab={editMode ? vocab : undefined}
          hide={this.endEditVocab}
          editVocab={editVocab}
        />
      </div>
    );
  }
}

Vocab.propTypes = propTypes;
Vocab.defaultProps = defaultProps;

export default Vocab;
