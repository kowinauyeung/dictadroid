import React from 'react';
import { NavLink } from 'react-router-dom';

const isHomePage = (match, location) => {
  if (!match) {
    return false;
  }
  const path = location.pathname;
  if (
    path === '/' ||
    path.indexOf('books') > 0 ||
    path.indexOf('lessions') > 0 ||
    path.indexOf('vocabs') > 0
  ) {
    return true;
  }
  return false;
};

function TabBar() {
  return (
    <div className="tabbar">
      <div className="tabbar-inner">
        <NavLink to="/" className="tab-link" isActive={isHomePage}>
          <i className="icon ion-ios-book-outline inactive" />
          <i className="icon ion-ios-book active" />
          <span className="tabber-label">Books</span>
        </NavLink>
        <NavLink to="/dictation" className="tab-link">
          <i className="icon ion-ios-timer-outline inactive" />
          <i className="icon ion-ios-timer active" />
          <span className="tabber-label">Dictation</span>
        </NavLink>
        <NavLink to="/translation" className="tab-link">
          <i className="icon ion-ios-recording-outline inactive" />
          <i className="icon ion-ios-recording active" />
          <span className="tabber-label">Translation</span>
        </NavLink>
        <NavLink to="/settings" className="tab-link">
          <i className="icon ion-ios-settings-outline inactive" />
          <i className="icon ion-ios-settings active" />
          <span className="tabber-label">Settings</span>
        </NavLink>
      </div>
    </div>
  );
}

export default TabBar;
