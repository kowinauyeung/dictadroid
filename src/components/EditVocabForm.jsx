import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import ListForm, { ListItem } from '../components/ListForm';
import { Popup } from '../components/Modal';

const propTypes = {
  LANG: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  targetVocab: PropTypes.shape({
    id: PropTypes.string,
    vocab: PropTypes.string,
    translation: PropTypes.string,
    pron: PropTypes.string,
    useSpeech: PropTypes.bool,
    outOfDict: PropTypes.bool,
    type: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
  }),
  hide: PropTypes.func.isRequired,
  editVocab: PropTypes.func.isRequired,
};

const defaultProps = {
  targetVocab: {
    id: null,
    vocab: '',
    translation: '',
    pron: '',
    useSpeech: false,
    formOutOfDict: false,
    type: '',
    tags: [],
  },
};

const vocabTypes = ['n', 'v', 'adj', 'adv', 'pn', 'other'];

class EditVocabForm extends Component {
  constructor({ targetVocab }) {
    super();
    this.state = {
      formVocab: targetVocab.vocab,
      formTranslation: targetVocab.translation,
      formPron: targetVocab.pron || '',
      formUseSpeech: targetVocab.useSpeech,
      formOutOfDict: targetVocab.formOutOfDict || false,
      formType: targetVocab.type,
      formTags: targetVocab.tags || [],
    };
    this.onClickSave = this.onClickSave.bind(this);
    this.hideEditPopUp = this.hideEditPopUp.bind(this);
    this.onTagsChange = this.onTagsChange.bind(this);
    this.onTagsInputKeyDown = this.onTagsInputKeyDown.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.targetVocab.id === null) return;
    const { targetVocab } = nextProps;
    this.setState({
      formVocab: targetVocab.vocab,
      formTranslation: targetVocab.translation,
      formPron: targetVocab.pron || '',
      formUseSpeech: targetVocab.useSpeech,
      formOutOfDict: targetVocab.outOfDict || false,
      formType: targetVocab.type,
      formTags: targetVocab.tags || [],
    });
  }

  onClickSave() {
    const { targetVocab } = this.props;
    const {
      formVocab,
      formTranslation,
      formPron,
      formUseSpeech,
      formOutOfDict,
      formType,
      formTags,
    } = this.state;
    const formValue = {
      vocab: formVocab,
      translation: formTranslation,
      pron: formPron,
      useSpeech: formUseSpeech,
      outOfDict: formOutOfDict,
      type: formType,
      tags: formTags,
    };
    this.props.editVocab(targetVocab, formValue);
    this.hideEditPopUp();
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
    this.props.hide();
  }

  render() {
    const {
      formVocab,
      formTranslation,
      formPron,
      formUseSpeech,
      formOutOfDict,
      formType,
      formTags,
    } = this.state;
    const { targetVocab, LANG } = this.props;
    return (
      <Popup
        header={LANG.EDIT_VOCAB}
        visible={targetVocab.id !== null}
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
                      {LANG.VOCAB_TYPE_SHORT_FORM[t]}
                    </div>
                  ))
                }
              </div>
            </ListItem>
            <ListItem label={LANG.VOCABULARY}>
              <input
                type="text"
                value={formVocab}
                onChange={(e) => { this.setState({ formVocab: e.target.value }); }}
              />
            </ListItem>
            <ListItem label={LANG.PRONUNCIATION}>
              <input
                type="text"
                placeholder={`(${LANG.OPTIONAL})`}
                value={formPron}
                onChange={(e) => { this.setState({ formPron: e.target.value }); }}
              />
            </ListItem>
            <ListItem
              label={LANG.USE_FOR_SPEECH}
              className={`hidden-field${formPron !== '' ? ' show' : ''}`}
            >
              <label className="label-switch" htmlFor={`form-use-speech-${targetVocab.id}`}>
                <input
                  type="checkbox"
                  id={`form-use-speech-${targetVocab.id}`}
                  checked={formUseSpeech}
                  onChange={(e) => { this.setState({ formUseSpeech: e.target.checked }); }}
                />
                <div className="checkbox" />
              </label>
            </ListItem>
            <ListItem label={LANG.TRANSLATION}>
              <input
                type="text"
                value={formTranslation}
                onChange={(e) => { this.setState({ formTranslation: e.target.value }); }}
              />
            </ListItem>
            <ListItem label={LANG.OUT_OF_DICT}>
              <label className="label-switch" htmlFor={`form-out-of-dict-${targetVocab.id}`}>
                <input
                  type="checkbox"
                  id={`form-out-of-dict-${targetVocab.id}`}
                  checked={formOutOfDict}
                  onChange={(e) => { this.setState({ formOutOfDict: e.target.checked }); }}
                />
                <div className="checkbox" />
              </label>
            </ListItem>
            <ListItem label={LANG.TAGS}>
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

EditVocabForm.propTypes = propTypes;
EditVocabForm.defaultProps = defaultProps;

export default EditVocabForm;
