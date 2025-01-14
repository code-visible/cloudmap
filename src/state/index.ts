import { Callable, File, Pkg } from "../resource/node";
import mayk from "../themes/mayk";
import { Palette } from "../themes/theme";

export const enum GraphType {
  PKG = 1,
  FILE = 2,
  CALL = 3,
  REF = 4,
}

export interface GraphEdge {
  start: string;
  end: string;
}

export interface GraphPkg {
  id: string;
  name: string;
  path: string;
  files: number;
  callables: number;
  abstracts: number;
}

export const toGraphPkg = (pkg: Pkg): GraphPkg => {
  const result = {
    id: pkg.ref.id,
    name: "",
    path: pkg.path,
    files: pkg.files.size,
    callables: pkg.callables.size,
    abstracts: pkg.abstracts.size,
  };
  const names = pkg.ref.name.split("/");
  if (names.length > 0) {
    result.name = names[names.length - 1];
  } else {
    result.name = pkg.ref.name;
  }
  return result;
}

export interface StateGraphPkg {
  entrance?: GraphPkg;
  active?: GraphPkg;
  nodes: Map<string, GraphPkg>;
  edges: GraphEdge[];
}

export interface StateGraphFile {
  pkg: string;
  entrance?: GraphFile;
  active?: GraphFile;
  nodes: Map<string, GraphFile>;
  edges: GraphEdge[];
}

export interface StateGraphCall {
  pkg: string;
  entrance?: GraphCallable;
  active?: GraphCallable;
  activeHostFile?: GraphFile;
  nodes: Map<string, GraphFileCall>;
  edges: GraphEdge[];
}

export interface GraphFile {
  id: string;
  name: string;
  path: string;
  callables: number;
  abstracts: number;
  imports: Set<string>;
  exports: Set<string>;
  pkg: string;
}

export const toGraphFile = (file: File): GraphFile => {
  const result = {
    id: file.ref.id,
    name: file.ref.name,
    path: file.ref.path,
    callables: file.callables.size,
    abstracts: file.abstracts.size,
    pkg: file.ref.pkg,
    imports: new Set<string>(),
    exports: new Set<string>(),
  };
  for (const el of file.imports) {
    result.imports.add(el.ref.id);
  }
  for (const el of file.exports) {
    result.exports.add(el.ref.id);
  }
  return result;
}

export interface GraphFileCall {
  file: GraphFile,
  callables: Map<string, GraphCallable>,
}

export interface GraphCallable {
  id: string;
  pos: string;
  name: string;
  signature: string;
  abstract: string;
  parameters: string[];
  results: string[];
  method: boolean;
  file: string;
  pkg: string;
  callers: Set<string>;
  callees: Set<string>;
}

export const toGraphCallable = (callable: Callable): GraphCallable => {
  const result = {
    id: callable.ref.id,
    pos: callable.ref.pos,
    name: callable.ref.name,
    signature: callable.ref.signature,
    abstract: callable.ref.abstract,
    parameters: callable.ref.parameters,
    results: callable.ref.results,
    method: callable.ref.method,
    file: callable.ref.file,
    pkg: callable.ref.pkg,
    callers: new Set<string>(),
    callees: new Set<string>(),
  };
  for (const el of callable.callees) {
    result.callees.add(el.ref.id);
  }
  for (const el of callable.callers) {
    result.callers.add(el.ref.id);
  }
  return result;
}

export interface StatePkg {
  entrance: string;
  active: string;
  set: Set<string>;
}

export interface StateTheme {
  palette: Palette;
}

export interface StateFile {
  pkg: string;
  entrance: string;
  active: string;
  set: Set<string>;
}

export interface StateCall {
  pkg: string;
  entrance: string;
  active: string;
  set: Set<Callable>;
}

export interface ResourceSet {
  pkgs: Set<string>;
  fs: Set<string>;
  fns: Set<string>;
  abs: Set<string>;
}

export interface StateSearch {
  keyword: string;
  match: ResourceSet;
  highlight: boolean;
}

export interface StateHover {
  typ: GraphType;
  id: string;
}

// expand directories and files
export interface StateExpand {
  pkgs: Set<string>;
  fs: Set<string>;
}

export interface StateShared {
  mutePannel: boolean;
  hide: ResourceSet,
}

export interface StatePannel {
  search: StateSearch;
  expand: StateExpand,
  hover: StateHover;
}

export const InitialStateGraphPkg: StateGraphPkg = {
  entrance: undefined,
  active: undefined,
  nodes: new Map(),
  edges: [],
};

export const InitialStateGraphFile: StateGraphFile = {
  pkg: "",
  entrance: undefined,
  active: undefined,
  nodes: new Map(),
  edges: [],
};

export const InitialStateGraphCall: StateGraphCall = {
  pkg: "",
  entrance: undefined,
  active: undefined,
  activeHostFile: undefined,
  nodes: new Map(),
  edges: [],
};

export const InitialStatePkg: StatePkg = {
  entrance: "",
  active: "",
  set: new Set(),
};

export const InitialStateFile: StateFile = {
  pkg: "",
  entrance: "",
  active: "",
  set: new Set(),
};

export const InitialStateCall: StateCall = {
  pkg: "",
  entrance: "",
  active: "",
  set: new Set(),
};

export const InitialStateTheme: StateTheme = {
  palette: mayk,
};

export const InitialStatePannel: StatePannel = {
  search: {
    keyword: "",
    match: {
      pkgs: new Set<string>(),
      fs: new Set<string>(),
      fns: new Set<string>(),
      abs: new Set<string>(),
    },
    highlight: true,
  },
  expand: {
    pkgs: new Set<string>(),
    fs: new Set<string>(),
  },
  hover: {
    typ: GraphType.PKG,
    id: "",
  },
}

export const InitialStateShared: StateShared = {
  mutePannel: false,
  hide: {
    pkgs: new Set<string>(),
    fs: new Set<string>(),
    fns: new Set<string>(),
    abs: new Set<string>(),
  }
}

export const InitialStateGraph = GraphType.PKG;