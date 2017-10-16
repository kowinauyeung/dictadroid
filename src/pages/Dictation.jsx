import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import _ from 'lodash';
import NavBar from '../components/NavBar';
import TrainingForm from '../components/TrainingForm';
import Speech from '../utils/Speech';

const propTypes = {
  LANG: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
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
  isAppReady: PropTypes.bool.isRequired,
  isFetchingLessons: PropTypes.bool.isRequired,
  submitResult: PropTypes.func.isRequired,
};

const defaultProps = {
  book: null,
};

const vocabTypes = ['all', 'n', 'v', 'adj', 'adv', 'pn'];

class Dictation extends Component {
  constructor() {
    super();
    this.defaultState = {
      selectedLessons: {},
      typeFilter: 'all',
      isAll: false,
      training: null,
    };
    this.state = this.defaultState;
    this.selectAll = this.selectAll.bind(this);
    this.deSelectAll = this.deSelectAll.bind(this);
    this.start = this.start.bind(this);
    this.stopTraining = this.stopTraining.bind(this);
    this.submitResult = this.submitResult.bind(this);
  }

  start() {
    const { lessons, vocabs } = this.props;
    const { selectedLessons, typeFilter } = this.state;
    const vocabsToTrain = [];
    let subject = '';

    Object.keys(selectedLessons).forEach((key) => {
      if (!selectedLessons[key]) return;
      const lesson = lessons[key];
      if (subject === '') subject = lesson.title;
      else subject += `, ${lesson.title}`;
      Object.keys(lesson.vocabs).forEach((vid) => {
        if (typeFilter !== '' && typeFilter !== 'all' && vocabs[vid].type !== typeFilter) return;
        vocabsToTrain.push({ ...vocabs[vid] });
      });
    });

    if (vocabsToTrain.length <= 0) return;

    this.setState({
      training: {
        subject,
        vocabs: _.shuffle(vocabsToTrain),
      },
    });
  }

  selectAll() {
    const { lessons } = this.props;
    const selectedLessons = {};
    Object.keys(lessons).forEach((key) => {
      selectedLessons[key] = true;
    });
    this.setState({ selectedLessons, isAll: true });
  }

  deSelectAll() {
    const { lessons } = this.props;
    const selectedLessons = {};
    Object.keys(lessons).forEach((key) => {
      selectedLessons[key] = false;
    });
    this.setState({ selectedLessons, isAll: false });
  }

  stopTraining() {
    this.setState({ ...this.defaultState });
  }

  submitResult(bookId, result) {
    const { submitResult, history } = this.props;
    submitResult(bookId, result)
      .then((resultId) => {
        history.push(`/results/${resultId}`);
      });
  }

  renderLeft() {
    const { isAll } = this.state;
    const { LANG } = this.props;
    if (!isAll) {
      return (
        <div className="link" role="presentation" onClick={this.selectAll}>
          <i className="icon ion-ios-circle-outline" />
          <span>{LANG.SELECT_ALL}</span>
        </div>
      );
    }
    return (
      <div className="link" role="presentation" onClick={this.deSelectAll}>
        <i className="icon ion-ios-checkmark-outline" />
        <span>{LANG.DESELECT_ALL}</span>
      </div>
    );
  }

  renderRight() {
    const { LANG } = this.props;
    return <div onClick={this.start} role="presentation">{LANG.START}</div>;
  }

  renderLesson() {
    const { book, lessons, LANG } = this.props;
    const { selectedLessons, typeFilter } = this.state;
    return (
      <div className="page-inner">
        <div className="content-block">
          <Link to="/" className="page-title">{book.title}</Link>
        </div>
        <div className="content-block">
          <div className="buttons-row">
            {
              vocabTypes.map(t => (
                <div
                  key={`type-${t}`}
                  role="presentation"
                  className={`button${typeFilter === t ? ' active' : ''}`}
                  onClick={() => {
                    this.setState({
                      typeFilter: t,
                    });
                  }}
                >
                  {LANG.VOCAB_TYPE_SHORT_FORM[t]}
                </div>
              ))
            }
          </div>
        </div>
        <div className="content-block-title">{LANG.DICTATION_REMIND_MSG}</div>
        <div className="list-block">
          <ul>
            {
              Object.keys(lessons).map((id) => {
                const lesson = lessons[id];
                return (
                  <li key={lesson.id}>
                    <label
                      htmlFor={`checkbox-${lesson.id}`}
                      className="label-checkbox item-content"
                    >
                      <input
                        id={`checkbox-${lesson.id}`}
                        type="checkbox"
                        name="dictation-lessons"
                        defaultChecked={selectedLessons[lesson.id]}
                        checked={selectedLessons[lesson.id] || false}
                        onChange={(e) => {
                          this.setState({
                            selectedLessons: {
                              ...selectedLessons,
                              [lesson.id]: e.target.checked,
                            },
                          });
                        }}
                      />
                      <div className="item-media">
                        <i className="icon ion-ios-checkmark-empty" />
                      </div>
                      <div className="item-inner">
                        <div className="item-title">{lesson.title}</div>
                        <div className="item-after">
                          {Object.keys(lesson.vocabs).length}
                          {LANG.UNIT_VOCABS}
                        </div>
                      </div>
                    </label>
                  </li>
                );
              })
            }
          </ul>
        </div>
      </div>
    );
  }

  renderNoData() {
    const { isFetchingLessons, LANG } = this.props;
    return (
      <div className="page-inner real-center">
        <p className="text-center grey">
          {isFetchingLessons ? LANG.LOADING : LANG.NO_DATA_IN_DICTATION }
        </p>
      </div>
    );
  }

  render() {
    const { book, lessons, isAppReady, match, LANG } = this.props;
    const { training } = this.state;
    const trainType = match.path.replace('/', '');

    if (!isAppReady) {
      return <Redirect to={`/redirect?url=${match.url}`} />;
    }

    if (!book) {
      return <Redirect to="/books" />;
    }

    return (
      <div className="dictation page">
        <NavBar
          pageName={trainType === 'dictation' ? LANG.DICTATION : LANG.TRANSLATION}
          left={this.renderLeft()}
          right={this.renderRight()}
        />
        {Object.keys(lessons).length <= 0 ? this.renderNoData() : this.renderLesson()}
        <TrainingForm
          speak={trainType === 'dictation' ? Speech.pron : Speech.trans}
          hide={this.stopTraining}
          book={book}
          subject={training ? training.subject : ''}
          vocabs={training ? training.vocabs : []}
          spkLang={trainType === 'dictation' ? book.lang : book.transFrm}
          trainType={trainType}
          submitResult={this.submitResult}
          LANG={LANG}
        />
      </div>
    );
  }
}

Dictation.propTypes = propTypes;
Dictation.defaultProps = defaultProps;

export default Dictation;
