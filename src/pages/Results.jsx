import React from 'react';
import NavBar from '../components/NavBar';
import BackButton from '../components/BackButton';

function Results() {
  return (
    <div className="history page">
      <NavBar
        pageName="Results"
        left={<BackButton to="/" />}
      />
    </div>
  );
}

export default Results;
