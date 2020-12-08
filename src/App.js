import { useState, useEffect } from 'react';
import './App.css';
import data from './lyrics.json';

const _ = require('lodash');


console.info("Stanzas: ", data.stanzas.length);

function App() {
  const [currentLocation, setCurrentLocation] = useState( {"stanza": 0, "verse": 0 } );
  const [currentStanza, setCurrentStanza] = useState(null);
  const [intro, setIntro] = useState(true);
  const [outro, setOutro] = useState(null);

  const nextStanza = () => {
    console.log("next")
    let tempLocation = _.clone(currentLocation);
    tempLocation.stanza = tempLocation.stanza + 1;
    setCurrentLocation(tempLocation);
  }

  const prevStanza = () => {
    console.log("prev")
    let tempLocation = _.clone(currentLocation);
    tempLocation.stanza = tempLocation.stanza - 1;
    setCurrentLocation(tempLocation);
  }

  useEffect( () => {
    // At the beginning
    if (currentLocation.stanza === 0) {
      setIntro(true);
      setCurrentStanza(null);
      console.log("intro")
    // On the first stanza
    } else if (currentLocation.stanza === 1) {
      setIntro(false);
      setCurrentStanza(data.stanzas[currentLocation.stanza - 1]);
    // In the middle
    } else if (currentLocation.stanza < data.stanzas.length) {
      setCurrentStanza(data.stanzas[currentLocation.stanza - 1]);
    // On the last stanza
    } else if (currentLocation.stanza === data.stanzas.length) {
      setCurrentStanza(data.stanzas[currentLocation.stanza - 1]);
      setOutro(false);
    // At the end
    } else if (currentLocation.stanza > data.stanzas.length) {
      setCurrentStanza(null);
      setOutro(true);
      console.log("outro")
    }
    console.info("currentLocation", currentLocation);
  }, [currentLocation] )

  return (
    <div className="App">
    
      {intro && <div className={`intro`}>
        <h1>{data.title}</h1>
        <h2>{data.subtitle}</h2>
        <p>{data.author}</p>
      </div>}

      {currentStanza && <div className={`stanza stanza-${currentLocation.stanza}`}>
        {currentStanza.verses.map(verse => <p key={`v-${verse.number}`}>{verse.english}</p>)}
      </div>}

      <div className={`small-nav`}>
        <button onClick={prevStanza} disabled={intro}>-</button>
        <button onClick={nextStanza} disabled={outro}>+</button>
      </div>

      {/* {data.stanzas.map((stanza) => <div>
          <span>{stanza.number}.</span>
          {stanza.verses.map((verse) => <p>
            <span>{verse.number}</span>. <span>{verse.english}</span>
          </p>)}
        </div>)} */}
    </div>
  );
}

export default App;
