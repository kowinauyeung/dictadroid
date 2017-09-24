import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NavBar from '../components/NavBar';
import BackButton from '../components/BackButton';
import EditableItem from '../components/EditableItem';
import AddBookForm from '../components/AddBookForm';
import EditBookForm from '../components/EditBookForm';

const propTypes = {
  books: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
      lang: PropTypes.string,
      transFrm: PropTypes.string,
    }),
  ).isRequired,
  removeBook: PropTypes.func.isRequired,
};

const defaultProps = {
  books: [
    {
      id: 'thisisanid01',
      title: '大家的日本語初級I',
      lang: 'ja',
      transFrm: 'zh',
    },
    {
      id: 'thisisanid02',
      title: '大家的日本語初級II',
      lang: 'ja',
      transFrm: 'zh',
    },
    {
      id: 'thisisanid03',
      title: '大家的日本語進階I',
      lang: 'ja',
      transFrm: 'zh',
    },
    {
      id: 'thisisanid04',
      title: '大家的日本語進階II',
      lang: 'ja',
      transFrm: 'zh',
    },
  ],
  removeBook: book => { console.log(book); },
};

class Books extends Component {
  constructor() {
    super();
    this.state = {
      editMode: false,
      isShowAddBookPopUp: false,
      editingBook: undefined,
    };
    this.switchOnEditMode = this.switchOnEditMode.bind(this);
    this.switchOffEditMode = this.switchOffEditMode.bind(this);
    this.showAddBookPopUp = this.showAddBookPopUp.bind(this);
    this.hideAddBookPopUp = this.hideAddBookPopUp.bind(this);
    this.endEditBook = this.endEditBook.bind(this);
    this.removeBook = this.removeBook.bind(this);
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
        <div
          onClick={this.switchOnEditMode}
          role="presentation"
          className="link icon-only"
        >
          <i className="icon ion-ios-compose-outline" />
        </div>
      </div>
    );
  }

  render() {
    const { editMode, isShowAddBookPopUp, editingBook } = this.state;
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
                <p className="text-center">Please click the '+' button for adding book.</p>
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
                        <div className="item-title-row">
                          <div className="item-title">{book.title}</div>
                        </div>
                        <div className="item-subtitle grey">{book.lang}, 共13課</div>
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
