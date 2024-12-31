import { useState } from 'react'
import Pannel from './components/pannel';
import Graph from './components/graph';
import {
  GraphType,
  InitialStateGraph,
  InitialStatePannel,
  InitialStatePkg,
  InitialStateTheme,
  StatePannel,
  StatePkg,
  StateTheme
} from './state';
import mayk from './themes/mayk';
import chaya from './themes/chaya';

import './App.css'

function App() {
  const [theme, setTheme] = useState<StateTheme>(InitialStateTheme);
  const [pkg, setPkg] = useState<StatePkg>(InitialStatePkg);
  const [pannel, setPannel] = useState<StatePannel>(InitialStatePannel);
  const [graphType, setGraphType] = useState<GraphType>(InitialStateGraph);

  return (
    <div className='app'>
      <div className='header'>
        <div className='title'>
          project name
        </div>
        <div className='theme'>
          <div>theme: </div>
          <button onClick={() => setTheme({ palette: mayk })}>mayk</button>
          <button onClick={() => setTheme({ palette: chaya })}>chaya</button>
        </div>
      </div>
      <div className='content'>
        <Pannel
          pannel={pannel}
          setPannel={setPannel}
          theme={theme}
          setTheme={setTheme}
          graphType={graphType}
          setGraphType={setGraphType}
          pkg={pkg}
          setPkg={setPkg}
        />
        <div className='seperator'></div>
        <Graph
          theme={theme}
          graphType={graphType}
          setGraphType={setGraphType}
          pkg={pkg}
          setPkg={setPkg}
        />
      </div>
    </div>
  )
};

export default App;
