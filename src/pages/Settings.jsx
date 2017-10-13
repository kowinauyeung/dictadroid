import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImportBookForm from '../components/ImportBookForm';
import './Settings.css';

const propTypes = {
  user: PropTypes.shape({
    displayName: PropTypes.string,
    email: PropTypes.string,
    photoURL: PropTypes.string,
  }).isRequired,
  logoutOfFirebase: PropTypes.func.isRequired,
  addBook: PropTypes.func.isRequired,
  addLesson: PropTypes.func.isRequired,
  addVocab: PropTypes.func.isRequired,
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
    const { logoutOfFirebase, user, addBook, addLesson, addVocab } = this.props;
    const { bookToImport } = this.state;
    const { displayName, email, photoURL } = user;
    return (
      <div className="settings page without-header">
        <div className="page-inner">
          <div className="profile-block">
            {photoURL ? <img className="avatar" src={photoURL} alt={displayName} /> : ''}
            <h2 className="text-center">{displayName}</h2>
            <p className="text-center text-alpha">{email}</p>
          </div>
          <div className="content-block-title">Free Book from server</div>
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
                      <div className="item-title">Version</div>
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
                  Log out
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
        />

      </div>
    );
  }
}

Settings.propTypes = propTypes;

export default Settings;
