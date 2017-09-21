import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="home">Home
      <Link to="/books">Book</Link>
    </div>
  );
}

export default Home;
