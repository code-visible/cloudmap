import { Dir, File } from '../resource/node';
import {
  GraphType,
  StateCall,
  StateFile,
  StatePannel,
  StatePkg,
  StateTheme
} from '../state';
import data from '../data';

import styles from './pannel.module.css';

export interface PannelProps {
  file: StateFile;
  setFile: (s: StateFile) => void;
  call: StateCall;
  setCall: (s: StateCall) => void;
  pannel: StatePannel;
  setPannel: (s: StatePannel) => void;
  theme: StateTheme;
  setTheme: (s: StateTheme) => void;
  graphType: GraphType;
  setGraphType: (s: GraphType) => void;
  pkg: StatePkg;
  setPkg: (s: StatePkg) => void;
};

function Pannel({ pannel, setPannel, pkg, theme, setPkg, setFile, setGraphType }: PannelProps) {

  const activePkg = data.pkgs.get(pkg.active);

  const getDirColor = (dir: Dir) => {
    if (pannel.hover === dir.path) return theme.palette.hover;
    if (!dir.pkgPtr) return theme.palette.muted1;
    const pkgID = dir.pkgPtr.ref.id;
    if (pkgID === pkg.entrance) return theme.palette.focus;
    if (pkgID === pkg.active) return theme.palette.highlight;
    if (pkg.set.has(pkgID) && activePkg && (activePkg.imports.has(dir.pkgPtr) || activePkg.exports.has(dir.pkgPtr))) return theme.palette.highlight;
    return theme.palette.muted1;
  };

  const getFileColor = (file: File) => {
    if (pannel.hover === file.ref.id) return theme.palette.hover;
    // if (!dir.pkgPtr) return theme.palette.muted2;
    // const fileID = file.ref.id;
    // if (fileID === file.entrance) return theme.palette.focus;
    // if (fileID === file.active) return theme.palette.highlight;
    // if (pkg.set.has(fileID) && activePkg && (activePkg.imports.has(dir.pkgPtr) || activePkg.exports.has(dir.pkgPtr))) return theme.palette.highlight;
    return theme.palette.muted2;
  };

  const toggleExpandDir = (path: string) => {
    if (pannel.expand.has(path)) {
      pannel.expand.delete(path);
    } else {
      pannel.expand.add(path);
    }

    setPannel({ ...pannel });
  };

  const hoverItem = (key: string) => {
    pannel.hover = key;
    setPannel({ ...pannel });
  }

  const renderDirectory = (dir: Dir): any => {
    return (
      <li
        key={dir.path}
        className={styles.dir}
      >
        <div
          className={styles.dirname}
          onMouseEnter={() => hoverItem(dir.path)}
          onMouseLeave={() => hoverItem("")}
        >
          <div className={styles.diritem}>
            {
              dir.parent ? (
                <div
                  className={styles.diricon}
                  style={{
                    color: getDirColor(dir),
                  }}
                >
                  {pannel.expand.has(dir.path) ? "-" : "+"}
                </div>
              ) : (<div className={styles.diricon}></div>)
            }
            <div
              className={styles.dirtext}
              style={{
                color: getDirColor(dir),
              }}
              onClick={() => toggleExpandDir(dir.path)}
            >{dir.parent ? dir.name : data.name}</div>
          </div>
          {
            dir.pkgPtr && pannel.hover === dir.path ? (
              <div
                className={styles.enter}
                style={{ color: theme.palette.muted1 }}
                onClick={() => handleSelectDir(dir)}
              >🡲</div>
            ) : null
          }
        </div>
        {
          pannel.expand.has(dir.path) || !dir.parent ? (
            <ul className={styles.dirlist}>
              {renderDirectories(dir.children)}
              {
                renderFiles(dir.files)
              }
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
          onMouseEnter={() => hoverItem(file.ref.id)}
          onMouseLeave={() => hoverItem("")}
        >
          <div
            className={styles.filetext}
            style={{
              color:
                getFileColor(file),
            }}
          >
            {file.ref.name}
          </div>
          {
            pannel.hover === file.ref.id ? (
              <div
                className={styles.enter}
                style={{ color: theme.palette.muted1 }}
                onClick={() => handleSelectFile(file)}
              >🡲</div>
            ) : null
          }
        </div>
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

  const handleSelectFile = (file: File) => {
    const id = file.ref.id;
    setGraphType(GraphType.FILE);
    // const pkgSet = data.getPkgsByRoot(id, 12);
    setFile({ entrance: id, active: "" });
  };

  return (
    <div className={styles.pannel}>
      <ul>
        {
          renderDirectory(data.root)
        }
      </ul>
    </div>
  );
};

export default Pannel;
