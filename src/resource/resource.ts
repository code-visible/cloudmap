import javascript from "../lang/js";
import { getLanguageOptions, LanguageOptions } from "../lang/lang";
import { SourceAbstract } from "../protocol/abstract";
import { SourceCall } from "../protocol/call";
import { SourceCallable } from "../protocol/callable";
import { SourceDep } from "../protocol/dep";
import { SourceFile } from "../protocol/file";
import { Source } from "../protocol/map";
import { SourcePkg } from "../protocol/pkg";
import { getNameFromPath, getPrefixPathFromPath, normalizePath } from "../utils/path";
import { Abstract, Call, Callable, Dep, Dir, File, FileCall, Pkg } from "./node";

export class SourceMap {
  name: string;
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
  language: LanguageOptions;

  constructor() {
    this.name = "";
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
    this.language = javascript;
  }

  reset() {
    this.name = "";
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
    this.language = javascript;
  }

  parseSource(data: Source) {
    this.reset();
    this.name = data.name;
    this.language = getLanguageOptions(data.lang);
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
    for (const el of data.abstracts) {
      this.abstracts.set(el.id, this.parseAbstract(el));
    }
    for (const el of data.callables) {
      this.callables.set(el.id, this.parseCallable(el));
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
      callers: new Set(),
      callees: new Set(),
      ref: el,
    };
    if (el.method && el.abstract) {
      const abs = this.abstracts.get(el.abstract);
      if (!abs) {
        throw new Error(`broken callable(method=true) with unexpected abstract field: ${el.id} - ${el.abstract}.`);
      }
      callable.absPtr = abs;
    }
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
    switch (el.type) {
      case "pkg":
        const pkg = this.pkgs.get(el.ref);
        if (!pkg) {
          throw new Error(`broken dep with unexpected ref field: ${el.id} - ${el.type} - ${el.ref}.`);
        }
        dep.pkgPtr = pkg;
        break;
      case "file":
        const file = this.files.get(el.ref);
        if (!file) {
          throw new Error(`broken dep with unexpected ref field: ${el.id} - ${el.type} - ${el.ref}.`);
        }
        dep.filePtr = file;
        break;
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
        } else if (dep.filePtr) {
          file.imports.add(dep.filePtr);
          dep.filePtr.exports.add(file);
          file.pkg.imports.add(dep.filePtr.pkg);
          dep.filePtr.pkg.exports.add(file.pkg);
        }
      }
    }
  }

  private buildCallsNetwork(call: Call) {
    if (call.ref.callee === "" || call.ref.caller === "") return;
    const callee = this.callables.get(call.ref.callee);
    if (!callee) {
      throw new Error(`broken call with unexpected callee field: ${call.ref.id} - ${call.ref.callee}.`);
    }
    const caller = this.callables.get(call.ref.caller);
    if (!caller) {
      throw new Error(`broken call with unexpected caller field: ${call.ref.id} - ${call.ref.caller}.`);
    }
    callee.callers.add(caller);
    caller.callees.add(callee);
    if (this.language.model === "pkg") {
      callee.file.exports.add(caller.file);
      caller.file.imports.add(callee.file);
    }
  }

  getPkgsByRoot(root: string, limit: number): Set<string> {
    const pkgs = new Set<string>();
    pkgs.add(root);

    const rootPkg = this.pkgs.get(root);
    if (!rootPkg) return pkgs;

    const q: Pkg[] = [];
    for (const el of rootPkg.imports) {
      q.push(el);
    }
    for (const el of rootPkg.exports) {
      q.push(el);
    }
    while (limit > 0 && q.length > 0) {
      const current: Pkg = q.shift()!;
      pkgs.add(current.ref.id);
      for (const el of current.imports) {
        if (!pkgs.has(el.ref.id)) {
          q.push(el);
        }
      }
      for (const el of current.exports) {
        if (!pkgs.has(el.ref.id)) {
          q.push(el);
        }
      }
      limit--;
    }

    return pkgs;
  }

  getCallablesByRoot(root: string, limit: number): Set<Callable> {
    const rootCallable = this.callables.get(root);
    if (!rootCallable) return new Set();
    const children = this.getCallablesByRootForward(rootCallable, limit * 8);
    const parents = this.getCallablesByRootBackward(rootCallable, limit * 8);
    for (const el of children) {
      parents.add(el);
    }
    return parents;
  }

  getFileCallsByRoot(root: string, limit: number): Set<FileCall> {
    const rootCallable = this.callables.get(root);
    if (!rootCallable) return new Set();
    const children = this.getCallablesByRootForward(rootCallable, limit * 8);
    const parents = this.getCallablesByRootBackward(rootCallable, limit * 8);
    for (const el of children) {
      parents.add(el);
    }
    const result = new Set<FileCall>();
    const fileMap = new Map<File, FileCall>();
    for (const el of parents) {
      if (this.isCallableConnectedInSet(el, parents)) {
        if (!fileMap.has(el.file)) {
          const newFileCall = {
            file: el.file.ref.id,
            callables: new Set<string>(),
          };
          fileMap.set(el.file, newFileCall);
        }
        const fc = fileMap.get(el.file)!;
        fc.callables.add(el.ref.id);
      }
    }
    for (const el of fileMap.values()) {
      result.add(el);
    }
    return result;
  }

  getCallablesByRootForward(root: Callable, limit: number): Set<Callable> {
    const callables = new Set<Callable>();
    const q = [root];
    while (limit > 0 && q.length > 0) {
      const current: Callable = q.shift()!;
      callables.add(current);
      for (const el of current.callees) {
        q.push(el);
      }
      limit--;
    }
    return callables;
  }

  getCallablesByRootBackward(root: Callable, limit: number): Set<Callable> {
    const callables = new Set<Callable>();
    const q = [root];
    while (limit > 0 && q.length > 0) {
      const current: Callable = q.shift()!;
      callables.add(current);
      for (const el of current.callers) {
        q.push(el);
      }
      limit--;
    }
    return callables;
  }

  getFilesByPkg(pkg: string, limit: number): Set<string> {
    const files = new Set<string>();
    const p = this.pkgs.get(pkg);
    if (!p) return files;
    for (const f of p.files) {
      if (limit <= 0) return files;
      files.add(f.ref.id);
      limit--;
    }
    return files;
  }

  private isCallableConnectedInSet(c: Callable, set: Set<Callable>): boolean {
    for (const i of c.callers) {
      if (i.file === c.file) continue;
      if (set.has(i)) return true;
    }
    for (const o of c.callees) {
      if (o.file === c.file) continue;
      if (set.has(o)) return true;
    }
    return false;
  }

  getCallablesByPkg(pkg: string, limit: number): Set<Callable> {
    const result = new Set<Callable>();
    const p = this.pkgs.get(pkg);
    if (!p) return result;

    // TODO
    // build all callables call graph in a single package.
    // select the most connected files to export
    for (const el of p.callables) {
      if (this.isCallableConnectedInSet(el, p.callables)) {
        result.add(el);
      }
    }

    return result;
  }

  getFileCallsByPkg(pkg: string, limit: number): Set<FileCall> {
    const result = new Set<FileCall>();
    const p = this.pkgs.get(pkg);
    if (!p) return result;

    // build all callables call graph in a single package.
    // select the most connected files to export
    const fileMap = new Map<File, FileCall>();
    for (const el of p.callables) {
      if (this.isCallableConnectedInSet(el, p.callables)) {
        // connectedCallables.add(el);
        if (!fileMap.has(el.file)) {
          const newFileCall = {
            file: el.file.ref.id,
            callables: new Set<string>(),
          };
          fileMap.set(el.file, newFileCall);
        }
        const fc = fileMap.get(el.file)!;
        fc.callables.add(el.ref.id);
      }
    }

    while (limit > 0 && fileMap.size > 0) {
      // warn: O(n^2), n = count of files in package.
      let currentKey: File | undefined;
      let currentFC: FileCall | undefined;
      for (const [key, fc] of fileMap) {
        if (!currentKey) {
          currentKey = key;
          currentFC = fc;
          continue;
        }
        if (currentFC!.callables.size < fc.callables.size) {
          currentKey = key;
          currentFC = fc;
        }
      }
      fileMap.delete(currentKey!)
      result.add(currentFC!);
      limit--;
    }
    // for (const el of fileMap.values()) {
    //   result.add(el);
    // }
    return result;
  }

  getFilesByRoot(root: string, limit: number): Set<string> {
    const files = new Set<string>();
    files.add(root);

    const rootFile = this.files.get(root);
    if (!rootFile) return files;

    const q: File[] = [];
    for (const el of rootFile.imports) {
      q.push(el);
    }
    for (const el of rootFile.exports) {
      q.push(el);
    }
    while (limit > 0 && q.length > 0) {
      const current: File = q.shift()!;
      files.add(current.ref.id);
      for (const el of current.imports) {
        if (!files.has(el.ref.id)) {
          q.push(el);
        }
      }
      for (const el of current.exports) {
        if (!files.has(el.ref.id)) {
          q.push(el);
        }
      }
      limit--;
    }

    return files;
  }
};
