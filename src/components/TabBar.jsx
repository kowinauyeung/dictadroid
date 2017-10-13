import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import _ from 'lodash';
import './TabBar.css';

const propTypes = {
  LANG: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
};

const homePageMatchPath = [
  '/',
  'books',
  'lessons',
  'history',
  'login',
];

const isHomePage = (match, location) => {
  if (!match) return false;
  const path = location.pathname.split('/')[1] || '/';
  return (_.indexOf(homePageMatchPath, path) >= 0);
};

function TabBar({ LANG }) {
  return (
    <div className="tabbar">
      <div className="tabbar-inner">
        <NavLink to="/" className="tab-link" isActive={isHomePage}>
          <i className="icon ion-ios-book-outline inactive" />
          <i className="icon ion-ios-book active" />
          <span className="tabber-label">{LANG.BOOKS}</span>
        </NavLink>
        <NavLink to="/dictation" className="tab-link">
          <i className="icon ion-ios-mic-outline inactive" />
          <i className="icon ion-ios-mic active" />
          <span className="tabber-label">{LANG.DICTATION}</span>
        </NavLink>
        <NavLink to="/translation" className="tab-link">
          <i className="icon ion-ios-recording-outline inactive" />
          <i className="icon ion-ios-recording active" />
          <span className="tabber-label">{LANG.TRANSLATION}</span>
        </NavLink>
        <NavLink to="/settings" className="tab-link">
          <i className="icon ion-ios-gear-outline inactive" />
          <i className="icon ion-ios-gear active" />
          <span className="tabber-label">{LANG.SETTINGS}</span>
        </NavLink>
      </div>
    </div>
  );
}

TabBar.propTypes = propTypes;

export default TabBar;
