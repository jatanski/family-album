import React from 'react';
import logo from '../assets/logo.svg';
import { Link } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
        </a>
        <Link to="/login">Zaloguj</Link>
      </header>
    </div>
  );
};

export default App;
