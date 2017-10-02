import React from 'react';
import PropTypes from 'prop-types';
import NavBar from '../components/NavBar';
import BackButton from '../components/BackButton';
import Speech from '../utils/Speech';
import './Vocab.css';

const propTypes = {
  match: PropTypes.shape({ url: PropTypes.string }).isRequired,
  book: PropTypes.shape({
    title: PropTypes.string,
    lang: PropTypes.string,
  }).isRequired,
  lesson: PropTypes.shape({
    title: PropTypes.string,
  }).isRequired,
  vocab: PropTypes.shape({
    id: PropTypes.string,
    vocab: PropTypes.string,
    translation: PropTypes.string,
    pron: PropTypes.string,
    useSpeech: PropTypes.bool,
    type: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

const defaultProps = {
  book: {
    title: '大家的日本語初級I',
    lang: 'ja',
  },
  lesson: {
    title: '第4課',
  },
  vocab: {
    id: 'thisisvocabid01',
    vocab: '休みます',
    translation: '休息',
    pron: 'やすみます',
    useSpeech: false,
    type: 'v',
    tags: ['Ⅰ類動詞'],
  },
};

function Vocab(props) {
  const { match, vocab, book, lesson } = props;
  return (
    <div className="vocab page">
      <NavBar
        pageName={`${book.title} - ${lesson.title}`}
        left={<BackButton to={`/lessons/${match.params.lessionId}/vocabs`} text="back" />}
      />
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
            <p className="text-center type-display">[{vocab.type}]</p>
            <div className="line" />
            <p className="text-center translate-display">{vocab.translation}</p>
            {
              vocab.tags.length <= 0 ?
                ''
                :
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
    </div>
  );
}

Vocab.propTypes = propTypes;
Vocab.defaultProps = defaultProps;

export default Vocab;
