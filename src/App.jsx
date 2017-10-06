import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from './Routes';
import Auth from './Auth';
import TabBar from './components/TabBar';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Routes />
        <TabBar />
        <Auth />
      </div>
    </BrowserRouter>
  );
}

export default App;
