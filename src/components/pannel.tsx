import { useEffect } from 'react';
import { Pkg } from '../resource/node';
import styles from './pannel.module.css';
import data from '../data';
import { GraphType, State } from '../state';

export interface PannelProps {
  state: State;
  setState: (c: State) => void;
};

const pkgs: Pkg[] = [];
for (const el of data.pkgs.values()) {
  pkgs.push(el);
}
pkgs.sort((a: Pkg, b: Pkg) => a.path.localeCompare(b.path));

function Pannel({ state, setState }: PannelProps) {
  useEffect(() => {
  }, []);
  // console.log(state)
  return (
    <div className={styles.pannel}>
      <ul>
        {
          pkgs.map((pkg: Pkg) => <li key={pkg.ref.id} style={{ color: state.pkg.entrance === pkg.ref.id ? "#f0f" : "#000" }} onClick={() => setState({ graph: GraphType.PKG, pkg: { entrance: pkg.ref.id, active: "" }, file: {}, call: {} })}>{pkg.path}</li>)
        }
      </ul>
    </div >
  );
};

export default Pannel;
