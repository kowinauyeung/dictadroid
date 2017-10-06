import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import EditBookForm from '../components/EditBookForm';
import './Home.css';

const propTypes = {
  activeBookId: PropTypes.string,
  books: PropTypes.objectOf(
    PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
      lang: PropTypes.string,
      transFrm: PropTypes.string,
    }),
  ).isRequired,
  editBook: PropTypes.func.isRequired,
};

const defaultProps = {
  activeBookId: null,
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
    this.setState({ isShowEditPopUp: true });
  }

  hideEditPopUp() {
    this.setState({ isShowEditPopUp: false });
  }

  render() {
    const { activeBookId, books, editBook } = this.props;
    const { isShowEditPopUp } = this.state;
    const activeBook = books[activeBookId] || null;

    if (!activeBook) {
      return <Redirect to="/books" />;
    }

    return (
      <div className="home">
        <div className="home-inner">
          <div className="home-header">
            <div className="home-header-inner">
              <span>{activeBook.title}</span>
              <span className="subtext">
                Total lesson: {activeBook.lessons ? Object.keys(activeBook.lessons).length : '0'}
              </span>
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
        <EditBookForm
          targetBook={isShowEditPopUp ? activeBook : undefined}
          hide={this.hideEditPopUp}
          editBook={editBook}
        />
      </div>
    );
  }
}

Home.propTypes = propTypes;
Home.defaultProps = defaultProps;

export default Home;
