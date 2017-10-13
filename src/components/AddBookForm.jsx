import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ListForm, { ListItem } from '../components/ListForm';
import { Popup } from '../components/Modal';

const propTypes = {
  LANG: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  isPopUp: PropTypes.bool.isRequired,
  hide: PropTypes.func.isRequired,
  addBook: PropTypes.func.isRequired,
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
    this.props.addBook({
      title: formTitle,
      lang: formLang,
      transFrm: formTranslateFrom,
      lessons: {},
    });
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
    const { isPopUp, LANG } = this.props;
    return (
      <Popup
        header={LANG.ADD_BOOK}
        visible={isPopUp}
        onLeftClick={this.hideEditPopUp}
        onRightClick={this.onClickAdd}
        rightText={LANG.ADD}
        leftText={LANG.CANCEL}
      >
        <div className="page-inner form-box">
          <ListForm
            onSubmit={(e) => {
              e.preventDefault();
              this.onClickAdd();
              return false;
            }}
          >
            <ListItem label={LANG.BOOK_TITLE}>
              <input
                type="text"
                placeholder={LANG.BOOK_TITLE_PLACE_HOLDER}
                value={formTitle}
                onChange={(e) => {
                  this.setState({ formTitle: e.target.value });
                }}
              />
            </ListItem>
            <ListItem label={LANG.LANGUAGE}>
              <select
                value={formLang}
                onChange={(e) => {
                  this.setState({ formLang: e.target.value });
                }}
              >
                <option value="">- {LANG.PLEASE_SELECT} -</option>
                <option value="ja">日本語</option>
                <option value="en">English</option>
                <option value="zh">中文</option>
              </select>
            </ListItem>
            <ListItem label={LANG.TRANSLATE_FROM}>
              <select
                value={formTranslateFrom}
                onChange={(e) => {
                  this.setState({ formTranslateFrom: e.target.value });
                }}
              >
                <option value="">- {LANG.PLEASE_SELECT} -</option>
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

export default AddBookForm;
