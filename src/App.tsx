import * as React from 'react';
import './App.css';

import Button from './components/Button';
import Popover from './components/Popover';

import logo from './logo.svg';

class App extends React.Component<any, any> {
  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <Popover content={<div>hey there me is the content</div>}>
          <Button>Invoker</Button>
        </Popover>
        <p className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
