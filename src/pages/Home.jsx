import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './Home.css';

const propTypes = {
  activeBook: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
  }).isRequired,
};

const defaultProps = {
  activeBook: {
    id: 'thisisanid',
    title: '大家的日本語初級I',
  },
};

function Home(props) {
  const { activeBook } = props;
  return (
    <div className="home">
      <div className="home-inner">
        <div className="home-header">
          <div className="home-header-inner">
            {activeBook.title}<br />
            <span className="subtext">Total lesson: 12</span>
          </div>
        </div>
        <div className="home-menu">
          <div className="card">
            <div className="card-content">
              <Link to="/" className="link">
                <i className="icon ion-ios-settings" />
                <span>Edit</span>
              </Link>
              <Link to={`/lessions/${activeBook.id}`} className="link">
                <i className="icon ion-ios-list-outline" />
                <span>Lessons</span>
              </Link>
              <Link to="/dictation" className="link">
                <i className="icon ion-ios-play-outline" />
                <span>Start Learning</span>
              </Link>
              <Link to="/" className="link">
                <i className="icon ion-ios-trash-outline" />
                <span>Remove</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Home.propTypes = propTypes;
Home.defaultProps = defaultProps;

export default Home;
