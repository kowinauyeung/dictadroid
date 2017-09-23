import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ListFormm, { ListItem } from '../components/ListForm';
import { Popup } from '../components/Modal';

const propTypes = {
  activeBook: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    lang: PropTypes.string,
    transFrm: PropTypes.string,
  }).isRequired,
  isShowEditPopUp: PropTypes.bool.isRequired,
  hide: PropTypes.func.isRequired,
};

const defaultProps = {
  activeBook: {
    id: 'thisisanid',
    title: '大家的日本語初級I',
    lang: 'ja',
    transFrm: 'zh',
  },
};

class EditBookForm extends Component {
  constructor({ activeBook }) {
    super();
    this.state = {
      formTitle: activeBook.title,
      formLang: activeBook.lang,
      formTranslateFrom: activeBook.transFrm,
    };
    this.onClickSave = this.onClickSave.bind(this);
    this.hideEditPopUp = this.hideEditPopUp.bind(this);
  }

  onClickSave() {
    //TODO: save book
    console.log(this.state);
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
      >
        <div className="page-inner form-box">
          <ListFormm>
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
                <option value="ja">日本語</option>
                <option value="en">English</option>
                <option value="zh">中文</option>
              </select>
            </ListItem>
          </ListFormm>
        </div>
      </Popup>
    );
  }
}

EditBookForm.propTypes = propTypes;
EditBookForm.defaultProps = defaultProps;

export default EditBookForm;
