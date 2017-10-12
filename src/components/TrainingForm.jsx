import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Popup } from '../components/Modal';
import './TrainingForm.css';

const propTypes = {
  hide: PropTypes.func.isRequired,
  subject: PropTypes.string.isRequired,
  book: PropTypes.shape({
    lang: PropTypes.string,
    transFrm: PropTypes.string,
  }).isRequired,
  vocabs: PropTypes.arrayOf(
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
  lang: PropTypes.string.isRequired,
  speak: PropTypes.func.isRequired,
  submitResult: PropTypes.func.isRequired,
};

const defaultProps = {
  vocabs: [],
};

const typeMap = {
  n: 'Noun',
  v: 'Verb',
  adj: 'Adjective',
  adv: 'Adverb',
  pn: 'pronoun',
  other: 'Other',
};

const formatAnswer = answer => (_.trim(answer));

class TrainingForm extends Component {
  constructor() {
    super();
    this.defaultState = {
      inputVal: '',
      currentVocabIndex: -1,
    };
    this.state = { ...this.defaultState };
    this.confirmMsg = 'You did not answer all the question, still submit?';
    this.showResult = this.showResult.bind(this);
    this.hideEditPopUp = this.hideEditPopUp.bind(this);
    this.previousVocab = this.previousVocab.bind(this);
    this.nextVocab = this.nextVocab.bind(this);
    this.submitAnswerAndNextVocab = this.submitAnswerAndNextVocab.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.vocabs.length > 0) {
      this.setState({ currentVocabIndex: 0 });
    } else {
      this.setState({ currentVocabIndex: -1 });
    }
  }

  componentDidUpdate(prevProp, prevState) {
    const { speak, lang, vocabs } = this.props;
    if (prevState.currentVocabIndex !== this.state.currentVocabIndex && vocabs.length) {
      speak(vocabs[this.state.currentVocabIndex], lang);
    }
  }

  hideEditPopUp() {
    this.resetForm();
    this.props.hide();
  }

  showResult() {
    const { vocabs, book, subject, submitResult } = this.props;
    let isHasEmptyAnswer = false;
    vocabs.forEach((vocab) => {
      if (!vocab.answer || vocab.answer === '') {
        isHasEmptyAnswer = true;
      }
    });

    if (isHasEmptyAnswer) {
      const sureToSubmitWithEmpty = window.confirm(this.confirmMsg);
      if (!sureToSubmitWithEmpty) {
        return;
      }
    }

    const result = {
      title: book.title,
      subject,
      vocabs,
    };
    submitResult(book.id, result);
    this.hideEditPopUp();
  }

  resetForm() {
    this.setState({ ...this.defaultState });
  }

  previousVocab() {
    const nextIndex = Math.max(this.state.currentVocabIndex - 1, 0);
    const nextVocab = this.props.vocabs[nextIndex];
    this.setState({
      currentVocabIndex: nextIndex,
      inputVal: nextVocab.answer || '',
    });
  }

  nextVocab() {
    const nextIndex = this.state.currentVocabIndex + 1;
    if (nextIndex >= this.props.vocabs.length) {
      this.showResult();
      return;
    }
    const nextVocab = this.props.vocabs[nextIndex];
    this.setState({
      currentVocabIndex: nextIndex,
      inputVal: nextVocab.answer || '',
    });
  }

  submitAnswerAndNextVocab() {
    const { currentVocabIndex, inputVal } = this.state;
    const { vocabs, lang, speak } = this.props;
    const vocab = vocabs[currentVocabIndex];
    if (formatAnswer(inputVal) === '') {
      speak(vocab, lang);
      return;
    }
    vocab.answer = formatAnswer(inputVal);
    this.nextVocab();
  }

  render() {
    const { book, subject, speak, lang, vocabs } = this.props;
    const { inputVal, currentVocabIndex } = this.state;
    const currentVocab = vocabs[currentVocabIndex] || null;
    const completedVocabs = currentVocabIndex + 1;
    const totalVocabs = vocabs.length;
    const progress = (completedVocabs / totalVocabs) * 100;
    return (
      <Popup
        header={_.truncate(subject.replace(/\s+/g, ''), { length: 18, separator: '' })}
        visible={vocabs !== null && vocabs.length > 0}
        onLeftClick={this.hideEditPopUp}
        onRightClick={this.showResult}
        leftText="Stop"
        rightText="Results"
      >
        <div className="page-inner training-form">
          <div className="content-block">
            <p className="text-center">{book.title}</p>
            <p className="text-center">{subject}</p>
            <p>
              <button
                className="icon ion-ios-mic btn btn-speech text-center"
                onClick={() => speak(currentVocab, lang)}
              />
            </p>
            <div className="content-block-inner">
              <p className="text-center text-progress">
                {completedVocabs} / {totalVocabs}
              </p>
              <p className="text-center">[{currentVocab ? typeMap[currentVocab.type] : ''}]</p>
              <div className="train-form-cotainer">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    this.submitAnswerAndNextVocab();
                    return false;
                  }}
                >
                  <input
                    type="text"
                    value={inputVal}
                    className="answer-field"
                    placeholder="Input your answer here."
                    onChange={e => this.setState({ inputVal: e.target.value })}
                  />
                </form>
                <span className="progressbar">
                  <span
                    style={{
                      transform: `translate3d(-${100 - progress}%, 0px, 0px)`,
                    }}
                  />
                </span>
              </div>
              <div className="row">
                <div className="col-33">
                  <a
                    className="training-btn"
                    onClick={this.previousVocab}
                    role="presentation"
                  >
                    <i className="icon ion-ios-arrow-thin-left" />
                  </a>
                </div>
                <div className="col-33">
                  <a
                    className="training-btn"
                    onClick={this.nextVocab}
                    role="presentation"
                  >
                    {
                      (progress >= 100) ?
                        <i className="icon ion-ios-checkmark-empty" />
                        :
                        <i className="icon ion-ios-close-empty" />
                    }
                  </a>
                </div>
                <div className="col-33">
                  <a
                    className="training-btn"
                    onClick={this.submitAnswerAndNextVocab}
                    role="presentation"
                  >
                    <i className="icon ion-ios-arrow-thin-right" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Popup>
    );
  }
}

TrainingForm.propTypes = propTypes;
TrainingForm.defaultProps = defaultProps;

export default TrainingForm;
