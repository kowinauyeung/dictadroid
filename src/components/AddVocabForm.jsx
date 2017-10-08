import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import ListForm, { ListItem } from '../components/ListForm';
import { Popup } from '../components/Modal';

const propTypes = {
  isPopUp: PropTypes.bool.isRequired,
  hide: PropTypes.func.isRequired,
  addVocab: PropTypes.func.isRequired,
  lessonId: PropTypes.string.isRequired,
  bookId: PropTypes.string.isRequired,
};

const vocabTypes = ['n', 'v', 'adj', 'adv', 'pn', 'other'];

class AddVocabForm extends Component {
  constructor() {
    super();
    this.defaulatState = {
      formVocab: '',
      formTranslation: '',
      formPron: '',
      formUseSpeech: false,
      formType: '',
      formTags: [],
    };
    this.state = { ...this.defaulatState };
    this.onClickAdd = this.onClickAdd.bind(this);
    this.hideEditPopUp = this.hideEditPopUp.bind(this);
    this.onTagsChange = this.onTagsChange.bind(this);
    this.onTagsInputKeyDown = this.onTagsInputKeyDown.bind(this);
  }

  onClickAdd() {
    const {
      formVocab,
      formTranslation,
      formPron,
      formUseSpeech,
      formType,
      formTags,
    } = this.state;
    const { bookId, lessonId } = this.props;

    this.props.addVocab({
      bookId,
      lessonId,
      vocab: formVocab,
      translation: formTranslation,
      pron: formPron,
      useSpeech: formUseSpeech,
      type: formType,
      tags: formTags,
    });

    this.resetForm();
    this.hideEditPopUp();
    return false;
  }

  onTagsChange(e) {
    const pattern = /^\s*[a-zA-Z\d\u4e00-\u9fa5]+\s+$/;
    let val = e.target.value;
    val = _.trimStart(val);
    if (!pattern.test(val)) return;
    this.addChip(val);
    e.target.value = '';
  }

  onTagsInputKeyDown(e) {
    if (e.keyCode === 13 && e.target.value !== '') {
      const pattern = /^\s*[a-zA-Z\d\u4e00-\u9fa5]+$/;
      const val = e.target.value;
      if (!pattern.test(val)) return;
      this.addChip(val);
      e.target.value = '';
    } else if (e.keyCode === 8 && e.target.value === '') {
      this.setState({
        formTags: _.dropRight(this.state.formTags),
      });
    }
  }

  resetForm() {
    this.setState({ ...this.defaulatState });
  }

  removeChip(chip) {
    this.setState({
      formTags: this.state.formTags.filter(val => val !== chip),
    });
  }

  addChip(chip) {
    if (_.indexOf(this.state.formTags, chip.trim()) > -1) return;

    this.setState({
      formTags: [...this.state.formTags, chip.trim()],
    });
  }

  hideEditPopUp() {
    this.resetForm();
    this.props.hide();
  }

  render() {
    const {
      formVocab,
      formTranslation,
      formPron,
      formUseSpeech,
      formType,
      formTags,
    } = this.state;
    const { isPopUp } = this.props;
    return (
      <Popup
        header="Add Vocabulary"
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
            <ListItem>
              <div className="buttons-row">
                {
                  vocabTypes.map(t => (
                    <div
                      key={`type-${t}`}
                      role="presentation"
                      className={`button${formType === t ? ' active' : ''}`}
                      onClick={() => {
                        this.setState({
                          formType: t,
                        });
                      }}
                    >
                      {t}
                    </div>
                  ))
                }
              </div>
            </ListItem>
            <ListItem label="Vocabulary">
              <input
                type="text"
                value={formVocab}
                onChange={(e) => { this.setState({ formVocab: e.target.value }); }}
              />
            </ListItem>
            <ListItem label="Pronunciation">
              <input
                type="text"
                placeholder="(optional)"
                value={formPron}
                onChange={(e) => { this.setState({ formPron: e.target.value }); }}
              />
            </ListItem>
            <ListItem
              label="Use for speech"
              className={`hidden-field${formPron !== '' ? ' show' : ''}`}
            >
              <label className="label-switch" htmlFor="form-use-speech">
                <input
                  type="checkbox"
                  id="form-use-speech"
                  checked={formUseSpeech}
                  onChange={(e) => { this.setState({ formUseSpeech: e.target.checked }); }}
                />
                <div className="checkbox" />
              </label>
            </ListItem>
            <ListItem label="Translation">
              <input
                type="text"
                value={formTranslation}
                onChange={(e) => { this.setState({ formTranslation: e.target.value }); }}
              />
            </ListItem>
            <ListItem label="Tags">
              <div className="content-block-inner">
                <div className="chips">
                  {
                    formTags.map(tag => (
                      <div
                        key={`tag-${tag}`}
                        className="chip"
                      >
                        <div className="chip-label">{tag}</div>
                        <div
                          className="chip-delete icon ion-ios-close"
                          onClick={() => { this.removeChip(tag); }}
                          role="presentation"
                        />
                      </div>
                    ))
                  }
                  <input
                    type="text"
                    maxLength="20"
                    onChange={this.onTagsChange}
                    onKeyDown={this.onTagsInputKeyDown}
                  />
                </div>
              </div>
            </ListItem>
          </ListForm>
        </div>
      </Popup>
    );
  }
}

AddVocabForm.propTypes = propTypes;

export default AddVocabForm;
