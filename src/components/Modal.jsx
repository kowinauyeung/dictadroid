import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';
import NavBar from './NavBar';
import './Modal.css';

function Modal(props) {
  const { visible } = props;
  const cssClass = ClassNames('modal-overlay', { 'modal-overlay-visible': visible });
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
    return (
      <div className="link" onClick={this.onRightClick} role="presentation">
        {this.props.rightText}
      </div>
    );
  }

  render() {
    const { children, header, visible, isHideLeft, isHideRight } = this.props;
    const popUpCssClass = ClassNames('popup', { show: visible });
    const popUpBoxCssClass = ClassNames('popup-box', { 'modal-in': visible });
    return (
      <div className={popUpCssClass} ref={(ref) => { this.popup = ref; }}>
        <Modal visible={visible} />
        <div className={popUpBoxCssClass}>
          <div className="pages">
            <div className="page without-tabbar">
              <NavBar
                pageName={header}
                left={!isHideLeft ? this.renderLeftButton() : null}
                right={!isHideRight ? this.renderRightButton() : null}
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
  rightText: PropTypes.string,
  isHideLeft: PropTypes.bool,
  isHideRight: PropTypes.bool,
};

Popup.defaultProps = {
  visible: false,
  onLeftClick: null,
  onRightClick: null,
  rightText: 'OK',
  isHideLeft: true,
  isHideRight: true,
};

export default Modal;
