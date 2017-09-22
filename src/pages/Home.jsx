import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Popup } from '../components/Modal';
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

class Home extends Component {
  constructor() {
    super();
    this.state = {
      isShowEditPopUp: false,
    };
    this.showEditPopUp = this.showEditPopUp.bind(this);
    this.hideEditPopUp = this.hideEditPopUp.bind(this);
  }

  showEditPopUp() {
    this.setState({
      isShowEditPopUp: true,
    });
  }

  hideEditPopUp() {
    this.setState({
      isShowEditPopUp: false,
    });
  }

  render() {
    const { activeBook } = this.props;
    const { isShowEditPopUp } = this.state;
    return (
      <div className="home">
        <div className="home-inner">
          <div className="home-header">
            <div className="home-header-inner">
              <span>{activeBook.title}</span>
              <span className="subtext">Total lesson: 12</span>
            </div>
            <div
              className="link-right-top"
              onClick={this.showEditPopUp}
              role="presentation"
            >
              <i className="ion-ios-settings" />
            </div>
          </div>
          <div className="home-menu">
            <div className="card">
              <div className="card-content">
                <Link to="/books" className="link">
                  <i className="icon ion-ios-bookmarks-outline" />
                  <span>Books</span>
                </Link>
                <Link to="/lessons" className="link">
                  <i className="icon ion-ios-list-outline" />
                  <span>Lessons</span>
                </Link>
                <Link to="/history" className="link">
                  <i className="icon ion-ios-clock-outline" />
                  <span>History</span>
                </Link>
                <Link to="/dictation" className="link">
                  <i className="icon ion-ios-play-outline" />
                  <span>Start</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <Popup
          header="Edit book"
          visible={isShowEditPopUp}
          onLeftClick={this.hideEditPopUp}
          onRightClick={this.hideEditPopUp}
        >
          <div>Hello, World!</div>
        </Popup>
      </div>
    );
  }
}

Home.propTypes = propTypes;
Home.defaultProps = defaultProps;

export default Home;
