import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ListForm, { ListItem } from '../components/ListForm';
import { Popup } from '../components/Modal';

const propTypes = {
  LANG: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  isPopUp: PropTypes.bool.isRequired,
  hide: PropTypes.func.isRequired,
  addLesson: PropTypes.func.isRequired,
  bookId: PropTypes.string.isRequired,
};

class AddLessonForm extends Component {
  constructor() {
    super();
    this.state = {
      formTitle: '',
    };
    this.onClickAdd = this.onClickAdd.bind(this);
    this.hideEditPopUp = this.hideEditPopUp.bind(this);
  }

  onClickAdd() {
    const { formTitle } = this.state;
    const { bookId } = this.props;
    this.props.addLesson(bookId, formTitle);
    this.resetForm();
    this.hideEditPopUp();
    return false;
  }

  resetForm() {
    this.setState({
      formTitle: '',
    });
  }

  hideEditPopUp() {
    this.props.hide();
  }

  render() {
    const { formTitle } = this.state;
    const { isPopUp, LANG } = this.props;
    return (
      <Popup
        header={LANG.ADD_LESSON}
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
            <ListItem label={LANG.LESSON_TITLE}>
              <input
                type="text"
                placeholder={LANG.LESSON_TITLE_PLACEHOLDER}
                value={formTitle}
                onChange={(e) => {
                  this.setState({ formTitle: e.target.value });
                }}
              />
            </ListItem>
          </ListForm>
        </div>
      </Popup>
    );
  }
}

AddLessonForm.propTypes = propTypes;

export default AddLessonForm;
