import { useEffect, useState } from 'react'
import Pannel from './components/pannel';
import Graph from './components/graph';
import { SourceMap } from './resource/resource';
import type { Source } from './protocol/map';
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
import khin from './themes/khin';
import mint from './themes/mint';

function App() {
  const [data, setData] = useState<SourceMap>(new SourceMap());
  const [theme, setTheme] = useState<StateTheme>(InitialStateTheme);
  const [pkg, setPkg] = useState<StatePkg>(InitialStatePkg);
  const [file, setFile] = useState<StateFile>(InitialStateFile);
  const [call, setCall] = useState<StateCall>(InitialStateCall);
  const [pannel, setPannel] = useState<StatePannel>(InitialStatePannel);
  const [shared, setShared] = useState<StateShared>(InitialStateShared);
  const [graphType, setGraphType] = useState<GraphType>(InitialStateGraph);

  useEffect(() => {
    fetch("/data.json").then((res) => {
      return res.json();
    }).then((d) => {
      data.parseSource(d as Source);
      setData(data);
    });
  }, []);

  return (
    <div className='app'>
      <div className='header'>
        <div className='title'>
          {data.name}
        </div>
        <div className='theme'>
          <div>theme: </div>
          <button onClick={() => setTheme({ graph: mayk.graph, palette: mayk.palette })}>mayk</button>
          <button onClick={() => setTheme({ graph: khin.graph, palette: khin.palette })}>khin</button>
          <button onClick={() => setTheme({ graph: chaya.graph, palette: chaya.palette })}>chaya</button>
          <button onClick={() => setTheme({ graph: mint.graph, palette: mint.palette })}>mint</button>
        </div>
      </div>
      <div className='content'>
        <Pannel
          data={data}
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
          data={data}
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
