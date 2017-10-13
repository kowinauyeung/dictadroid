import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import 'moment/locale/zh-hk';
import 'moment/locale/ja';
import { Link, Redirect } from 'react-router-dom';
import NavBar from '../components/NavBar';
import BackButton from '../components/BackButton';
import { Lang } from '../utils/Dictionary';
import { parseJSONToURIComponent, plainVocabObject, removeStuffInVocab } from '../utils/Utils';

const propTypes = {
  lang: PropTypes.string.isRequired,
  LANG: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  match: PropTypes.shape({ url: PropTypes.string }).isRequired,
  book: PropTypes.shape({
    lang: PropTypes.string,
    transFrm: PropTypes.string,
  }),
  isFetchingResults: PropTypes.bool.isRequired,
  isAppReady: PropTypes.bool.isRequired,
  results: PropTypes.objectOf(
    PropTypes.shape({
      id: PropTypes.string,
      correctAnswer: PropTypes.number,
      createDt: PropTypes.number,
      subject: PropTypes.string,
      title: PropTypes.string,
      trainType: PropTypes.string,
      vocabs: PropTypes.array,
    }),
  ).isRequired,
};

const defaultProps = {
  book: null,
};

const momentLangMap = {
  en: 'en',
  zh: 'zh-hk',
  ja: 'ja',
};

function renderNoData(isFetchingResults, LANG) {
  return (
    <div className="real-center">
      <p className="text-center grey">
        {isFetchingResults ? LANG.LOADING : LANG.NO_RESULTS_MSG}
      </p>
    </div>
  );
}

const renderResult = (results, match, book, LANG, lang) => {
  const resultId = match.params.resultId;
  const result = results[resultId];
  moment.locale(momentLangMap[lang]);
  return (
    <div className="ks-card-header-pic">
      <div className="card-content">
        <div className="card-content-inner">
          <h2>{book.title}</h2>
          <p className="grey">{LANG.LESSONS}: {result.subject}</p>
          <p className="grey">
            {LANG.TRAINING_TYPE}: {LANG[result.trainType.toUpperCase()]},&nbsp;
            {LANG.LANGUAGE}: {Lang[book.lang]}
          </p>
          <p className="grey">
            {moment(result.createDt).calendar()},&nbsp;
            {LANG.SCORE}: {result.correctAnswer}/{result.vocabs.length}
          </p>
        </div>
        <div className="list-block">
          <ul>
            <li>
              <div className="item-content">
                <div className="item-inner bold">
                  <div className="item-title">{LANG.QUESTIONS}</div>
                  <div className="item-after">{LANG.YOUR_ANSWERS}</div>
                </div>
              </div>
            </li>
            {
              result.vocabs.map(vocab => (
                <li key={vocab.id}>
                  <Link
                    to={`/vocab-card/${parseJSONToURIComponent(plainVocabObject({
                      ...vocab,
                      lang: book.lang,
                    }))}`}
                  >
                    <div className="item-content">
                      <div className="item-inner">
                        <div className="item-title">
                          {result.trainType === 'dictation' ? vocab.vocab : vocab.translation}
                        </div>
                        <div className={`item-after${
                          removeStuffInVocab(vocab.vocab) === vocab.answer ? '' : ' fail'
                        }`}
                        >
                          {vocab.answer}
                        </div>
                      </div>
                    </div>
                  </Link>
                </li>
              ))
            }
          </ul>
        </div>
      </div>
    </div>
  );
};

function Result(props) {
  const { isAppReady, isFetchingResults, results, match, book, LANG, lang } = props;
  const resultId = match.params.resultId;
  const result = results[resultId];

  if (!isAppReady) {
    return <Redirect to={`/redirect?url=/results/${resultId}`} />;
  }

  if (!result && !isFetchingResults) {
    return <Redirect to="/results" />;
  }

  return (
    <div className="history page">
      <NavBar
        pageName={LANG.RESULTS}
        left={<BackButton to="/results" text={LANG.BACK} />}
      />
      <div className="page-inner">
        {
          !result || Object.keys(results).length <= 0 ?
            renderNoData(isFetchingResults, LANG)
            :
            renderResult(results, match, book, LANG, lang)
        }
      </div>
    </div>
  );
}

Result.propTypes = propTypes;
Result.defaultProps = defaultProps;

export default Result;
