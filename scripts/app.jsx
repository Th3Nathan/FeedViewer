
import React from 'react';
import Header from './header';
import List from './list'
import { HashRouter, Route } from 'react-router-dom';

class App extends React.Component {
  render(){
    return (
      <HashRouter>
        <div>
          <Route path="/" component={Header} />
          <Route path="/" component={List} />
        </div>
      </HashRouter>
    );
  }
}

export default App;
