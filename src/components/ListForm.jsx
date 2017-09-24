import React from 'react';
import PropTypes from 'prop-types';
import './ListForm.css';

function ListForm(props) {
  return (
    <form className="list-block" onSubmit={props.onSubmit}>
      <ul>{props.children}</ul>
    </form>
  );
}

ListForm.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export const ListItem = (props) => {
  const { children, label } = props;
  return (
    <li>
      <div className="item-content">
        <div className="item-inner">
          <div className="item-title label">{label}</div>
          <div className="item-input">{children}</div>
        </div>
      </div>
    </li>
  );
};

ListItem.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  label: PropTypes.string.isRequired,
};

export default ListForm;
