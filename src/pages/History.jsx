import React from 'react';
import NavBar from '../components/NavBar';
import BackButton from '../components/BackButton';

function History() {
  return (
    <div className="history page">
      <NavBar
        pageName="History"
        left={<BackButton to="/" />}
      />
    </div>
  );
}

export default History;
