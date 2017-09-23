import React from 'react';
import NavBar from '../components/NavBar';
import BackButton from '../components/BackButton';

function Books() {
  return (
    <div className="books page">
      <NavBar
        pageName="Books"
        left={<BackButton to="/" />}
      />
    </div>
  );
}

export default Books;
