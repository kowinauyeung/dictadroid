import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from './Routes';
import TabBar from './components/TabBar';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Routes />
        <TabBar />
      </div>
    </BrowserRouter>
  );
}

export default App;
