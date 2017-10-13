import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import ImportBookForm from '../components/ImportBookForm';
import './Settings.css';

const propTypes = {
  LANG: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  user: PropTypes.shape({
    displayName: PropTypes.string,
    email: PropTypes.string,
    photoURL: PropTypes.string,
  }).isRequired,
  logoutOfFirebase: PropTypes.func.isRequired,
  addBook: PropTypes.func.isRequired,
  addLesson: PropTypes.func.isRequired,
  addVocab: PropTypes.func.isRequired,
  setUserLang: PropTypes.func.isRequired,
  isAppReady: PropTypes.bool.isRequired,
};

const books = [
  {
    id: 'm1',
    title: '大家的日本語初級I',
  },
  {
    id: 'm2',
    title: '大家的日本語初級II',
  },
  {
    id: 'm3',
    title: '大家的日本語進階I',
  },
  {
    id: 'm4',
    title: '大家的日本語進階II',
  },
];

class Settings extends Component {
  constructor() {
    super();
    this.state = {
      bookToImport: '',
    };
    this.onBookAdded = this.onBookAdded.bind(this);
  }

  onBookAdded() {
    this.setState({ bookToImport: '' });
  }

  setBookToImport(filename) {
    this.setState({ bookToImport: filename });
  }

  importBook(filename) {
    this.setBookToImport(filename);
  }

  render() {
    const {
      logoutOfFirebase,
      user,
      addBook,
      addLesson,
      addVocab,
      setUserLang,
      isAppReady,
      LANG,
    } = this.props;
    const { bookToImport } = this.state;
    const { displayName, email, photoURL, lang } = user;

    if (!isAppReady) {
      return <Redirect to="/redirect?url=/settings" />;
    }

    return (
      <div className="settings page without-header">
        <div className="page-inner">
          <div className="profile-block">
            {photoURL ? <img className="avatar" src={photoURL} alt={displayName} /> : ''}
            <h2 className="text-center">{displayName}</h2>
            <p className="text-center text-alpha">{email}</p>
          </div>
          <div className="list-block">
            <ul>
              <li>
                <div className="item-content">
                  <div className="item-inner">
                    <div className="item-title label">{LANG.LANGUAGE}</div>
                    <div className="item-input">
                      <select
                        value={lang}
                        onChange={(e) => {
                          setUserLang(e.target.value);
                        }}
                      >
                        <option value="en">English</option>
                        <option value="zh">中文</option>
                      </select>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div className="content-block-title">{LANG.FREE_BOOKS_MSG}</div>
          <div className="list-block">
            <ul>
              {
                books.map(book => (
                  <li
                    role="presentation"
                    key={book.id}
                    onClick={() => {
                      this.importBook(book.id);
                    }}
                  >
                    <div className="btn-free-book">
                      <div className="item-content">
                        <div className="item-inner">
                          <div className="item-title">{book.title}</div>
                          <div className="item-after">
                            <i className="icon ion-ios-cloud-download-outline" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))
              }
            </ul>
          </div>
          <div className="list-block">
            <ul>
              <li>
                <div className="btn-free-book">
                  <div className="item-content">
                    <div className="item-inner">
                      <div className="item-title">{LANG.VERSION}</div>
                      <div className="item-after">{process.env.REACT_APP_VERSION}</div>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div className="list-block inset">
            <ul>
              <li>
                <a
                  className="list-button item-link color-red"
                  role="presentation"
                  onClick={() => { logoutOfFirebase(); }}
                >
                  {LANG.LOG_OUT}
                </a>
              </li>
            </ul>
          </div>
        </div>
        <ImportBookForm
          filename={bookToImport}
          endAdd={this.onBookAdded}
          addBook={addBook}
          addLesson={addLesson}
          addVocab={addVocab}
          LANG={LANG}
        />

      </div>
    );
  }
}

Settings.propTypes = propTypes;

export default Settings;
