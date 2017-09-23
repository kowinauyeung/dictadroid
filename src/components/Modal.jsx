import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import NavBar from './NavBar';
import './Modal.css';

function Modal(props) {
  const { visible } = props;
  const cssClass = classNames('modal-overlay', { 'modal-overlay-visible': visible });
  return <div className={cssClass} />;
}

Modal.propTypes = {
  visible: PropTypes.bool,
};

Modal.defaultProps = {
  visible: false,
};

export class Popup extends Component {
  constructor() {
    super();
    this.state = {
      showInner: false,
    };
    this.popup = null;
    this.onLeftClick = this.onLeftClick.bind(this);
    this.onRightClick = this.onRightClick.bind(this);
  }

  onLeftClick() {
    const { onLeftClick } = this.props;
    if (typeof onLeftClick === 'function') {
      onLeftClick();
    }
  }

  onRightClick() {
    const { onRightClick } = this.props;
    if (typeof onRightClick === 'function') {
      onRightClick();
    }
  }

  renderLeftButton() {
    return <div className="link light" onClick={this.onLeftClick} role="presentation">Cancel</div>;
  }

  renderRightButton() {
    return <div className="link" onClick={this.onRightClick} role="presentation">OK</div>;
  }

  render() {
    const { children, header, visible } = this.props;
    const popUpCssClass = classNames('popup', { show: visible });
    const popUpBoxCssClass = classNames('popup-box', { 'modal-in': visible });
    return (
      <div className={popUpCssClass} ref={(ref) => { this.popup = ref; }}>
        <Modal visible={visible} />
        <div className={popUpBoxCssClass}>
          <div className="pages">
            <div className="page without-tabbar">
              <NavBar
                pageName={header}
                left={this.renderLeftButton()}
                right={this.renderRightButton()}
              />
              {children}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Popup.propTypes = {
  children: PropTypes.element.isRequired,
  visible: PropTypes.bool,
  header: PropTypes.string.isRequired,
  onLeftClick: PropTypes.func,
  onRightClick: PropTypes.func,
};

Popup.defaultProps = {
  visible: false,
  onLeftClick: null,
  onRightClick: null,
};

export default Modal;
