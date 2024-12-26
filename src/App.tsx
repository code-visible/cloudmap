import { useState } from 'react'
import './App.css'
import Pannel from './components';
import Graph from './graph';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className='app'>
      <div className='header'>project name</div>
      <div className='content'>
        <Pannel count={count} setCount={setCount} />
        <div className='seperator'></div>
        <Graph />
      </div>
    </div>
  )
};

export default App;
