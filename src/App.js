import React, { Component } from 'react';
import Header from './components/Header';
import FrontPage from './components/FrontPage';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <FrontPage />
      </div>
    );
  }
}

export default App;
