import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import moment from 'moment';
import 'moment/locale/zh-hk';
import 'moment/locale/ja';
import classNames from 'classnames';
import { Link, Redirect } from 'react-router-dom';
import NavBar from '../components/NavBar';
import BackButton from '../components/BackButton';

const propTypes = {
  LANG: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
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

let scrollTop = 0;

class Results extends Component {
  constructor() {
    super();
    this.scrollContainer = null;
  }

  componentDidMount() {
    this.scrollContainer.scrollTop = scrollTop;
  }

  componentWillUnmount() {
    scrollTop = this.scrollContainer.scrollTop;
  }

  orderResults() {
    const { results } = this.props;
    const res = [];
    Object.keys(results).forEach((key) => {
      res.push(results[key]);
    });
    return _.orderBy(res, ['createDt'], ['desc']);
  }

  renderNoData() {
    const { isFetchingResults, LANG } = this.props;
    return (
      <div className="real-center">
        <p className="text-center grey">
          {isFetchingResults ? LANG.LOADING : LANG.NO_RESULTS_MSG}
        </p>
      </div>
    );
  }

  renderList() {
    const { results, LANG } = this.props;
    return (
      <div className="list-block">
        <ul>
          {
            this.orderResults(results).map((result) => {
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
                          {LANG[result.trainType.toUpperCase()]},&nbsp;
                          {moment(result.createDt).calendar()}
                        </div>
                      </Link>
                      <div className={resultClass}>
                        <span>{LANG.SCORE}: {result.correctAnswer}/{result.vocabs.length}</span>
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

  render() {
    const { isAppReady, results, LANG } = this.props;

    if (!isAppReady) {
      return <Redirect to="/redirect?url=/results" />;
    }

    return (
      <div className="history page">
        <NavBar
          pageName={LANG.RESULTS}
          left={<BackButton to="/" text={LANG.BACK} />}
        />
        <div className="page-inner" ref={(ref) => { this.scrollContainer = ref; }}>
          {
            Object.keys(results).length <= 0 ?
              this.renderNoData()
              :
              this.renderList()
          }
        </div>
      </div>
    );
  }
}

Results.propTypes = propTypes;

export default Results;
