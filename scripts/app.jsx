
import React from 'react';
import Header from './header';
import List from './list'
import { HashRouter, Route, Redirect } from 'react-router-dom';

class App extends React.Component {
  render(){
    return (
      <HashRouter>
          <div>
            <Route exact path="/" render={() => <Redirect to="/analog" />} />
            <Route path="/:channel" component={Header} />
            <Route path="/:channel" component={List} />
          </div>
      </HashRouter>
    );
  }
}

export default App;
