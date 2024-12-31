import { SourceAbstract } from "../protocol/abstract";
import { SourceCall } from "../protocol/call";
import { SourceCallable } from "../protocol/callable";
import { SourceDep } from "../protocol/dep";
import { SourceFile } from "../protocol/file";
import { Source } from "../protocol/map";
import { SourcePkg } from "../protocol/pkg";
import { getNameFromPath, getPrefixPathFromPath, normalizePath } from "../utils/path";
import { Abstract, Call, File, Callable, Dep, Pkg, Dir } from "./node";

export class SourceMap {
  name: string;
  directory: string;
  // lang: string;
  // packageOriented: boolean;
  root: Dir;
  dirs: Map<string, Dir>;
  pkgs: Map<string, Pkg>;
  files: Map<string, File>;
  callables: Map<string, Callable>;
  abstracts: Map<string, Abstract>;
  calls: Map<string, Call>;
  deps: Map<string, Dep>;

  constructor() {
    this.name = "";
    this.directory = "";
    this.dirs = new Map();
    this.pkgs = new Map();
    this.files = new Map();
    this.callables = new Map();
    this.abstracts = new Map();
    this.calls = new Map();
    this.deps = new Map();
    this.root = {
      name: "",
      path: "",
      children: new Set<Dir>(),
      files: new Set<File>(),
      pkgPtr: undefined,
      parent: undefined,
    };
  }

  parseSource(data: Source) {
    this.name = data.name;
    this.directory = data.directory;
    for (const el of data.pkgs) {
      this.pkgs.set(el.id, this.parsePkg(el));
    }
    for (const el of data.files) {
      const file = this.parseFile(el);
      this.files.set(el.id, file);
      if (!this.dirs.has(el.path)) {
        const newDir: Dir = {
          name: getNameFromPath(el.path),
          path: normalizePath(el.path),
          parent: undefined,
          children: new Set<Dir>(),
          files: new Set<File>(),
          pkgPtr: undefined,
        };
        newDir.files.add(file);
        if (el.pkg && this.pkgs.has(el.pkg)) {
          const pkg = this.pkgs.get(el.pkg);
          newDir.pkgPtr = pkg;
        }
        this.dirs.set(el.path, newDir);
        continue;
      }
      const dir = this.dirs.get(el.path)!;
      dir.files.add(file);
    }
    for (const el of data.callables) {
      this.callables.set(el.id, this.parseCallable(el));
    }
    for (const el of data.abstracts) {
      this.abstracts.set(el.id, this.parseAbstract(el));
    }
    for (const el of data.calls) {
      this.calls.set(el.id, this.parseCall(el));
    }
    for (const el of data.deps) {
      this.deps.set(el.id, this.parseDep(el));
    }
    this.buildDirsHierarchy();
    for (const el of this.files.values()) {
      this.buildDependenciesNetwork(el);
    }
    for (const el of this.calls.values()) {
      this.buildCallsNetwork(el);
    }
  }

  private parsePkg(el: SourcePkg): Pkg {
    const pkg: Pkg = {
      path: el.path === "." ? "project" : normalizePath(el.path),
      imports: new Set(),
      exports: new Set(),
      files: new Set(),
      callables: new Set(),
      abstracts: new Set(),
      ref: el,
    };
    return pkg;
  }

  private parseFile(el: SourceFile): File {
    const pkg = this.pkgs.get(el.pkg);
    if (!pkg) {
      throw new Error(`broken file with unexpected pkg field: ${el.id} - ${el.pkg}.`);
    }
    const file: File = {
      pkg,
      imports: new Set(),
      exports: new Set(),
      callables: new Set(),
      abstracts: new Set(),
      ref: el,
    };
    pkg.files.add(file);
    return file;
  }

  private parseCallable(el: SourceCallable): Callable {
    const pkg = this.pkgs.get(el.pkg);
    if (!pkg) {
      throw new Error(`broken callable with unexpected pkg field: ${el.id} - ${el.pkg}.`);
    }
    const file = this.files.get(el.file);
    if (!file) {
      throw new Error(`broken callable with unexpected file field: ${el.id} - ${el.file}.`);
    }
    if (file.pkg !== pkg) {
      throw new Error(`broken callable with conflict pkg field: ${el.id} - ${el.pkg}.`);
    }
    const callable: Callable = {
      pkg,
      file,
      ref: el,
    };
    pkg.callables.add(callable);
    file.callables.add(callable);
    return callable;
  }

  private parseAbstract(el: SourceAbstract): Abstract {
    const pkg = this.pkgs.get(el.pkg);
    if (!pkg) {
      throw new Error(`broken abstract with unexpected pkg field: ${el.id} - ${el.pkg}.`);
    }
    const file = this.files.get(el.file);
    if (!file) {
      throw new Error(`broken abstract with unexpected file field: ${el.id} - ${el.file}.`);
    }
    if (file.pkg !== pkg) {
      throw new Error(`broken abstract with conflict pkg field: ${el.id} - ${el.pkg}.`);
    }
    const abstract: Abstract = {
      pkg,
      file,
      ref: el,
    };
    pkg.abstracts.add(abstract);
    file.abstracts.add(abstract);
    return abstract;
  }

  private parseCall(el: SourceCall): Call {
    const file = this.files.get(el.file);
    if (!file) {
      throw new Error(`broken abstract with unexpected file field: ${el.id} - ${el.file}.`);
    }
    const call: Call = {
      pkg: file.pkg,
      file,
      ref: el,
    };
    return call;
  }

  private parseDep(el: SourceDep): Dep {
    const dep: Dep = {
      ref: el,
    };
    if (el.type === "pkg") {
      const pkg = this.pkgs.get(el.ref);
      if (!pkg) {
        throw new Error(`broken dep with unexpected ref field: ${el.id} - ${el.type} - ${el.ref}.`);
      }
      dep.pkgPtr = pkg;
    } else if (el.type === "file") {
      const file = this.files.get(el.ref);
      if (!file) {
        throw new Error(`broken dep with unexpected ref field: ${el.id} - ${el.type} - ${el.ref}.`);
      }
      dep.filePtr = file;
    }
    return dep;
  }

  private buildDirsHierarchy() {
    this.serarchRootDir();
    for (const el of this.dirs.values()) {
      if (el === this.root) continue;
      let currentDir = el;
      while (currentDir.path.length > 0) {
        const currentPath = currentDir.path;
        if (currentPath.indexOf("/") < 0) {
          this.root.children.add(currentDir);
          currentDir.parent = this.root;
          break;
        }
        const parentPath = getPrefixPathFromPath(currentPath);
        if (this.dirs.has(parentPath)) {
          const parentDir = this.dirs.get(parentPath)!;
          parentDir.children.add(currentDir);
          currentDir.parent = parentDir;
          break;
        }
        const parentDir: Dir = {
          name: getNameFromPath(parentPath),
          path: parentPath,
          parent: undefined,
          children: new Set<Dir>(),
          files: new Set<File>(),
          pkgPtr: undefined,
        };
        this.dirs.set(parentPath, parentDir);
        parentDir.children.add(currentDir);
        currentDir.parent = parentDir;
        currentDir = parentDir;
      }
    }
  }

  private serarchRootDir() {
    for (const el of this.dirs.values()) {
      // TODO: provide better definition of root in protocol.
      if (el.path === ".") {
        this.root = el;
        return;
      }
    }
  }

  private buildDependenciesNetwork(file: File) {
    if (file.ref.deps && file.ref.deps.length > 0) {
      for (const depID of file.ref.deps) {
        const dep = this.deps.get(depID);
        if (!dep) {
          throw new Error(`broken file with unexpected dep field: ${file.ref.id} - ${depID}.`);
        }
        if (dep.pkgPtr) {
          file.pkg.imports.add(dep.pkgPtr);
          dep.pkgPtr.exports.add(file.pkg);
        }
        if (dep.filePtr) {
          file.imports.add(dep.filePtr);
          dep.filePtr.exports.add(file);
        }
      }
    }
  }

  private buildCallsNetwork(_call: Call) {
    // TODO
  }

  getPkgsByRoot(root: string, limit: number): Set<string> {
    const rootPkg = this.pkgs.get(root);
    if (!rootPkg) return new Set();
    const pkgs = new Set<string>();
    const children = this.getPkgsByRootForward(rootPkg, limit / 2);
    const parents = this.getPkgsByRootBackward(rootPkg, limit / 2);
    for (const el of children) {
      parents.add(el);
    }
    for (const el of parents) {
      pkgs.add(el.ref.id);
    }
    return pkgs;
  }

  getPkgsByRootForward(root: Pkg, limit: number): Set<Pkg> {
    const pkgs = new Set<Pkg>();
    const q = [root];
    while (limit > 0 && q.length > 0) {
      const current: Pkg = q.shift()!;
      pkgs.add(current);
      for (const el of current.imports) {
        q.push(el);
      }
      limit--;
    }
    return pkgs;
  }

  getPkgsByRootBackward(root: Pkg, limit: number): Set<Pkg> {
    const pkgs = new Set<Pkg>();
    const q = [root];
    while (limit > 0 && q.length > 0) {
      const current: Pkg = q.shift()!;
      pkgs.add(current);
      for (const el of current.exports) {
        q.push(el);
      }
      limit--;
    }
    return pkgs;
  }

  getPkgsByMains(limit: number): Set<Pkg> {
    const pkgs = new Set<Pkg>();
    // const q = [];
    // for (const root of this.entrances) {
    //   for (const pkg of root.file.pkg.imports) {
    //     q.push(pkg);
    //   }
    // }
    // while (limit > 0 && q.length > 0) {
    //   limit--;
    //   const current: Pkg = q.shift()!;
    //   pkgs.add(current);
    //   for (const el of current.imports) {
    //     q.push(el);
    //   }
    // }
    return pkgs;
  }

  getAllPkgs(): Set<Pkg> {
    const pkgs = new Set<Pkg>();
    for (const pkg of this.pkgs.values()) {
      pkgs.add(pkg);
    }
    return pkgs;
  }
};
