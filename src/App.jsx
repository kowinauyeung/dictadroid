import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from './Routes';
import TabBar from './components/TabBar';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="app">
          <Routes />
          <TabBar />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
