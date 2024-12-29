import { Pkg } from '../resource/node';
import { GraphType, StateCall, StateFile, StatePkg, StateTheme } from '../state';
import data from '../data';

import styles from './pannel.module.css';

export interface PannelProps {
  // file: StateFile;
  // call: StateCall;
  theme: StateTheme;
  setTheme: (s: StateTheme) => void;
  graphType: GraphType;
  setGraphType: (s: GraphType) => void;
  pkg: StatePkg;
  setPkg: (s: StatePkg) => void;
};

const pkgs: Pkg[] = [];
for (const el of data.pkgs.values()) {
  pkgs.push(el);
}
pkgs.sort((a: Pkg, b: Pkg) => a.path.localeCompare(b.path));

function Pannel({ pkg, theme, setPkg, setGraphType }: PannelProps) {

  const handleSelectPkg = (id: string) => {
    setGraphType(GraphType.PKG);
    setPkg({ entrance: id, active: "" });
  };

  return (
    <div className={styles.pannel}>
      <ul>
        {
          pkgs.map((p: Pkg) => (
            <li
              key={p.ref.id}
              className={styles.pkg}
              style={{
                color: pkg.entrance === p.ref.id ? theme.palette.focus : (pkg.active === p.ref.id ? theme.palette.highlight : theme.palette.muted),
              }}
              onClick={() => handleSelectPkg(p.ref.id)}
            >
              {p.path}
            </li>
          ))
        }
      </ul>
    </div>
  );
};

export default Pannel;
