import React from 'react';
import { NavLink } from 'react-router-dom';
import _ from 'lodash';
import './TabBar.css';

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

function TabBar() {
  return (
    <div className="tabbar">
      <div className="tabbar-inner">
        <NavLink to="/" className="tab-link" isActive={isHomePage}>
          <i className="icon ion-ios-book-outline inactive" />
          <i className="icon ion-ios-book active" />
          <span className="tabber-label">Book</span>
        </NavLink>
        <NavLink to="/dictation" className="tab-link">
          <i className="icon ion-ios-mic-outline inactive" />
          <i className="icon ion-ios-mic active" />
          <span className="tabber-label">Dictation</span>
        </NavLink>
        <NavLink to="/translation" className="tab-link">
          <i className="icon ion-ios-recording-outline inactive" />
          <i className="icon ion-ios-recording active" />
          <span className="tabber-label">Translation</span>
        </NavLink>
        <NavLink to="/settings" className="tab-link">
          <i className="icon ion-ios-gear-outline inactive" />
          <i className="icon ion-ios-gear active" />
          <span className="tabber-label">Settings</span>
        </NavLink>
      </div>
    </div>
  );
}

export default TabBar;
