import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import moment from 'moment';
import classNames from 'classnames';
import { Link, Redirect } from 'react-router-dom';
import NavBar from '../components/NavBar';
import BackButton from '../components/BackButton';

const propTypes = {
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

function orderResults(results) {
  const res = [];
  Object.keys(results).forEach((key) => {
    res.push(results[key]);
  });
  return _.orderBy(res, ['createDt'], ['desc']);
}

function renderList(results) {
  return (
    <div className="list-block">
      <ul>
        {
          orderResults(results).map((result) => {
            const score = (result.correctAnswer / result.vocabs.length);
            const isPass = (score >= 0.5);
            const resultClass = classNames('item-title-after', {
              fail: !isPass,
              fullmarks: score >= 1,
            });
            return (
              <li key={result.id}>
                <div className="item-content">
                  <div className="item-inner">
                    <Link to={`/results/${result.id}`}>
                      <div className="item-title-row">
                        <div className="item-title">
                          {_.truncate(result.subject, { length: 16, separator: '' })}
                        </div>
                      </div>
                      <div className="item-subtitle grey">
                        {trainTypeMap[result.trainType]}, {moment(result.createDt).calendar()}
                      </div>
                    </Link>
                    <div className={resultClass}>
                      <span>Results: {result.correctAnswer}/{result.vocabs.length}</span>
                    </div>
                  </div>
                </div>
              </li>
            );
          })
        }
      </ul>
    </div>
  );
}

function Results(props) {
  const { isAppReady, isFetchingResults, results } = props;

  if (!isAppReady) {
    return <Redirect to="/redirect?url=/results" />;
  }

  return (
    <div className="history page">
      <NavBar
        pageName="Results"
        left={<BackButton to="/" />}
      />
      <div className="page-inner">
        {Object.keys(results).length <= 0 ? renderNoData(isFetchingResults) : renderList(results)}
      </div>
    </div>
  );
}

Results.propTypes = propTypes;

export default Results;
