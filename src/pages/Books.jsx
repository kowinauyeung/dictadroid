import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NavBar from '../components/NavBar';
import BackButton from '../components/BackButton';
import EditableItem from '../components/EditableItem';
import AddBookForm from '../components/AddBookForm';
import EditBookForm from '../components/EditBookForm';
import { Lang } from '../utils/Dictionary';

const propTypes = {
  books: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
      lang: PropTypes.string,
      transFrm: PropTypes.string,
      lessons: PropTypes.array,
    }),
  ).isRequired,
  removeBook: PropTypes.func.isRequired,
  activeBook: PropTypes.string.isRequired,
  setActiveBook: PropTypes.func.isRequired,
};

const defaultProps = {
  books: [
    {
      id: 'thisisanid01',
      title: '大家的日本語初級I',
      lang: 'ja',
      transFrm: 'zh',
      lessons: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
    },
    {
      id: 'thisisanid02',
      title: '大家的日本語初級II',
      lang: 'ja',
      transFrm: 'zh',
      lessons: [1, 2, 3, 4, 5],
    },
    {
      id: 'thisisanid03',
      title: '大家的日本語進階I',
      lang: 'ja',
      transFrm: 'zh',
      lessons: [1, 2, 3, 4, 5, 14, 15, 16],
    },
    {
      id: 'thisisanid04',
      title: '大家的日本語進階II',
      lang: 'ja',
      transFrm: 'zh',
      lessons: [1, 2, 3, 4, 5, 6, 6, 6, 6, 6, 6],
    },
    {
      id: 'thisisanid05',
      title: '大家的日本語初級I',
      lang: 'ja',
      transFrm: 'zh',
      lessons: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
    },
    {
      id: 'thisisanid06',
      title: '大家的日本語初級II',
      lang: 'ja',
      transFrm: 'zh',
      lessons: [1, 2, 3, 4, 5],
    },
    {
      id: 'thisisanid07',
      title: '大家的日本語進階I',
      lang: 'ja',
      transFrm: 'zh',
      lessons: [1, 2, 3, 4, 5, 14, 15, 16],
    },
    {
      id: 'thisisanid08',
      title: '大家的日本語進階II',
      lang: 'ja',
      transFrm: 'zh',
      lessons: [1, 2, 3, 4, 5, 6, 6, 6, 6, 6, 6],
    },
  ],
  removeBook: (book) => { console.log(book); },
  activeBook: 'thisisanid03',
  setActiveBook: (bookId) => { console.log(bookId); },
};

class Books extends Component {
  constructor({ activeBook }) {
    super();
    this.state = {
      editMode: false,
      isShowAddBookPopUp: false,
      editingBook: undefined,
      selectedBook: activeBook,
    };
    this.switchOnEditMode = this.switchOnEditMode.bind(this);
    this.switchOffEditMode = this.switchOffEditMode.bind(this);
    this.showAddBookPopUp = this.showAddBookPopUp.bind(this);
    this.hideAddBookPopUp = this.hideAddBookPopUp.bind(this);
    this.endEditBook = this.endEditBook.bind(this);
    this.removeBook = this.removeBook.bind(this);
  }

  setSelectedBook(id) {
    if (this.state.editMode) return;
    this.props.setActiveBook(id);
    this.setState({ selectedBook: id });
  }

  editBook(targetBook) {
    this.setState({ editingBook: targetBook });
  }

  endEditBook() {
    this.setState({ editingBook: undefined });
  }

  removeBook(targetBook) {
    const firm = window.confirm(`Remove the book "${targetBook.title}"?`);
    if (firm) this.props.removeBook(targetBook);
  }

  showAddBookPopUp() {
    this.setState({ isShowAddBookPopUp: true });
  }

  hideAddBookPopUp() {
    this.setState({ isShowAddBookPopUp: false });
  }

  switchOnEditMode() {
    this.setState({ editMode: true });
  }

  switchOffEditMode() {
    this.setState({ editMode: false });
  }

  renderRightControl() {
    const { editMode } = this.state;
    const { books } = this.props;

    if (editMode) {
      return (
        <div onClick={this.switchOffEditMode} role="presentation">Done</div>
      );
    }

    return (
      <div className="control-group">
        <div
          onClick={this.showAddBookPopUp}
          role="presentation"
          className="link icon-only"
        >
          <i className="icon ion-ios-plus-empty" />
        </div>
        {
          books.length > 0 ?
            (
              <div
                onClick={this.switchOnEditMode}
                role="presentation"
                className="link icon-only"
              >
                <i className="icon ion-ios-compose-outline" />
              </div>
            )
            :
            ''
        }
      </div>
    );
  }

  render() {
    const { editMode, isShowAddBookPopUp, editingBook, selectedBook } = this.state;
    const { books } = this.props;
    return (
      <div className="books page">
        <NavBar
          pageName="Books"
          left={<BackButton to="/" />}
          right={this.renderRightControl()}
        />
        <div className="page-inner">
          {
            books.length <= 0 ?
              (
                <div className="content-block">
                  <p className="text-center">You do not have any book yet.</p>
                </div>
              )
              :
              (
                <div className="list-block media-list">
                  <ul>
                    {
                      books.map(book => (
                        <EditableItem
                          key={book.id}
                          showButtons={editMode}
                          onRemoveClick={() => {
                            this.removeBook(book);
                          }}
                          onEditClick={() => {
                            this.editBook(book);
                          }}
                        >
                          <label className="label-radio" htmlFor={`book-item-${book.id}`}>
                            <input
                              id={`book-item-${book.id}`}
                              type="radio"
                              name="activeBook"
                              value={book.id}
                              checked={(selectedBook === book.id)}
                              onChange={(e) => {
                                this.setSelectedBook(e.target.value);
                              }}
                            />
                            {
                              !editMode ?
                                (
                                  <div className="check-box">
                                    <i className="icon ion-ios-checkmark-empty" />
                                  </div>
                                )
                                :
                                ''
                            }
                            <div className="item-title-row">
                              <div className="item-title">{book.title}</div>
                            </div>
                            <div className="item-subtitle grey">
                              {Lang[book.lang]}, {book.lessons.length} lessons
                            </div>
                          </label>
                        </EditableItem>
                      ))
                    }
                  </ul>
                </div>
              )
          }
        </div>
        <AddBookForm
          isShowEditPopUp={isShowAddBookPopUp}
          hide={this.hideAddBookPopUp}
        />
        <EditBookForm
          targetBook={editingBook}
          hide={this.endEditBook}
        />
      </div>
    );
  }
}

Books.propTypes = propTypes;
Books.defaultProps = defaultProps;

export default Books;
