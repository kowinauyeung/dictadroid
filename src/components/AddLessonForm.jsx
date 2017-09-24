import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ListForm, { ListItem } from '../components/ListForm';
import { Popup } from '../components/Modal';

const propTypes = {
  isPopUp: PropTypes.bool.isRequired,
  hide: PropTypes.func.isRequired,
  addLesson: PropTypes.func.isRequired,
};

const defaultProps = {
  addLesson: (a) => { console.log(a); },
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
    this.props.addLesson(formTitle);
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
    const { isPopUp } = this.props;
    return (
      <Popup
        header="Add lesson"
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

AddLessonForm.propTypes = propTypes;
AddLessonForm.defaultProps = defaultProps;

export default AddLessonForm;
