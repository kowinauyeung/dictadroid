import React from 'react';
import NavBar from '../components/NavBar';
import BackButton from '../components/BackButton';

function Vocabs() {
  return (
    <div className="vocabs page">
      <NavBar
        pageName="Vocabs"
        left={<BackButton to="/lessons" text="Lessons" />}
      />
    </div>
  );
}

export default Vocabs;
