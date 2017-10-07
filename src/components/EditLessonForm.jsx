import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ListForm, { ListItem } from '../components/ListForm';
import { Popup } from '../components/Modal';

const propTypes = {
  targetLesson: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
  }),
  hide: PropTypes.func.isRequired,
  editLesson: PropTypes.func.isRequired,
};

const defaultProps = {
  targetLesson: {
    id: null,
    title: '',
  },
};

class EditLessonForm extends Component {
  constructor({ targetLesson }) {
    super();
    this.state = {
      formTitle: targetLesson.title,
    };
    this.onClickSave = this.onClickSave.bind(this);
    this.hideEditPopUp = this.hideEditPopUp.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.targetLesson.id === null) return;
    const { targetLesson } = nextProps;
    this.setState({
      formTitle: targetLesson.title,
    });
  }

  onClickSave() {
    const { targetLesson } = this.props;
    const { formTitle } = this.state;
    this.props.editLesson(targetLesson, formTitle);
    this.hideEditPopUp();
  }

  hideEditPopUp() {
    this.props.hide();
  }

  render() {
    const { formTitle } = this.state;
    const { targetLesson } = this.props;
    return (
      <Popup
        header="Edit lesson"
        visible={targetLesson.id !== null}
        onLeftClick={this.hideEditPopUp}
        onRightClick={this.onClickSave}
        rightText="Save"
      >
        <div className="page-inner form-box">
          <ListForm
            onSubmit={(e) => {
              e.preventDefault();
              this.onClickSave();
              return false;
            }}
          >
            <ListItem label="Title">
              <input
                type="text"
                placeholder="e.g. 第一課"
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

EditLessonForm.propTypes = propTypes;
EditLessonForm.defaultProps = defaultProps;

export default EditLessonForm;
