import { Callable, Dir, File } from '../resource/node';
import {
  GraphType,
  ResourceSet,
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
  hide: ResourceSet;
  setHide: (s: ResourceSet) => void;
  theme: StateTheme;
  setTheme: (s: StateTheme) => void;
  graphType: GraphType;
  setGraphType: (s: GraphType) => void;
  pkg: StatePkg;
  setPkg: (s: StatePkg) => void;
};

function Pannel({ pannel, setPannel, pkg, theme, setPkg, setFile, setGraphType, setCall }: PannelProps) {
  const activePkg = data.pkgs.get(pkg.active);

  const getDirColor = (dir: Dir) => {
    if (pannel.hover.typ === GraphType.PKG && pannel.hover.id === dir.path) return theme.palette.hover;
    if (!dir.pkgPtr) return theme.palette.muted1;
    const pkgID = dir.pkgPtr.ref.id;
    if (pkgID === pkg.entrance) return theme.palette.focus;
    if (pkgID === pkg.active) return theme.palette.highlight;
    if (pkg.set.has(pkgID) && activePkg && (activePkg.imports.has(dir.pkgPtr) || activePkg.exports.has(dir.pkgPtr))) return theme.palette.highlight;
    return theme.palette.muted1;
  };

  const getFileColor = (file: File) => {
    if (pannel.hover.typ === GraphType.FILE && pannel.hover.id === file.ref.id) return theme.palette.hover;
    // const fileID = file.ref.id;
    // if (fileID === file.entrance) return theme.palette.focus;
    // if (fileID === file.active) return theme.palette.highlight;
    return theme.palette.muted2;
  };

  const getCallableColor = (callable: Callable) => {
    if (pannel.hover.typ === GraphType.CALL && pannel.hover.id === callable.ref.id) return theme.palette.hover;
    // const fileID = file.ref.id;
    // if (fileID === file.entrance) return theme.palette.focus;
    // if (fileID === file.active) return theme.palette.highlight;
    if (callable.ref.private) return theme.palette.muted3;
    // if (prefix) return theme.palette.muted2;
    return theme.palette.muted1;
  };


  const toggleExpandDir = (path: string) => {
    const currentSet = pannel.expand.pkgs;
    if (currentSet.has(path)) {
      currentSet.delete(path);
    } else {
      currentSet.add(path);
    }

    setPannel({ ...pannel });
  };

  const toggleExpandFile = (fileID: string) => {
    const currentSet = pannel.expand.fs;
    if (currentSet.has(fileID)) {
      currentSet.delete(fileID);
    } else {
      currentSet.add(fileID);
    }

    setPannel({ ...pannel });
  }

  const hoverDir = (key: string) => {
    pannel.hover.id = key;
    pannel.hover.typ = GraphType.PKG;
    setPannel({ ...pannel });
  };

  const hoverFile = (key: string) => {
    pannel.hover.id = key;
    pannel.hover.typ = GraphType.FILE;
    setPannel({ ...pannel });
  };

  const hoverFn = (key: string) => {
    pannel.hover.id = key;
    pannel.hover.typ = GraphType.CALL;
    setPannel({ ...pannel });
  };

  const renderCallable = (callable: Callable): any => {
    const id = callable.ref.id;
    return (
      <li
        key={id}
        className={styles.callable}
      >
        <div
          className={styles.callablename}
          onMouseEnter={() => hoverFn(id)}
          onMouseLeave={() => hoverFn("")}
        >
          <div
            className={styles.callabletext}
            style={{
              color: getCallableColor(callable),
            }}
            onClick={() => handleSelectCallable(callable)}
          >
            {
              callable.absPtr ? `(${callable.absPtr.ref.name}).${callable.ref.name}` : callable.ref.name
            }
          </div>
          {
            pannel.hover.typ === GraphType.CALL && pannel.hover.id === id ? (
              <div
                className={styles.enter}
                style={{ color: theme.palette.muted1 }}
                onClick={() => handleSelectCallable(callable)}
              >🡲</div>
            ) : null
          }
        </div>
      </li>
    );
  };

  const renderDirectory = (dir: Dir): any => {
    return (
      <li
        key={dir.path}
        className={styles.dir}
      >
        <div
          className={styles.dirname}
          onMouseEnter={() => hoverDir(dir.path)}
          onMouseLeave={() => hoverDir("")}
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
                  {pannel.expand.pkgs.has(dir.path) ? "-" : "+"}
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
            dir.pkgPtr && pannel.hover.typ === GraphType.PKG && pannel.hover.id === dir.path ? (
              <div
                className={styles.enter}
                style={{ color: theme.palette.muted1 }}
                onClick={() => handleSelectDir(dir)}
              >🡲</div>
            ) : null
          }
        </div>
        {
          pannel.expand.pkgs.has(dir.path) || !dir.parent ? (
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
          onMouseEnter={() => hoverFile(file.ref.id)}
          onMouseLeave={() => hoverFile("")}
        >
          <div
            className={styles.filetext}
            style={{
              color: getFileColor(file),
            }}
            onClick={() => toggleExpandFile(file.ref.id)}
          >
            {file.ref.name}
          </div>
          {
            pannel.hover.typ === GraphType.FILE && pannel.hover.id === file.ref.id ? (
              <div
                className={styles.enter}
                style={{ color: theme.palette.muted1 }}
                onClick={() => handleSelectFile(file)}
              >🡲</div>
            ) : null
          }
        </div>
        <ul className={styles.dirlist}>
          {
            pannel.expand.fs.has(file.ref.id) ? renderCallables(file.callables) : null
          }
        </ul>
      </li>
    );
  };

  const renderCallables = (callables: Set<Callable>): any => {
    const result = [];
    for (const callable of callables) {
      result.push(renderCallable(callable));
    }
    return result;
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

  const handleSelectCallable = (callable: Callable) => {
    const id = callable.ref.id;
    setGraphType(GraphType.CALL);
    const callableSet = data.getFileCallsByRoot(id, 24);
    setCall({ entrance: id, active: "", set: callableSet });
  };

  const handleSelectFile = (file: File) => {
    const id = file.ref.id;
    setGraphType(GraphType.FILE);
    const fileSet = data.getFilesByRoot(id, 16);
    setFile({ entrance: id, active: "", set: fileSet });
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