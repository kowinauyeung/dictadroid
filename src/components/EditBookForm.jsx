import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ListForm, { ListItem } from '../components/ListForm';
import { Popup } from '../components/Modal';

const propTypes = {
  LANG: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  targetBook: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    lang: PropTypes.string,
    transFrm: PropTypes.string,
  }),
  hide: PropTypes.func.isRequired,
  editBook: PropTypes.func.isRequired,
};

const defaultProps = {
  targetBook: {
    id: null,
    title: '',
    lang: '',
    transFrm: '',
  },
};

class EditBookForm extends Component {
  constructor({ targetBook }) {
    super();
    this.state = {
      formTitle: targetBook.title,
      formLang: targetBook.lang,
      formTranslateFrom: targetBook.transFrm,
    };
    this.onClickSave = this.onClickSave.bind(this);
    this.hideEditPopUp = this.hideEditPopUp.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.targetBook.id === null) return;
    const { targetBook } = nextProps;
    this.setState({
      formTitle: targetBook.title,
      formLang: targetBook.lang,
      formTranslateFrom: targetBook.transFrm,
    });
  }

  onClickSave() {
    const { targetBook } = this.props;
    const { formTitle, formLang, formTranslateFrom } = this.state;
    this.props.editBook(targetBook, formTitle, formLang, formTranslateFrom);
    this.hideEditPopUp();
  }

  hideEditPopUp() {
    this.props.hide();
  }

  render() {
    const { formTitle, formLang, formTranslateFrom } = this.state;
    const { targetBook, LANG } = this.props;
    return (
      <Popup
        header={LANG.EDIT_BOOK}
        visible={targetBook.id !== null}
        onLeftClick={this.hideEditPopUp}
        onRightClick={this.onClickSave}
        rightText={LANG.SAVE}
        leftText={LANG.CANCEL}
      >
        <div className="page-inner form-box">
          <ListForm
            onSubmit={(e) => {
              e.preventDefault();
              this.onClickSave();
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

EditBookForm.propTypes = propTypes;
EditBookForm.defaultProps = defaultProps;

export default EditBookForm;
