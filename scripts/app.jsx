
import React from 'react';
import Header from './header';
import { HashRouter, Route } from 'react-router-dom';

class App extends React.Component {
  render(){
    return (
      <HashRouter>
        <Route path="/" component={Header} />
      </HashRouter>
    );
  }
}

export default App;
