import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NavBar from '../components/NavBar';
import BackButton from '../components/BackButton';
import EditableItem from '../components/EditableItem';
import AddBookForm from '../components/AddBookForm';
import EditBookForm from '../components/EditBookForm';
import { Lang } from '../utils/Dictionary';

const propTypes = {
  activeBookId: PropTypes.string.isRequired,
  books: PropTypes.objectOf(
    PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
      lang: PropTypes.string,
      transFrm: PropTypes.string,
      lessons: PropTypes.object,
    }),
  ).isRequired,
  addBook: PropTypes.func.isRequired,
  removeBook: PropTypes.func.isRequired,
  editBook: PropTypes.func.isRequired,
  setActiveBook: PropTypes.func.isRequired,
};

const defaultProps = {
  activeBookId: null,
  books: {},
};

class Books extends Component {
  constructor() {
    super();
    this.state = {
      editMode: false,
      isShowAddBookPopUp: false,
      editingBook: undefined,
    };
    this.noDataMsg = 'You do not have any book yet.';
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
          Object.keys(books).length > 0 ?
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

  renderBookList() {
    const { editMode } = this.state;
    const { books, activeBookId } = this.props;
    return (
      <div className="list-block media-list">
        <ul>
          {
            Object.keys(books).map((key) => {
              const book = books[key];
              return (
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
                      checked={(activeBookId === book.id)}
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
                      {Lang[book.lang]}, {Object.keys(book.lessons).length} lessons
                    </div>
                  </label>
                </EditableItem>
              );
            })
          }
        </ul>
      </div>
    );
  }

  renderNoData() {
    return (
      <div className="content-block">
        <p className="text-center">{this.noDataMsg}</p>
      </div>
    );
  }

  render() {
    const { isShowAddBookPopUp, editingBook } = this.state;
    const { books, editBook, addBook } = this.props;
    return (
      <div className="books page">
        <NavBar
          pageName="Books"
          left={<BackButton to="/" />}
          right={this.renderRightControl()}
        />
        <div className="page-inner">
          {books.length <= 0 ? (this.renderNoData()) : (this.renderBookList())}
        </div>
        <AddBookForm
          isPopUp={isShowAddBookPopUp}
          hide={this.hideAddBookPopUp}
          addBook={addBook}
        />
        <EditBookForm
          targetBook={editingBook}
          hide={this.endEditBook}
          editBook={editBook}
        />
      </div>
    );
  }
}

Books.propTypes = propTypes;
Books.defaultProps = defaultProps;

export default Books;
