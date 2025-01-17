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
import { brands, themes } from './themes';

import './App.css'

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
      <div className='header'
        style={{
          borderBottomColor: theme.page.seperator,
          backgroundColor: theme.header.backgroundColor,
        }}
      >
        <div
          style={{
            color: theme.header.titleColor,
            fontSize: theme.header.titleSize,
          }}
        >
          {data.name}
        </div>
        <div className='theme'>
          <div className='theme-list' style={{ opacity: theme.name === "mayk" ? 1 : theme.header.opacity }}>
            <button className='theme-option' style={{ backgroundColor: brands.mayk, borderColor: theme.graph.pannel.focus.strokeColor }} onClick={() => setTheme({ ...themes.mayk })}></button>
            <div style={{ color: theme.name === "mayk" ? theme.header.textFocus : theme.header.textNormal }}>mayk</div>
          </div>
          <div className='theme-list' style={{ opacity: theme.name === "khin" ? 1 : theme.header.opacity }}>
            <button className='theme-option' style={{ backgroundColor: brands.khin, borderColor: theme.graph.pannel.focus.strokeColor }} onClick={() => setTheme({ ...themes.khin })}></button>
            <div style={{ color: theme.name === "khin" ? theme.header.textFocus : theme.header.textNormal }}>khin</div>
          </div>
          <div className='theme-list' style={{ opacity: theme.name === "chaya" ? 1 : theme.header.opacity }}>
            <button className='theme-option' style={{ backgroundColor: brands.chaya, borderColor: theme.graph.pannel.focus.strokeColor }} onClick={() => setTheme({ ...themes.chaya })}></button>
            <div style={{ color: theme.name === "chaya" ? theme.header.textFocus : theme.header.textNormal }}>chaya</div>
          </div>
          <div className='theme-list' style={{ opacity: theme.name === "mint" ? 1 : theme.header.opacity }}>
            <button className='theme-option' style={{ backgroundColor: brands.mint, borderColor: theme.graph.pannel.focus.strokeColor }} onClick={() => setTheme({ ...themes.mint })}></button>
            <div style={{ color: theme.name === "mint" ? theme.header.textFocus : theme.header.textNormal }}>mint</div>
          </div>
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
        <div className='seperator' style={{ backgroundColor: theme.page.seperator }}></div>
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
