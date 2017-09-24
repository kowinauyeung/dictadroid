import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ListForm, { ListItem } from '../components/ListForm';
import { Popup } from '../components/Modal';

const propTypes = {
  isShowEditPopUp: PropTypes.bool.isRequired,
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
    this.onClickSave = this.onClickSave.bind(this);
    this.hideEditPopUp = this.hideEditPopUp.bind(this);
  }

  resetForm() {
    this.setState({
      formTitle: '',
      formLang: '',
      formTranslateFrom: '',
    });
  }

  onClickSave() {
    const { formTitle, formLang, formTranslateFrom } = this.state;
    this.props.addBook(formTitle, formLang, formTranslateFrom);
    this.resetForm();
    this.hideEditPopUp();
  }

  hideEditPopUp() {
    this.props.hide();
  }

  render() {
    const { formTitle, formLang, formTranslateFrom } = this.state;
    const { isShowEditPopUp } = this.props;
    return (
      <Popup
        header="Edit book"
        visible={isShowEditPopUp}
        onLeftClick={this.hideEditPopUp}
        onRightClick={this.onClickSave}
        rightText="Add"
      >
        <div className="page-inner form-box">
          <ListForm>
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
