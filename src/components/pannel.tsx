import { Dir, File } from '../resource/node';
import {
  GraphType,
  StateCall,
  StatePannel,
  StatePkg,
  StateTheme
} from '../state';
import data from '../data';

import styles from './pannel.module.css';

export interface PannelProps {
  // file: StateFile;
  // call: StateCall;
  pannel: StatePannel;
  setPannel: (s: StatePannel) => void;
  theme: StateTheme;
  setTheme: (s: StateTheme) => void;
  graphType: GraphType;
  setGraphType: (s: GraphType) => void;
  pkg: StatePkg;
  setPkg: (s: StatePkg) => void;
};

function Pannel({ pannel, setPannel, pkg, theme, setPkg, setGraphType }: PannelProps) {

  const activePkg = data.pkgs.get(pkg.active);

  const getDirColor = (dir: Dir) => {
    if (!dir.pkgPtr) return theme.palette.muted;
    const pkgID = dir.pkgPtr.ref.id;
    if (pkgID === pkg.entrance) return theme.palette.focus;
    if (pkgID === pkg.active) return theme.palette.highlight;
    if (pkg.set.has(pkgID) && activePkg && (activePkg.imports.has(dir.pkgPtr) || activePkg.exports.has(dir.pkgPtr))) return theme.palette.highlight;
    return theme.palette.muted;
  };

  const toggleExpandDir = (path: string) => {
    if (pannel.expand.has(path)) {
      pannel.expand.delete(path);
    } else {
      pannel.expand.add(path);
    }

    setPannel({ ...pannel });
  };

  const renderDirectory = (dir: Dir): any => {
    return (
      <li
        key={dir.path}
        className={styles.dir}
      >
        <div
          className={styles.dirname}
          // onClick={() => handleSelectDir(dir)}
          onClick={() => toggleExpandDir(dir.path)}
          style={{
            color: getDirColor(dir),
          }}
        >{dir.name}</div>
        {
          pannel.expand.has(dir.path) || !dir.parent ? (
            <ul className={styles.dirlist}>
              {renderDirectories(dir.children)}
              {
                renderFiles(dir.files)}
            </ul>
          ) : null
        }
      </li>
    );
  };

  const renderFile = (file: File): any => {
    return (
      <li
        key={file.ref.id}
        className={styles.file}
      >
        <div
          className={styles.filename}
        >{file.ref.name}</div>
      </li>
    );
  };

  const renderFiles = (files: Set<File>): any => {
    const result = [];
    for (const file of files) {
      result.push(renderFile(file));
    }
    return result;
  };

  const renderDirectories = (dirs: Set<Dir>): any => {
    const result = [];
    for (const dir of dirs) {
      result.push(renderDirectory(dir));
    }
    return result;
  };

  const handleSelectDir = (dir: Dir) => {
    if (!dir.pkgPtr) return;
    const id = dir.pkgPtr.ref.id;
    setGraphType(GraphType.PKG);
    const pkgSet = data.getPkgsByRoot(id, 12);
    setPkg({ entrance: id, active: "", set: pkgSet });
  };



  return (
    <div className={styles.pannel}>
      <ul>
        {
          // pkgs.map((p: Pkg) => (
          //   <li
          //     key={p.ref.id}
          //     className={styles.pkg}
          //     style={{
          //       color: getPkgColor(p),
          //     }}
          //     onClick={() => handleSelectPkg(p.ref.id)}
          //   >
          //     {p.path}
          //   </li>
          // ))
          renderDirectory(data.root)
        }
      </ul>
    </div>
  );
};

export default Pannel;
