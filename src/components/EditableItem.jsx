import React from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';

const propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  showButtons: PropTypes.bool,
  onRemoveClick: PropTypes.func.isRequired,
  onEditClick: PropTypes.func.isRequired,
};

const defaultProps = {
  children: <div />,
  showButtons: false,
};

function EditableItem(props) {
  const { children, showButtons, onRemoveClick, onEditClick } = props;
  const wrapperClass = ClassNames('item-content', { 'edit-mode': showButtons });
  return (
    <li>
      <div className={wrapperClass}>
        <div className="item-media show-only-edit-mode">
          <i
            className="ion-ios-minus btn-remove"
            onClick={onRemoveClick}
            role="presentation"
          />
        </div>
        <div className="item-inner">{children}</div>
        <div className="item-media show-only-edit-mode">
          <i
            className="btn-edit ion-ios-compose-outline"
            onClick={onEditClick}
            role="presentation"
          />
        </div>
      </div>
    </li>
  );
}

EditableItem.propTypes = propTypes;
EditableItem.defaultProps = defaultProps;

export default EditableItem;
