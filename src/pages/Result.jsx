import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import classNames from 'classnames';
import { Link, Redirect } from 'react-router-dom';
import NavBar from '../components/NavBar';
import BackButton from '../components/BackButton';
import { Lang } from '../utils/Dictionary';

const propTypes = {
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

const trainTypeMap = {
  dictation: 'Dictation',
  translation: 'Translation',
};

function renderNoData(isFetchingResults) {
  return (
    <div className="real-center">
      <p className="text-center grey">
        {isFetchingResults ? 'Loading...' : 'Start training to get results.'}
      </p>
    </div>
  );
}

function renderResult(props) {
  const { results, match, book } = props;
  const resultId = match.params.resultId;
  const result = results[resultId];

  return (
    <div className="ks-card-header-pic">
      <div className="card-content">
        <div className="card-content-inner">
          <h2>{book.title}</h2>
          <p className="grey">Language: {Lang[book.lang]}</p>
          <p className="grey">Lessons: {result.subject}</p>
          <p className="grey">
            {moment(result.createDt).calendar()},&nbsp;
            Score: {result.correctAnswer} / {result.vocabs.length}
          </p>
        </div>
        <div className="list-block">
          <ul>
            <li>
              <div className="item-content">
                <div className="item-inner bold">
                  <div className="item-title">Question</div>
                  <div className="item-after">Your answer</div>
                </div>
              </div>
            </li>
            {
              result.vocabs.map(vocab => (
                <li key={vocab.id}>
                  <div className="item-content">
                    <div className="item-inner">
                      <div className="item-title">
                        {result.trainType === 'dictation' ? vocab.vocab : vocab.translation}
                      </div>
                      <div className={`item-after${vocab.vocab === vocab.answer ? '' : ' fail'}`}>
                        {vocab.answer}
                      </div>
                    </div>
                  </div>
                </li>
              ))
            }
          </ul>
        </div>
      </div>
    </div>
  );
}

function Results(props) {
  const { isAppReady, isFetchingResults, results, match } = props;
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
        pageName="Results"
        left={<BackButton to="/results" />}
      />
      <div className="page-inner">
        {Object.keys(results).length <= 0 ? renderNoData(isFetchingResults) : renderResult(props)}
      </div>
    </div>
  );
}

Results.propTypes = propTypes;

export default Results;
