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
    const pkgSet = data.getPkgsByRoot(id, 12);
    setPkg({ entrance: id, active: "", set: pkgSet });
  };

  const activePkg = data.pkgs.get(pkg.active);

  const getPkgColor = (p: Pkg) => {
    const pkgID = p.ref.id;
    if (pkgID === pkg.entrance) return theme.palette.focus;
    if (pkgID === pkg.active) return theme.palette.highlight;
    if (pkg.set.has(pkgID) && activePkg && (activePkg.imports.has(p) || activePkg.exports.has(p))) return theme.palette.highlight;
    return theme.palette.muted;
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
                color: getPkgColor(p),
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
