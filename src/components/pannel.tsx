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
import Search from './search';
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

  const searchKeyword = (keyword: string) => {
    resetSearchMatchList();
    traverseDir(data.root, keyword);
  };

  const resetSearchMatchList = () => {
    pannel.search.match.pkgs.clear();
    pannel.search.match.fs.clear();
    pannel.search.match.fns.clear();
    pannel.search.match.abs.clear();
  }

  const traverseDir = (dir: Dir, keyword: string) => {
    if (dir.path.indexOf(keyword) >= 0) {
      addDirRecursive(dir);
    }
    for (const f of dir.files) {
      if (f.ref.name.indexOf(keyword) >= 0) {
        pannel.search.match.fs.add(f.ref.id);
        addDirRecursive(dir);
      }
      for (const fn of f.callables) {
        if (fn.ref.name.indexOf(keyword) >= 0) {
          pannel.search.match.fns.add(fn.ref.id);
          pannel.search.match.fs.add(f.ref.id);
          addDirRecursive(dir);
        }
      }
      for (const ab of f.abstracts) {
        if (ab.ref.name.indexOf(keyword) >= 0) {
          pannel.search.match.abs.add(ab.ref.id);
          pannel.search.match.fs.add(f.ref.id);
          addDirRecursive(dir);
        }
      }
    }
    for (const ch of dir.children) {
      traverseDir(ch, keyword);
    }
  };

  const addDirRecursive = (dir?: Dir) => {
    if (!dir || dir === data.root) return;
    const set = pannel.search.match.pkgs;
    if (set.has(dir.path)) return;
    set.add(dir.path);
    addDirRecursive(dir.parent);
  };

  const handleSearch = (keyword: string) => {
    if (keyword.length >= 2) searchKeyword(keyword);
    pannel.search.keyword = keyword;
    setPannel({ ...pannel });
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
    const isDirExpanded = (dir: Dir) => {
      if (!dir.parent) return true;
      if (pannel.search.keyword !== "" && pannel.search.keyword.length >= 2) {
        return pannel.search.match.pkgs.has(dir.path);
      }
      return pannel.expand.pkgs.has(dir.path)
    }
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
          isDirExpanded(dir) ? (
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
    const isFileExpanded = (file: File) => {
      if (pannel.search.keyword !== "" && pannel.search.keyword.length >= 2) {
        return pannel.search.match.fs.has(file.ref.id);
      }
      return pannel.expand.fs.has(file.ref.id);
    }
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
            isFileExpanded(file) ? renderCallables(file.callables) : null
          }
        </ul>
      </li>
    );
  };

  const renderCallables = (callables: Set<Callable>): any => {
    const isCallableVisible = (callable: Callable) => {
      if (pannel.search.keyword !== "" && pannel.search.keyword.length >= 2) {
        return pannel.search.match.fns.has(callable.ref.id);
      }
      return true;
    };
    const result = [];
    for (const callable of callables) {
      if (isCallableVisible(callable)) {
        result.push(renderCallable(callable));
      }
    }
    return result;
  };

  const renderFiles = (files: Set<File>): any => {
    const result = [];
    const isFileVisible = (file: File) => {
      if (pannel.search.keyword !== "" && pannel.search.keyword.length >= 2) {
        return pannel.search.match.fs.has(file.ref.id);
      }
      return true;
    };
    for (const file of files) {
      if (isFileVisible(file)) {
        result.push(renderFile(file));
      }
    }
    return result;
  };

  const renderDirectories = (dirs: Set<Dir>): any => {
    const isDirVisible = (dir: Dir) => {
      if (pannel.search.keyword !== "" && pannel.search.keyword.length >= 2) {
        return pannel.search.match.pkgs.has(dir.path);
      }
      return true;
    };
    const result = [];
    for (const dir of dirs) {
      if (isDirVisible(dir)) {
        result.push(renderDirectory(dir));
      }
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
      <Search keyword={pannel.search.keyword} setKeyword={handleSearch} />
      <ul>
        {
          renderDirectory(data.root)
        }
      </ul>
    </div>
  );
};

export default Pannel;