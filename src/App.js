// import { useState } from 'react';
import './App.css';

import data from './data.json';

function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <h1>{data.title}</h1>
      <h2>{data.subtitle}</h2>
      <p>Richard Lipsius, Acta 235-269</p>

      {data.stanzas.map((stanza) => <div>
          <span>{stanza.number}</span>
          {stanza.verses.map((verse) => <p>
            <span>{verse.number}</span>. <span>{verse.english}</span>
          </p>)}
        </div>)}
    </div>
  );
}

export default App;
