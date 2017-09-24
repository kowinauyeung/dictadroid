import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ListForm, { ListItem } from '../components/ListForm';
import { Popup } from '../components/Modal';

const propTypes = {
  isPopUp: PropTypes.bool.isRequired,
  hide: PropTypes.func.isRequired,
  addBook: PropTypes.func.isRequired,
};

const defaultProps = {
  addBook: (a, b, c) => { console.log(a, b, c); },
};

class AddBookForm extends Component {
  constructor() {
    super();
    this.state = {
      formTitle: '',
      formLang: '',
      formTranslateFrom: '',
    };
    this.onClickAdd = this.onClickAdd.bind(this);
    this.hideEditPopUp = this.hideEditPopUp.bind(this);
  }

  onClickAdd() {
    const { formTitle, formLang, formTranslateFrom } = this.state;
    this.props.addBook(formTitle, formLang, formTranslateFrom);
    this.resetForm();
    this.hideEditPopUp();
  }

  resetForm() {
    this.setState({
      formTitle: '',
      formLang: '',
      formTranslateFrom: '',
    });
  }

  hideEditPopUp() {
    this.props.hide();
  }

  render() {
    const { formTitle, formLang, formTranslateFrom } = this.state;
    const { isPopUp } = this.props;
    return (
      <Popup
        header="Add book"
        visible={isPopUp}
        onLeftClick={this.hideEditPopUp}
        onRightClick={this.onClickAdd}
        rightText="Add"
      >
        <div className="page-inner form-box">
          <ListForm
            onSubmit={(e) => {
              e.preventDefault();
              this.onClickAdd();
              return false;
            }}
          >
            <ListItem label="Title">
              <input
                type="text"
                placeholder="e.g. 大家的日本語初級I"
                value={formTitle}
                onChange={(e) => {
                  this.setState({ formTitle: e.target.value });
                }}
              />
            </ListItem>
            <ListItem label="Language">
              <select
                value={formLang}
                onChange={(e) => {
                  this.setState({ formLang: e.target.value });
                }}
              >
                <option value="">- Please select -</option>
                <option value="ja">日本語</option>
                <option value="en">English</option>
                <option value="zh">中文</option>
              </select>
            </ListItem>
            <ListItem label="Translate from">
              <select
                value={formTranslateFrom}
                onChange={(e) => {
                  this.setState({ formTranslateFrom: e.target.value });
                }}
              >
                <option value="">- Please select -</option>
                <option value="ja">日本語</option>
                <option value="en">English</option>
                <option value="zh">中文</option>
              </select>
            </ListItem>
          </ListForm>
        </div>
      </Popup>
    );
  }
}

AddBookForm.propTypes = propTypes;
AddBookForm.defaultProps = defaultProps;

export default AddBookForm;
