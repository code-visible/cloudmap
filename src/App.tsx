import { useState } from 'react'
import Pannel from './components/pannel';
import Graph from './components/graph';
import {
  GraphType,
  InitialStateCall,
  InitialStateFile,
  InitialStateGraph,
  InitialStatePannel,
  InitialStatePkg,
  InitialStateShared,
  InitialStateTheme,
  StateCall,
  StateFile,
  StatePannel,
  StatePkg,
  StateShared,
  StateTheme
} from './state';
import mayk from './themes/mayk';
import chaya from './themes/chaya';

import './App.css'
import data from './data';

function App() {
  const [theme, setTheme] = useState<StateTheme>(InitialStateTheme);
  const [pkg, setPkg] = useState<StatePkg>(InitialStatePkg);
  const [file, setFile] = useState<StateFile>(InitialStateFile);
  const [call, setCall] = useState<StateCall>(InitialStateCall);
  const [pannel, setPannel] = useState<StatePannel>(InitialStatePannel);
  const [shared, setShared] = useState<StateShared>(InitialStateShared);
  const [graphType, setGraphType] = useState<GraphType>(InitialStateGraph);

  return (
    <div className='app'>
      <div className='header'>
        <div className='title'>
          {data.name}
        </div>
        <div className='theme'>
          <div>theme: </div>
          <button onClick={() => setTheme({ palette: mayk })}>mayk</button>
          <button onClick={() => setTheme({ palette: chaya })}>chaya</button>
        </div>
      </div>
      <div className='content'>
        <Pannel
          file={file}
          setFile={setFile}
          call={call}
          setCall={setCall}
          pannel={pannel}
          setPannel={setPannel}
          shared={shared}
          setShared={setShared}
          theme={theme}
          setTheme={setTheme}
          graphType={graphType}
          setGraphType={setGraphType}
          pkg={pkg}
          setPkg={setPkg}
        />
        <div className='seperator'></div>
        <Graph
          file={file}
          setFile={setFile}
          call={call}
          setCall={setCall}
          shared={shared}
          setShared={setShared}
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
