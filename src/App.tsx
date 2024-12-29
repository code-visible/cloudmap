import { useState } from 'react'
import Pannel from './components/pannel';
import Graph from './components/graph';
import { InitialState, State } from './state';

import './App.css'

function App() {
  const [state, setState] = useState<State>(InitialState);

  return (
    <div className='app'>
      <div className='header'>project name</div>
      <div className='content'>
        <Pannel state={state} setState={setState} />
        <div className='seperator'></div>
        <Graph state={state} setState={setState} />
      </div>
    </div>
  )
};

export default App;
