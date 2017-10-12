import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Speech from '../utils/Speech';
import './Vocab.css';

const propTypes = {
  vocab: PropTypes.shape({
    vocab: PropTypes.string,
    translation: PropTypes.string,
    pron: PropTypes.string,
    useSpeech: PropTypes.bool,
    type: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
    lang: PropTypes.string,
  }).isRequired,
  history: PropTypes.shape({ goBack: PropTypes.func }).isRequired,
};

const typeMap = {
  n: 'Noun',
  v: 'Verb',
  adj: 'Adjective',
  adv: 'Adverb',
  pn: 'pronoun',
  other: 'Other',
};

const renderLeft = history => (
  <div role="presentation" onClick={() => history.goBack()}>
    <i className="icon ion-ios-arrow-back" />
    <span>Back</span>
  </div>
);

function VocabCard(props) {
  const { vocab, lang, pron, type, translation, tags } = props.vocab;
  return (
    <div className="vocab page without-tabbar">
      <NavBar pageName={vocab} left={renderLeft(props.history)} />
      <div className="page-inner">
        <div className="content-block">
          <div className="content-block-inner">
            <p className="text-center vocab-display">{vocab}</p>
            {pron ? <p className="text-center pron-display">{pron}</p> : ''}
            <p className="text-center">
              <i
                className="icon ion-ios-volume-high btn-pron"
                role="presentation"
                onClick={() => { Speech.pron(props.vocab, lang); }}
              />
            </p>
            <p className="text-center type-display">[{typeMap[type]}]</p>
            <div className="line" />
            <p className="text-center translate-display">{translation}</p>
            {
              tags && tags.length > 0 ?
                (
                  <div className="text-center tags-display">
                    {
                      tags.map(tag => (
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
                href={`http://www.google.com/images?q=${vocab}`}
                className="button"
                target="_blank"
              >
                Google image
              </a>
            </p>
            <p>
              <a
                href={`https://www.japandict.com/?s=${vocab}`}
                className="button"
                target="_blank"
              >
                Dictionary
              </a>
            </p>
            <p>
              <Link to="/" className="button">Start training</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

VocabCard.propTypes = propTypes;

export default VocabCard;
