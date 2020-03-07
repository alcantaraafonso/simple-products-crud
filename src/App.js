import React from 'react';

import NavBar from './components/navbar'

import { HashRouter } from 'react-router-dom'

import Routes from './routes/routes'

import './App.css';

/**
 * O <HashRouter> ficou fora do componente Routes, pois ele preciva englobar a tag <Link> que tá no
 * <NavBar>
 */
function App() {
  return (
    <>
      <div className="container">
        <HashRouter>
          <NavBar />
          <Routes />
        </HashRouter>
      </div>

    </>
  );
}

export default App;
